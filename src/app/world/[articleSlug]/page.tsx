import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getLoreArticle, getLoreArticles } from "@/lib/data"
import { ChevronRight } from "lucide-react"

interface Props {
  params: Promise<{ articleSlug: string }>
}

export async function generateStaticParams() {
  try {
    const articles = await getLoreArticles()
    return articles.map((a) => ({ articleSlug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleSlug } = await params
  try {
    const article = await getLoreArticle(articleSlug)
    if (!article) return {}
    return {
      title: article.title,
      description: `Learn about ${article.title} in the world of the Neferet Trilogy.`,
    }
  } catch {
    return {}
  }
}

export default async function LoreArticlePage({ params }: Props) {
  const { articleSlug } = await params
  let article
  try {
    article = await getLoreArticle(articleSlug)
    if (!article) notFound()
  } catch {
    notFound()
  }

  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="py-10"
        style={{
          background: "oklch(0.10 0.02 262)",
          borderBottom: "1px solid oklch(0.22 0.03 260)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link
              href="/world"
              className="transition-colors"
              style={{ color: "oklch(0.55 0.10 68)" }}
            >
              World of Neferet
            </Link>
            <ChevronRight className="size-3" style={{ color: "oklch(0.35 0.03 260)" }} />
            <span style={{ color: "oklch(0.65 0.025 70)" }}>{article.title}</span>
          </div>

          {article.category && (
            <span
              className="inline-block text-xs uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
              style={{
                background: "oklch(0.20 0.06 65 / 0.5)",
                border: "1px solid oklch(0.40 0.10 68 / 0.4)",
                color: "oklch(0.72 0.10 72)",
              }}
            >
              {article.category}
            </span>
          )}

          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
            }}
          >
            {article.title}
          </h1>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        {article.content ? (
          <div className="prose-chapter">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>
        ) : (
          <p
            className="italic"
            style={{ color: "oklch(0.50 0.025 70)", fontFamily: "Georgia, serif" }}
          >
            Content coming soon.
          </p>
        )}

        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid oklch(0.22 0.03 260)" }}
        >
          <Link
            href="/world"
            className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: "oklch(0.65 0.12 70)" }}
          >
            <ChevronRight className="size-3 rotate-180" />
            Back to World of Neferet
          </Link>
        </div>
      </div>
    </div>
  )
}
