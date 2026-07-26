# Sample: Thumbnail

- Source: https://blowfish.page/samples/thumbnail_sample/
- Checked: 2026-07-24
- Read when: reproducing or testing feature-image discovery.

## Minimal Fixture

```text
content/
└── awesome-article/
    ├── index.md
    └── featured.png
```

The image filename begins with `feature`, allowing Blowfish to discover it as the
article's featured resource. The same resource can appear in lists/cards and
social embed metadata.

Test:

- the article bundle is a directory with `index.md`;
- the image appears in list/card and hero contexts that are enabled;
- Open Graph/Twitter metadata resolves the deployed URL;
- local image processing emits valid responsive resources;
- the social image remains reachable when hosted under a subpath.
