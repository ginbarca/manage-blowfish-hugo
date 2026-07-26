# Sample: Charts

- Source: https://blowfish.page/samples/charts/
- Checked: 2026-07-24
- Read when: adding or testing Chart.js content.

The sample demonstrates bar, line, and doughnut charts through Blowfish's `chart`
shortcode. The theme adapts default chart colors to its active color scheme while
allowing normal Chart.js configuration to override them.

```markdown
{{< chart >}}
type: "line",
data: {
  labels: ["One", "Two", "Three"],
  datasets: [{
    label: "Example",
    data: [2, 5, 3]
  }]
}
{{< /chart >}}
```

Validate the exact Chart.js syntax with the installed version. Test light/dark
theme changes, legends, tooltips, responsive resizing, long labels, empty data,
and a non-JavaScript fallback or textual explanation for accessibility.

In a CMS, store the shortcode source without normalizing it as strict JSON unless
the theme's accepted syntax is also preserved.
