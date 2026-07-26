# Copilot review instructions

When reviewing this repository:

- Treat `skills/manage-blowfish-hugo/` as the installable Agent Skill.
- Require valid `name` and `description` front matter in `SKILL.md`.
- Preserve progressive disclosure; put detailed knowledge in the relevant
  reference instead of expanding the core workflow unnecessarily.
- Prefer official Blowfish and Hugo sources for version-sensitive claims.
- Never recommend editing files under a site's vendored `themes/blowfish`
  directory when a Hugo override is available.
- Require English and Vietnamese public documentation to stay semantically
  aligned.
- Flag broken local links, unsafe shell examples, secrets, excessive workflow
  permissions, and use of `pull_request_target` that executes untrusted PR code.
- Expect `npm test` to pass and the audit fixture to continue detecting the
  Hugo Module installation.
- Bot reviews are advisory. Do not approve or merge on behalf of maintainers.

