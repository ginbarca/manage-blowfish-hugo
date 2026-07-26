# Multiple Authors

- Source: https://blowfish.page/docs/multi-author/
- Checked: 2026-07-24
- Read when: attributing an article to one or more non-default authors or creating
  author archive pages.

## Define Authors

Create one JSON file per additional author:

```text
data/authors/
└── author-key.json
```

The filename stem is the key used in front matter. Supported data shown by the
official guide includes `name`, `image`, `bio`, and `social`.

```json
{
  "name": "Author Name",
  "image": "img/author.jpg",
  "bio": "Short biography",
  "social": [
    { "github": "https://github.com/example" }
  ]
}
```

Social object keys resolve theme icons. Verify that each icon exists or add a
project-owned SVG.

## Attribute an Article

```yaml
---
title: "Shared article"
showAuthor: false
authors:
  - "author-key"
  - "second-author"
showAuthorsBadges: true
---
```

`showAuthor` controls the default site author. `authors` renders the additional
author records independently.

## Optional Author Taxonomy

To create author archive pages, define the taxonomy and repeat any defaults that
must remain:

```toml
[taxonomies]
tag = "tags"
category = "categories"
author = "authors"
```

Add author landing content at:

```text
content/authors/<author-key>/_index.md
```

The front matter `authors` keys, data filenames, taxonomy terms, and content
directories must match. Test both the article attribution block and the author
archive.
