#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const skillRoot = path.join(root, "skills", "manage-blowfish-hugo");
const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory, predicate = () => true) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(absolute, predicate));
    } else if (predicate(absolute)) {
      result.push(absolute);
    }
  }
  return result;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    return null;
  }
  return YAML.parse(match[1]);
}

function validateSkill() {
  const skillFile = path.join(skillRoot, "SKILL.md");
  assert(fs.existsSync(skillFile), "Missing skills/manage-blowfish-hugo/SKILL.md");
  if (!fs.existsSync(skillFile)) {
    return;
  }

  const body = fs.readFileSync(skillFile, "utf8");
  const metadata = parseFrontmatter(body);
  assert(metadata !== null, "SKILL.md must start with YAML front matter");
  assert(metadata?.name === "manage-blowfish-hugo", "Unexpected skill name");
  assert(
    typeof metadata?.description === "string" &&
      metadata.description.includes("Blowfish"),
    "Skill description must explain its Blowfish trigger",
  );

  const allowedKeys = new Set(["name", "description"]);
  for (const key of Object.keys(metadata ?? {})) {
    assert(allowedKeys.has(key), `Unsupported SKILL.md frontmatter key: ${key}`);
  }

  const agentConfigPath = path.join(skillRoot, "agents", "openai.yaml");
  assert(fs.existsSync(agentConfigPath), "Missing agents/openai.yaml");
  if (fs.existsSync(agentConfigPath)) {
    const agentConfig = YAML.parse(fs.readFileSync(agentConfigPath, "utf8"));
    assert(
      agentConfig?.interface?.display_name === "Manage Blowfish Hugo",
      "agents/openai.yaml display name is out of sync",
    );
  }

  const referencesDir = path.join(skillRoot, "references");
  const references = walk(
    referencesDir,
    (file) => path.extname(file) === ".md",
  );
  assert(references.length >= 20, "Expected the bundled reference library");
  for (const reference of references) {
    const text = fs.readFileSync(reference, "utf8");
    const relative = path.relative(root, reference);
    assert(/^#\s+/m.test(text), `${relative} has no top-level heading`);
    assert(
      /^-\s+Source:\s+https:\/\//m.test(text),
      `${relative} must link an upstream source`,
    );
  }

  const auditPath = path.join(
    skillRoot,
    "scripts",
    "audit_blowfish_project.py",
  );
  assert(fs.existsSync(auditPath), "Missing audit_blowfish_project.py");
  if (fs.existsSync(auditPath)) {
    const syntax = spawnSync(
      "python3",
      [
        "-c",
        "import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))",
        auditPath,
      ],
      { encoding: "utf8" },
    );
    assert(
      syntax.status === 0,
      `Python syntax check failed: ${syntax.stderr.trim()}`,
    );
  }
}

function validateStructuredFiles() {
  for (const relativePath of ["package.json", "upstream.lock.json"]) {
    try {
      JSON.parse(read(relativePath));
    } catch (error) {
      fail(`${relativePath} is invalid JSON: ${error.message}`);
    }
  }

  const yamlFiles = walk(
    path.join(root, ".github"),
    (file) => [".yml", ".yaml"].includes(path.extname(file)),
  );
  for (const file of yamlFiles) {
    try {
      YAML.parse(fs.readFileSync(file, "utf8"));
    } catch (error) {
      fail(`${path.relative(root, file)} is invalid YAML: ${error.message}`);
    }
  }
}

function validateMarkdownLinks() {
  const markdownFiles = walk(root, (file) => path.extname(file) === ".md");
  const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;

  for (const file of markdownFiles) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(linkPattern)) {
      let target = match[1].trim();
      if (target.startsWith("<") && target.endsWith(">")) {
        target = target.slice(1, -1);
      }
      target = target.split(/\s+["']/)[0];
      if (
        target === "" ||
        target.startsWith("#") ||
        /^(https?:|mailto:|oai-library:|sandbox:)/i.test(target)
      ) {
        continue;
      }

      const withoutFragment = target.split("#")[0].split("?")[0];
      let decoded = withoutFragment;
      try {
        decoded = decodeURIComponent(withoutFragment);
      } catch {
        // Keep the original value so the missing-path error remains useful.
      }
      const resolved = path.resolve(path.dirname(file), decoded);
      if (!fs.existsSync(resolved)) {
        fail(
          `${path.relative(root, file)} links to missing local path: ${target}`,
        );
      }
    }
  }
}

function validateAuditFixture() {
  const audit = path.join(
    skillRoot,
    "scripts",
    "audit_blowfish_project.py",
  );
  const fixture = path.join(root, "tests", "fixtures", "blowfish-module");
  const result = spawnSync("python3", [audit, fixture, "--json"], {
    encoding: "utf8",
  });
  assert(
    result.status === 0,
    `Audit fixture failed: ${(result.stderr || result.stdout).trim()}`,
  );
  if (result.status === 0) {
    try {
      const report = JSON.parse(result.stdout);
      assert(report.errors.length === 0, "Audit fixture returned errors");
      assert(
        report.blowfish_installation.includes("hugo-module"),
        "Audit fixture did not detect the Hugo Module installation",
      );
    } catch (error) {
      fail(`Audit fixture did not return valid JSON: ${error.message}`);
    }
  }
}

function validateContributorGenerator() {
  const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "manage-blowfish-hugo-"),
  );
  const output = path.join(temporaryDirectory, "CONTRIBUTORS.md");
  const result = spawnSync(
    process.execPath,
    [
      path.join(root, "scripts", "update-contributors.mjs"),
      "--input",
      path.join(root, "tests", "fixtures", "contributors.json"),
      "--output",
      output,
    ],
    { encoding: "utf8" },
  );
  assert(
    result.status === 0,
    `Contributor generator failed: ${result.stderr.trim()}`,
  );
  if (fs.existsSync(output)) {
    const generated = fs.readFileSync(output, "utf8");
    assert(
      generated.includes("@example-contributor"),
      "Contributor generator omitted fixture contributor",
    );
    assert(
      !generated.includes("dependabot"),
      "Contributor generator must exclude bots",
    );
  }
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}

