import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { glob } from "glob";
import { read } from "to-vfile";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const TEST_ROOT = path.join(__dirname, "..");
const FIXTURES_BASE_PATH = path.join(TEST_ROOT, "fixtures");

type VFile = Awaited<ReturnType<typeof read>>;

/**
 * Test scenario consisting of the following pair of files:
 * - an input Markdown file at `test/fixtures/input.md`
 * - an expected HTML file at `test/fixtures/{processor}.expected.md`
 */
export type TestScenario = {
  processor: string;
  inputMarkdown: VFile;
  expectedHtml: VFile;
};

/**
 * Automatically gathers a list of {@linkcode TestScenario}
 * located according to its test structure.
 */
export async function getScenarios(): Promise<TestScenario[]> {
  const inputMarkdownPath = path.join(FIXTURES_BASE_PATH, "input.md");
  if (!fs.existsSync(inputMarkdownPath)) {
    throw new Error("cannot find input.md in test fixture directory");
  }

  const scenarios: TestScenario[] = [];
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
