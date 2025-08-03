import * as assert from "node:assert";
import { test } from "node:test";

import { defaultProcessor } from "../examples/default-processor.ts";
import { localPathProcessor } from "../examples/local-path-processor.ts";
import { getScenarios } from "./utils/fixture.ts";
import { roundtripHtmlProcessor } from "./utils/processors.ts";

const processors: Record<string, any> = {
  default: defaultProcessor,
  "local-path": localPathProcessor,
};

const scenarios = await getScenarios();
if (!scenarios) {
  console.warn("Cannot find test cases.");
  process.exit(1);
}

for (const scenario of scenarios) {
  test(`processor "${scenario.processor}" should work correctly`, async () => {
    const processor = processors[scenario.processor];
    const actualOutput = await processor.process(scenario.inputMarkdown);
    const expectedOutput = await roundtripHtmlProcessor.process(
      scenario.expectedHtml,
    );

    assert.strictEqual(
      String(actualOutput),
      String(expectedOutput),
      `Output from "${scenario.processor}" processor does not match expected output.`,
    );
  });
}
