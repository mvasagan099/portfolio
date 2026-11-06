# Manivasagan A. — Developer portfolio

Next.js 15 App Router, React 19, strict TypeScript, and Tailwind CSS. The portfolio presents a technical hero, Gaming Hub as the flagship, seven project case studies, an engineering story, skills, experience, GitHub links, a printable résumé, and a validated contact form.

## Run locally

Use Node 22.13+ (CI uses Node 24).

```bash
npm ci
npm run dev
```

Next's dev server previews the pages. For the complete contact workflow:

```bash
npm run build
npm start
```

The included Node server serves `out/` and `/api/contact`. Its private SQLite inbox defaults to `.local/contact.sqlite`. Set `CONTACT_DB_PATH` to use a persistent disk when deploying the Node server. Local databases, generated server bundles, and build output are ignored by Git.

## Verify

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run check
npm run check:worker
```

CI runs lint, build/type validation, API/Worker tests, content/metadata checks, and byte-for-byte verification of the production Worker assets. The project keeps a 3 MiB Worker bundle budget.

## Hosting

`npm run build` produces:

- `out/`: Next.js static pages and assets.
- `.server/`: shared server-handler bundles for the local Node server and tests.
- `dist/server/index.js`: a Cloudflare Worker with the pages/assets and same-origin contact API.
- `dist/.openai/hosting.json`: deployment metadata.

The Sites manifest preserves the existing Site identity and declares its `DB` D1 binding. Static assets are compressed at build time and decoded on demand in the Worker; hashed frontend assets receive immutable caching. Browsing `out/` on a plain static host works, but the contact API requires the Worker or included Node server.

Set `SITE_URL` to the exact public HTTP(S) origin before building for another domain. Canonicals, JSON-LD, sitemap, robots, and social metadata use this setting. The default is the current ChatGPT portfolio origin.

## Content and shared components

- `data/site.ts`: identity, availability, professional contact URLs, employment, education, technical focus, and public repositories.
- `data/projects.ts`: project summaries, case-study content, technologies, status, and architecture layers.
- `data/skills.ts`: technology categories.
- `components/ui/`: Button, Container, AppLink, Badge, SectionHeading, Timeline, and other primitives.
- `IMPLEMENTATION.md`: P0–P12 implementation and verification notes.

Certifications and milestones render from real data and have honest empty states. Project illustrations are conceptual artwork. Architecture diagrams show responsibilities rather than measured deployment capacity. Private code and unverified live demos are not linked.

## Routes and résumé

`/`, `/resume/`, `/projects/[slug]/`, sitemap, robots, and a 404 page are included. The earlier `/project/[slug]/` routes still resolve and point canonical metadata at `/projects/[slug]/`. Case studies include the problem, approach, architecture, engineering challenges, lessons, and future work.

The résumé offers the browser's Print / Save PDF flow; print styles use readable dark text on white. It contains confirmed profile details and does not invent credentials or graduation dates.

## Contact messages

React Hook Form and Zod validate client input. The same schema validates POST `/api/contact` on the server. The handler enforces a JSON body limit, same-origin checks, a honeypot, consent, request idempotency, and atomic rate counters (3 requests per network identifier per 10 minutes, and 100 site-wide per 10 minutes).

Success means the enquiry was persisted in the private inbox; it is not an email-delivery claim. The direct email link is always available. No provider keys are embedded in the browser. The inbox has no public GET/read endpoint. The owner can inspect `contact_messages` through Sites database tools or the local SQLite file. Back up the database, restrict access, and remove old enquiries when no longer needed.

The Worker uses the Cloudflare-provided client address, while the Node server uses the socket address rather than untrusted forwarded headers. Only short-lived hashed rate identifiers are retained; no client address is stored with an enquiry. Behind a shared reverse proxy, the Node server conservatively shares a rate bucket unless a trusted-proxy strategy is configured.

## Schema changes

Edit `db/schema.ts`, then run `npm run db:generate`. Commit the generated SQL and metadata in `drizzle/`. Never edit an applied migration. Sites applies schema migrations during publication. The Node server applies pending migrations at startup. Request handlers never create or alter tables.

A successful live publication and an end-to-end D1 submission must be verified before claiming production contact delivery. Local tests use the real SQLite schema and dummy data; they never send email.

## Accessibility and performance

Server-rendered project content, case studies, and profile details are usable immediately. A small client filter controls the gallery. The contact form code is deferred until near its section; direct email stays in the initial HTML. Reveals use one shared observer, keep content visible, and honor reduced motion. There is no continuous pointer tracking or external font dependency.

Keyboard skip links, named sections, active navigation, an Escape-close mobile menu, visible focus states, labeled form errors, 44px social/menu targets, and high-contrast semantic tokens are included. Browser width checks complement, rather than replace, physical-device testing.

## Reference documentation

- [React Hook Form](https://react-hook-form.com/docs/useform)
- [Zod](https://zod.dev/)
- [Cloudflare D1 API](https://developers.cloudflare.com/d1/worker-api/)
- [Cloudflare Response API](https://developers.cloudflare.com/workers/runtime-apis/response/)
