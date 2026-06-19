# CLAUDE.md — Neferet Trilogy Platform

## 1. Project Overview

The Neferet Trilogy platform is a reader-focused web application that hosts a serialized three-book fiction series ("The Eight Gate", "Princess Neferet", "The Journey Home"). It delivers chapter-by-chapter reading pages, character profiles, world lore, and an author page, with email newsletter signups embedded at every high-engagement touchpoint. All content is stored in Supabase (PostgreSQL); there is no CMS, no authentication, and no user accounts.

---

## 2. Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 (no `tailwind.config.ts` — all config in CSS) |
| Component library | Shadcn/ui | manually installed (not via CLI) |
| Database | Supabase (PostgreSQL) | `@supabase/supabase-js` |
| Email | ConvertKit API v3 | via fetch, no SDK |
| Markdown rendering | `react-markdown` + `remark-gfm` | |
| Icons | `lucide-react` | |
| Class utilities | `clsx` + `tailwind-merge` via `cn()` | `src/lib/utils.ts` |
| Hosting | Vercel | |

---

## 3. Dev Commands

```bash
npm install          # install all dependencies
npm run dev          # start local dev server (http://localhost:3000)
npm run build        # production build (must pass before any PR)
npm run lint         # ESLint
```

**Required before running:** `.env.local` must exist at the project root. A template is committed. The app renders fallback placeholder data when Supabase is unconfigured, so `npm run dev` works without credentials but shows no real content.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=
NEXT_PUBLIC_SITE_URL=          # used by sitemap.ts and robots.ts
```

---

## 4. Core Logic Summary

**Content delivery:** Chapter text, character profiles, lore articles, and blog posts are rows in Supabase. The `content` column stores raw markdown strings. Pages fetch via typed helpers in `src/lib/data.ts`, which call `getSupabase()` — a lazy factory in `src/lib/supabase.ts` that validates the URL before creating the client. Every page wraps its data call in `try/catch` and falls back to hardcoded placeholder data, ensuring the build never fails due to missing credentials. Markdown is rendered by `<ChapterReader>` via `react-markdown`.

**Reading progress:** Entirely client-side. On chapter mount, `ChapterReader` calls `saveProgress()` (exported from `ContinueReadingButton.tsx`), which writes `{ bookSlug, chapterSlug, bookTitle, chapterTitle }` to `localStorage` key `neferet_progress`. On the homepage, `<ContinueReadingButton>` reads this key on mount and renders a resume link. No server involvement; no user account needed. See [`.claude/docs/progress_tracking.md`](.claude/docs/progress_tracking.md).

**Email signups:** `<NewsletterSignup>` POSTs `{ email }` to `/api/newsletter/subscribe`. That route proxies to the ConvertKit v3 subscribe endpoint using server-only env vars. When `CONVERTKIT_API_KEY` is unset, the route returns 200 with a warning — safe for local dev.

---

## 5. Key Constraints

- **No authentication.** The site is fully public. Never add middleware that gates routes or session checks.
- **No `tailwind.config.ts`.** Tailwind v4 is configured entirely inside `src/app/globals.css` via `@theme`. Creating a config file breaks the build.
- **Shadcn components in `src/components/ui/` were written manually.** Do not run `npx shadcn add` — it overwrites customizations. Edit files directly.
- **Egyptian color palette lives in CSS variables only.** `--gold`, `--sand`, `--indigo-deep` etc. are in `globals.css`. Use `text-gold`, `bg-sand` via Tailwind's `@theme inline` mapping. Never hardcode color values in components.
- **`"use client"` boundary is explicit.** Hooks, `localStorage`, and event listeners live only in `"use client"` components. Server Component `page.tsx` files pass data as props to client wrappers — never import client components at the top of a server module.
- **Character profile content is data-driven.** Never hardcode character names, ages, or descriptions in JSX. Canonical source is the `characters` table. The fallback array in `src/app/characters/page.tsx` mirrors the seed data — keep them in sync.
- **`notFound()` is the only valid 404 path.** Call it from page components when a slug resolves to null. Do not throw or return null.
- **Supabase client is lazy.** Never import a singleton `supabase` object. Always call `getSupabase()` inside async functions to avoid build-time crashes when env vars are absent.
- **Branch Management**: Before adding any features or fix bugs, always work on a new git branch. Never commit directly on main. Bug branches must follow naming convention bug/[des], feature branches follow naming convention feature/[des]

---

## 6. Additional Documentation

| Domain | File |
|---|---|
| Route map, component hierarchy, Server/Client split | [`.claude/docs/site_structure.md`](.claude/docs/site_structure.md) |
| Supabase schema, TypeScript types, data helpers, seeding | [`.claude/docs/content_schema.md`](.claude/docs/content_schema.md) |
| localStorage progress tracking, hooks, component wiring | [`.claude/docs/progress_tracking.md`](.claude/docs/progress_tracking.md) |
