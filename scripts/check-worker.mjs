import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const { default: worker } = await import(
  pathToFileURL(resolve("dist/server/index.js")).href
);
let count = 0;
async function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) {
      await walk(file);
      continue;
    }
    const key = "/" + relative("out", file).replaceAll("\\", "/");
    const response = await worker.fetch(
      new Request(`https://portfolio.test${key}`),
      {}
    );
    assert.equal(response.status, 200, key);
    assert.ok(
      Buffer.from(await response.arrayBuffer()).equals(readFileSync(file)),
      `Asset bytes differ: ${key}`
    );
    count++;
  }
}
await walk("out");
assert.equal(
  (
    await worker.fetch(
      new Request("https://portfolio.test/route-that-does-not-exist/"),
      {}
    )
  ).status,
  404
);
assert.ok(statSync("dist/server/index.js").size < 3 * 1024 * 1024);
console.log(
  `Verified ${count} production Worker assets byte-for-byte, 404 behavior, and bundle budget.`
);
