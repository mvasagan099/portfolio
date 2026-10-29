# Manivasagan A. — Portfolio

A responsive developer portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion. The site includes four engineering case studies, project filters, work experience, direct contact links, and a printable résumé.

## Development

```bash
npm ci
npm run dev
```

## Verify and build

```bash
npm run check
npm run build
npm run check
```

The production output is `out/`. Deploy this directory to a static host; no database, server runtime, API keys, or external font downloads are required. Use `npm start` to serve the static export locally with the included Node.js server.

Set `SITE_URL` to the exact deployed origin when building for a different domain. This configures canonical URLs, robots.txt, and the sitemap. The default origin points to the companion ChatGPT Site.

## Content

- `data/site.ts`: contact links, biography, experience, education, and public repository links.
- `data/projects.ts`: all project summaries, diagrams, and case studies.
- `data/skills.ts`: grouped technical skills.
- `/resume/`: printable résumé; Print / Save PDF opens the browser print dialog.
- `/projects/[slug]/`: canonical case studies. The original `/project/[slug]/` links also resolve.

The project visuals are labeled architecture/workflow schematics, not product screenshots. Private project repositories and unverified live demos are not exposed. Market-model research is explicitly described as inconclusive research in paper/shadow mode.

## Accessibility

Keyboard navigation, skip link, mobile menu with Escape support, active-section links, reduced-motion support, semantic project-filter buttons, and clipboard failure feedback are included. All content is present in the initial HTML.

## Scope and remaining owner choices

The site is complete using confirmed profile details. Add genuine project screenshots or public demo URLs in the data when available. Education has no invented graduation date; there are no fabricated certifications, testimonials, or impact metrics.
