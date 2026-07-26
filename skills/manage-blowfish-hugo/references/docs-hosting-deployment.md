# Hosting and Deployment

- Source: https://blowfish.page/docs/hosting-deployment/
- Checked: 2026-07-24
- Read when: preparing or diagnosing GitHub Pages, Netlify, Render, Cloudflare
  Pages, shared hosting, VPS, or private-server deployment.

## Common Requirements

- Set `baseURL` to the full public site root, including a project subpath.
- Use the repository's established production command; a common baseline is
  `hugo --gc --minify`.
- Pin a Hugo Extended version compatible with the installed Blowfish version.
- Fetch submodules or Hugo Modules consistently in local builds and CI.
- Publish `public/` unless the project deliberately changes `publishDir`.
- Do not deploy unless the user explicitly asks.

Blowfish uses relative URLs broadly, but a correct `baseURL` is still necessary
for canonical URLs, feeds, metadata, and subpath behavior.

## GitHub Pages

Inspect existing workflows before adding one. A current workflow generally needs:

1. checkout of the source revision, including submodules when applicable;
2. setup of a compatible Hugo Extended binary;
3. any project-owned CSS/JS/content generation;
4. a production Hugo build using the final Pages URL;
5. Pages artifact upload and deployment with minimal permissions.

The provider actions in the checked Blowfish page are examples and can age.
Verify current GitHub Pages guidance and action versions instead of copying those
versions literally.

## Netlify and Render

Configure:

- build command;
- `public` output directory;
- production URL/base URL;
- compatible Hugo and Go versions;
- submodule or module fetching.

Do not run an unbounded `hugo mod get -u` on every production build when
reproducibility matters. Record dependency updates in source control.

## Cloudflare Pages

Follow Cloudflare's current Hugo deployment guide. If the light/dark appearance
switcher breaks or flashes, check script reordering and disable Rocket Loader
before rewriting theme JavaScript.

## Shared Hosting or Server

Build locally or in CI, then transfer the contents of `public/` to the configured
web root. Ensure `baseURL` includes any subdomain or subfolder.

## Validation

- Build with the exact production environment and URL.
- Inspect canonical links, asset URLs, search index, RSS, sitemap, and social
  metadata.
- Test a nested page and an image on the deployed subpath.
- Check the provider's deployment status and logs before claiming success.
