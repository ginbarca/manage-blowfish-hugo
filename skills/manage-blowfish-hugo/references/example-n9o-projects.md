# Example: N9O Projects

- Source: https://n9o.xyz/projects/
- Checked: 2026-07-24
- Read when: designing a real-world Blowfish project/portfolio section.

## Observed Layout

The public page presents:

- a `Projects` branch with breadcrumb and author context;
- a short editable introduction;
- a compact table-like collection with logo, title, description, and references;
- status labels such as active or retired;
- multiple outbound links per project;
- multilingual navigation and normal Blowfish footer/taxonomy chrome.

The page does not expose its source contract. The following model is an inference
from rendered output and should be adapted after inspecting the target
repository:

```yaml
title: "Project name"
status: "Active"
description: "One-sentence project summary."
logo: "project-logo.svg"
links:
  - label: "site"
    url: "https://example.com"
  - label: "github"
    url: "https://github.com/example/project"
```

## Recommended Blowfish Implementation

- Use `content/projects/_index.md` for the branch introduction.
- Store each project as a page or leaf bundle so logos and metadata remain
  independently editable.
- Add `layouts/projects/list.html` for a section-specific renderer instead of
  replacing the global list layout.
- Use semantic table/list markup and responsive stacking for narrow screens.
- Preserve localized project fields and external-link accessibility.
- Treat status as structured data rather than parsing it from the title.
