# Publish repository lên GitHub

[English](PUBLISHING.md) · [Tiếng Việt](PUBLISHING.vi.md)

Repository đang được cấu hình sẵn cho địa chỉ:

```text
https://github.com/ginbarca/manage-blowfish-hugo
```

Nếu bạn chọn owner hoặc tên repository khác, hãy thay giá trị này trong badge,
lệnh cài đặt, CODEOWNERS, link tài trợ và link bảo mật trước khi push lần đầu.

## 1. Kiểm tra local

```bash
npm ci
npm test
npx --yes skills add . --list
```

Lệnh cuối phải tìm thấy đúng một skill: `manage-blowfish-hugo`.

## 2. Tạo repository

Nếu dùng GitHub CLI:

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

Bạn cũng có thể tạo một public repository trống trên GitHub rồi làm theo lệnh
push GitHub hiển thị.

## 3. Bật tính năng cộng đồng

Mở **Settings → General → Features**:

- Bật Issues.
- Bật Discussions nếu muốn có khu vực hỏi đáp/cộng đồng.
- Chỉ bật Wikis nếu có kế hoạch duy trì; tài liệu hiện đã nằm trong Git.

Mở **Settings → Code security and analysis**:

- Bật secret scanning.
- Bật push protection.
- Bật dependency graph và Dependabot alerts.
- Bật private vulnerability reporting.

## 4. Cấu hình Actions và bot

Làm theo [tài liệu Automation](AUTOMATION.vi.md), đặc biệt:

- Cho phép Actions tạo pull request.
- Bật quyền truy cập GitHub Models.
- Giữ quyền workflow mặc định ở mức read-only.
- Kiểm tra lần chạy CI đầu tiên thành công.
- Chạy tay **Upstream Sync** và **Contributors Sync** một lần.

## 5. Bảo vệ branch `main`

Tạo branch ruleset:

- Target `main`.
- Bắt buộc thay đổi đi qua pull request.
- Yêu cầu ít nhất một approval.
- Hủy approval cũ khi có commit mới.
- Yêu cầu status check `Validate`.
- Chặn force push và xóa branch.

Không nên bắt buộc comment AI review như status check vì dịch vụ inference đôi
khi có thể tạm thời không khả dụng.

## 6. Bật GitHub Sponsors

1. Đăng ký tại <https://github.com/sponsors>.
2. Hoàn tất sponsor profile cho `ginbarca`.
3. Publish ít nhất một sponsorship tier.
4. Giữ `.github/FUNDING.yml` trên default branch.

GitHub chỉ hiển thị nút Sponsor sau khi tài khoản đủ điều kiện. Link Buy Me a
Coffee dự phòng đã được cấu hình.

## 7. Tạo release đầu tiên

Sau khi CI pass:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Release workflow tạo:

- `manage-blowfish-hugo-v1.0.0.zip`
- `manage-blowfish-hugo-v1.0.0.zip.sha256`
- Release note tự động

## 8. Kiểm tra public lần cuối

- Badge trong README hoạt động.
- `npx skills add ginbarca/manage-blowfish-hugo --list` tìm đúng một skill.
- Issue form mở chính xác.
- Nút Sponsor hiển thị hoặc link dự phòng hoạt động.
- Quyền CI/bot khớp tài liệu automation.
- Branch `main` đã được bảo vệ.

