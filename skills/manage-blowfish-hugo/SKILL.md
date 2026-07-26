---
name: manage-blowfish-hugo
description: Set up, configure, customize, diagnose, upgrade, and deploy Hugo websites that use the Blowfish theme. Use for new Blowfish sites; existing Hugo/Blowfish repositories; config/_default TOML files; homepage, menu, language, author, article, list, search, taxonomy, color, CSS, layout, partial, shortcode, thumbnail, hero-image, page-bundle, Hugo Module, Git submodule, Tailwind, GitHub Pages, and theme-update work. Also use when integrating a content editor or CMS that must preserve Blowfish front matter, page bundles, assets, and shortcode rendering.
---

# Manage Blowfish Hugo

Set up and change Blowfish sites with upgrade-safe Hugo conventions. Treat the
site repository and its current dependency method as the source of truth.

## Guardrails

- Read repository instructions and inspect the working tree before changing files.
- Preserve unrelated user changes. Ask before destructive migration or replacement.
- Never edit Blowfish files in `themes/blowfish`, Hugo's module cache, or vendored
  upstream sources. Override them from the site's root using Hugo lookup order.
- Preserve the current installation method unless the user explicitly requests a
  migration between Hugo Modules, Git submodules, or a manual theme copy.
- Prefer configuration over CSS, CSS over extension partials, and targeted
  partial/layout overrides over rebuilding the theme stylesheet.
- Do not copy old provider versions, minimum Hugo versions, or complete config
  examples blindly. Verify version-sensitive details against the current official
  Blowfish and Hugo documentation when network access is available.
- Keep secrets out of Hugo config, generated HTML, public assets, and client-side
  CMS code. A hidden route is not authentication.

## Inspect First

1. Establish the project root, requested outcome, target language, homepage style,
   deployment target, and whether the task concerns a new or existing site.
2. Read `AGENTS.md` or equivalent repository instructions and check `git status`.
3. Run:

   ```bash
   python3 <skill-root>/scripts/audit_blowfish_project.py <project-root>
   ```

4. Inspect the files named by the audit, especially:
   - `config/_default/hugo.*`, `params.*`, `languages.<code>.*`,
     `menus.<code>.*`, and `module.*`
   - `go.mod`, `.gitmodules`, and `themes/blowfish` as applicable
   - existing files in `layouts/`, `assets/`, `static/`, and `content/`
   - deployment workflows and the exact build command
5. If the audit cannot identify Blowfish, resolve whether the site is new,
   incomplete, or uses a nonstandard config before editing it.

## Route the Task

Read every documentation reference that directly covers the requested change.
Use the sample references only when an implementation example, fixture, or visual
comparison is useful. Treat the current official page as authoritative when it
differs from a bundled reference, especially for versions, provider workflows,
shortcode parameters, and Firebase rules.

### Official Documentation

| Task or topic | Read |
| --- | --- |
| Theme purpose and capabilities | [docs-welcome.md](references/docs-welcome.md) |
| Install, update, or choose a dependency method | [docs-installation.md](references/docs-installation.md) |
| Initial site, language, menu, taxonomy, and media setup | [docs-getting-started.md](references/docs-getting-started.md) |
| Site, language, theme, article, list, taxonomy, analytics, and integration parameters | [docs-configuration.md](references/docs-configuration.md) |
| Profile, page, hero, background, card, or custom homepages | [docs-homepage-layout.md](references/docs-homepage-layout.md) |
| Blowfish shortcode syntax and parameters | [docs-shortcodes.md](references/docs-shortcodes.md) |
| Per-page presentation and behavior overrides | [docs-front-matter.md](references/docs-front-matter.md) |
| Author data, article attribution, and author taxonomies | [docs-multi-author.md](references/docs-multi-author.md) |
| Analytics, comments, favicons, icons, and extension partials | [docs-partials.md](references/docs-partials.md) |
| Featured thumbnails, page bundles, and article heroes | [docs-thumbnails.md](references/docs-thumbnails.md) |
| Branch, leaf, external, simple, and custom content layouts | [docs-content-examples.md](references/docs-content-examples.md) |
| Article-series taxonomy and ordering | [docs-series.md](references/docs-series.md) |
| CSS, schemes, fonts, image processing, and Tailwind rebuilds | [docs-advanced-customisation.md](references/docs-advanced-customisation.md) |
| GitHub Pages, Netlify, Render, Cloudflare Pages, or self-hosting | [docs-hosting-deployment.md](references/docs-hosting-deployment.md) |
| Firebase-backed views and likes | [docs-firebase-views.md](references/docs-firebase-views.md) |

### Examples

| Example | Read |
| --- | --- |
| Article credited to multiple authors | [sample-multiple-authors.md](references/sample-multiple-authors.md) |
| Leaf bundle with a discovered featured image | [sample-thumbnail.md](references/sample-thumbnail.md) |
| Built-in and custom icon usage | [sample-icons.md](references/sample-icons.md) |
| Rendered Markdown and basic HTML | [sample-markdown.md](references/sample-markdown.md) |
| Hugo rich-content embeds and privacy considerations | [sample-rich-content.md](references/sample-rich-content.md) |
| Long-form placeholder content for typography testing | [sample-placeholder-text.md](references/sample-placeholder-text.md) |
| KaTeX inline and block notation | [sample-mathematical-notation.md](references/sample-mathematical-notation.md) |
| Chart.js bar, line, and doughnut charts | [sample-charts.md](references/sample-charts.md) |
| Mermaid diagram types | [sample-diagrams-flowcharts.md](references/sample-diagrams-flowcharts.md) |
| Emoji in titles, menus, content, and front matter | [sample-emoji.md](references/sample-emoji.md) |
| Real-world project portfolio layout | [example-n9o-projects.md](references/example-n9o-projects.md) |

## Implement in Small Layers

1. Reproduce the current state before changing it when the toolchain is available.
2. Make the smallest coherent change in the site's own directories.
3. Match the repository's existing config format and naming convention. Do not
   introduce a second root config style without a deliberate migration.
4. Keep language codes aligned across site config, language config, menus, and
   content directories.
5. Keep Blowfish-specific content in valid Hugo branch or leaf bundles. Preserve
   feature images and other page resources beside the content they belong to.
6. For an upstream template override:
   - inspect the exact template from the installed Blowfish version;
   - copy only the necessary file to the matching site-root path;
   - change the smallest relevant region;
   - note that the override may need review after a theme upgrade.
7. For CMS/editor integrations, treat Hugo rendering as authoritative. Preserve
   front matter types and shortcode source instead of flattening them into HTML.

## Validate

Run the strongest checks available without publishing:

```bash
python3 <skill-root>/scripts/audit_blowfish_project.py <project-root> --strict
hugo --gc --minify
```

Also:

- Use the repository's established build command when it differs from the generic
  command above.
- Run `hugo server` for visual changes and inspect representative home, list,
  article, taxonomy, light, dark, and mobile states.
- Build with the production `baseURL` for subpath hosting such as project-scoped
  GitHub Pages.
- Check generated HTML for broken resource URLs, missing menus, duplicate metadata,
  and shortcode/template warnings.
- Re-run tests or linters for any adjacent Vue, JavaScript, CSS, or automation code.
- Do not deploy unless the user explicitly asks for deployment.

## Report

Lead with the result. List changed files, explain the chosen Blowfish extension
point, state the validation performed, and call out remaining assumptions or
upgrade-sensitive overrides. Give exact next commands only when the user needs to
run them.
