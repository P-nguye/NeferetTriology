import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/data"
import type { BlogPost } from "@/lib/database.types"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog & Updates",
  description: "News, updates, and behind-the-scenes from the Neferet Trilogy.",
}

const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-i-wrote-this",
    title: "Why I Wrote the Neferet Trilogy",
    excerpt: "The story behind the story — why ancient Egypt, why time travel, and why love is at the center of it all.",
    content: null,
    published_at: new Date().toISOString(),
  },
]

export default async function BlogPage() {
  let posts: BlogPost[] = []
  try {
    posts = await getBlogPosts()
  } catch {
    posts = fallbackPosts
  }
  if (posts.length === 0) posts = fallbackPosts

  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.06 0.02 265) 0%, oklch(0.10 0.025 260) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-32 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.58 0.14 68 / 0.08) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; From the Author &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 50px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            Blog & Updates
          </h1>
          <p
            className="max-w-md mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.58 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Behind-the-scenes writing, announcements, and thoughts on the world of the Neferet Trilogy.
          </p>
        </div>
      </div>

      {/* Post list */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-5">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="card-glow-hover flex flex-col sm:flex-row overflow-hidden rounded-xl"
              style={{
                background: "oklch(0.11 0.025 260)",
                border: "1px solid oklch(0.20 0.03 260)",
              }}
            >
              {/* Number accent */}
              <div
                className="hidden sm:flex flex-shrink-0 w-16 items-center justify-center"
                style={{
                  background: "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.18 0.08 265) 100%)",
                  borderRight: "1px solid oklch(0.22 0.03 260)",
                }}
              >
                <span
                  className="text-2xl font-bold select-none opacity-30"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(0.72 0.12 72)",
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 px-6 py-5">
                {post.published_at && (
                  <p
                    className="text-xs mb-2 uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.08 68)" }}
                  >
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(0.90 0.025 75)",
                  }}
                >
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.58 0.025 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-end justify-end px-6 pb-5 sm:pb-5 sm:pl-0">
                <Button asChild variant="outline" size="sm" className="gap-1.5 flex-shrink-0">
                  <Link href={`/blog/${post.slug}`}>
                    Read more <ChevronRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
