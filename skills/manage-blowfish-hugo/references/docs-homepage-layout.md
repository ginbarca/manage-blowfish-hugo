# Homepage Layout

- Source: https://blowfish.page/docs/homepage-layout/
- Checked: 2026-07-24
- Read when: selecting or customizing the homepage.

## Built-in Layouts

Set `homepage.layout` in `params.toml`.

| Value | Use for | Content and image behavior |
| --- | --- | --- |
| `profile` | Personal site or author-led blog | Author identity first; home Markdown follows |
| `page` | Content-led landing page | Renders the Markdown from `content/_index.md` |
| `hero` | Author identity plus a prominent image | Requires `homepage.homepageImage`; Markdown follows |
| `background` | Image-backed author presentation | Requires `homepage.homepageImage`; Markdown follows |
| `card` | Page content with a card image | Requires `homepage.homepageImage` |
| `custom` | Bespoke layout | Requires `layouts/partials/home/custom.html` |

Local homepage images should normally be discoverable through the asset pipeline.
External image URLs are also supported by the documented parameter, but they do
not receive the same local Hugo processing guarantees.

## Homepage Content

Create `content/_index.md` for editable Markdown content. Do not hard-code
editorial copy in the layout unless it is genuinely structural.

## Custom Layout

```toml
[homepage]
layout = "custom"
```

Create:

```text
layouts/partials/home/custom.html
```

The custom partial can use Hugo templates, HTML, and classes already available in
the compiled Blowfish stylesheet. Inspect the installed version before calling
theme partials such as `recent-articles/main.html`, because partial context and
signatures can change.

## Recent Articles and Cards

- Enable recent content with `homepage.showRecent`.
- Select source sections with `mainSections`, always as an array.
- Control the item count and optional “more” link in homepage parameters.
- Use `homepage.cardView` and `homepage.cardViewScreenWidth` for a card gallery.
- List pages have separate `list.cardView` and `list.cardViewScreenWidth` values.

Featured images beginning with `feature` in leaf bundles can populate recent-card
thumbnails. Test image crops at desktop and mobile widths.
