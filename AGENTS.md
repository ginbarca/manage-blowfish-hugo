# Repository instructions for AI contributors

## Scope

This repository publishes one installable Agent Skill at
`skills/manage-blowfish-hugo/`. Keep repository documentation, governance,
tests, and GitHub automation outside that directory.

## Before editing

1. Read `CONTRIBUTING.md`.
2. Inspect the requested files and current working tree.
3. Identify whether the change affects the skill, public documentation,
   automation, or more than one of these.
4. Use official Blowfish, Hugo, and AI-agent documentation for
   version-sensitive behavior.

## Skill rules

- Keep `SKILL.md` concise and imperative.
- Preserve the `name` and `description` frontmatter contract.
- Put detailed topic knowledge in the directly linked file under `references/`.
- Keep official source links at the top of reference files.
- Never advise editing vendored `themes/blowfish` files when Hugo lookup-order
  overrides can solve the task.
- Preserve existing Hugo dependency methods unless a migration is explicitly
  requested.

## Public documentation

- English is canonical.
- Update the corresponding `.vi.md` file when user-facing meaning changes.
- Keep installation commands safe for existing destination directories.
- Keep Mermaid diagrams compact and valid.

## Automation safety

- Use least-privilege workflow permissions.
- Treat issue bodies, PR metadata, and patches as untrusted data.
- A `pull_request_target` workflow must never check out or execute PR-head code.
- Bots may comment or open pull requests; they must not merge.
- Never add credentials or require a long-lived personal token when
  `GITHUB_TOKEN` is sufficient.

## Validation

Run:

```bash
npm ci
npm test
npx --yes skills add . --list
```

The Skills CLI must discover exactly one skill named
`manage-blowfish-hugo`.

