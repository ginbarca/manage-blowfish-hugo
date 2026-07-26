# Front Matter

- Source: https://blowfish.page/docs/front-matter/
- Checked: 2026-07-24
- Read when: creating or changing page metadata or per-page presentation.

Blowfish inherits standard Hugo front matter and adds page-level overrides for
theme defaults. Add a Blowfish field only when that page must differ from
`params.*`.

## Content and URL

| Field | Purpose |
| --- | --- |
| `title`, `description`, `summary` | Page identity, metadata, and list summary |
| `date`, `lastmod`, `draft` | Publication state and displayed dates |
| `slug`, `url`, `aliases` | URL behavior |
| `externalUrl` | Make a list item point to a third-party page |
| `menu` | Add the page to a named menu |
| `robots` | Per-page robots directive |
| `excludeFromSearch` | Exclude from search index and sitemap |
| `xml` | Control sitemap inclusion |
| `layout` | Select a layout such as `simple` |

Do not regenerate a published URL from a changed title when an explicit URL,
slug, alias, or bundle path already defines it.

## Author and Series

- `showAuthor`, `showAuthorBottom`
- `authors` as an array of author keys
- `showAuthorsBadges`
- `series` as an array; the docs recommend one series per article
- `series_order` as a number
- `seriesOpened`

## Hero and Background

- `featureimage`, `featureimagecaption`
- `showHero`, `heroStyle`
- `imagePosition`
- `layoutBackgroundBlur`, `layoutBackgroundHeaderSpace`

Current documented hero styles are `basic`, `big`, `background`, and
`thumbAndBackground`. A caption is displayed for the documented `big` hero style.

## Article Presentation

Common overrides include:

- `showBreadcrumbs`, `showDate`, `showDateUpdated`;
- `showEdit`, `editURL`, `editAppendPath`;
- `showHeadingAnchors`, `showPagination`, `invertPagination`;
- `showReadingTime`, `showWordCount`, `showTableOfContents`;
- `showTaxonomies`, `showSummary`, `showComments`;
- `sharingLinks`, `showViews`, `showLikes`;
- `groupByYear`, `externalLinkForceNewTab`.

Preserve YAML/TOML types exactly: booleans must not become strings, arrays must not
become comma-separated text, and `series_order` must remain numeric.

## External Article Pattern

Use `externalUrl` and Hugo build settings so list entries link outward without
generating an unnecessary local page:

```yaml
---
title: "External article"
externalUrl: "https://example.com/article"
showReadingTime: false
build:
  render: "false"
  list: "local"
---
```

Verify the current Hugo build-option syntax before generating this pattern for a
new version.
