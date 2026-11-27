// main.ts — Thankful v2 entrypoint.
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).
// Node 22, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT = "When the storm came, the keeper did not leave the lamp. He stood in the glass room with the sea throwing itself at the rock and kept the light turning, one slow circle at a time, because somewhere a boat was counting on it. You have kept the light turning all night. Somewhere, a boat is counting on you.";

const MIN_CHARS = 1;
const MAX_CHARS = 1000;
const OUTPUT_FILE = "entry.txt";

// Counts Unicode code points (the gate counts code points, not bytes).
function entryLength(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  const length = entryLength(text);
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main(): void {
  validateEntry(ENTRY_TEXT);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, OUTPUT_FILE), ENTRY_TEXT, "utf8");
  if (process.argv.includes("--self-test")) {
    console.log(`self-test OK: ${entryLength(ENTRY_TEXT)} chars / ${Buffer.byteLength(ENTRY_TEXT, "utf8")} bytes`);
  }
}

main();
