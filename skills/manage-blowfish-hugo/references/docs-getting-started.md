# Getting Started

- Source: https://blowfish.page/docs/getting-started/
- Checked: 2026-07-24
- Read when: performing the first site configuration, organizing content, setting
  menus or taxonomies, or adding featured/background images.

## Contents

- [Initial Configuration](#initial-configuration)
- [Colour Scheme](#colour-scheme)
- [Content Organization](#content-organization)
- [Taxonomies](#taxonomies)
- [Menus](#menus)
- [Featured and Background Images](#featured-and-background-images)

## Initial Configuration

Use the split configuration in `config/_default/`. Set the production `baseURL`
and the primary language identifier in `hugo.toml`. Keep these aligned:

- site default language;
- `languages.<code>.toml`;
- `menus.<code>.toml`;
- localized content paths.

The official starter shows an author block in the language config:

```toml
title = "My website"

[params.author]
name = "Author name"
image = "img/author.jpg"
headline = "Short headline"
bio = "Short bio"
links = [
  { github = "https://github.com/example" }
]
```

Place the author image under `assets/` when using a local resource. Link order is
the array order.

## Colour Scheme

Set `colorScheme` in `params.toml`. Built-in choices listed by the checked page
include `autumn`, `avocado`, `bloody`, `blowfish`, `congo`, `fire`, `forest`,
`github`, `marvel`, `neon`, `noir`, `one-light`, `princess`, `slate`, and
`terminal`. Confirm the installed version before relying on a specific scheme.

## Content Organization

Blowfish does not require a section name. Use Hugo branch and leaf bundles:

```text
content/
├── _index.md
├── about.md
└── posts/
    ├── _index.md
    ├── first-post.md
    └── bundled-post/
        ├── index.md
        └── featured.jpg
```

Use a leaf bundle when the page needs co-located media. Keep `index.md` without
an underscore for the leaf and `_index.md` for the home, section, taxonomy, or
term branch.

## Taxonomies

Hugo's default tags and categories work. If defining a custom taxonomy, use
singular-to-plural mapping:

```toml
[taxonomies]
topic = "topics"
```

Defining a `[taxonomies]` table replaces defaults, so repeat every taxonomy the
site must retain.

## Menus

Blowfish supports `main`, `footer`, and `subnavigation` menus. Use `pageRef` for
internal content and taxonomy links; use `url` for external links. `pre` can name
an icon. Assign `identifier` when multiple icon-only items would otherwise
collide.

```toml
[[main]]
name = "Blog"
pageRef = "posts"
weight = 10

[[main]]
name = "GitHub"
pre = "github"
url = "https://github.com/example"
weight = 20
```

Items sort by ascending `weight`, then name. Nested entries use `parent` and are
supported in the main menu, not the footer. `subnavigation` creates a second
navigation row.

## Featured and Background Images

- Put an image beginning with `feature` in an article bundle for thumbnail and
  social-card discovery.
- Put an image beginning with `background` in the bundle when the background
  hero should differ from the featured image.
- Prefer `.png` or `.jpg` unless the project has a reason to use another
  supported format.
