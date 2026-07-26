# Sample: Markdown

- Source: https://blowfish.page/samples/markdown/
- Checked: 2026-07-24
- Read when: checking typography, Markdown rendering, or CMS preview fidelity.

## Coverage

The sample exercises:

- heading levels;
- paragraphs and links;
- blockquotes with and without attribution;
- tables with inline formatting;
- plain and highlighted code blocks;
- ordered, unordered, and nested lists;
- abbreviation, subscript, superscript, keyboard, and marked text;
- Markdown images with alt text and captions;
- optional Markdown attributes for custom image sizing.

## Fixture Guidance

Create one representative page with every element above. Compare:

- Hugo output versus CMS preview;
- light and dark appearance;
- desktop and narrow mobile layout;
- long lines and overflow in tables/code;
- heading anchors and TOC nesting;
- image alt/caption output;
- keyboard focus and text contrast.

Markdown attributes require compatible Goldmark configuration. Do not make a CMS
emit raw HTML merely to reproduce an attribute syntax that Hugo can preserve.
