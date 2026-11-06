import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const source = readFileSync("data/projects.ts", "utf8");
const projects = JSON.parse(
  source
    .slice(source.indexOf("= [") + 2)
    .trim()
    .replace(/;$/, "")
);
const slugs = new Set();
for (const p of projects) {
  assert(!slugs.has(p.slug), `Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  for (const field of [
    "title",
    "shortDescription",
    "longDescription",
    "problem",
    "approach"
  ])
    assert(p[field]?.trim(), `${p.slug}: missing ${field}`);
  assert(p.architecture.layers.length >= 2, `${p.slug}: incomplete diagram`);
  for (const key of ["githubUrl", "liveUrl"])
    if (p[key])
      assert(/^https:\/\//.test(p[key]), `${p.slug}: placeholder URL`);
  if (existsSync("out")) {
    assert(
      existsSync(`out/projects/${p.slug}/index.html`),
      `Missing exported case study: ${p.slug}`
    );
    assert(
      existsSync(`out/project/${p.slug}/index.html`),
      `Missing legacy route: ${p.slug}`
    );
  }
}
const site = readFileSync("data/site.ts", "utf8");
assert(!site.includes("hello@example.com"), "Placeholder contact email");
assert(!site.includes('url: "#"'), "Placeholder profile link");
if (existsSync("out"))
  for (const file of [
    "index.html",
    "resume/index.html",
    "404.html",
    "sitemap.xml",
    "robots.txt",
    "social-card.png",
    "icon.svg"
  ])
    assert(existsSync(`out/${file}`), `Missing export: ${file}`);
console.log(
  `Verified ${projects.length} project definitions, contact configuration, and available static routes.`
);

if (existsSync("out")) {
  for (const p of projects) {
    const html = readFileSync(`out/projects/${p.slug}/index.html`, "utf8");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert(canonical, `Missing canonical: ${p.slug}`);
    assert.equal(new URL(canonical[1]).pathname, `/projects/${p.slug}/`);
    assert(
      html.includes("application/ld+json"),
      `Missing structured data: ${p.slug}`
    );
    assert(html.includes("twitter:card"), `Missing social metadata: ${p.slug}`);
  }
  console.log(
    "Verified canonical, social, and structured metadata on every case study."
  );
}
