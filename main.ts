// One Star for Monday — make.fun entry (program/v1).
// Writes a one-line, one-star review of Monday as if it were a restaurant
// to $MAKEFUN_OUTPUT_DIR/entry.txt. One line, 24 words, plain text.
//
// Output contract: the grader runs `node /bot/main.ts` with /bot read-only
// and a writable output dir at $MAKEFUN_OUTPUT_DIR. We only ever write
// into that output dir — never into the script's own directory, and we
// never remove the output directory itself (it is a mount in the grader).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const line =
  "One star: the waiter brought the bill before the starter, the coffee was cold, and my 9 a.m. meeting was already at my table.";

// Gate guard: the entry must be a single line of at most 25 words.
const words = line.trim().split(/\s+/);
if (words.length > 25 || line.includes("\n")) {
  throw new Error(`entry violates the gate: ${words.length} words`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(dirname(fileURLToPath(import.meta.url)), "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
