#!/usr/bin/env node
/**
 * Repairs Windows static-asset serving in `vinext start`.
 *
 * `vinext`'s static file cache keys every built asset with
 * `path.relative(base, file)`. On Windows that returns `assets\index-abc.css`,
 * so the cache key becomes `/assets\index-abc.css` while the browser asks for
 * `/assets/index-abc.css`. Every lookup misses and the production server
 * answers 404 for the stylesheet, the client JS and every image — the page
 * renders as unstyled HTML.
 *
 * POSIX already produces forward slashes, so this rewrite is a no-op there and
 * on CI. It runs from `prestart` because `npm ci` restores the unpatched file.
 */
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const TARGET = path.join(
  process.cwd(),
  "node_modules/vinext/dist/server/static-file-cache.js",
);
const NEEDLE = "relativePath: path.relative(base, batch[j]),";
const PATCH = 'relativePath: path.relative(base, batch[j]).split(path.sep).join("/"),';

if (path.sep === "/") {
  process.exit(0);
}

try {
  await access(TARGET);
} catch {
  console.warn(`[fix-windows-static-assets] ${TARGET} not found; skipping.`);
  process.exit(0);
}

const file = TARGET;

const source = await readFile(file, "utf8");

if (source.includes(PATCH)) {
  process.exit(0);
}

if (!source.includes(NEEDLE)) {
  console.warn(
    "[fix-windows-static-assets] vinext's static file cache no longer matches the " +
      "known pattern. If assets 404 on Windows, re-check the upstream source.",
  );
  process.exit(0);
}

await writeFile(file, source.replace(NEEDLE, PATCH));
console.log("[fix-windows-static-assets] normalized static asset cache keys for Windows.");
