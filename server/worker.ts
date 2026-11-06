import { handleContact, type ContactDatabase } from "./contact";
export type AssetMap = Record<
  string,
  { body: string; type: string; etag: string; encoding?: "gzip" }
>;
export function createWorker(assets: AssetMap) {
  const decoded = new Map<string, Promise<Uint8Array<ArrayBuffer>>>();
  return {
    async fetch(
      request: Request,
      env: { DB?: ContactDatabase }
    ): Promise<Response> {
      const url = new URL(request.url);
      if (/^\/api\/contact\/?$/.test(url.pathname))
        return handleContact(request, {
          db: env.DB,
          clientIp: request.headers.get("cf-connecting-ip") || "unavailable"
        });
      if (!["GET", "HEAD"].includes(request.method))
        return new Response("Method not allowed", {
          status: 405,
          headers: { Allow: "GET, HEAD" }
        });
      let pathname: string;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        return new Response("Invalid URL", { status: 400 });
      }
      let key = pathname,
        status = 200;
      if (!assets[key] && assets[`${key}/index.html`])
        return Response.redirect(`${url.origin}${pathname}/${url.search}`, 308);
      if (pathname.endsWith("/")) key = `${pathname}index.html`;
      if (!assets[key]) {
        key = "/404.html";
        status = 404;
      }
      const asset = assets[key];
      if (!asset) return new Response("Not found", { status: 404 });
      const headers = {
        "Content-Type": asset.type,
        "Cache-Control": key.startsWith("/_next/static/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
        "ETag": asset.etag,
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      };
      if (status === 200 && request.headers.get("if-none-match") === asset.etag)
        return new Response(null, { status: 304, headers });
      if (request.method === "HEAD")
        return new Response(null, { status, headers });
      if (!decoded.has(key)) {
        const bytes = Uint8Array.from(atob(asset.body), (c) => c.charCodeAt(0));
        decoded.set(
          key,
          asset.encoding === "gzip"
            ? new Response(
                new Blob([bytes])
                  .stream()
                  .pipeThrough(new DecompressionStream("gzip"))
              )
                .arrayBuffer()
                .then((buffer) => new Uint8Array(buffer))
            : Promise.resolve(bytes)
        );
      }
      return new Response(await decoded.get(key), { status, headers });
    }
  };
}
