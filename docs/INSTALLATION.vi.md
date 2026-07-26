# Hướng dẫn cài đặt

[English](INSTALLATION.md) · [Tiếng Việt](INSTALLATION.vi.md)

## Yêu cầu

- Git.
- Node.js 20+ để dùng Skills CLI và automation của repository.
- Python 3.11+ để chạy công cụ audit Blowfish đi kèm.
- Hugo Extended khi build website Blowfish thực tế.

Thư mục cần cài là:

```text
skills/manage-blowfish-hugo/
```

Hãy cài cả thư mục. Nếu chỉ copy `SKILL.md`, AI sẽ thiếu thư viện reference và
script audit.

## Khuyến nghị: Skills CLI

[Skills CLI](https://github.com/vercel-labs/skills) tự nhận diện coding agent
được hỗ trợ và cài skill vào vị trí phù hợp.

```bash
# Xem repository cung cấp những skill nào
npx skills add ginbarca/manage-blowfish-hugo --list

# Cài trong project hiện tại
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo

# Cài global
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --global
```

Cài Codex không cần tương tác:

```bash
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --agent codex \
  --global \
  --yes
```

Cài Claude Code không cần tương tác:

```bash
npx skills add ginbarca/manage-blowfish-hugo \
  --skill manage-blowfish-hugo \
  --agent claude-code \
  --global \
  --yes
```

Sau khi cài, kiểm tra thư mục đích có `SKILL.md`, `references/` và `scripts/`.
Nếu AI không nhận skill, hãy dùng đường dẫn cài thủ công bên dưới; cách này cũng
tránh lỗi symlink tùy nền tảng.

## Tải source để cài thủ công

```bash
git clone --depth 1 \
  https://github.com/ginbarca/manage-blowfish-hugo.git
cd manage-blowfish-hugo
```

Các lệnh dưới đây giả định terminal đang ở repository vừa clone.

## OpenAI Codex

Codex tìm skill theo project trong `.agents/skills/` và skill cá nhân trong
`~/.agents/skills/`.

Cài cho project:

```bash
mkdir -p .agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .agents/skills/manage-blowfish-hugo/
```

Cài global:

```bash
mkdir -p ~/.agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.agents/skills/manage-blowfish-hugo/
```

Kiểm tra trong Codex:

```text
/skills
```

Sau đó gọi:

```text
$manage-blowfish-hugo Hãy audit repository Hugo này trước khi thay đổi.
```

Tài liệu chính thức:
[Build skills for ChatGPT and Codex](https://developers.openai.com/codex/build-skills).

## Claude Code

Claude Code nạp skill project từ `.claude/skills/` và skill cá nhân từ
`~/.claude/skills/`.

Cài cho project:

```bash
mkdir -p .claude/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .claude/skills/manage-blowfish-hugo/
```

Cài global:

```bash
mkdir -p ~/.claude/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.claude/skills/manage-blowfish-hugo/
```

Gọi skill:

```text
/manage-blowfish-hugo Hãy audit repository Hugo này trước khi thay đổi.
```

Claude Code theo dõi thay đổi `SKILL.md` trong thư mục skill đã tồn tại. Nếu
`.claude/skills` chưa tồn tại khi session bắt đầu, hãy mở session mới sau khi
tạo thư mục.

Tài liệu chính thức:
[Extend Claude with skills](https://code.claude.com/docs/en/skills).

## Kiro IDE và Kiro CLI

Kiro dùng `.kiro/skills/` cho workspace và `~/.kiro/skills/` cho global.

Cài cho workspace:

```bash
mkdir -p .kiro/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .kiro/skills/manage-blowfish-hugo/
```

Cài global:

```bash
mkdir -p ~/.kiro/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.kiro/skills/manage-blowfish-hugo/
```

Default agent của Kiro tự tìm cả hai vị trí. Custom agent phải khai báo resource
skill:

```json
{
  "name": "my-agent",
  "resources": [
    "skill://.kiro/skills/*/SKILL.md",
    "skill://~/.kiro/skills/*/SKILL.md"
  ]
}
```

Gọi skill:

```text
/manage-blowfish-hugo Hãy audit repository Hugo này trước khi thay đổi.
```

Tài liệu chính thức:
[Kiro IDE Agent Skills](https://kiro.dev/docs/skills/) và
[Kiro CLI Agent Skills](https://kiro.dev/docs/cli/skills/).

## Gemini CLI

Gemini CLI tìm project skill trong `.agents/skills/`.

```bash
mkdir -p .agents/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .agents/skills/manage-blowfish-hugo/
gemini
```

Trong Gemini CLI:

```text
/skills
```

Sau đó hỏi:

```text
Hãy dùng manage-blowfish-hugo để audit repository này và giải thích cảnh báo.
```

Tài liệu chính thức:
[Use Agent Skills with Gemini CLI](https://codelabs.developers.google.com/gemini-cli/how-to-create-agent-skills-for-gemini-cli).

## GitHub Copilot

GitHub Copilot coding agent và code review có thể nạp project skill từ
`.github/skills/`, `.claude/skills/` hoặc `.agents/skills/`. Copilot CLI cũng
hỗ trợ skill cá nhân trong `~/.copilot/skills/` hoặc `~/.agents/skills/`.

Cài cho project:

```bash
mkdir -p .github/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. .github/skills/manage-blowfish-hugo/
```

Cài cá nhân cho Copilot CLI:

```bash
mkdir -p ~/.copilot/skills/manage-blowfish-hugo
cp -R skills/manage-blowfish-hugo/. ~/.copilot/skills/manage-blowfish-hugo/
```

Trong Copilot CLI:

```text
/skills reload
/skills info manage-blowfish-hugo
/manage-blowfish-hugo Hãy audit repository Hugo này.
```

Tài liệu chính thức:
[Add skills to GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
và
[Add skills to Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

## Ví dụ cho Windows PowerShell

Đổi thư mục đích theo AI tương ứng ở trên:

```powershell
git clone --depth 1 https://github.com/ginbarca/manage-blowfish-hugo.git
New-Item -ItemType Directory -Force `
  "$HOME\.agents\skills\manage-blowfish-hugo" | Out-Null
Copy-Item -Recurse -Force `
  ".\manage-blowfish-hugo\skills\manage-blowfish-hugo\*" `
  "$HOME\.agents\skills\manage-blowfish-hugo"
```

## Cập nhật

Nếu cài bằng Skills CLI:

```bash
npx skills update manage-blowfish-hugo
```

Nếu cài bằng cách copy, hãy pull repository rồi copy lại thư mục skill vào đúng
vị trí cũ:

```bash
git pull --ff-only
```

Luôn review thay đổi upstream trước khi ghi đè một bản local đã tùy biến.

## Gỡ cài đặt

Nếu đã cài bằng Skills CLI:

```bash
npx skills remove manage-blowfish-hugo
```

Nếu cài thủ công, chỉ xóa đúng thư mục `manage-blowfish-hugo` bên trong thư mục
skill của AI.

## Xử lý lỗi

### Không thấy skill trong danh sách

1. Kiểm tra tên file phải chính xác là `SKILL.md`.
2. Kiểm tra YAML front matter có `name: manage-blowfish-hugo`.
3. Kiểm tra cả thư mục skill nằm trực tiếp dưới thư mục skill của AI.
4. Reload skill nếu AI hỗ trợ.
5. Dùng thư mục project native của AI thay vì phụ thuộc vào symlink.

### Không chạy được script audit

```bash
python3 --version
python3 skills/manage-blowfish-hugo/scripts/audit_blowfish_project.py --help
```

### AI không tìm thấy reference

Kiểm tra `references/` nằm cạnh `SKILL.md`; đường dẫn reference được resolve từ
thư mục skill.
