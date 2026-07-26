# Configuration

- Source: https://blowfish.page/docs/configuration/
- Checked: 2026-07-24
- Read when: changing Hugo settings, languages, menus, theme behavior, images,
  article/list/taxonomy presentation, analytics, ads, or integrations.

## Contents

- [Configuration Files](#configuration-files)
- [Site and Language](#site-and-language)
- [Global Theme Parameters](#global-theme-parameters)
- [Page Families](#page-families)
- [Integrations](#integrations)
- [Validation Rules](#validation-rules)

## Configuration Files

Blowfish ships TOML examples, but Hugo-compatible YAML or JSON can be used when
the repository already uses that format. Prefer the site-owned
`config/_default/` directory:

| File | Responsibility |
| --- | --- |
| `hugo.*` | Base URL, outputs, language default, robots, pagination, summaries |
| `languages.<code>.*` | Localized title, locale, ISO code, logos, author, copyright |
| `menus.<code>.*` | Main, footer, and sub-navigation entries |
| `params.*` | Blowfish global and component behavior |
| `markup.*` | Goldmark and syntax-highlighting behavior needed by the theme |
| `module.*` | Hugo Module imports |

Keep `markup` configuration present. Search requires the expected home JSON output,
and code-copy behavior requires compatible highlighting settings.

## Site and Language

Important site values include:

- `theme = "blowfish"` for non-module installations; omit for Hugo Modules;
- `baseURL` set to the full deployed root;
- `defaultContentLanguage` matching a language config;
- `outputs.home` retaining HTML, RSS, and JSON when theme features require them;
- `enableRobotsTXT`, pagination size, summary length, permalinks, and taxonomies.

Each language file uses a lowercase `locale` that matches its filename. Use
case-sensitive `params.isoCode` for HTML metadata. Other language values include
`label`, `weight`, `title`, `displayName`, `rtl`, `dateFormat`, `logo`,
`secondaryLogo`, `description`, `copyright`, and the author block.

Client-side language redirect is optional and stores a manual choice in
`localStorage`. By default it is disabled and browser redirects are limited to
home pages. Configure its storage key, fallback language, and stored-choice
behavior deliberately.

## Global Theme Parameters

Common global controls:

| Concern | Parameters |
| --- | --- |
| Appearance | `colorScheme`, `defaultAppearance`, `autoSwitchAppearance` |
| Navigation/accessibility | `header.layout`, `enableA11y`, `enableStyledScrollbar` |
| Search/code | `enableSearch`, `enableCodeCopy` |
| Content sources | `mainSections`, `replyByEmail` |
| Images | `defaultBackgroundImage`, `defaultFeaturedImage`, `defaultSocialImage`, `imagePosition`, `hotlinkFeatureImage` |
| Image processing | `disableImageZoom`, `disableImageOptimization`, `disableImageOptimizationMD`, `backgroundImageWidth` |
| TOC | `smartTOC`, `smartTOCHideUnfocusedChildren` |
| Assets | `fingerprintAlgorithm` |
| SEO | `robots`, `seo.metaDescriptionOrder`, `enableStructuredBreadcrumbs` |

Do not enable structured breadcrumbs when content paths and public URLs diverge
in a way that would make the hierarchy false.

## Page Families

### Homepage

`homepage.layout` accepts `profile`, `page`, `hero`, `background`, `card`, or
`custom`. Related controls include `homepageImage`, recent items, “more” link
destination, card view, full-width cards, background blur, and hero filtering.

### Article

Article defaults cover date and updated date, author placement, hero visibility
and style, breadcrumbs, draft label, edit link, series state, heading anchors,
pagination, reading time, TOC, related content, taxonomies, word count, comments,
sharing links, Zen mode, external link target, views, and likes.

Current hero-style values are `basic`, `big`, `background`, and
`thumbAndBackground`. Only apply them when hero display is enabled.

### List, Taxonomy, and Term

These page families have separate controls for hero, breadcrumbs, TOC, cards,
views, likes, summaries, grouping, and item width. Do not assume that setting
`article.*` changes list, taxonomy, or term pages.

Sitemap exclusions are controlled separately through `sitemap.excludedKinds`.

## Integrations

Configuration sections documented by Blowfish include:

- Firebase application identifiers for views and likes;
- Fathom site/domain;
- Umami website ID, domain, allowed domains, script name, and event tracking;
- Seline token and event tracking;
- Buy Me a Coffee widget options;
- Google, Bing, Pinterest, Yandex, and Fediverse verification;
- RSSNext identifiers;
- Google AdSense publisher ID.

Browser-visible Firebase configuration is not a server secret. Security depends
on authentication and Firestore rules. Never place private credentials in Hugo
configuration or public assets.

## Validation Rules

- Match `defaultContentLanguage`, language filenames, `locale`, ISO code, menu
  filenames, and localized content.
- Keep `mainSections` an array.
- Keep the JSON home output when search is enabled.
- Check light/dark logos and appearance behavior.
- Verify image paths against `assets/`, page resources, `static/`, or external URL
  semantics used by that parameter.
- Test page-family settings on a representative home, list, term, taxonomy, and
  article page.
- Re-open the official table before introducing a parameter that is not already
  present in the project.
