# Content Schema

## Overview

All content is stored in Supabase (PostgreSQL). There are no flat content files in the repository. The `content` field on chapters, lore articles, and blog posts stores raw markdown strings, rendered at runtime by `react-markdown`.

**Schema SQL:** `document/supabase_schema.sql`
**Seed SQL:** `document/supabase_seed.sql`

Run both in order in the Supabase SQL Editor when setting up a new project.

---

## Tables

### `books`

```sql
id               uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug             text UNIQUE NOT NULL       -- URL segment: "the-eight-gate"
title            text NOT NULL
short_description text
"order"          int NOT NULL               -- display sort (1, 2, 3)
status           text DEFAULT 'published'   -- 'published' | 'coming_soon'
created_at       timestamptz DEFAULT now()
```

Slugs used in routes:
- `the-eight-gate`
- `princess-neferet`
- `the-journey-home`

### `chapters`

```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
book_id      uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE
slug         text NOT NULL                  -- URL segment: "the-cave"
title        text NOT NULL                  -- display title: "Chapter 1: The Cave"
"order"      int NOT NULL                   -- sort within book
content      text NOT NULL                  -- raw markdown string
published_at timestamptz
UNIQUE(book_id, slug)
```

`order` is used by `getAdjacentChapters()` to find prev/next via `lt` and `gt` queries.

### `characters`

```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
name         text NOT NULL
age          text                           -- e.g. "24" or "Mid-50s"
role         text NOT NULL                  -- 'main' | 'royal_family'
description  text
personality  text                           -- comma-separated traits: "Wise, Strategic, Protective"
story_role   text
book_ids     text[]  DEFAULT '{}'           -- slugs of books character appears in
"order"      int NOT NULL DEFAULT 0
```

`personality` is split by comma in `<CharacterCard>` to render individual `<Badge>` elements. Keep it comma-separated, no trailing comma.

`role` controls which section the character appears in on `/characters`:
- `'main'` → Main Characters grid
- `'royal_family'` → Royal Family section + `<FamilyTree>`

### `lore_articles`

```sql
id       uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug     text UNIQUE NOT NULL
title    text NOT NULL
content  text                               -- raw markdown
category text                               -- display label: "Setting", "Mythology", etc.
"order"  int NOT NULL DEFAULT 0
```

### `blog_posts`

```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug         text UNIQUE NOT NULL
title        text NOT NULL
content      text                           -- raw markdown
published_at timestamptz                    -- NULL = draft; only non-null rows returned by getBlogPosts()
excerpt      text                           -- plain text shown in listing cards
```

---

## TypeScript Types

Defined in `src/lib/database.types.ts`. All types are used throughout the app — do not rename fields without updating this file.

```typescript
type BookStatus = "published" | "coming_soon"
type CharacterRole = "main" | "royal_family"

interface Book { id, slug, title, short_description, order, status, created_at }
interface Chapter { id, book_id, slug, title, order, content, published_at }
interface Character { id, name, age, role, description, personality, story_role, book_ids, order }
interface LoreArticle { id, slug, title, content, category, order }
interface BlogPost { id, slug, title, content, published_at, excerpt }
```

The `Database` interface wraps these into a Supabase-compatible generic:
```typescript
interface Database {
  public: {
    Tables: {
      books: { Row: Book; Insert: ...; Update: ... }
      // ...
    }
  }
}
```

---

## Data Fetch Helpers

All helpers are in `src/lib/data.ts`. Each calls `getSupabase()` internally — see `src/lib/supabase.ts`.

| Function | Returns | Notes |
|---|---|---|
| `getBooks()` | `Promise<Book[]>` | Ordered by `order` ASC |
| `getBook(slug)` | `Promise<Book \| null>` | Single row by slug |
| `getChaptersByBook(bookId)` | `Promise<Chapter[]>` | Ordered by `order` ASC |
| `getChapter(bookId, slug)` | `Promise<Chapter \| null>` | Unique on `(book_id, slug)` |
| `getAdjacentChapters(bookId, currentOrder)` | `Promise<{ prev, next }>` | Uses `lt`/`gt` on `order`; returns `null` for missing neighbors |
| `getCharacters()` | `Promise<Character[]>` | Ordered by `order` ASC |
| `getLoreArticles()` | `Promise<LoreArticle[]>` | Ordered by `order` ASC |
| `getLoreArticle(slug)` | `Promise<LoreArticle \| null>` | |
| `getBlogPosts()` | `Promise<BlogPost[]>` | Filters `published_at IS NOT NULL`; ordered by date DESC |
| `getBlogPost(slug)` | `Promise<BlogPost \| null>` | |

**Error behavior:** All helpers throw on Supabase errors (except single-row fetches which return `null` on `PGRST116`). Callers in `page.tsx` files wrap in `try/catch` and fall back to hardcoded placeholder data.

---

## Supabase Client

`src/lib/supabase.ts` exports a single function:

```typescript
export function getSupabase(): SupabaseClient<Database>
```

It validates `NEXT_PUBLIC_SUPABASE_URL` is a real HTTP URL before calling `createClient`. If invalid or missing, it throws with a descriptive message. This prevents the Supabase SDK from throwing its own opaque error at build time.

**Never** import a module-level `supabase` singleton — the prior pattern was removed precisely because it crashed the build when env vars were absent. Always call `getSupabase()` inside an `async` function body.

---

## Row-Level Security

All tables have RLS enabled. The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is sufficient for read access — the seed SQL creates `SELECT` policies for `true` on all tables, except `blog_posts` which filters on `published_at IS NOT NULL`.

Write access (INSERT/UPDATE/DELETE) requires the service role key, which is never used in this app. Content edits go through the Supabase dashboard or a future admin panel.

---

## Adding Content

### New chapter
1. Insert a row into `chapters` with the correct `book_id`, a unique `slug`, the next `order` integer, and full markdown in `content`.
2. Set `published_at` to `now()` to make it visible.
3. Run `npm run build` — `generateStaticParams` picks up the new slug and pre-renders the route.

### New character
1. Insert into `characters` with `role` = `'main'` or `'royal_family'`.
2. For `royal_family` characters, `<FamilyTree>` finds members by searching `name` for `"khufu"`, `"meritites"`, `"neferet"`, or `"henutsen"` (case-insensitive substring match). If you add a new royal family member with a different name, you must also update `FamilyTree.tsx`.

### Draft blog post
Insert with `published_at = NULL`. It will not appear in `/blog` or the sitemap until `published_at` is set.
