// Revision: newspaper front page, Nvidia lead story.
// News image v2: copy entry.png to the output dir byte-for-byte, with a size self-check.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = new URL("./entry.png", import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");
const MAX = 1024 * 1024;

const size = statSync(src).size;
if (size > MAX) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
console.log(`copied entry.png (${size} bytes) to ${dest}`);
