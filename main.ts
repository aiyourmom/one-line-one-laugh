import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const text =
  "My smart speaker heard me crying and offered a 30-day free trial of happiness. It auto-renews.";

// Gate guard: one line, 1-200 chars, not whitespace-only, no newline (judge criteria + gate).
if (text.length < 1 || text.length > 200 || text.trim().length === 0 || text.includes("\n")) {
  throw new Error(`entry violates gate: ${text.length} chars, newline=${text.includes("\n")}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${text.length} characters to ${join(outDir, "entry.txt")}`);
