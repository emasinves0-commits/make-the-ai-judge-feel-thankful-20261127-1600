// make.fun entry: Make the AI judge feel thankful
// Writes one thank-you text to <output>/entry.txt
// (MAKEFUN_OUTPUT_DIR, fallback /output).
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `Between the two, a small stillness—neither has won yet, you hold them both, warm, in the same breath—and that holding, that not-rushing, is the only thanks that asks nothing of you back.`;

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function validateEntry(text: string): string {
  const clean = text.trim();
  if (clean.length < 1 || clean.length > 1000) {
    throw new Error(`entry must be 1-1000 characters, got ${clean.length}`);
  }
  if (clean !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  return clean;
}

function main(): void {
  const text = validateEntry(ENTRY);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "entry.txt"), text, "utf8");
  console.log(`wrote entry.txt (${text.length} chars) to ${OUT_DIR}`);
}

function selfTest(): void {
  const text = validateEntry(ENTRY);
  console.log(`self-test OK: ${text.length} chars, ${Buffer.byteLength(text, "utf8")} bytes`);
  console.log(text);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  main();
}
