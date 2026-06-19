import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { getBook, getBooks, getChaptersByBook } from "@/lib/data"
import { BookOpen, ChevronRight } from "lucide-react"

interface Props {
  params: Promise<{ bookSlug: string }>
}

export async function generateStaticParams() {
  try {
    const books = await getBooks()
    return books.map((b) => ({ bookSlug: b.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookSlug } = await params
  try {
    const book = await getBook(bookSlug)
    if (!book) return {}
    return { title: book.title, description: book.short_description ?? undefined }
  } catch {
    return {}
  }
}

export default async function BookPage({ params }: Props) {
  const { bookSlug } = await params
  let book, chapters

  try {
    book = await getBook(bookSlug)
    if (!book) notFound()
    chapters = await getChaptersByBook(book.id)
  } catch {
    notFound()
  }

  const bookNumber = book.order

  return (
    <div>
      {/* Book hero */}
      <div className="bg-gradient-to-br from-[oklch(0.22_0.04_68)] to-[oklch(0.14_0.03_260)] text-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/books" className="hover:text-white transition-colors">Books</Link>
            <ChevronRight className="size-3" />
            <span className="text-white/70">Book {bookNumber}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mb-4">{book.title}</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed text-lg">{book.short_description}</p>
          {book.status === "coming_soon" && (
            <Badge variant="secondary" className="mt-4">Coming Soon</Badge>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        {/* Chapter list */}
        {chapters.length > 0 ? (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <BookOpen className="size-5 text-primary" />
              Chapters
            </h2>
            <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
              {chapters.map((chapter, i) => (
                <li key={chapter.slug}>
                  <Link
                    href={`/books/${bookSlug}/${chapter.slug}`}
                    className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {chapter.title}
                      </span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Start reading CTA */}
            <div className="mt-8 text-center">
              <Button asChild size="lg" variant="gold">
                <Link href={`/books/${bookSlug}/${chapters[0]?.slug}`}>
                  Start Reading Chapter 1
                </Link>
              </Button>
            </div>
          </section>
        ) : (
          <section className="mb-16 text-center py-12 text-muted-foreground">
            <p>Chapters coming soon — join the newsletter to be notified.</p>
          </section>
        )}

        <Separator className="my-12" />

        {/* Newsletter */}
        <NewsletterSignup variant="full" />
      </div>
    </div>
  )
}
