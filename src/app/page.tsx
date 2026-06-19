import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { ContinueReadingButton } from "@/components/ContinueReadingButton"
import { getBooks } from "@/lib/data"
import { Scroll, Star, Clock } from "lucide-react"

export default async function HomePage() {
  let books: Awaited<ReturnType<typeof getBooks>> = []
  try {
    books = await getBooks()
  } catch {
    // Supabase not configured yet — fall through to placeholders
  }

  const bookPlaceholders = [
    {
      slug: "the-eight-gate",
      title: "The Eight Gate",
      short_description:
        "Graduate student John Carter discovers an ancient portal hidden beneath an Indiana cave. When he steps through, he finds himself in ancient Egypt and becomes entangled in a destiny that spans thousands of years.",
      status: "published" as const,
      order: 1,
      id: "1",
      created_at: "",
    },
    {
      slug: "princess-neferet",
      title: "Princess Neferet",
      short_description:
        "After crossing five thousand years into the future, Princess Neferet must learn to navigate a world of talking rocks, metal birds, and endless wonders while longing for the family she left behind.",
      status: "published" as const,
      order: 2,
      id: "2",
      created_at: "",
    },
    {
      slug: "the-journey-home",
      title: "The Journey Home",
      short_description:
        "Returning to ancient Egypt, John and Neferet must discover where they truly belong and whether love can survive the pull of time itself.",
      status: "coming_soon" as const,
      order: 3,
      id: "3",
      created_at: "",
    },
  ]

  const displayBooks = books.length > 0 ? books : bookPlaceholders

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.22_0.04_68)] to-[oklch(0.14_0.03_260)] text-white py-28 sm:py-40">
        {/* Decorative glyph watermark */}
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
      <section className="bg-muted border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Scroll className="size-4 text-primary" />
              <span>Three-book epic adventure</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <span>Ancient Egypt · Modern world</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-4 text-primary" />
              <span>Free to read online</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Books ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-egypt mb-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">The Series</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              Three Books. One Destiny.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBooks.map((book, i) => (
              <Card key={book.slug} className="flex flex-col hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-[oklch(0.28_0.06_68)] to-[oklch(0.22_0.04_260)] rounded-t-xl p-6 flex items-end justify-between min-h-[100px]">
                  <span className="font-serif text-5xl font-bold text-white/20 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {book.status === "coming_soon" && (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{book.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{book.short_description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="pt-0">
                  {book.status === "coming_soon" ? (
                    <Button variant="outline" disabled className="w-full">Coming Soon</Button>
                  ) : (
                    <Button asChild variant="gold" className="w-full">
                      <Link href={`/books/${book.slug}`}>Read Book {i + 1}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-20 bg-muted border-t border-border">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <NewsletterSignup variant="full" />
        </div>
      </section>
    </div>
  )
}
