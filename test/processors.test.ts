import * as assert from "node:assert";
import { test } from "node:test";

import { defaultProcessor } from "../examples/default-processor.ts";
import { localPathProcessor } from "../examples/local-path-processor.ts";
import { getScenarios, type TestScenario } from "./utils/fixture.ts";
import { roundtripHtmlProcessor } from "./utils/processors.ts";

type Processor = typeof defaultProcessor;
const processors: Record<string, Processor> = {
  default: defaultProcessor,
  "local-path": localPathProcessor,
};

const scenarios = (await getScenarios()) || [];
if (scenarios.length === 0) {
  console.warn("Cannot find test cases.");
  process.exit(1);
}

for (const scenario of scenarios) {
  test(
    `processor "${scenario.processor}" should work correctly`,
    buildTest(scenario),
  );
}

function buildTest(scenario: TestScenario) {
  return async () => {
    const processor = processors[scenario.processor];
    const actualOutput = processor
      .processSync(scenario.inputMarkdown)
      .toString();
    const expectedOutput = roundtripHtmlProcessor
      .processSync(scenario.expectedHtml)
      .toString();

    assert.strictEqual(
      actualOutput,
      expectedOutput,
      `Output from "${scenario.processor}" processor does not match expected output.`,
    );
  };
}
