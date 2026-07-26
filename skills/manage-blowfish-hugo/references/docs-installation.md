# Installation

- Source: https://blowfish.page/docs/installation/
- Checked: 2026-07-24
- Read when: creating a site, installing Blowfish, choosing a dependency method,
  or updating the theme.

## Contents

- [Prerequisites](#prerequisites)
- [Installation Choices](#installation-choices)
- [Deterministic Setup](#deterministic-setup)
- [Configuration Files](#configuration-files)
- [Updates](#updates)

## Prerequisites

- Install Hugo Extended and confirm with `hugo version`.
- The official page required Hugo `0.158.0` or later when this reference was
  checked. Verify the current minimum before making a new project or changing CI.
- Git is needed for a submodule installation.
- Go is needed for Hugo Modules.
- Node.js/npm is needed for Blowfish Tools and advanced Tailwind rebuilds.

## Installation Choices

Preserve the method already present in an existing repository.

| Method | Use when | Key files or commands |
| --- | --- | --- |
| Blowfish Tools | The user accepts the official interactive beta CLI | `npx blowfish-tools` or `blowfish-tools new <site>` |
| Git submodule | A Git-managed theme checkout is desired | `.gitmodules`, `themes/blowfish` |
| Hugo Module | Go modules and dependency automation are desired | `go.mod`, `config/_default/module.toml` |
| Manual copy | Offline or exceptional constraints require vendoring | `themes/blowfish` owned by the project |

The official guide currently recommends Git submodules when the user is unsure.
Do not migrate an existing project merely because another method is preferred for
new sites.

## Deterministic Setup

Create the site:

```bash
hugo new site <site-name>
cd <site-name>
git init
```

For a submodule:

```bash
git submodule add -b main https://github.com/nunocoracao/blowfish.git themes/blowfish
```

For a Hugo Module:

```bash
hugo mod init <module-path>
```

Create `config/_default/module.toml`:

```toml
[[imports]]
disable = false
path = "github.com/nunocoracao/blowfish/v2"
```

## Configuration Files

Adapt the current same-version theme config into the site-owned
`config/_default/` directory:

```text
config/_default/
├── hugo.toml
├── languages.en.toml
├── markup.toml
├── menus.en.toml
├── module.toml
└── params.toml
```

- Do not overwrite an existing `module.toml`.
- For non-module installs, set `theme = "blowfish"` in `hugo.toml`.
- For Hugo Modules, remove the `theme` selection and use the module import.
- Migrate values before deleting an existing root `hugo.toml`; never discard user
  configuration blindly.

## Updates

Use the installation method already in place:

```bash
# Git submodule
git submodule update --remote --merge

# Hugo Module
hugo mod get -u
```

Manual installations require replacing upstream theme files from a verified
release. Project customizations must live outside the theme directory so updates
do not erase them.

Before and after an update:

1. Record Hugo and Blowfish versions.
2. Build the current site.
3. Review release and migration notes.
4. Update one dependency method only.
5. Rebuild and compare project-owned overrides with their new upstream versions.
