"use client"

import { useEffect } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { ScrollProgressBar } from "./ScrollProgressBar"
import { NewsletterSignup } from "./NewsletterSignup"
import { saveProgress } from "./ContinueReadingButton"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AdjacentChapter {
  slug: string
  title: string
}

interface Props {
  bookSlug: string
  bookTitle: string
  chapterTitle: string
  chapterSlug: string
  content: string
  prev: AdjacentChapter | null
  next: AdjacentChapter | null
}

export function ChapterReader({ bookSlug, bookTitle, chapterTitle, chapterSlug, content, prev, next }: Props) {
  // Save reading progress to localStorage on mount
  useEffect(() => {
    saveProgress({ bookSlug, chapterSlug, bookTitle, chapterTitle })
  }, [bookSlug, chapterSlug, bookTitle, chapterTitle])

  return (
    <>
      <ScrollProgressBar />

      {/* Chapter text */}
      <article className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <div className="prose-chapter">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>

      {/* Navigation */}
      <nav className="border-t border-border py-8 bg-muted">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 flex items-center justify-between gap-4">
          {prev ? (
            <Button asChild variant="outline" className="gap-2">
              <Link href={`/books/${bookSlug}/${prev.slug}`}>
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Previous: </span>
                {prev.title}
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" className="gap-2 text-muted-foreground">
              <Link href={`/books/${bookSlug}`}>
                <ChevronLeft className="size-4" />
                Back to book
              </Link>
            </Button>
          )}

          {next ? (
            <Button asChild variant="gold" className="gap-2">
              <Link href={`/books/${bookSlug}/${next.slug}`}>
                <span className="hidden sm:inline">Next: </span>
                {next.title}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">End of available chapters</p>
            </div>
          )}
        </div>
      </nav>

      {/* Newsletter at chapter end */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-center text-sm text-muted-foreground mb-8">
            {next
              ? "Enjoying the story? Join the newsletter to get notified when new chapters drop."
              : "You've caught up! Join the newsletter to be the first to know when the next chapter is released."}
          </p>
          <NewsletterSignup variant="full" />
        </div>
      </section>
    </>
  )
}
