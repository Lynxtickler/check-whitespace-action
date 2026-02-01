import * as core from "@actions/core";
import { readFileSync, existsSync } from "fs";

// Define inputs and outputs at the start of the file.
const INPUT_IGNORE_FILE = "ignore-file";
const OUTPUT_VIOLATIONS = "violations";

// TODO: Add docstring
const findNonCompliantWhitespace = () => {
  // TODO: implement checks here
  return "Foobar";
};

const main = () => {
  try {
    const ignoreFile = core.getInput(INPUT_IGNORE_FILE);

    let patterns = [];
    if (existsSync(ignoreFile)) {
      const content = readFileSync(ignoreFile, "utf-8");
      patterns = content.split("\n").filter((line) => (
          // Trim _is_ used here, we're only just reading config so far.
          line.trim() && !line.startsWith("#")
      ));
      core.info(`Loaded ${patterns.length} patterns from ${ignoreFile}`);
    } else {
      core.warning(`Ignore file '${ignoreFile}' not found. Using empty configuration.`);
    }

    const violations = findNonCompliantWhitespace();
    core.setOutput(OUTPUT_VIOLATIONS, violations);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
