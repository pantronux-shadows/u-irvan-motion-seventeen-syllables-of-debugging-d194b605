// Seventeen Syllables of Debugging — the entry.
//
// The harness runs this program in a sandbox with no network, then reads
// /output/entry.txt and holds it to the gate: UTF-8 text of 1 to 200
// characters, not only white space. So the whole job is to put exactly one
// haiku there, and to put the same bytes there on every run.
//
// Determinism: the text is a constant. Nothing here reads the clock, the
// environment's contents, a directory listing, or a random source, and the
// file is written in a single fixed-encoding write. Two runs in two fresh
// sandboxes therefore produce byte-identical output.
//
// Portability: no import statements and no type annotations. The standard
// library is reached through process.getBuiltinModule, so the file runs the
// same whether Node loads it as CommonJS or as a module, and nothing has to
// be installed.

// 5 — a cursor stopped on one line, the moment before reading it.
// 7 — the warning comment above the line, skimmed a hundred times before.
// 5 — the turn: the hand that wrote the warning is the hand about to ignore it.
const HAIKU = [
  "cursor on the line,",
  "the comment says do not touch \u2014",
  "in my handwriting.",
].join("\n");

// The harness mounts the entry's output tree at /output and names it in
// MAKEFUN_OUTPUT_DIR; falling back to /output keeps it correct either way.
const envOutputDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  typeof envOutputDir === "string" && envOutputDir.length > 0
    ? envOutputDir
    : "/output";

const fs = process.getBuiltinModule("node:fs");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputDir + "/entry.txt", HAIKU, { encoding: "utf8" });
