import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
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
    return { title: article.title, description: `Learn about ${article.title} in the world of the Neferet Trilogy.` }
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
    <div>
      <header className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/world" className="hover:text-primary transition-colors">World of Neferet</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{article.title}</span>
          </div>
          {article.category && <Badge variant="outline" className="mb-3 text-xs">{article.category}</Badge>}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">{article.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        {article.content ? (
          <div className="prose-chapter">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground italic">Content coming soon.</p>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/world" className="text-sm text-primary hover:underline flex items-center gap-1">
            <ChevronRight className="size-3 rotate-180" />
            Back to World of Neferet
          </Link>
        </div>
      </div>
    </div>
  )
}
