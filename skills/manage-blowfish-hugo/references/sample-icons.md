# Sample: Icons

- Source: https://blowfish.page/samples/icons/
- Checked: 2026-07-24
- Read when: choosing a built-in icon or adding a custom one.

## Usage

In content:

```markdown
{{< icon "github" >}}
```

In a template:

```go-html-template
{{ partial "icon.html" "github" }}
```

For a custom icon:

```text
assets/icons/my-icon.svg
```

Reference it as `my-icon`. Use `fill="currentColor"` for paths that should inherit
the active theme color.

## Built-in Name Families

The checked sample includes navigation/status icons and many brand/service names,
including GitHub, GitLab, Codeberg, Forgejo, Gitea, LinkedIn, Bluesky, Mastodon,
YouTube, email, RSS, search, sun/moon, heart, tag, location, shield, and warning
icons. Open the current sample before selecting a name; the exact catalog changes
with theme releases.

Validate dimensions, `viewBox`, current-color behavior, light/dark contrast, and
accessible labels where the icon conveys meaning rather than decoration.
