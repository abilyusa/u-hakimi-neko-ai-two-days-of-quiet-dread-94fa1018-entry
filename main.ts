// Two Days of Quiet Dread — one code review comment.
// The grader runs `node main.ts`; it writes the comment to
// $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "LGTM. Every test passes. I have never trusted a green build less, and I am approving it anyway.";

// Gate: a single line, 1-140 characters, not only whitespace.
// Count code points (not UTF-16 units) so the guard matches the
// scorer's character count on UTF-8 text.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`line is ${charCount} characters, gate is 1-140`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
