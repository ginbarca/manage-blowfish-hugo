#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");

function parseArguments(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--input" || key === "--output" || key === "--repo") {
      result[key.slice(2)] = argv[index + 1];
      index += 1;
    }
  }
  return result;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function fetchContributors(repository) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "manage-blowfish-hugo-contributors",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const contributors = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/contributors?per_page=100&page=${page}`,
      { headers },
    );
    if (!response.ok) {
      throw new Error(
        `GitHub API ${response.status}: ${await response.text()}`,
      );
    }
    const batch = await response.json();
    contributors.push(...batch);
    if (batch.length < 100) {
      break;
    }
  }
  return contributors;
}

function normalize(contributors) {
  const seen = new Set();
  return contributors
    .filter((contributor) => {
      const login = String(contributor.login ?? "");
      const isBot =
        contributor.type === "Bot" ||
        login.endsWith("[bot]") ||
        login.toLowerCase().includes("dependabot");
      if (!login || isBot || seen.has(login.toLowerCase())) {
        return false;
      }
      seen.add(login.toLowerCase());
      return true;
    })
    .sort(
      (left, right) =>
        Number(right.contributions ?? 0) - Number(left.contributions ?? 0) ||
        String(left.login).localeCompare(String(right.login)),
    );
}

function generate(contributors) {
  const cells = contributors.map((contributor) => {
    const login = escapeHtml(contributor.login);
    const profile = escapeHtml(
      contributor.html_url ?? `https://github.com/${contributor.login}`,
    );
    const avatar = escapeHtml(
      contributor.avatar_url ?? `https://github.com/${contributor.login}.png`,
    );
    const sizedAvatar = avatar.includes("?")
      ? `${avatar}&s=96`
      : `${avatar}?size=96`;
    return `    <td align="center">
      <a href="${profile}">
        <img src="${sizedAvatar}" width="72" alt="@${login}" /><br />
        <sub><b>@${login}</b></sub>
      </a>
    </td>`;
  });

  const rows = [];
  for (let index = 0; index < cells.length; index += 6) {
    rows.push(`  <tr>\n${cells.slice(index, index + 6).join("\n")}\n  </tr>`);
  }

  const table =
    rows.length > 0
      ? `<table>\n${rows.join("\n")}\n</table>`
      : "_No contributors have been discovered yet._";

  return `# Contributors

Thank you to everyone who improves Manage Blowfish Hugo.

<!-- contributors:start -->
${table}
<!-- contributors:end -->

This file is maintained automatically from the repository contributor API.
`;
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  const repository = args.repo ?? process.env.GITHUB_REPOSITORY;
  let contributors;

  if (args.input) {
    contributors = JSON.parse(fs.readFileSync(path.resolve(args.input), "utf8"));
  } else {
    if (!repository) {
      throw new Error(
        "Set GITHUB_REPOSITORY, pass --repo owner/name, or use --input.",
      );
    }
    contributors = await fetchContributors(repository);
  }

  const normalized = normalize(contributors);
  const output = path.resolve(args.output ?? path.join(root, "CONTRIBUTORS.md"));
  fs.writeFileSync(output, generate(normalized));
  console.log(`Wrote ${output} with ${normalized.length} contributor(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
