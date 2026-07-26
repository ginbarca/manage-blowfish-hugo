# Publishing to GitHub

[English](PUBLISHING.md) · [Tiếng Việt](PUBLISHING.vi.md)

This repository is preconfigured for:

```text
https://github.com/ginbarca/manage-blowfish-hugo
```

If you choose another owner or repository name, replace this value in badges,
installation commands, CODEOWNERS, funding links, and security links before the
first push.

## 1. Verify locally

```bash
npm ci
npm test
npx --yes skills add . --list
```

The final command must discover exactly one skill:
`manage-blowfish-hugo`.

## 2. Create the repository

With GitHub CLI:

```bash
git init
git branch -M main
git add .
git commit -m "feat: publish Manage Blowfish Hugo skill"
gh auth login
gh repo create ginbarca/manage-blowfish-hugo \
  --public \
  --source=. \
  --remote=origin \
  --push
```

Alternatively, create an empty public repository on GitHub, then follow the
push instructions shown by GitHub.

## 3. Enable community features

Open **Settings → General → Features**:

- Enable Issues.
- Enable Discussions if you want a support/community forum.
- Keep Wikis disabled unless they will be actively maintained; repository docs
  are already versioned.

Open **Settings → Code security and analysis**:

- Enable secret scanning.
- Enable push protection.
- Enable dependency graph and Dependabot alerts.
- Enable private vulnerability reporting.

## 4. Configure Actions and bots

Follow [Repository automation](AUTOMATION.md). In particular:

- Allow Actions to create pull requests.
- Enable GitHub Models access.
- Keep default workflow permissions read-only.
- Confirm the first CI run passes.
- Run **Upstream Sync** and **Contributors Sync** manually once.

## 5. Protect `main`

Create a branch ruleset:

- Target `main`.
- Require a pull request before merging.
- Require at least one approval.
- Dismiss stale approvals after new commits.
- Require the `Validate` status check.
- Block force pushes and branch deletion.

Do not require the advisory AI review comment as a status check; inference can
occasionally be unavailable.

## 6. Enable GitHub Sponsors

1. Apply at <https://github.com/sponsors>.
2. Complete the sponsor profile for `ginbarca`.
3. Publish at least one sponsorship tier.
4. Keep `.github/FUNDING.yml` on the default branch.

GitHub displays the Sponsor button only after the account is eligible. The
Buy Me a Coffee fallback is already configured.

## 7. Create the first release

After CI passes:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The Release workflow creates:

- `manage-blowfish-hugo-v1.0.0.zip`
- `manage-blowfish-hugo-v1.0.0.zip.sha256`
- Generated release notes

## 8. Final public check

- README badges resolve.
- `npx skills add ginbarca/manage-blowfish-hugo --list` finds one skill.
- Issue forms open correctly.
- Sponsor button appears or the fallback link works.
- CI and bot permissions match the automation guide.
- `main` is protected.

