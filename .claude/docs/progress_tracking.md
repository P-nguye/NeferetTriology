# Progress Tracking

## Architecture Summary

Reading progress is tracked entirely in the browser via `localStorage`. There is no server state, no session, and no user account. Progress is a single JSON object written once per chapter visit and read once on the homepage.

---

## Storage Contract

**Key:** `neferet_progress`
**Storage:** `window.localStorage`
**Value shape:**

```typescript
interface ReadingProgress {
  bookSlug: string      // e.g. "the-eight-gate"
  chapterSlug: string   // e.g. "the-cave"
  bookTitle: string     // e.g. "The Eight Gate"
  chapterTitle: string  // e.g. "Chapter 1: The Cave"
}
```

Only one entry exists at a time — the most recently visited chapter. There is no history stack, no per-book tracking, and no chapter completion state. If a reader visits Chapter 3 and then Chapter 1, the stored value is Chapter 1.

---

## Write Path

**File:** `src/components/ContinueReadingButton.tsx`

`saveProgress()` is exported as a named function and called from `ChapterReader`:

```typescript
export function saveProgress(progress: ReadingProgress) {
  if (typeof window === "undefined") return   // SSR guard
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}
```

The `typeof window === "undefined"` guard is required because Next.js server-renders component trees. Without it, the call would throw during SSR even though `ChapterReader` is a `"use client"` component (the guard is defensive depth).

**Trigger:** `ChapterReader` calls `saveProgress()` inside a `useEffect` with the chapter props as dependencies:

```typescript
useEffect(() => {
  saveProgress({ bookSlug, chapterSlug, bookTitle, chapterTitle })
}, [bookSlug, chapterSlug, bookTitle, chapterTitle])
```

This runs once on mount (first render in the browser). It does not debounce or wait for scroll depth — progress is saved immediately when the chapter page loads.

---

## Read Path

**File:** `src/components/ContinueReadingButton.tsx`

`getStoredProgress()` is exported for use anywhere localStorage needs to be read:

```typescript
export function getStoredProgress(): ReadingProgress | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ReadingProgress) : null
  } catch {
    return null
  }
}
```

The `try/catch` around `JSON.parse` handles corrupted or stale data gracefully — it returns `null` rather than throwing, so the UI degrades cleanly.

---

## Display: ContinueReadingButton

**File:** `src/components/ContinueReadingButton.tsx`
**Used in:** `src/app/page.tsx` (homepage hero section)

```typescript
export function ContinueReadingButton() {
  const [progress, setProgress] = useState<ReadingProgress | null>(null)

  useEffect(() => {
    setProgress(getStoredProgress())
  }, [])

  if (!progress) return null

  return (
    <Button asChild variant="outline" size="lg">
      <Link href={`/books/${progress.bookSlug}/${progress.chapterSlug}`}>
        <BookOpen className="size-4" />
        Continue: {progress.chapterTitle}
      </Link>
    </Button>
  )
}
```

**Why `useState` + `useEffect` instead of reading directly:** `getStoredProgress()` returns `null` during SSR (window guard). If the component read localStorage synchronously during render, the server and client would produce different output, causing a React hydration mismatch. Deferring the read to `useEffect` means the server always renders nothing, and the client hydrates with nothing, then updates to show the button — no mismatch.

The component returns `null` when no progress is stored, so it is invisible to first-time visitors. No placeholder or skeleton is rendered.

---

## Scroll Progress Bar

**Hook:** `src/hooks/useScrollProgress.ts`
**Component:** `src/components/ScrollProgressBar.tsx`
**Used in:** `ChapterReader.tsx`

The scroll bar tracks how far through the **current page** the reader has scrolled. This is distinct from cross-session progress tracking — it resets on every page load.

```typescript
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return progress
}
```

`passive: true` is required on the scroll listener to avoid blocking the browser's scroll paint thread.

The `ScrollProgressBar` renders a `position: fixed` div whose `width` is set inline from the hook value:

```tsx
<div
  className="fixed top-0 left-0 z-50 h-1 bg-primary transition-[width] duration-75 ease-linear"
  style={{ width: `${progress}%` }}
/>
```

It sits above the sticky `Navbar` (z-index 40) at z-index 50. It has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for accessibility.

---

## Data Flow Diagram

```
User visits /books/the-eight-gate/the-cave
  │
  └── ChapterPage (Server Component)
        fetches chapter + adjacent from Supabase
        renders <ChapterReader> with props
              │
              └── ChapterReader (Client Component)
                    useEffect on mount
                      └── saveProgress({ bookSlug: "the-eight-gate", chapterSlug: "the-cave", ... })
                            └── localStorage.setItem("neferet_progress", JSON.stringify({...}))

User navigates to /
  │
  └── HomePage (Server Component)
        renders <ContinueReadingButton>
              │
              └── ContinueReadingButton (Client Component)
                    useEffect on mount
                      └── getStoredProgress()
                            └── localStorage.getItem("neferet_progress")
                                  └── renders <Link href="/books/the-eight-gate/the-cave">
                                                "Continue: Chapter 1: The Cave"
```

---

## Edge Cases and Constraints

- **First visit:** `localStorage` key absent → `getStoredProgress()` returns `null` → `ContinueReadingButton` renders nothing.
- **Corrupted data:** `JSON.parse` throws → caught → returns `null` → same result as above.
- **Private browsing / storage disabled:** `localStorage.setItem` may throw in some environments. The `typeof window === "undefined"` guard does not protect against this. If this becomes a concern, wrap the `setItem` call in `try/catch`.
- **Cross-device sync:** Not supported. Progress is device-local.
- **Clearing progress:** No UI for this. Clear `localStorage.removeItem("neferet_progress")` in the browser console.
- **Book 3 (coming soon):** The `status: "coming_soon"` flag on a book prevents chapter links from rendering. If a user has stored progress for a chapter in a coming-soon book, `ContinueReadingButton` will still render the link — it trusts the stored slugs. Ensure that coming-soon books have no published chapters.
