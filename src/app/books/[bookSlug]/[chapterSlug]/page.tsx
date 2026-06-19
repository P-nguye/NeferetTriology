import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ChapterReader } from "@/components/ChapterReader"
import { getBook, getBooks, getChapter, getChaptersByBook, getAdjacentChapters } from "@/lib/data"

interface Props {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}

export async function generateStaticParams() {
  try {
    const books = await getBooks()
    const results: { bookSlug: string; chapterSlug: string }[] = []
    for (const book of books) {
      const chapters = await getChaptersByBook(book.id)
      for (const chapter of chapters) {
        results.push({ bookSlug: book.slug, chapterSlug: chapter.slug })
      }
    }
    return results
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookSlug, chapterSlug } = await params
  try {
    const book = await getBook(bookSlug)
    if (!book) return {}
    const chapter = await getChapter(book.id, chapterSlug)
    if (!chapter) return {}
    return {
      title: `${chapter.title} — ${book.title}`,
      description: `Read ${chapter.title} from ${book.title}, part of the Neferet Trilogy.`,
    }
  } catch {
    return {}
  }
}

export default async function ChapterPage({ params }: Props) {
  const { bookSlug, chapterSlug } = await params

  let book, chapter, adjacent
  try {
    book = await getBook(bookSlug)
    if (!book) notFound()
    chapter = await getChapter(book.id, chapterSlug)
    if (!chapter) notFound()
    adjacent = await getAdjacentChapters(book.id, chapter.order)
  } catch {
    notFound()
  }

  return (
    <div>
      {/* Chapter header */}
      <header className="border-b border-border bg-card py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
            <Link href="/books" className="hover:text-primary transition-colors">Books</Link>
            <ChevronRight className="size-3" />
            <Link href={`/books/${bookSlug}`} className="hover:text-primary transition-colors">{book.title}</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{chapter.title}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{chapter.title}</h1>
        </div>
      </header>

      {/* Reading view — client component handles localStorage + scroll bar */}
      <ChapterReader
        bookSlug={bookSlug}
        bookTitle={book.title}
        chapterSlug={chapterSlug}
        chapterTitle={chapter.title}
        content={chapter.content}
        prev={adjacent.prev ? { slug: adjacent.prev.slug, title: adjacent.prev.title } : null}
        next={adjacent.next ? { slug: adjacent.next.slug, title: adjacent.next.title } : null}
      />
    </div>
  )
}
