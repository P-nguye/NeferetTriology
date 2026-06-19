import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/data"
import type { BlogPost } from "@/lib/database.types"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog & Updates",
  description: "News, updates, and behind-the-scenes from the Neferet Trilogy.",
}

const fallbackPosts: BlogPost[] = [
  { id: "1", slug: "why-i-wrote-this", title: "Why I Wrote the Neferet Trilogy", excerpt: "The story behind the story — why ancient Egypt, why time travel, and why love is at the center of it all.", content: null, published_at: new Date().toISOString() },
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">From the Author</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Blog & Updates</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Behind-the-scenes writing, announcements, and thoughts on the world of the Neferet Trilogy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col sm:flex-row hover:shadow-md transition-shadow">
            <div className="flex-1">
              <CardHeader>
                <div className="text-xs text-muted-foreground mb-2">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : ""}
                </div>
                <CardTitle className="font-serif text-xl">{post.title}</CardTitle>
              </CardHeader>
              {post.excerpt && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </CardContent>
              )}
            </div>
            <CardFooter className="sm:items-end sm:flex-col sm:justify-end sm:pb-6 sm:pr-6">
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link href={`/blog/${post.slug}`}>
                  Read more <ChevronRight className="size-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
