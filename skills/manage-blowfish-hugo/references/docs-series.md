# Series

- Source: https://blowfish.page/docs/series/
- Checked: 2026-07-24
- Read when: grouping ordered articles into a navigable series.

## Configure the Taxonomy

```toml
[taxonomies]
tag = "tags"
category = "categories"
author = "authors"
series = "series"
```

Repeat every taxonomy that must remain because defining the table replaces Hugo's
defaults.

## Mark Articles

```yaml
series:
  - "Documentation"
series_order: 3
```

Although `series` is an array, the official guide recommends assigning one series
per article. `series_order` determines navigation order and must remain numeric.

## Display Behavior

Membership automatically adds the series module on the article page. Control its
initial open state through global `article.seriesOpened` or page-level
`seriesOpened`.

Validate duplicate/missing order values, the series term page, previous/next
navigation, and multilingual term names before publishing.