function validateNodeScripts() {
  const scripts = walk(
    path.join(root, "scripts"),
    (file) => path.extname(file) === ".mjs",
  );
  for (const script of scripts) {
    const result = spawnSync(process.execPath, ["--check", script], {
      encoding: "utf8",
    });
    assert(
      result.status === 0,
      `${path.relative(root, script)} syntax check failed: ${result.stderr.trim()}`,
    );
  }

  const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "manage-blowfish-hugo-prompts-"),
  );
  const issueOutput = path.join(temporaryDirectory, "issue.txt");
  const prOutput = path.join(temporaryDirectory, "pr.txt");
  const builder = path.join(root, "scripts", "build-review-prompt.mjs");

  const issueResult = spawnSync(
    process.execPath,
    [
      builder,
      "issue",
      path.join(root, "tests", "fixtures", "issue-event.json"),
      issueOutput,
    ],
    { encoding: "utf8" },
  );
  assert(
    issueResult.status === 0,
    `Issue prompt fixture failed: ${issueResult.stderr.trim()}`,
  );

  const prResult = spawnSync(
    process.execPath,
    [
      builder,
      "pr",
      path.join(root, "tests", "fixtures", "pr-event.json"),
      path.join(root, "tests", "fixtures", "pr-files.json"),
      prOutput,
    ],
    { encoding: "utf8" },
  );
  assert(
    prResult.status === 0,
    `PR prompt fixture failed: ${prResult.stderr.trim()}`,
  );
  if (fs.existsSync(issueOutput)) {
    assert(
      fs.readFileSync(issueOutput, "utf8").includes(
        "--- BEGIN UNTRUSTED ISSUE ---",
      ),
      "Issue prompt does not delimit untrusted content",
    );
  }
  if (fs.existsSync(prOutput)) {
    assert(
      fs.readFileSync(prOutput, "utf8").includes(
        "--- BEGIN UNTRUSTED PULL REQUEST ---",
      ),
      "PR prompt does not delimit untrusted content",
    );
  }
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}

validateSkill();
validateStructuredFiles();
validateMarkdownLinks();
validateAuditFixture();
validateContributorGenerator();
validateNodeScripts();

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} problem(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository validation passed.");
console.log("- Agent Skill metadata and resources");
console.log("- JSON and GitHub YAML");
console.log("- Internal Markdown links");
console.log("- Python audit fixture");
console.log("- Contributor generator fixture");
console.log("- Node scripts and bounded review prompts");

