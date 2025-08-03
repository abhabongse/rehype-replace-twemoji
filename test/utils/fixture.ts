import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { glob } from "glob";
import { readSync } from "to-vfile";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const TEST_ROOT = path.join(__dirname, "..");
const FIXTURES_BASE_PATH = path.join(TEST_ROOT, "fixtures");

/**
 * Test scenario consisting of the following pair of files:
 * - an input Markdown file at `test/fixtures/input.md`
 * - an expected HTML file at `test/fixtures/{processor}.expected.md`
 */
export type TestScenario = {
  processor: string;
  inputMarkdown: string;
  expectedHtml: string;
};

/**
 * Automatically gathers a list of {@linkcode TestScenario}
 * located according to its test structure.
 */
export async function getScenarios(): Promise<TestScenario[] | undefined> {
  const inputMarkdownPath = path.join(FIXTURES_BASE_PATH, "input.md");
  if (!fs.existsSync(inputMarkdownPath)) return;

  const scenarios: TestScenario[] = [];
  const expectedHtmlFiles = await glob("*.expected.html", {
    cwd: FIXTURES_BASE_PATH,
  });
  for (const expectedHtmlFile of expectedHtmlFiles) {
    const expectedHtmlPath = path.join(FIXTURES_BASE_PATH, expectedHtmlFile);
    const processor = path.basename(expectedHtmlFile, ".expected.html");
    const inputMarkdown = readSync(inputMarkdownPath).toString();
    const expectedHtml = readSync(expectedHtmlPath).toString();

    scenarios.push({
      processor,
      inputMarkdown,
      expectedHtml,
    });
  }

  return scenarios;
}
