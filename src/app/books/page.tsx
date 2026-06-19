import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { getBooks } from "@/lib/data"

export const metadata: Metadata = {
  title: "Books",
  description: "Read The Eight Gate, Princess Neferet, and The Journey Home — the complete Neferet Trilogy.",
}

export default async function BooksPage() {
  let books: Awaited<ReturnType<typeof getBooks>> = []
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">The Neferet Trilogy</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">The Books</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A three-part epic spanning two worlds and four thousand years of history, myth, and love.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {books.map((book, i) => (
          <Card key={book.slug} className="flex flex-col hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-[oklch(0.28_0.06_68)] to-[oklch(0.22_0.04_260)] rounded-t-xl p-8 flex flex-col gap-2 min-h-[140px] justify-end">
              <span className="text-xs uppercase tracking-widest text-white/40">Book {i + 1}</span>
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">{book.title}</h2>
              {book.status === "coming_soon" && (
                <Badge variant="secondary" className="w-fit text-xs">Coming Soon</Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm leading-relaxed">{book.short_description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
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

      <div className="border-t border-border pt-16">
        <NewsletterSignup variant="full" />
      </div>
    </div>
  )
}
