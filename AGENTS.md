# Clipr – Agent Instructions

Clipr is an India-first creator campaign network landing page built with Next.js App Router. Creators pay for verified views; clippers (editors) earn by posting short clips. The site is a waitlist/early-access page.

## Product Goals

The primary objectives are:
1. **Capture user interest** via the waitlist form — this is the single conversion metric that matters.
2. **Organic SEO discovery** — the site must rank well in search without paid ads. Prioritize semantic HTML, meaningful meta tags, page speed, and structured content over flashy UI tricks.

When making changes, ask: *does this help form conversion or SEO?* Changes that hurt either without clear benefit should be avoided.

## Commands

```bash
npm run dev    # dev server → localhost:3000
npm run build  # production build
npm run lint   # ESLint
```

No test suite exists yet.

## Stack

- **Next.js 16 / React 19** – App Router, all components are `"use client"`
- **TypeScript** – strict mode
- **Neon (serverless Postgres)** – via `@neondatabase/serverless` in `app/lib/db.ts`
- **Mixpanel** – analytics proxy at `/api/track`; client init in `app/components/MixpanelInit.tsx`
- **GSAP** – scroll animations via `app/hooks/useScrollReveal.ts`
- Styling is **inline styles only** – no Tailwind, no CSS modules, no component library

## Architecture

```
app/
  api/
    track/route.ts      ← Mixpanel server-side proxy
    waitlist/route.ts   ← waitlist DB insert
  components/           ← one file per page section
  constants/theme.ts    ← color tokens (BG, CREAM, ORANGE, GREEN, …)
  hooks/
    useMediaQuery.ts    ← responsive breakpoints
    useScrollReveal.ts  ← GSAP scroll reveal
  lib/
    db.ts               ← Neon SQL client
    mixpanel.ts         ← analytics wrapper
  layout.tsx            ← Montserrat + Geist Mono fonts
  page.tsx              ← mounts <Landing />
  globals.css
```

## Key Conventions

- **Theme**: all colors come from `app/constants/theme.ts`. Never hardcode hex values.
- **Inline styles**: components use inline style objects, not class names. Match this pattern when adding UI.
- **Responsive**: use `useMediaQuery` hook for breakpoint logic.
- **Analytics**: track every significant user interaction through `app/lib/mixpanel.ts`. Server routes use the `/api/track` proxy; client components import from `lib/mixpanel.ts`.
- **Role toggle**: hero and several sections switch content between `"creator"` and `"clipper"` perspectives via local state.

## Environment Variables

Required in `.env`:

```
DB_URL=           # Neon connection string
MIXPANEL_TOKEN=
```

## Pitfalls

- All components are client components – do not add `async` server components without a deliberate architectural reason.
- There is no server-side form validation; add it in `app/api/waitlist/route.ts` if extending the form.
- GSAP animations are registered in `useLayoutEffect` – SSR-safe but avoid triggering them in non-browser environments.
