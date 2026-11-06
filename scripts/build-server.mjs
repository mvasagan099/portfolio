import { build } from "esbuild";
import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  statSync
} from "node:fs";
import { join, extname, relative } from "node:path";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
mkdirSync(".server", { recursive: true });
await build({
  entryPoints: ["server/contact.ts"],
  bundle: true,
  platform: "neutral",
  format: "esm",
  target: "es2022",
  outfile: ".server/contact.mjs",
  minify: true
});
await build({
  entryPoints: ["server/worker.ts"],
  bundle: true,
  platform: "neutral",
  format: "esm",
  target: "es2022",
  outfile: ".server/worker.mjs",
  minify: true
});
if (!process.argv.includes("--contact-only")) {
  const assets = {};
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".xml": "application/xml",
    ".txt": "text/plain; charset=utf-8",
    ".json": "application/json",
    ".ico": "image/x-icon"
  };
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const file = join(dir, name);
      if (statSync(file).isDirectory()) {
        walk(file);
        continue;
      }
      const body = readFileSync(file),
        key = "/" + relative("out", file).replaceAll("\\", "/");
      const gzip = gzipSync(body, { level: 9 }),
        compressed = gzip.length < body.length * 0.85;
      assets[key] = {
        body: (compressed ? gzip : body).toString("base64"),
        ...(compressed ? { encoding: "gzip" } : {}),
        type:
          extname(file) === ".txt" && !key.endsWith("robots.txt")
            ? "text/x-component"
            : types[extname(file)] || "application/octet-stream",
        etag:
          '"' +
          createHash("sha256").update(body).digest("hex").slice(0, 24) +
          '"'
      };
    }
  }
  walk("out");
  mkdirSync("dist/.openai", { recursive: true });
  await build({
    stdin: {
      contents: `import {createWorker} from "./server/worker"; export default createWorker(${JSON.stringify(assets)});`,
      resolveDir: process.cwd(),
      sourcefile: "portfolio-worker-entry.ts",
      loader: "ts"
    },
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    outfile: "dist/server/index.js",
    minify: true
  });
  if (statSync("dist/server/index.js").size > 3 * 1024 * 1024)
    throw new Error(
      "Worker exceeds the 3 MiB bundle budget. Reduce generated assets before publishing."
    );
  writeFileSync(
    "dist/.openai/hosting.json",
    readFileSync(".openai/hosting.json")
  );
  writeFileSync("dist/package.json", JSON.stringify({ type: "module" }));
  console.log(
    `Bundled ${Object.keys(assets).length} static assets and the contact API into the Sites Worker.`
  );
}
