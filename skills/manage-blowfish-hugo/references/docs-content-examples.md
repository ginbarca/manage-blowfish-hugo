# Content Examples

- Source: https://blowfish.page/docs/content-examples/
- Checked: 2026-07-24
- Read when: modeling Hugo branches, leaves, taxonomies, external items, simple
  pages, or section-specific layouts.

## Branch Bundles

Branch content uses `_index.md`.

| Page | Content | Default layout |
| --- | --- | --- |
| Homepage | `content/_index.md` | `layouts/index.html` |
| Section list | `content/<section>/_index.md` | `layouts/_default/list.html` |
| Taxonomy list | `content/<taxonomy>/_index.md` | `layouts/_default/taxonomy.html` |
| Taxonomy term | `content/<taxonomy>/<term>/_index.md` | `layouts/_default/term.html` |

Branch front matter overrides defaults for that page. Use `cascade` on a section
branch to pass presentation values to descendants without repeating them.

## Leaf Pages

Leaf content uses either a standalone `<name>.md` or a bundle
`<name>/index.md`. Prefer a bundle whenever the page owns images or other
resources:

```text
content/projects/
├── _index.md
├── first-project.md
└── bundled-project/
    ├── index.md
    └── project.jpg
```

Many Blowfish media and shortcode features expect page resources to be bundled
with the page.

## Taxonomies

Hugo taxonomies use a singular-to-plural mapping:

```toml
[taxonomies]
animal = "animals"
```

After defining a custom table, repeat defaults such as tags and categories if the
site still needs them. Add terms to page front matter and create optional branch
content for the taxonomy or individual term.

## External Items

An external content item can appear in lists but direct to a third-party URL. Set
`externalUrl`, usually disable reading time, and use current Hugo build options to
avoid rendering a redundant local page. Blowfish includes an `external` archetype
that can be invoked with:

```bash
hugo new -k external posts/my-post.md
```

## Simple Pages

Set `layout: "simple"` for a full-width Markdown page without the usual article
features. Breadcrumbs and sharing behavior remain configurable.

## Overrides and Section Layouts

A site-owned path overrides the matching theme layout. For example:

```text
layouts/_default/single.html
```

overrides the default leaf template. To customize only one section:

```text
layouts/projects/list.html
```

Before creating an override:

1. Inspect the same file in the installed Blowfish version.
2. Copy the smallest viable template.
3. Preserve base blocks, context, partial calls, accessibility, and assets.
4. Use front matter as the data contract for editable project entries.
5. Recompare the override after a theme upgrade.
