# Welcome to Blowfish

- Source: https://blowfish.page/docs/welcome/
- Checked: 2026-07-24
- Read when: evaluating whether Blowfish supports a requested site capability.

## Scope

Blowfish is a lightweight Hugo theme built with Tailwind CSS and derived from
Congo. It is intended for blogs, personal sites, portfolios, and other
content-led static sites.

Core capabilities include:

- responsive light and dark appearances;
- multilingual sites, including per-language right-to-left rendering;
- automatic responsive image resizing through Hugo Pipes;
- client-side Fuse.js search;
- responsive tables of contents;
- taxonomies, author metadata, multiple authors, and article series;
- structured metadata, social sharing, RSS, comments extension points, and
  analytics integrations;
- Blowfish shortcodes for rich content, charts, Mermaid, KaTeX, galleries, cards,
  tabs, timelines, and media;
- accessible navigation features such as skip links, keyboard interactions, and
  scroll-to-top behavior.

## Operational Implications

- Keep `outputs.home` compatible with search and feed features.
- Keep images as Hugo resources when optimization and responsive `srcset` output
  are required.
- Configure RTL per language rather than changing the whole site globally.
- Prefer built-in parameters and extension points before overriding templates.
- Verify the current docs for feature availability because the theme evolves
  frequently.
