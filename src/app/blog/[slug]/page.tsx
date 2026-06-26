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
              href="/blog"
              className="transition-colors"
              style={{ color: "oklch(0.55 0.10 68)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 72)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.10 68)")}
            >
              Blog
            </Link>
            <ChevronRight className="size-3" style={{ color: "oklch(0.35 0.03 260)" }} />
            <span style={{ color: "oklch(0.65 0.025 70)" }}>{post.title}</span>
          </div>

          {post.published_at && (
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.45 0.08 68)" }}
            >
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
            }}
          >
            {post.title}
          </h1>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        {post.content ? (
          <div className="prose-chapter">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        ) : (
          <p
            className="italic"
            style={{ color: "oklch(0.50 0.025 70)", fontFamily: "Georgia, serif" }}
          >
            Full post coming soon.
          </p>
        )}

        <div
          className="mt-12 pt-8"
          style={{ borderTop: "1px solid oklch(0.22 0.03 260)" }}
        >
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: "oklch(0.65 0.12 70)" }}
          >
            <ChevronRight className="size-3 rotate-180" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
