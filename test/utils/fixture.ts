import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { glob } from "glob";
import { read } from "to-vfile";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const TEST_ROOT = path.join(__dirname, "..");
const FIXTURES_BASE_PATH = path.join(TEST_ROOT, "fixtures");

console.log(__dirname, TEST_ROOT, FIXTURES_BASE_PATH);

export async function getScenarios() {
  const inputMarkdownPath = path.join(FIXTURES_BASE_PATH, "input.md");
  if (!fs.existsSync(inputMarkdownPath)) return;

  const scenarios = [];
  const expectedHtmlFiles = await glob("*.expected.html", {
    cwd: FIXTURES_BASE_PATH,
  });
  for (const expectedHtmlFile of expectedHtmlFiles) {
    const expectedHtmlPath = path.join(FIXTURES_BASE_PATH, expectedHtmlFile);
    const processor = path.basename(expectedHtmlFile, ".expected.html");
    const inputMarkdown = await read(inputMarkdownPath);
    const expectedHtml = await read(expectedHtmlPath);

    scenarios.push({
      processor,
      inputMarkdown,
      expectedHtml,
    });
  }

  return scenarios;
}
