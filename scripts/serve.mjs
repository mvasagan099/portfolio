import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { handleContact } from "../.server/contact.mjs";
import { openContactDatabase } from "../server/sqlite.mjs";
const root = resolve("out"),
  db = openContactDatabase(
    process.env.CONTACT_DB_PATH || ".local/contact.sqlite"
  );
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff2": "font/woff2"
};
const portArg = process.argv.indexOf("--port"),
  port = Number(
    process.env.PORT || (portArg >= 0 ? process.argv[portArg + 1] : 3000)
  );
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (/^\/api\/contact\/?$/.test(url.pathname)) {
      const request = new Request(url, {
        method: req.method,
        headers: req.headers,
        ...(["GET", "HEAD"].includes(req.method)
          ? {}
          : { body: Readable.toWeb(req), duplex: "half" })
      });
      const response = await handleContact(request, {
        db,
        clientIp: req.socket.remoteAddress || "local"
      });
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end();
      return;
    }
    let file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const content = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(resolve(root, "404.html")).catch(() => "Not found"));
  }
}).listen(port, "0.0.0.0", () => console.log(`Portfolio listening on ${port}`));
