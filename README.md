# Manivasagan A. — Portfolio

Software developer portfolio built with Next.js, Tailwind CSS, and Motion (Framer Motion).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production

```bash
npm run build      # static + SSG output
npm start          # serve built output
SITE_URL=... npm run build   # sets metadata base + sitemap/robots
```

## Project structure

```
app/                 # Next.js App Router (home, case studies, sitemap, robots)
components/
  ui/                # Reusable primitives: Button, Reveal, Terminal, SectionHeading…
  sections/          # Page sections: Hero, About, Skills, Projects, Experience…
data/                # All content (single source of truth — no content in components)
types/               # Shared TypeScript models (Project, SkillCategory…)
```

## Data-driven content

Edit the files in `data/` to update the site:

| File | Contents |
| ---- | -------- |
| `data/site.ts` | Name, availability status, hero terminal values, links, experience, achievements, GitHub repos |
| `data/skills.ts` | Skill categories and technologies |
| `data/projects.ts` | Featured projects and case-study content |

Everything renders from this data — nothing is hardcoded in components.

## Important

- Personal fields in `data/site.ts` that are not yet confirmed are intentionally
  left as placeholders (e.g. `github-username`, `hello@example.com`) so nothing
  fabricated goes live. Fill them before deploying.
- Reduced motion, keyboard focus, and touch-device behaviour are supported.