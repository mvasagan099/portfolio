# Portfolio priority implementation

Work proceeds P0 → P12. Each phase is checked before the next starts.

## P0 — Foundation

- Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind 3.
- Existing routes: `/`, `/resume/`, `/projects/[slug]/`, legacy `/project/[slug]/`, sitemap, robots, and 404.
- Central semantic color tokens, system font stacks, responsive section spacing, explicit breakpoints.
- Shared Button, Container, AppLink, Badge, and SectionHeading primitives.
- Baseline lint and TypeScript checks passed before changes.

Further phase results are appended as each phase is verified.

## P1 — Hero

- Specific technical headline, named identity, web/mobile focus, direct project and résumé links.
- Existing verified social links preserved; availability can be hidden with null.
- Developer terminal is server-rendered, readable immediately, and respects reduced motion.

## P2 — Featured projects

- Gaming Hub is the wide flagship with a visible, labeled logical architecture.
- Added a factual Node/Express/MySQL e-commerce case study; NIFTY remains research without profitability claims.
- Seven canonical and legacy case-study routes, reusable badges, and next-case navigation.

## P3 — About and engineering story

- Server-rendered narrative and reusable semantic timeline.
- Concrete operational examples and honest early-career/research context.
- Restrained reveals retain visible initial HTML and reduced-motion support.

## P4 — Skills

- Frontend, Backend, Databases, Infrastructure, Machine Learning, and Mobile categories.
- Category icons and compact decorative monograms; no fabricated skill ratings.
- Responsive cards keep technology names readable at narrow widths.

## P5 — Navigation

- Section links follow page order; active state uses bounded animation-frame updates.
- Mobile menu has 44px controls, Escape-to-close, and focus restoration.
- Native hash navigation and Next.js route links preserve fast transitions and reduced-motion scrolling.

## P6 — Experience and achievements

- Reusable experience timeline with factual employer and contribution data.
- Data-driven achievement and certification cards include honest empty states.
- No dates, credentials, impact metrics, or awards were invented.

## P7 — GitHub and developer focus

- Configurable GitHub identity and real repository URLs; no invented statistics.
- Technical focus and current status render from shared profile data.
- Developer terminal remains in the hero, available without animation delays.

## P8 — Contact

- React Hook Form with shared Zod validation, loading, success, field errors, timeout, and retry feedback.
- Same-origin POST `/api/contact`, strict media/body limits, honeypot, consent, idempotency, and atomic per-IP/global rate counters.
- Durable private inbox: D1 on Sites; SQLite for the included Node server. No public inbox/read endpoint or browser credentials.
- Versioned Drizzle schema/migrations; runtime requests never create tables.
- Seven backend tests pass, including concurrent rate limits, duplicate retries, and storage failure. Browser invalid and successful submissions pass locally.
- Success means saved to the inbox, not an email-delivery claim. Existing direct email remains available.
- Worker embeds the bounded Next static export, preserving the existing Next.js routes without a framework replacement.

## P9 — Micro-interactions

- CSS-only card lift, underline feedback, existing button/arrow feedback, and terminal cursor.
- Motion is restricted to hover-capable devices and respects reduced motion.
- Pointer tracking is deliberately omitted to avoid continuous event/render work.

## P10 — Performance and accessibility

- Removed Framer Motion, unused pointer/orbit components, and unnecessary client boundaries.
- Project cards and case studies render on the server; only the filter controls run on the client.
- Contact form code loads near the contact section; direct email remains in the initial HTML.
- Initial home-page JavaScript reported by Next fell from 184 kB to 109 kB before final SEO changes.
- Built Worker assets are compressed at build time and decoded on demand; the Worker is under the 3 MiB budget.
- Shared reveal observer, visible initial content, reduced-motion rules, named sections, skip-link focus, and 44px social/menu controls.
- Contrast: main text 16.4:1, muted text on alternate surface 7.25:1, accent on background 12.57:1.
- Nine API/Worker tests pass. Browser width checks are not a physical-device performance benchmark.

## P11 — SEO and production readiness

- Validated public-origin configuration; per-project canonical, OpenGraph, and Twitter metadata.
- Escaped JSON-LD for the real Person/WebSite and individual CreativeWork case studies.
- Sitemap, robots, printable résumé, a focusable 404, and route error/loading boundaries.
- CI verifies fresh installs, builds, content metadata, API behavior, and production Worker asset bytes.
- Production publication and live D1 submission remain separate verification gates from local correctness.

## P12 — Final polish

- Removed the repeated capability grid and stack strip so work follows the hero immediately.
- Prominent identity, tighter hero spacing, clearer project heading, explicit NIFTY 50 naming, and two useful FAQ entries.
- Removed unused orbit styles and restricted route loading to case studies to preserve the home-page first impression.
- All P0–P12 checkpoints run lint, strict TypeScript, and production build/content checks before proceeding.
- Desktop, 390px-frame and 320px-frame checks are recorded in the working session; phase P1 mobile overflow was repaired before P2.
- API and Worker tests, production artifact byte checks, and final route/link inspection are part of completion.

## Live hosting status

The existing Site was previously blocked by platform publication/private-connectivity errors. Code/build verification and successful public deployment are separate; deployment results must be reported honestly.
