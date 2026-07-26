# Sample: Diagrams and Flowcharts

- Source: https://blowfish.page/samples/diagrams-flowcharts/
- Checked: 2026-07-24
- Read when: adding or previewing Mermaid diagrams.

The sample demonstrates:

- flowcharts;
- sequence diagrams;
- class diagrams;
- entity-relationship diagrams.

Wrap Mermaid source:

```markdown
{{< mermaid >}}
graph TD
  Start --> Decision
  Decision --> Done
{{< /mermaid >}}
```

Blowfish themes Mermaid output to match the configured color scheme. Verify
syntax with the Mermaid version bundled by the installed theme.

Test both appearances, wide diagrams on mobile, labels containing punctuation,
keyboard/assistive access, and print output. Preserve Mermaid text in a CMS and
sanitize preview rendering; do not turn the source permanently into generated
SVG or HTML.
