import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { ContinueReadingButton } from "@/components/ContinueReadingButton"
import { getBooks } from "@/lib/data"
import { Scroll, Star, Clock } from "lucide-react"
import type { Book } from "@/lib/database.types"

const BOOK_GRADIENTS = [
  "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 45%, oklch(0.12 0.04 260) 100%)",
  "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.26 0.10 65) 45%, oklch(0.16 0.05 50) 100%)",
  "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 45%, oklch(0.14 0.04 265) 100%)",
]

export default async function HomePage() {
  let books: Book[] = []
  try {
    books = await getBooks()
  } catch {
    // Supabase not configured — fall through to placeholders
  }

  const bookPlaceholders: Book[] = [
    { slug: "the-eight-gate", title: "The Eight Gate", short_description: "Graduate student John Carter discovers an ancient portal hidden beneath an Indiana cave. When he steps through, he finds himself in ancient Egypt and becomes entangled in a destiny that spans thousands of years.", status: "published", order: 1, id: "1", created_at: "" },
    { slug: "princess-neferet", title: "Princess Neferet", short_description: "After crossing five thousand years into the future, Princess Neferet must learn to navigate a world of talking rocks, metal birds, and endless wonders while longing for the family she left behind.", status: "published", order: 2, id: "2", created_at: "" },
    { slug: "the-journey-home", title: "The Journey Home", short_description: "Returning to ancient Egypt, John and Neferet must discover where they truly belong and whether love can survive the pull of time itself.", status: "coming_soon", order: 3, id: "3", created_at: "" },
  ]

  const displayBooks = books.length > 0 ? books : bookPlaceholders

  return (
    <div className="dark flex flex-col" style={{ background: "oklch(0.08 0.015 262)" }}>
      {/* ── Hero — kept exactly as original ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.22_0.04_68)] to-[oklch(0.14_0.03_260)] text-white py-28 sm:py-40">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none">
          <span className="text-[32rem] font-serif leading-none">𓂀</span>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[oklch(0.75_0.12_75)] mb-4">
            A love that crossed two worlds and spanned 4000 years
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            The Neferet Trilogy
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            A timeless adventure of love, destiny, and the mysteries hidden beyond the Eight Gate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="xl" variant="gold">
              <Link href="/books/the-eight-gate">Read Book One</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/books/princess-neferet">Read Book Two</Link>
            </Button>
            <Button asChild size="xl" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              <Link href="#newsletter">Join Email List</Link>
            </Button>
          </div>
          <div className="mt-8">
            <ContinueReadingButton />
          </div>
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section
        className="py-6"
        style={{
          background: "oklch(0.10 0.02 262)",
          borderBottom: "1px solid oklch(0.22 0.03 260)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm">
            {[
              { Icon: Scroll, label: "Three-book epic adventure" },
              { Icon: Clock, label: "Ancient Egypt · Modern world" },
              { Icon: Star, label: "Free to read online" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: "oklch(0.55 0.03 70)" }}>
                <Icon className="size-4" style={{ color: "oklch(0.65 0.12 70)" }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Books preview ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-xs uppercase tracking-[0.4em] mb-4"
              style={{ color: "oklch(0.58 0.14 68)" }}
            >
              ◈ &nbsp; The Series &nbsp; ◈
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "oklch(0.94 0.025 75)",
              }}
            >
              Three Books. One Destiny.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayBooks.map((book, i) => (
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
                  className="relative flex flex-col justify-end gap-1.5 px-6 py-7 min-h-[140px] overflow-hidden"
                  style={{ background: BOOK_GRADIENTS[i] }}
                >
                  <span
                    className="absolute right-4 top-3 select-none font-bold leading-none opacity-15"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      color: "oklch(0.85 0.10 72)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: "oklch(0.58 0.10 70)" }}
                  >
                    Book {i + 1}
                  </p>
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "oklch(0.94 0.025 75)",
                    }}
                  >
                    {book.title}
                  </h3>
                  {book.status === "coming_soon" && (
                    <span
                      className="w-fit text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "oklch(0.20 0.04 260 / 0.6)",
                        border: "1px solid oklch(0.35 0.04 260)",
                        color: "oklch(0.65 0.04 70)",
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="flex-1 px-5 py-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.58 0.025 70)", fontFamily: "Georgia, serif" }}
                  >
                    {book.short_description}
                  </p>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  {book.status === "coming_soon" ? (
                    <button
                      disabled
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{
                        background: "oklch(0.16 0.02 260)",
                        border: "1px solid oklch(0.26 0.03 260)",
                        color: "oklch(0.40 0.025 260)",
                        cursor: "not-allowed",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.05em",
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
      </section>

      {/* ── Newsletter ── */}
      <section
        id="newsletter"
        className="py-20"
        style={{
          background: "oklch(0.10 0.02 262)",
          borderTop: "1px solid oklch(0.22 0.03 260)",
        }}
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <NewsletterSignup variant="full" />
        </div>
      </section>
    </div>
  )
}
