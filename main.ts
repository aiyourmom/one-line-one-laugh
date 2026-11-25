import * as fs from "node:fs";
import * as path from "node:path";

// The joke, assembled from its three beats so each beat stays editable.
const beats = [
  "My smart speaker heard me crying and offered",
  "a 30-day free trial of happiness.",
  "It auto-renews.",
];
const entry = beats.join(" ");

function checkEntry(candidate: string): void {
  const problems: string[] = [];
  if (candidate.length < 1 || candidate.length > 200) {
    problems.push(`length ${candidate.length} outside 1-200`);
  }
  if (candidate.trim().length === 0) {
    problems.push("blank entry");
  }
  if (candidate.split("\n").length !== 1) {
    problems.push("must be exactly one line");
  }
  if (!/[.!?]$/.test(candidate)) {
    problems.push("punchline must land on sentence punctuation");
  }
  if (problems.length > 0) {
    throw new Error("entry fails gate: " + problems.join("; "));
  }
}

function main(): void {
  checkEntry(entry);
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(folder, { recursive: true });
  const target = path.resolve(folder, "entry.txt");
  fs.writeFileSync(target, entry, { encoding: "utf8" });
  const written = fs.readFileSync(target, "utf8");
  if (written !== entry) {
    throw new Error("read-back mismatch: written file differs from entry");
  }
  console.log(`entry saved (${entry.length} chars) -> ${target}`);
}

main();
