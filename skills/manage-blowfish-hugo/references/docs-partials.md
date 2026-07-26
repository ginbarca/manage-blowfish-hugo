# Partials

- Source: https://blowfish.page/docs/partials/
- Checked: 2026-07-24
- Read when: adding analytics, comments, favicons, icons, scripts, metadata, or
  markup through official extension points.

## Analytics

Blowfish documents direct configuration for:

- Fathom in `params.*` with site code and optional custom domain;
- Google Analytics through Hugo's site configuration;
- Umami with website ID, domain, optional allowed domains/script name, DNT choice,
  and event tracking;
- Seline with token and optional event tracking.

Confirm current provider and privacy requirements before enabling telemetry.
Avoid loading the same tracker from both configuration and a custom partial.

## Comments

Provide:

```text
layouts/partials/comments.html
```

Then enable `showComments` globally or per page. The partial can call Hugo's
built-in Disqus template or integrate another provider. Treat third-party scripts,
consent, CSP, and visitor privacy as part of the implementation.

## Favicons

Default filenames can be overridden from `static/`, including:

```text
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
site.webmanifest
```

For complete markup control, create `layouts/partials/favicons.html`.

## Icons

Use the partial:

```go-html-template
{{ partial "icon.html" "github" }}
```

Add custom SVG files under `assets/icons/` and reference the filename without the
extension. Use `fill="currentColor"` on SVG paths when the icon should inherit
theme color.

## Extension Partials

| Path | Use |
| --- | --- |
| `layouts/partials/extend-article-link.html` | Add markup after article links |
| `layouts/partials/extend-head.html` | Add cached global head markup/scripts |
| `layouts/partials/extend-head-uncached.html` | Add page-dependent head markup/scripts |
| `layouts/partials/extend-footer.html` | Add footer markup/scripts |

`extend-head.html` is cached. Use the uncached variant only when the output
depends on current-page values or shortcode presence. Hugo's `HasShortcode` can
support conditional asset loading.

Prefer these extension points over copying an entire theme layout. If no extension
point can satisfy the change, inspect and override the smallest same-version
upstream partial.
