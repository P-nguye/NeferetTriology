# Site Structure

## Route Map

All routes live under `src/app/`. Next.js App Router convention: `page.tsx` = route, `layout.tsx` = shared shell.

```
src/app/
├── layout.tsx                              # Root shell: <Navbar> + <main> + <Footer>
├── page.tsx                                # / → Homepage
├── robots.ts                               # /robots.txt (generated)
├── sitemap.ts                              # /sitemap.xml (generated, queries Supabase)
├── globals.css                             # Tailwind v4 @theme + CSS variables + base styles
│
├── books/
│   ├── page.tsx                            # /books → Books listing (3 cards)
│   └── [bookSlug]/
│       ├── page.tsx                        # /books/[bookSlug] → Synopsis + chapter list
│       └── [chapterSlug]/
│           └── page.tsx                    # /books/[bookSlug]/[chapterSlug] → Reading view
│
├── characters/
│   └── page.tsx                            # /characters → Main chars + Royal Family tree
│
├── world/
│   ├── page.tsx                            # /world → Lore hub (article card grid)
│   └── [articleSlug]/
│       └── page.tsx                        # /world/[articleSlug] → Article detail
│
├── animation/
│   └── page.tsx                            # /animation → "In Development" placeholder
│
├── author/
│   └── page.tsx                            # /author → Static narrative page
│
├── blog/
│   ├── page.tsx                            # /blog → Post listing
│   └── [slug]/
│       └── page.tsx                        # /blog/[slug] → Post detail
│
├── contact/
│   ├── page.tsx                            # /contact → Server shell (exports metadata)
│   └── ContactForm.tsx                     # Client form component (useState)
│
└── api/
    └── newsletter/
        └── subscribe/
            └── route.ts                    # POST /api/newsletter/subscribe → ConvertKit proxy
```

### Static vs Dynamic Routes

| Symbol | Meaning | Routes |
|---|---|---|
| `○` Static | Pre-rendered at build, no data needed | `/`, `/animation`, `/author`, `/blog`, `/books`, `/characters`, `/contact`, `/world` |
| `●` SSG | Pre-rendered with `generateStaticParams` | `/blog/[slug]`, `/books/[bookSlug]`, `/books/[bookSlug]/[chapterSlug]`, `/world/[articleSlug]` |
| `ƒ` Dynamic | Server-rendered per request | `/api/newsletter/subscribe` |

`generateStaticParams` in each dynamic route calls Supabase at build time. When Supabase is unconfigured, it returns `[]` — the build still passes; those routes 404 at runtime.

---

## Component Inventory

All components live in `src/components/`. Shadcn primitives are in `src/components/ui/`.

### Layout Components (always rendered via `layout.tsx`)

| Component | File | Boundary | Notes |
|---|---|---|---|
| `Navbar` | `Navbar.tsx` | `"use client"` | Uses `usePathname()` for active link styling. Sheet-based mobile drawer via Radix Dialog. |
| `Footer` | `Footer.tsx` | Server | Renders `<NewsletterSignup variant="compact">`. |

### Feature Components

| Component | File | Boundary | Purpose |
|---|---|---|---|
| `NewsletterSignup` | `NewsletterSignup.tsx` | `"use client"` | Email form. Props: `variant: "full" \| "compact"`, `className`. POSTs to `/api/newsletter/subscribe`. |
| `ContinueReadingButton` | `ContinueReadingButton.tsx` | `"use client"` | Reads `localStorage` on mount; renders a resume link or nothing. Also exports `saveProgress()` and `getStoredProgress()`. |
| `ChapterReader` | `ChapterReader.tsx` | `"use client"` | Full reading shell. Calls `saveProgress()` on mount, renders `<ScrollProgressBar>`, `react-markdown` content, prev/next nav, and `<NewsletterSignup>`. |
| `ScrollProgressBar` | `ScrollProgressBar.tsx` | `"use client"` | Fixed top bar. Width driven by `useScrollProgress` hook. |
| `CharacterCard` | `CharacterCard.tsx` | Server | Displays one `Character` row. Parses `personality` string by comma to render `<Badge>` tags. |
| `FamilyTree` | `FamilyTree.tsx` | Server | Pure CSS flexbox tree for the Royal Family. Finds members by name substring from the passed `royalFamily` array. Falls back to empty card if a member is missing. |

### Shadcn UI Primitives (`src/components/ui/`)

`button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `separator.tsx`, `sheet.tsx`

All were written manually. **Do not run `npx shadcn add`** — it will overwrite customizations, including the custom `gold` and `indigo` variants on `Button` and `Badge`.

---

## Server / Client Component Split

The rule: `page.tsx` files are Server Components. They fetch data and pass it as props. Client interactivity is isolated in named client wrapper components.

```
page.tsx (Server)
  └── fetches data from Supabase (or uses fallback)
      └── passes props to:
          ├── <CharacterCard> (Server — no hooks)
          ├── <FamilyTree> (Server — no hooks)
          └── <ChapterReader> (Client — useEffect, localStorage)
                └── <ScrollProgressBar> (Client — useScrollProgress hook)
                └── <NewsletterSignup> (Client — useState, fetch)
```

**Key rule:** Never import a `"use client"` component at the top level of a Server Component without passing through a prop boundary. The pattern is always: Server fetches → passes serializable props → Client renders.

---

## Styling System

Tailwind v4 is configured entirely in `src/app/globals.css`. There is no `tailwind.config.ts`.

**`@theme inline` block** maps CSS variables to Tailwind utility names:
- `--color-gold: var(--gold)` → usable as `text-gold`, `bg-gold`, `border-gold`
- `--color-indigo-deep: var(--indigo-deep)` → `bg-indigo-deep` etc.

**`@custom-variant dark`** enables `.dark` class-based dark mode (not `prefers-color-scheme`).

Custom classes defined in `globals.css`:
- `.prose-chapter` — serif font, 1.85 line-height for reading view
- `.divider-egypt` — flexbox ornamental divider with gold gradient lines

---

## Navigation Flow

```
Homepage (/)
  ├── "Read Book One" → /books/the-eight-gate
  ├── "Read Book Two" → /books/princess-neferet
  ├── "Join Email List" → /#newsletter (anchor scroll)
  └── "Continue Reading" → /books/[bookSlug]/[chapterSlug]  (only if localStorage set)

/books/[bookSlug]
  └── Chapter list item → /books/[bookSlug]/[chapterSlug]

/books/[bookSlug]/[chapterSlug]
  ├── ← Previous Chapter → /books/[bookSlug]/[prevSlug]
  ├── Next Chapter → → /books/[bookSlug]/[nextSlug]
  └── (if first chapter) ← Back to book → /books/[bookSlug]
```

The chapter breadcrumb always renders: `Books → [Book Title] → [Chapter Title]`.
