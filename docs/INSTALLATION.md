# Installation

[English](INSTALLATION.md) · [Tiếng Việt](INSTALLATION.vi.md)

## Requirements

- Git.
- Node.js 20+ for the Skills CLI and repository automation.
- Python 3.11+ to run the bundled Blowfish audit tool.
- Hugo Extended for building a real Blowfish website.

The installable directory is:

```text
skills/manage-blowfish-hugo/
```

Install the whole directory. Copying only `SKILL.md` removes the reference
library and audit script.

## Recommended: Skills CLI

The [Skills CLI](https://github.com/vercel-labs/skills) detects supported coding
agents and installs the skill in their expected locations.

```bash
# Inspect what the repository publishes
npx skills add ginbarca/manage-blowfish-hugo --list

# Install in the current project
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo

# Install globally
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --global
```

For a non-interactive Codex install:

```bash
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --agent codex \
  --global \
  --yes
```

For a non-interactive Claude Code install:

```bash
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --agent claude-code \
  --global \
  --yes
```

After installation, verify that the destination contains `SKILL.md`,
`references/`, and `scripts/`. If an agent does not discover the installed
skill, use its manual path below; this also avoids platform-specific symlink
limitations.

## Manual source download

Clone the source once:

```bash
git clone --depth 1 \
  https://github.com/ginbarca/manage-blowfish-hugo.git
cd manage-blowfish-hugo
```

The commands below assume the shell is in the cloned repository.

## OpenAI Codex

Codex discovers repository skills from `.agents/skills/` and personal skills
from `~/.agents/skills/`.

Project installation:

```bash
mkdir -p .agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .agents/skills/manage-blowfish-hugo/
```

Global installation:

```bash
mkdir -p ~/.agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.agents/skills/manage-blowfish-hugo/
```

Verify inside Codex:

```text
/skills
```

Then invoke:

```text
$manage-blowfish-hugo Audit this Hugo repository before making changes.
```

Official reference:
[Build skills for ChatGPT and Codex](https://developers.openai.com/codex/build-skills).

## Claude Code

Claude Code loads project skills from `.claude/skills/` and personal skills
from `~/.claude/skills/`.

Project installation:

```bash
mkdir -p .claude/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .claude/skills/manage-blowfish-hugo/
```

Global installation:

```bash
mkdir -p ~/.claude/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.claude/skills/manage-blowfish-hugo/
```

Invoke:

```text
/manage-blowfish-hugo Audit this Hugo repository before making changes.
```

Claude Code watches an existing skill directory for `SKILL.md` changes. If the
top-level `.claude/skills` directory did not exist when the session started,
open a new session after creating it.

Official reference:
[Extend Claude with skills](https://code.claude.com/docs/en/skills).

## Kiro IDE and Kiro CLI

Kiro uses `.kiro/skills/` for workspace skills and `~/.kiro/skills/` for global
skills.

Workspace installation:

```bash
mkdir -p .kiro/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .kiro/skills/manage-blowfish-hugo/
```

Global installation:

```bash
mkdir -p ~/.kiro/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.kiro/skills/manage-blowfish-hugo/
```

The default Kiro agent discovers both locations. A custom agent must include
the skill resources:

```json
{
  "name": "my-agent",
  "resources": [
    "skill://.kiro/skills/*/SKILL.md",
    "skill://~/.kiro/skills/*/SKILL.md"
  ]
}
```

Invoke:

```text
/manage-blowfish-hugo Audit this Hugo repository before making changes.
```

Official references:
[Kiro IDE Agent Skills](https://kiro.dev/docs/skills/) and
[Kiro CLI Agent Skills](https://kiro.dev/docs/cli/skills/).

## Gemini CLI

Gemini CLI discovers project skills under `.agents/skills/`.

```bash
mkdir -p .agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .agents/skills/manage-blowfish-hugo/
gemini
```

Inside Gemini CLI:

```text
/skills
```

Then ask:

```text
Use manage-blowfish-hugo to audit this repository and explain any warnings.
```

Official reference:
[Use Agent Skills with Gemini CLI](https://codelabs.developers.google.com/gemini-cli/how-to-create-agent-skills-for-gemini-cli).

## GitHub Copilot

GitHub Copilot coding agent and code review can load project skills from
`.github/skills/`, `.claude/skills/`, or `.agents/skills/`. Copilot CLI also
supports personal skills under `~/.copilot/skills/` or `~/.agents/skills/`.

Project installation:

```bash
mkdir -p .github/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .github/skills/manage-blowfish-hugo/
```

Personal Copilot CLI installation:

```bash
mkdir -p ~/.copilot/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.copilot/skills/manage-blowfish-hugo/
```

Inside Copilot CLI:

```text
/skills reload
/skills info manage-blowfish-hugo
/manage-blowfish-hugo Audit this Hugo repository.
```

Official references:
[Add skills to GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
and
[Add skills to Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

## Windows PowerShell example

Replace the destination with the agent-specific path above:

```powershell
git clone --depth 1 https://github.com/ginbarca/manage-blowfish-hugo.git
New-Item -ItemType Directory -Force `
  "$HOME\.agents\skills\manage-blowfish-hugo" | Out-Null
Copy-Item -Recurse -Force `
  ".\manage-blowfish-hugo\skills\manage-blowfish-hugo\*" `
  "$HOME\.agents\skills\manage-blowfish-hugo"
```

## Updating

With the Skills CLI:

```bash
npx skills update manage-blowfish-hugo
```

For a copied manual installation, pull the repository and copy the skill
directory to the same destination again:

```bash
git pull --ff-only
```

Review upstream changes before replacing a customized local copy.

## Uninstalling

Use the Skills CLI if that is how the skill was installed:

```bash
npx skills remove manage-blowfish-hugo
```

For a manual installation, delete only the exact
`manage-blowfish-hugo` directory under the agent's skill location.

## Troubleshooting

### The skill is not listed

1. Confirm the filename is exactly `SKILL.md`.
2. Confirm `name: manage-blowfish-hugo` exists in its YAML front matter.
3. Confirm the full skill directory is directly beneath the agent's skill
   location.
4. Reload skills when the agent supports it.
5. Use the agent's native project directory rather than relying on a symlink.

### The audit script cannot run

Check Python:

```bash
python3 --version
python3 skills/manage-blowfish-hugo/scripts/audit_blowfish_project.py --help
```

### The AI cannot find a reference

Confirm `references/` is beside `SKILL.md`; references are resolved relative to
the skill directory.
