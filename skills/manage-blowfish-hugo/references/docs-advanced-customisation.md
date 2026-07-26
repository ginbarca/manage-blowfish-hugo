# Advanced Customisation

- Source: https://blowfish.page/docs/advanced-customisation/
- Checked: 2026-07-24
- Read when: changing CSS, colors, fonts, image processing, syntax highlighting,
  templates, or the Tailwind build.

## Upgrade-safe Rule

Never edit files inside `themes/blowfish`, the Hugo module cache, or vendored
upstream source as the final customization. Put a matching file in the site root
and rely on Hugo lookup order.

Use this escalation order:

1. Change a documented configuration parameter.
2. Add a custom scheme or `assets/css/custom.css`.
3. Use an extension partial.
4. Override the smallest relevant layout, partial, or shortcode.
5. Rebuild Tailwind only for major utility/config changes.

## Images

Hugo can resize, crop, and optimize local resources. When changing image behavior,
inspect the exact installed partial and consider site-level imaging settings
before overriding template code. Preserve responsive output and avoid processing
the same asset twice.

## Colour Schemes

Create:

```text
assets/css/schemes/<scheme-name>.css
```

Blowfish schemes define `neutral`, `primary`, and `secondary` palettes with shade
variables. Values use comma-separated RGB components so Tailwind opacity works,
for example:

```css
:root {
  --color-primary-500: 139, 92, 246;
}
```

Start from a scheme in the installed version, define all required variables, then
select the filename stem through `colorScheme`.

## Custom CSS and Fonts

Create `assets/css/custom.css`. Hugo loads and minifies it after theme styles.

For self-hosted fonts:

```text
static/fonts/font.woff2
```

Declare `@font-face` in custom CSS and use a fallback stack. Reference a
deployment-safe URL, especially when the site lives under a subpath. Test light,
dark, focus, contrast, and reduced-motion states.

To replace Chroma colors, clear the theme's relevant `.chroma` styling and append
light/dark styles produced by `hugo gen chromastyles`. Use the current Hugo CLI
syntax.

## Tailwind Rebuild

Rebuild only when required classes cannot be expressed through existing compiled
utilities or custom CSS.

- For a submodule, use the installed theme's Node dependencies and Tailwind config.
- For a Hugo Module, run `hugo mod vendor` and adapt source paths to `_vendor`.
- Write project-owned output to `assets/css/compiled/main.css`.
- Pin the repository's package manager and lockfile.
- Include both development watch and production build commands.

The official command paths are version-sensitive. Inspect the installed
`package.json`, Tailwind CLI, config, and source CSS rather than copying a command
from an older guide.
