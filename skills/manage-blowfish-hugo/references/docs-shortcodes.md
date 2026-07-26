# Shortcodes

- Source: https://blowfish.page/docs/shortcodes/
- Checked: 2026-07-24
- Read when: adding, validating, previewing, or implementing Blowfish shortcodes.

## Contents

- [Rules](#rules)
- [Content and Navigation](#content-and-navigation)
- [Callouts and Structure](#callouts-and-structure)
- [Media and Visualization](#media-and-visualization)
- [Remote Content and Cards](#remote-content-and-cards)
- [Representative Syntax](#representative-syntax)
- [CMS Requirements](#cms-requirements)

## Rules

- Verify spelling, parameter case, delimiter style, and nesting against the
  installed Blowfish version.
- Use `{{< ... >}}` for normal shortcode content. Use `{{% ... %}}` when the
  shortcode explicitly requires Markdown rendering through the outer delimiter,
  such as mixed LTR/RTL content.
- Treat remote import/card shortcodes as build-time network dependencies.
- Prefer page resources for local media so Hugo can process them.
- Test nested shortcodes. Components such as `tabs`, `accordion`, and `timeline`
  have child shortcodes and may require `md=false` when the child contains another
  shortcode.

## Content and Navigation

| Shortcode | Purpose | Important inputs |
| --- | --- | --- |
| `article` | Embed an internal article card | `link`, `showSummary`, `compactSummary` |
| `button` | Render a call-to-action link | `pageRef` or `href`, optional `target`, `rel` |
| `lead` | Emphasize opening Markdown | Wrapped content |
| `list` | List recent/filter-matched pages | `limit`, optional `title`, `cardView`, `where`, `value` |
| `badge` | Inline metadata badge | Wrapped content |
| `keyword`, `keywordList` | Highlight and group keywords | Optional `icon`, wrapped content |
| `icon` | Render a theme SVG icon | Positional icon name |
| `email` | Obfuscated mail link | Email, display text, optional subject |
| `ltr`, `rtl` | Override direction for a content region | Wrapped Markdown, normally `%` delimiters |

For `article`, supply the target `.RelPermalink`. Include the deployment subpath
when the site is hosted below a domain root. For internal `button` links, prefer
`pageRef` so Hugo resolves language and trailing-slash behavior.

## Callouts and Structure

| Feature | Syntax or child | Notes |
| --- | --- | --- |
| Alert | `alert` | Optional icon and CSS color parameters; body is Markdown |
| Admonition | Markdown `> [!TYPE]` render hook | GitHub and Obsidian-style types; may be collapsible |
| Accordion | `accordion` + `accordionItem` | Modes control single or multiple open items |
| Tabs | `tabs` + `tab` | Supports grouping, default label, icons, and Markdown mode |
| Timeline | `timeline` + `timelineItem` | Item icon, header, badge, subheader, and Markdown mode |
| Swatches | `swatches` | Up to three color values |
| Typewriter | `typeit` | Tag, class, speed, delays, line behavior, visibility, looping |

Admonition types include GitHub-style `NOTE`, `TIP`, `IMPORTANT`, `WARNING`,
`CAUTION` and documented Obsidian-compatible aliases.

## Media and Visualization

| Shortcode | Purpose | Important behavior |
| --- | --- | --- |
| `figure` | Responsive image/figure | Lookup: page resource, `assets/`, then `static/`; remote images are not processed |
| `gallery` | Responsive image grid | Use documented `grid-w*` classes or `figureClass` |
| `carousel` | Interactive image carousel | Image match expression, aspect ratio, interval, optional caption mapping |
| `video` | Responsive HTML video | Local/remote source, poster, caption, playback flags, ratio and fit |
| `youtubeLite` | Lightweight YouTube embed | Video ID, label, optional player parameters |
| `chart` | Chart.js visualization | Chart.js configuration inside the shortcode |
| `mermaid` | Mermaid diagram | Mermaid source inside the shortcode |
| `katex` | Enable KaTeX on the page | Include once, then use inline or block delimiters |

`figure` accepts alt text, caption, CSS classes, wrapper classes, links, targets,
zoom control, and a fallback to Hugo's default behavior. Standard Markdown images
also receive Blowfish processing where supported.

## Remote Content and Cards

| Shortcode | Input |
| --- | --- |
| `codeimporter` | Remote code URL, type, optional line range |
| `mdimporter` | Remote Markdown URL |
| `gist` | GitHub user, gist ID, optional filename |
| `github` | `owner/repository`, optional thumbnail |
| `gitlab` | Numeric project ID, optional instance base URL |
| `codeberg` | `owner/repository` |
| `forgejo` | Server and `owner/repository` |
| `gitea` | Server and `owner/repository` |
| `ansible` | Exactly one Galaxy role or collection |
| `huggingface` | Exactly one model or dataset |

Remote content can change independently and can fail in restricted or offline
builds. Do not use an importer for security-sensitive or reproducibility-critical
content without pinning and validation.

## Representative Syntax

```markdown
{{< alert icon="triangle-exclamation" >}}
**Review this operation first.**
{{< /alert >}}

{{< button pageRef="docs/getting-started" >}}Get started{{< /button >}}

{{< figure src="featured.jpg" alt="Description" caption="Caption" >}}

{{< tabs group="install" default="Linux" >}}
  {{< tab label="Linux" >}}Use the Linux command.{{< /tab >}}
  {{< tab label="Windows" >}}Use the Windows command.{{< /tab >}}
{{< /tabs >}}

{{< mermaid >}}
graph TD
  A --> B
{{< /mermaid >}}

{{< katex >}}
Inline: \(a^2+b^2=c^2\)
```

## CMS Requirements

- Preserve raw shortcode source and typed parameters on round trips.
- Parse nested shortcode boundaries without flattening them into preview HTML.
- Maintain a preview registry for commonly used components, but use Hugo output
  as the fidelity check.
- Load feature scripts/styles conditionally in preview when the original theme
  does so.
- Create a fixture for each supported shortcode and compare local preview with a
  Hugo-rendered page.
