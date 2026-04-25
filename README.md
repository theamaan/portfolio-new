# amanullah.dev — portfolio

Personal portfolio. Editorial-minimal. One signature interaction (the live token stream behind the hero). Built around 4 case studies, not a card grid.

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** (CSS-first `@theme`)
- **animejs** + **animatry** for motion
- **MDX** ready (case studies are typed TS objects today; switch to MDX when you start writing)
- **Vercel** for hosting (works on Netlify too)

## Get running

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project layout

```
src/
├─ app/
│  ├─ layout.tsx                 root layout, fonts, metadata
│  ├─ page.tsx                   home (hero, about, work, timeline, capabilities, contact)
│  ├─ work/[slug]/page.tsx       case study route
│  ├─ opengraph-image.tsx        dynamic OG image
│  ├─ sitemap.ts · robots.ts
│  └─ not-found.tsx
├─ components/
│  ├─ hero/Hero.tsx + TokenStream.tsx     ← signature interaction
│  ├─ About.tsx · Work.tsx · Timeline.tsx
│  ├─ Capabilities.tsx · Contact.tsx · Footer.tsx
│  ├─ CaseStudy.tsx
│  ├─ Nav.tsx · ThemeToggle.tsx · primitives.tsx
├─ lib/
│  ├─ projects.ts · timeline.ts · capabilities.ts
│  ├─ tokens.ts                  snippets streamed in the hero
│  └─ case-studies.ts            full content for each project
└─ styles/globals.css            tokens, theme, base styles
```

## Editing content

- **Hero copy** → `src/components/hero/Hero.tsx`
- **About copy + Now card** → `src/components/About.tsx`
- **Project list (work index)** → `src/lib/projects.ts`
- **Case studies** → `src/lib/case-studies.ts`
- **Experience timeline** → `src/lib/timeline.ts`
- **Capabilities** → `src/lib/capabilities.ts`
- **Token-stream snippets** → `src/lib/tokens.ts`

## Resume

Drop your real PDF at `public/aman-ullah-resume.pdf`. The contact section already links to it.

## Deploying

- **Vercel** — push to GitHub, import the repo, hit deploy.
- **Netlify** — same, with the Next.js build command.

## Iteration prompts (save these for later refinement)

See the PRD for the full prompts. Three to keep handy:

1. *Improve Projects Section Prompt* — refine an individual case study.
2. *Rewrite About Section Prompt* — keep the voice from drifting back into LinkedIn-speak.
3. *Make Design More Unique Prompt* — audit against anti-patterns and propose one new memorable moment.
