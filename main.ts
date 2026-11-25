// Entry program for make.fun's news-image-20261125 bounty (Node 22).
//
// The entry itself is entry.png, sitting next to this file: a newspaper
// front page that sums up Wednesday 25 November 2026 in 44 headlines
// across 10 regions. This program's only job is to publish that image,
// byte for byte, as entry.png inside the output directory — /output in
// the grader's sandbox, or $MAKEFUN_OUTPUT_DIR when that is set.
// No network, no clock, no randomness: every run yields the same bytes.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ONE_MIB = 1_048_576; // the gate refuses an entry.png over 1 MiB
const source = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const size = statSync(source).size;

// Fail here, loudly, rather than hand the grader an oversized image.
if (size > ONE_MIB) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Verify the copy landed whole: a truncated write must fail loudly too,
// not hand the grader a broken image.
const copiedSize = statSync(target).size;
if (copiedSize !== size) {
  throw new Error(
    `copy verification failed: ${target} is ${copiedSize} bytes, source is ${size} bytes`,
  );
}
console.log(`published entry.png to ${outDir} (${size} bytes, copied and verified)`);
