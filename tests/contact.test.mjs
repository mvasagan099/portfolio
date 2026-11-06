import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { handleContact } from "../.server/contact.mjs";
import { openContactDatabase } from "../server/sqlite.mjs";
const valid = (overrides = {}) => ({
  name: "QA Visitor",
  email: "qa@example.com",
  subject: "Portfolio enquiry",
  message: "This is a local contact endpoint verification message.",
  website: "",
  consent: true,
  clientId: randomUUID(),
  ...overrides
});
const req = (body, headers = {}) =>
  new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://portfolio.test",
      ...headers
    },
    body: typeof body === "string" ? body : JSON.stringify(body)
  });
async function database(fn) {
  const db = openContactDatabase();
  try {
    await fn(db);
  } finally {
    db.close();
  }
}
test("rejects unsupported methods and cross-origin submissions", async () => {
  assert.equal(
    (
      await handleContact(new Request("https://portfolio.test/api/contact"), {
        clientIp: "test"
      })
    ).status,
    405
  );
  assert.equal(
    (
      await handleContact(req(valid(), { Origin: "https://attacker.test" }), {
        clientIp: "test"
      })
    ).status,
    403
  );
});
test("rejects malformed JSON, unsupported media, and oversized bodies", async () => {
  assert.equal(
    (await handleContact(req("{"), { clientIp: "test" })).status,
    400
  );
  assert.equal(
    (
      await handleContact(req(valid(), { "Content-Type": "text/plain" }), {
        clientIp: "test"
      })
    ).status,
    415
  );
  assert.equal(
    (await handleContact(req("x".repeat(25000)), { clientIp: "test" })).status,
    413
  );
});
test("validates email, message, consent, and honeypot on the server", async () => {
  for (const override of [
    { email: "invalid" },
    { message: "short" },
    { consent: false },
    { website: "bot.example" }
  ]) {
    const response = await handleContact(req(valid(override)), {
      clientIp: "test"
    });
    assert.equal(response.status, 400);
    assert.notEqual((await response.json()).ok, true);
  }
});
test("does not claim success without configured storage", async () => {
  const response = await handleContact(req(valid()), { clientIp: "test" });
  assert.equal(response.status, 503);
  assert.notEqual((await response.json()).ok, true);
});
test("persists a message once and makes network retries idempotent", () =>
  database(async (db) => {
    const body = valid();
    for (let i = 0; i < 2; i++)
      assert.equal(
        (await handleContact(req(body), { db, clientIp: "same" })).status,
        202
      );
    assert.equal(
      db.raw.prepare("SELECT COUNT(*) AS count FROM contact_messages").get()
        .count,
      1
    );
    assert.equal(
      (
        await handleContact(
          req({
            ...body,
            message: "A different body that must not replace the original."
          }),
          { db, clientIp: "same" }
        )
      ).status,
      409
    );
    assert.equal(
      db.raw.prepare("SELECT message FROM contact_messages").get().message,
      body.message
    );
  }));
test("enforces atomic per-IP limits for concurrent requests", () =>
  database(async (db) => {
    const results = await Promise.all(
      Array.from({ length: 6 }, () =>
        handleContact(req(valid()), {
          db,
          clientIp: "one-visitor",
          now: 1000000
        })
      )
    );
    assert.equal(results.filter((r) => r.status === 202).length, 3);
    assert.equal(results.filter((r) => r.status === 429).length, 3);
    assert.equal(
      db.raw.prepare("SELECT COUNT(*) AS count FROM contact_messages").get()
        .count,
      3
    );
    assert.ok(
      Number(results.find((r) => r.status === 429).headers.get("Retry-After")) >
        0
    );
    assert.equal(
      (
        await handleContact(req(valid()), {
          db,
          clientIp: "one-visitor",
          now: 1800000
        })
      ).status,
      202
    );
  }));
test("returns a recoverable error when storage fails", async () => {
  const db = {
    prepare() {
      throw new Error("internal details");
    }
  };
  const response = await handleContact(req(valid()), { db, clientIp: "test" });
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes("internal details"));
});
