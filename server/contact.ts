import { contactRequestSchema } from "../lib/contact";
export type Statement = {
  bind(...values: (string | number | null)[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
};
export type ContactDatabase = {
  prepare(query: string): Statement;
  batch(statements: Statement[]): Promise<unknown[]>;
};
export type ContactContext = {
  db?: ContactDatabase;
  clientIp: string;
  now?: number;
};
const MAX_BODY = 24576,
  WINDOW_MS = 600000,
  MAX_PER_IP = 3,
  MAX_GLOBAL = 100;
function reply(
  status: number,
  body: Record<string, unknown>,
  headers: Record<string, string> = {}
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers
    }
  });
}
async function digest(value: string) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
    )
  ]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
}
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY)
    throw new RangeError("size");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        throw new RangeError("size");
      }
      chunks.push(part.value);
    }
  } finally {
    reader.releaseLock();
  }
  const data = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(data);
}
/** Same-origin, bounded input, shared validation, atomic rate counters, durable inbox. */
export async function handleContact(
  request: Request,
  context: ContactContext
): Promise<Response> {
  if (request.method !== "POST")
    return reply(
      405,
      { error: "Use POST to submit an enquiry." },
      { Allow: "POST" }
    );
  const origin = request.headers.get("origin");
  if (
    (origin && origin !== new URL(request.url).origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return reply(403, { error: "Please use the form on this website." });
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  )
    return reply(415, { error: "Send a JSON request." });
  let raw: unknown;
  try {
    raw = JSON.parse(await readBody(request));
  } catch (error) {
    return reply(error instanceof RangeError ? 413 : 400, {
      error:
        error instanceof RangeError
          ? "The message is too large."
          : "The request could not be read."
    });
  }
  const parsed = contactRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    return reply(400, {
      error: "Please check the form fields.",
      fieldErrors: {
        name: fields.name,
        email: fields.email,
        subject: fields.subject,
        message: fields.message,
        consent: fields.consent
      }
    });
  }
  if (!context.db)
    return reply(503, {
      error:
        "The contact form is temporarily unavailable. Please use the email link."
    });
  const { clientId, name, email, subject, message } = parsed.data;
  try {
    const db = context.db,
      now = context.now ?? Date.now(),
      window = Math.floor(now / WINDOW_MS),
      expires = (window + 1) * WINDOW_MS;
    const fingerprint = await digest(
      JSON.stringify({ name, email, subject, message })
    );
    const previous = await db
      .prepare("SELECT fingerprint FROM contact_messages WHERE id = ?")
      .bind(clientId)
      .first<{ fingerprint: string }>();
    if (previous)
      return previous.fingerprint === fingerprint
        ? reply(202, { ok: true, reference: clientId })
        : reply(409, {
            error: "This submission has changed. Please submit it again."
          });
    const key = await digest(`${context.clientIp}:${window}`);
    const counter = async (k: string) =>
      db
        .prepare(
          "INSERT INTO contact_rate_limits (key, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1 RETURNING attempts"
        )
        .bind(k, expires)
        .first<{ attempts: number }>();
    const ip = await counter(key);
    const global =
      ip && ip.attempts <= MAX_PER_IP
        ? await counter(`global:${window}`)
        : null;
    if (
      !ip ||
      ip.attempts > MAX_PER_IP ||
      !global ||
      global.attempts > MAX_GLOBAL
    )
      return reply(
        429,
        {
          error:
            "Too many messages. Please wait before trying again, or use the email link."
        },
        {
          "Retry-After": String(Math.max(1, Math.ceil((expires - now) / 1000)))
        }
      );
    await db.batch([
      db
        .prepare(
          "INSERT OR IGNORE INTO contact_messages (id, name, email, subject, message, fingerprint, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(clientId, name, email, subject, message, fingerprint, now),
      db
        .prepare("DELETE FROM contact_rate_limits WHERE expires_at < ?")
        .bind(now)
    ]);
    return reply(202, { ok: true, reference: clientId });
  } catch {
    return reply(503, {
      error:
        "Your message could not be saved. Please try again or use the email link."
    });
  }
}
