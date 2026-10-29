import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2" };
createServer(async (req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const content = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" }); res.end(content);
  } catch { res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }); res.end(await readFile(resolve(root,"404.html")).catch(()=>"Not found")); }
}).listen(Number(process.env.PORT || 3000), "0.0.0.0", ()=>console.log("Serving static portfolio"));
