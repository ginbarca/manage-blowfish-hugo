# Sample: Mathematical Notation

- Source: https://blowfish.page/samples/mathematical-notation/
- Checked: 2026-07-24
- Read when: adding or previewing KaTeX.

Include the loader once in each article that contains math:

```markdown
{{< katex >}}
```

Use `\(` and `\)` for inline expressions:

```markdown
The ratio is \(\frac{a}{b}\).
```

Use `$$` delimiters for a block expression:

```markdown
$$
f(x) = x^2 + 1
$$
```

Blowfish conditionally includes KaTeX assets when the shortcode is present.
Preserve backslashes during Markdown/front-matter serialization, and test
multiline expressions, overflow on mobile, copy/paste, and screen-reader behavior.
