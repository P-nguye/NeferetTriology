import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBooks } from "@/lib/data"
import type { Book } from "@/lib/database.types"

export const metadata: Metadata = {
  title: "Books",
  description: "Read The Eight Gate, Princess Neferet, and The Journey Home — the complete Neferet Trilogy.",
}

const BOOK_GRADIENTS = [
  "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 45%, oklch(0.12 0.04 260) 100%)",
  "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.26 0.10 65) 45%, oklch(0.16 0.05 50) 100%)",
  "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 45%, oklch(0.14 0.04 265) 100%)",
]

const BOOK_GLYPHS = ["◈", "𓂀", "𓃭"]

export default async function BooksPage() {
  let books: Book[] = []
  try {
    books = await getBooks()
  } catch {
    // Supabase not configured
  }

  if (books.length === 0) {
    books = [
      { id: "1", slug: "the-eight-gate", title: "The Eight Gate", short_description: "Graduate student John Carter discovers an ancient portal hidden beneath an Indiana cave. When he steps through, he finds himself in ancient Egypt and becomes entangled in a destiny that spans thousands of years.", status: "published", order: 1, created_at: "" },
      { id: "2", slug: "princess-neferet", title: "Princess Neferet", short_description: "After crossing five thousand years into the future, Princess Neferet must learn to navigate a world of talking rocks, metal birds, and endless wonders while longing for the family she left behind.", status: "published", order: 2, created_at: "" },
      { id: "3", slug: "the-journey-home", title: "The Journey Home", short_description: "Returning to ancient Egypt, John and Neferet must discover where they truly belong and whether love can survive the pull of time itself.", status: "coming_soon", order: 3, created_at: "" },
    ]
  }

  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.06 0.02 265) 0%, oklch(0.10 0.025 260) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-36 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.58 0.14 68 / 0.08) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; The Neferet Trilogy &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 50px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            The Books
          </h1>
          <p
            className="max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.58 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            A three-part epic spanning two worlds and four thousand years of history, myth, and love.
          </p>
        </div>
      </div>

      {/* Book cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-20">
          {books.map((book, i) => (
            <div
              key={book.slug}
              className="card-glow-hover flex flex-col overflow-hidden rounded-xl"
              style={{
                background: "oklch(0.11 0.025 260)",
                border: "1px solid oklch(0.20 0.03 260)",
              }}
            >
              {/* Banner */}
              <div
                className="relative flex flex-col justify-end gap-2 px-7 pt-7 pb-6 min-h-[170px] overflow-hidden"
                style={{ background: BOOK_GRADIENTS[i] }}
              >
                {/* Big glyph watermark */}
                <span
                  className="absolute right-5 top-4 select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "5.5rem",
                    color: "oklch(0.80 0.10 72)",
                    opacity: 0.12,
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {BOOK_GLYPHS[i]}
                </span>

                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: "oklch(0.58 0.10 70)" }}
                >
                  Book {i + 1}
                </p>
                <h2
                  className="text-2xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(0.94 0.025 75)",
                  }}
                >
                  {book.title}
                </h2>
                {book.status === "coming_soon" && (
                  <span
                    className="w-fit text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.20 0.04 260 / 0.7)",
                      border: "1px solid oklch(0.35 0.04 260)",
                      color: "oklch(0.60 0.04 70)",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="flex-1 px-6 py-5">
                <p
                  className="text-sm leading-[1.75]"
                  style={{ color: "oklch(0.58 0.025 70)", fontFamily: "Georgia, serif" }}
                >
                  {book.short_description}
                </p>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                {book.status === "coming_soon" ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-lg text-sm font-medium"
                    style={{
                      background: "oklch(0.16 0.02 260)",
                      border: "1px solid oklch(0.26 0.03 260)",
                      color: "oklch(0.38 0.025 260)",
                      cursor: "not-allowed",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Button asChild variant="gold" className="w-full">
                    <Link href={`/books/${book.slug}`}>Read Book {i + 1}</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
