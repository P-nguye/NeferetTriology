import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLoreArticles } from "@/lib/data"
import type { LoreArticle } from "@/lib/database.types"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "World of Neferet",
  description: "Explore the lore of the Neferet Trilogy — ancient Egypt, time travel, the Eight Gate, and more.",
}

const fallbackArticles: LoreArticle[] = [
  { id: "1", slug: "ancient-egypt-giza", title: "Ancient Egypt & Giza", content: null, category: "Setting", order: 1 },
  { id: "2", slug: "the-eight-gate", title: "The Eight Gate", content: null, category: "Mythology", order: 2 },
  { id: "3", slug: "the-cave", title: "The Cave", content: null, category: "Locations", order: 3 },
  { id: "4", slug: "the-second-sphinx", title: "The Second Sphinx", content: null, category: "Mysteries", order: 4 },
]

export default async function WorldPage() {
  let articles: LoreArticle[] = []
  try {
    articles = await getLoreArticles()
  } catch {
    articles = fallbackArticles
  }

  if (articles.length === 0) articles = fallbackArticles

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">Lore & Mythology</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">World of Neferet</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The history, mythology, and mysteries woven into the fabric of the trilogy. Explore the world behind the story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {articles.map((article) => (
          <Link key={article.slug} href={`/world/${article.slug}`} className="group block">
            <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/30">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                </div>
                {article.category && (
                  <Badge variant="outline" className="w-fit text-xs">{article.category}</Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {article.content
                    ? article.content.replace(/^#.*\n/m, "").replace(/[#*_`]/g, "").slice(0, 140).trim() + "…"
                    : "Click to read more about this topic."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
