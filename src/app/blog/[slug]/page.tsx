import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getBlogPost, getBlogPosts } from "@/lib/data"
import { ChevronRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getBlogPost(slug)
    if (!post) return {}
    return { title: post.title, description: post.excerpt ?? undefined }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = await getBlogPost(slug)
    if (!post) notFound()
  } catch {
    notFound()
  }

  return (
    <div>
      <header className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{post.title}</span>
          </div>
          {post.published_at && (
            <p className="text-xs text-muted-foreground mb-3">
              {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">{post.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        {post.content ? (
          <div className="prose-chapter">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground italic">Full post coming soon.</p>
        )}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
            <ChevronRight className="size-3 rotate-180" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
