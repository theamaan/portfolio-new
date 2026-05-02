# amanullah.dev - portfolio

Personal portfolio with role-aware storytelling. The Hero toggle (AI / LLM, Backend, Data) changes key content blocks so each view feels purpose-built.

## Current behavior

- Role toggle in Hero controls:
	- Hero headline and subcopy
	- Live Model Output snippets (right rail)
	- About section copy + Now card
	- Selected Work project list
- Experience, Capabilities, and Contact remain shared across roles.
- Case studies are typed TypeScript objects (no CMS, no MDX).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first @theme)
- Local UI state via React Context (`src/lib/site-context.tsx`)
- Static content in `src/lib/*.ts`

## Get running

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project layout

```text
src/
|- app/
|  |- layout.tsx
|  |- page.tsx
|  |- opengraph-image.tsx
|  |- work/[slug]/page.tsx
|  |- work/[slug]/opengraph-image.tsx
|  |- sitemap.ts
|  |- robots.ts
|  \- not-found.tsx
|- components/
|  |- hero/Hero.tsx
|  |- hero/TokenStream.tsx
|  |- About.tsx
|  |- Work.tsx
|  |- CaseStudy.tsx
|  |- CommandPalette.tsx
|  |- RecruiterMode.tsx
|  |- Nav.tsx
|  |- Timeline.tsx
|  |- Capabilities.tsx
|  |- Contact.tsx
|  \- Footer.tsx
|- lib/
|  |- site-context.tsx
|  |- projects.ts
|  |- case-studies.ts
|  |- tokens.ts
|  |- timeline.ts
|  \- capabilities.ts
\- styles/globals.css
```

## Portfolio projects (6)

### AI / LLM

1. AI Letter Translator
2. Healthcare RAG Document Assistant
3. AI Meeting Intelligence System

### Backend

4. Employee Management System
5. Atmos - Cinematic Weather

### Data

6. Data Lineage & Impact Analysis

## Editing content

- Hero role messaging: `src/components/hero/Hero.tsx`
- Role-specific About copy: `src/components/About.tsx`
- Role-specific token stream snippets: `src/lib/tokens.ts`
- Project metadata + role mapping: `src/lib/projects.ts`
- Case study content: `src/lib/case-studies.ts`
- Shared timeline and capabilities: `src/lib/timeline.ts`, `src/lib/capabilities.ts`

## Keyboard + recruiter shortcuts

- Command Palette: press `/` or `Ctrl+K`
- Recruiter Mode toggle: top navigation button

## Resume

Place your resume at `public/aman-ullah-resume.pdf`.

## Deploy

- Vercel: import repo and deploy
- Netlify: import repo and deploy with Next.js defaults
