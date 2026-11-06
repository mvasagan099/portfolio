import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readdirSync, readFileSync, chmodSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
export function openContactDatabase(filename = ":memory:") {
  if (filename !== ":memory:")
    mkdirSync(dirname(resolve(filename)), { recursive: true, mode: 0o700 });
  const sql = new DatabaseSync(filename);
  if (filename !== ":memory:") chmodSync(filename, 0o600);
  sql.exec(
    "CREATE TABLE IF NOT EXISTS _contact_migrations (name TEXT PRIMARY KEY)"
  );
  const migrations = fileURLToPath(new URL("../drizzle", import.meta.url));
  for (const name of readdirSync(migrations)
    .filter((n) => n.endsWith(".sql"))
    .sort()) {
    if (
      sql
        .prepare("SELECT name FROM _contact_migrations WHERE name = ?")
        .get(name)
    )
      continue;
    sql.exec("BEGIN");
    try {
      sql.exec(readFileSync(resolve(migrations, name), "utf8"));
      sql.prepare("INSERT INTO _contact_migrations(name) VALUES (?)").run(name);
      sql.exec("COMMIT");
    } catch (e) {
      sql.exec("ROLLBACK");
      throw e;
    }
  }
  const prepare = (query, params = []) => ({
    bind(...values) {
      return prepare(query, values);
    },
    async first() {
      return sql.prepare(query).get(...params) || null;
    },
    async run() {
      return this._run();
    },
    _run() {
      const result = sql.prepare(query).run(...params);
      return { meta: { changes: result.changes } };
    }
  });
  return {
    prepare,
    async batch(statements) {
      sql.exec("BEGIN");
      try {
        const result = statements.map((s) => s._run());
        sql.exec("COMMIT");
        return result;
      } catch (e) {
        sql.exec("ROLLBACK");
        throw e;
      }
    },
    close() {
      sql.close();
    },
    raw: sql
  };
}
