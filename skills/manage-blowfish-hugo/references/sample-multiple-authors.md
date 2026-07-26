# Sample: Multiple Authors

- Source: https://blowfish.page/samples/multiple-authors/
- Checked: 2026-07-24
- Read when: building or visually checking a multi-author article.

## What the Sample Demonstrates

- One article can render multiple author cards.
- Each author can show an image, name, short role/bio, and social links.
- Multiple author names can appear in article metadata.
- The default site author can be disabled while selected `authors` remain.

## Reproduction Fixture

1. Create two records in `data/authors/`.
2. Assign both keys through the page's `authors` array.
3. Set `showAuthor: false` to isolate the additional-author behavior.
4. Optionally enable `showAuthorsBadges` and the author taxonomy.
5. Verify missing images/social icons do not break article layout.

Read [docs-multi-author.md](docs-multi-author.md) for the complete data and
taxonomy contract.
