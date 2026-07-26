# Security Policy

## Supported versions

Security fixes are applied to the latest release and the default branch.

## Reporting a vulnerability

Please do not open a public issue for:

- Credential exposure.
- Workflow permission escalation.
- Prompt-injection paths that can produce unauthorized repository writes.
- Unsafe command execution from untrusted issue or pull-request content.
- Dependency or installer behavior that can modify files outside the intended
  skill directory.

Use GitHub's **Private vulnerability reporting** feature:

1. Open the repository's **Security** tab.
2. Select **Advisories**.
3. Select **Report a vulnerability**.
4. Include affected files, reproduction steps, impact, and a proposed fix when
   available.

If private reporting is not enabled yet, contact the maintainer through the
profile at <https://github.com/ginbarca> and avoid including exploit details in
public messages.

You can expect an acknowledgement within seven days. We will coordinate
validation, remediation, disclosure timing, and credit with the reporter.

## Automation trust model

The repository's AI review workflows treat issue bodies, comments, pull-request
metadata, and diffs as untrusted data. They do not execute contributor code and
only write advisory comments. Upstream and contributor workflows open
reviewable pull requests rather than merging directly.

