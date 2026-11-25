// Entry program for the make.fun news-image-20261125 bounty (Node 22).
//
// The artwork lives in entry.png next to this file: a hand-built front page
// that sums up the world news of Wednesday 25 November 2026. Running this
// program publishes that image as the entry by copying it, byte for byte,
// to entry.png inside the output directory. The grader points
// MAKEFUN_OUTPUT_DIR at a scratch folder locally; in its own sandbox the
// output directory is /output. No network, no randomness, no clock: two
// runs always produce identical bytes.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

// The gate rejects anything over 1 MiB, so fail loudly here instead of
// handing the grader an image it would score as invalid.
const size = statSync(source).size;
if (size > 1_048_576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target} (${size} bytes)`);
