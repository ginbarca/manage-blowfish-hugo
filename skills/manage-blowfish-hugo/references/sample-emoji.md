# Sample: Emoji

- Source: https://blowfish.page/samples/emoji/
- Checked: 2026-07-24
- Read when: using emoji or emoji shortcode aliases in content and metadata.

Blowfish supports emoji in titles, menu items, front matter, and article content.
Hugo can replace shortcode-style emoji names during the build when emoji support
is enabled.

Rendering varies by browser, operating system, and font stack. Verify:

- the source syntax is valid in Markdown and YAML/TOML;
- title and menu layout does not shift unexpectedly;
- emoji is not the only carrier of important meaning;
- the selected font stack has suitable glyph coverage;
- CMS slug generation does not accidentally produce unstable emoji URLs.
