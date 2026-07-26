# Thumbnails

- Source: https://blowfish.page/docs/thumbnails/
- Checked: 2026-07-24
- Read when: adding featured thumbnails or article heroes.

## Required Bundle Structure

Convert a standalone page into a leaf bundle:

```text
content/
└── posts/
    └── article-name/
        ├── index.md
        └── featured.jpg
```

Blowfish discovers a bundle image whose filename begins with `feature`. It can
then use that resource in article lists/cards, social metadata, and article hero
presentation.

Do not omit `index.md`. A bundle directory containing only the image is not the
article.

## Hero Display

- Use `article.showHero` for the global default.
- Use front matter `showHero` for a page-specific override.
- Use `heroStyle` only with a value supported by the installed version.
- Override `layouts/partials/hero.html` only when configuration cannot provide the
  required result.

Keep the resource near its content, supply accessible descriptions or captions
where supported, and inspect responsive crops. Avoid committing Hugo-generated
derivatives when the normal asset pipeline can recreate them.
