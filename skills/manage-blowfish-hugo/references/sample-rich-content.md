# Sample: Rich Content

- Source: https://blowfish.page/samples/rich-content/
- Checked: 2026-07-24
- Read when: embedding YouTube, X/Twitter, GitHub Gist, Vimeo, or another
  provider-supported rich item.

## What the Sample Demonstrates

Hugo provides built-in shortcodes and privacy settings for common embeds. The
sample covers YouTube, X/Twitter variants, Gist, and a simple Vimeo embed.

## Implementation Rules

- Confirm whether a shortcode belongs to Hugo or Blowfish before overriding it.
- Use Hugo's privacy configuration to control provider requests, cookies, and
  no-JavaScript rendering where supported.
- Add a meaningful label/title around embeds.
- Expect third-party content to fail under CSP, consent blocking, network
  restrictions, or deleted remote content.
- Keep article reading possible when an embed is unavailable.
- In CMS preview, show a safe placeholder unless the provider embed is explicitly
  allowed; never execute arbitrary imported scripts.
