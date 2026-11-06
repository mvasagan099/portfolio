import test from "node:test";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { createWorker } from "../.server/worker.mjs";
const asset = (body, compressed = false) => ({
  body: (compressed ? gzipSync(body) : Buffer.from(body)).toString("base64"),
  type: "text/html; charset=utf-8",
  etag: '"test-etag"',
  ...(compressed ? { encoding: "gzip" } : {})
});
const worker = createWorker({
  "/index.html": asset("<h1>Portfolio</h1>", true),
  "/resume/index.html": asset("Résumé"),
  "/404.html": asset("Not found")
});
test("Worker decodes compressed HTML and handles conditional and HEAD requests", async () => {
  const response = await worker.fetch(new Request("https://site.test/"), {});
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "<h1>Portfolio</h1>");
  assert.equal(
    (
      await worker.fetch(
        new Request("https://site.test/", {
          headers: { "if-none-match": '"test-etag"' }
        }),
        {}
      )
    ).status,
    304
  );
  assert.equal(
    await (
      await worker.fetch(
        new Request("https://site.test/", { method: "HEAD" }),
        {}
      )
    ).text(),
    ""
  );
});
test("Worker preserves canonical trailing-slash redirects and 404 behavior", async () => {
  const redirect = await worker.fetch(
    new Request("https://site.test/resume?ref=test"),
    {}
  );
  assert.equal(redirect.status, 308);
  assert.equal(
    redirect.headers.get("location"),
    "https://site.test/resume/?ref=test"
  );
  const missing = await worker.fetch(
    new Request("https://site.test/missing/"),
    {}
  );
  assert.equal(missing.status, 404);
  assert.equal(await missing.text(), "Not found");
});
