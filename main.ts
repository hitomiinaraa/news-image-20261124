// News-image entry (Node 22, standard library only): copies the entry.png
// beside this file to /output/entry.png, byte-for-byte, and refuses to
// write a file bigger than the 1 MiB gate. The image itself is the entry;
// this program only delivers it, deterministically, on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const size = statSync(src).size;
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1048576 byte limit`);
}
copyFileSync(src, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
