#!/usr/bin/env python3
"""Audit a Hugo project for Blowfish setup and customization concerns."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

try:
    import tomllib
except ModuleNotFoundError:  # pragma: no cover - Python < 3.11
    tomllib = None


CONFIG_EXTENSIONS = ("toml", "yaml", "yml", "json")
VALID_HOME_LAYOUTS = {"profile", "page", "hero", "background", "card", "custom"}
IMAGE_HOME_LAYOUTS = {"hero", "background", "card"}
BLOWFISH_MODULE = "github.com/nunocoracao/blowfish/v2"


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""


def load_toml(path: Path) -> dict[str, Any]:
    if tomllib is None or not path.is_file():
        return {}
    try:
        with path.open("rb") as handle:
            value = tomllib.load(handle)
        return value if isinstance(value, dict) else {}
    except (OSError, tomllib.TOMLDecodeError):
        return {}


def dotted_get(data: dict[str, Any], *keys: str) -> Any:
    value: Any = data
    for key in keys:
        if not isinstance(value, dict):
            return None
        value = value.get(key)
    return value


def find_files(root: Path, stems: tuple[str, ...]) -> list[Path]:
    paths: list[Path] = []
    for base in (root, root / "config" / "_default"):
        for stem in stems:
            for extension in CONFIG_EXTENSIONS:
                candidate = base / f"{stem}.{extension}"
                if candidate.is_file():
                    paths.append(candidate)
    return sorted(set(paths))


def relative(path: Path, root: Path) -> str:
    try:
        return path.relative_to(root).as_posix()
    except ValueError:
        return str(path)


def run_command(args: list[str], cwd: Path, timeout: int = 8) -> tuple[int, str]:
    try:
        result = subprocess.run(
            args,
            cwd=cwd,
            check=False,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        output = (result.stdout or result.stderr).strip()
        return result.returncode, output
    except (OSError, subprocess.TimeoutExpired) as exc:
        return 127, str(exc)


def inspect_project(root: Path) -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    notes: list[str] = []

    site_configs = find_files(root, ("hugo", "config"))
    param_configs = find_files(root, ("params",))
    module_configs = find_files(root, ("module",))
    language_configs = sorted((root / "config" / "_default").glob("languages.*.*"))
    menu_configs = sorted((root / "config" / "_default").glob("menus.*.*"))

    go_mod = root / "go.mod"
    gitmodules = root / ".gitmodules"
    theme_dir = root / "themes" / "blowfish"
    module_text = "\n".join(read_text(path) for path in module_configs)
    go_mod_text = read_text(go_mod)
    gitmodules_text = read_text(gitmodules)

    methods: list[str] = []
    if BLOWFISH_MODULE in module_text or BLOWFISH_MODULE in go_mod_text:
        methods.append("hugo-module")
    if theme_dir.exists() and "blowfish" in gitmodules_text.lower():
        methods.append("git-submodule")
    elif theme_dir.exists():
        methods.append("manual-or-vendored-theme")

    combined_config = "\n".join(read_text(path) for path in site_configs + param_configs)
    if re.search(r'(?im)^\s*theme\s*=\s*["\']blowfish["\']', combined_config):
        notes.append("Site config explicitly selects theme = blowfish.")

    if not site_configs:
        errors.append("No Hugo site config was found at the project root or config/_default.")
    if not methods:
        warnings.append("Could not identify a Blowfish module, submodule, or local theme directory.")
    if len(methods) > 1:
        warnings.append(
            "Multiple Blowfish installation signals found: " + ", ".join(methods) + "."
        )
    if not param_configs:
        warnings.append("No params config was found; Blowfish may be using defaults or nonstandard paths.")

    base_url: Any = None
    default_language: Any = None
    for path in site_configs:
        data = load_toml(path) if path.suffix == ".toml" else {}
        base_url = data.get("baseURL", base_url)
        default_language = data.get(
            "defaultContentLanguage", data.get("locale", default_language)
        )

    if isinstance(base_url, str):
        if not base_url.strip():
            warnings.append("baseURL is empty.")
        elif any(token in base_url.lower() for token in ("example.com", "your_domain", "localhost")):
            warnings.append(f"baseURL looks like a placeholder or local URL: {base_url}")
    else:
        warnings.append("baseURL was not resolved from TOML site config.")

    language_codes = []
    language_locales: dict[str, Any] = {}
    for path in language_configs:
        parts = path.name.split(".")
        if len(parts) >= 3:
            code = parts[1]
            language_codes.append(code)
            if path.suffix == ".toml":
                language_data = load_toml(path)
                locale = language_data.get("locale")
                language_locales[code] = locale
                if locale is None:
                    warnings.append(
                        f"{relative(path, root)} does not define Blowfish locale."
                    )
                elif str(locale).lower() != code.lower():
                    warnings.append(
                        f"{relative(path, root)} locale {locale!r} does not match filename code '{code}'."
                    )
    menu_codes = []
    for path in menu_configs:
        parts = path.name.split(".")
        if len(parts) >= 3:
            menu_codes.append(parts[1])

    if default_language and language_codes and str(default_language) not in language_codes:
        warnings.append(
            f"Default language '{default_language}' has no matching languages.<code> config."
        )
    unmatched_menus = sorted(set(menu_codes) - set(language_codes))
    if unmatched_menus:
        warnings.append(
            "Menu configs without matching language configs: " + ", ".join(unmatched_menus)
        )

    homepage_layout: Any = None
    homepage_image: Any = None
    for path in param_configs:
        data = load_toml(path) if path.suffix == ".toml" else {}
        layout = dotted_get(data, "homepage", "layout")
        image = dotted_get(data, "homepage", "homepageImage")
        homepage_layout = layout if layout is not None else homepage_layout
        homepage_image = image if image is not None else homepage_image

    if homepage_layout is not None and homepage_layout not in VALID_HOME_LAYOUTS:
        errors.append(f"Unsupported homepage.layout value: {homepage_layout!r}.")
    if homepage_layout in IMAGE_HOME_LAYOUTS and not homepage_image:
        warnings.append(f"homepage.layout '{homepage_layout}' usually requires homepage.homepageImage.")
    if homepage_layout == "custom":
        custom_home = root / "layouts" / "partials" / "home" / "custom.html"
        if not custom_home.is_file():
            errors.append(
                "homepage.layout is custom but layouts/partials/home/custom.html is missing."
            )

    custom_paths: list[str] = []
    for candidate in (
        root / "assets" / "css" / "custom.css",
        root / "layouts" / "partials" / "extend-head.html",
        root / "layouts" / "partials" / "extend-head-uncached.html",
        root / "layouts" / "partials" / "extend-footer.html",
        root / "layouts" / "partials" / "home" / "custom.html",
    ):
        if candidate.is_file():
            custom_paths.append(relative(candidate, root))
    for directory in (
        root / "assets" / "css" / "schemes",
        root / "assets" / "icons",
        root / "layouts" / "shortcodes",
    ):
        if directory.is_dir():
            custom_paths.extend(
                relative(path, root) for path in sorted(directory.iterdir()) if path.is_file()
            )

    theme_changes: list[str] = []
    if (root / ".git").exists() and theme_dir.exists():
        code, output = run_command(
            ["git", "status", "--porcelain", "--", "themes/blowfish"], root
        )
        if code == 0 and output:
            theme_changes = output.splitlines()
            warnings.append("The working tree reports changes under themes/blowfish.")

    hugo_version = None
    if shutil.which("hugo"):
        code, output = run_command(["hugo", "version"], root)
        if code == 0:
            hugo_version = output
        else:
            warnings.append("The hugo executable exists but `hugo version` failed.")
    else:
        warnings.append("Hugo is not available on PATH; the site build was not checked.")

    if tomllib is None:
        notes.append("Python tomllib is unavailable; TOML value checks were skipped.")

    return {
        "root": str(root),
        "blowfish_installation": methods or ["unknown"],
        "hugo_version": hugo_version,
        "site_configs": [relative(path, root) for path in site_configs],
        "params_configs": [relative(path, root) for path in param_configs],
        "module_configs": [relative(path, root) for path in module_configs],
        "language_configs": [relative(path, root) for path in language_configs],
        "language_locales": language_locales,
        "menu_configs": [relative(path, root) for path in menu_configs],
        "base_url": base_url,
        "default_language": default_language,
        "homepage_layout": homepage_layout,
        "customization_files": sorted(set(custom_paths)),
        "theme_worktree_changes": theme_changes,
        "errors": errors,
        "warnings": warnings,
        "notes": notes,
    }


def print_human(report: dict[str, Any]) -> None:
    print(f"Blowfish project audit: {report['root']}")
    print("Installation: " + ", ".join(report["blowfish_installation"]))
    print("Hugo: " + (report["hugo_version"] or "not detected"))
    print("Site config: " + (", ".join(report["site_configs"]) or "none"))
    print("Params config: " + (", ".join(report["params_configs"]) or "none"))
    print(f"baseURL: {report['base_url']!r}")
    print(f"Default language: {report['default_language']!r}")
    print(f"Homepage layout: {report['homepage_layout']!r}")
    if report["customization_files"]:
        print("Customizations:")
        for path in report["customization_files"]:
            print(f"  - {path}")
    for key, label in (("errors", "ERROR"), ("warnings", "WARN"), ("notes", "NOTE")):
        for message in report[key]:
            print(f"{label}: {message}")
    print(
        f"Summary: {len(report['errors'])} error(s), "
        f"{len(report['warnings'])} warning(s)"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project_root", nargs="?", default=".")
    parser.add_argument("--json", action="store_true", dest="as_json")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit nonzero when the audit finds errors or warnings.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(args.project_root).expanduser().resolve()
    if not root.is_dir():
        print(f"error: not a directory: {root}", file=sys.stderr)
        return 2

    report = inspect_project(root)
    if args.as_json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print_human(report)

    if report["errors"]:
        return 1
    if args.strict and report["warnings"]:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
