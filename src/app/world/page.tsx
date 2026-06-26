import type { Metadata } from "next"
import Link from "next/link"
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

const ARTICLE_CONFIG: Record<string, { glyph: string; gradient: string }> = {
  "ancient-egypt-giza": {
    glyph: "𓂀",
    gradient: "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.24 0.09 65) 50%, oklch(0.15 0.04 50) 100%)",
  },
  "the-eight-gate": {
    glyph: "◈",
    gradient: "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 50%, oklch(0.12 0.04 260) 100%)",
  },
  "the-cave": {
    glyph: "𓃭",
    gradient: "linear-gradient(145deg, oklch(0.10 0.03 260) 0%, oklch(0.18 0.05 262) 50%, oklch(0.12 0.03 258) 100%)",
  },
  "the-second-sphinx": {
    glyph: "𓆤",
    gradient: "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 50%, oklch(0.14 0.05 265) 100%)",
  },
}

const DEFAULT_CONFIG = {
  glyph: "𓂀",
  gradient: "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.20 0.07 65) 50%, oklch(0.14 0.04 262) 100%)",
}

export default async function WorldPage() {
  let articles: LoreArticle[] = []
  try {
    articles = await getLoreArticles()
  } catch {
    articles = fallbackArticles
  }

  if (articles.length === 0) articles = fallbackArticles

  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.10 0.04 55) 0%, oklch(0.10 0.025 260) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-36 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.58 0.14 68 / 0.08) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; Lore & Mythology &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 50px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            World of Neferet
          </h1>
          <p
            className="max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.58 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            The history, mythology, and mysteries woven into the fabric of the trilogy.
            Explore the world behind the story.
          </p>
        </div>
      </div>

      {/* Lore cards */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {articles.map((article) => {
            const cfg = ARTICLE_CONFIG[article.slug] ?? DEFAULT_CONFIG
            return (
              <Link key={article.slug} href={`/world/${article.slug}`} className="group block">
                <div
                  className="card-glow-hover h-full flex flex-col overflow-hidden rounded-xl"
                  style={{
                    background: "oklch(0.11 0.025 260)",
                    border: "1px solid oklch(0.20 0.03 260)",
                  }}
                >
                  {/* Gradient banner */}
                  <div
                    className="relative flex items-end justify-between px-6 pt-6 pb-5"
                    style={{ background: cfg.gradient }}
                  >
                    <div className="flex flex-col gap-1">
                      {article.category && (
                        <span
                          className="text-xs uppercase tracking-[0.25em]"
                          style={{ color: "oklch(0.65 0.08 70)" }}
                        >
                          {article.category}
                        </span>
                      )}
                      <h2
                        className="text-xl font-bold leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "oklch(0.94 0.025 75)",
                        }}
                      >
                        {article.title}
                      </h2>
                    </div>
                    <span
                      className="text-3xl select-none flex-shrink-0 ml-4 opacity-40"
                      style={{ color: "oklch(0.80 0.10 72)" }}
                      aria-hidden
                    >
                      {cfg.glyph}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex items-end justify-between px-6 py-4">
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
                    >
                      {article.content
                        ? article.content.replace(/^#.*\n/m, "").replace(/[#*_`]/g, "").slice(0, 130).trim() + "…"
                        : "Click to explore this corner of the world."}
                    </p>
                    <ChevronRight
                      className="size-5 flex-shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "oklch(0.55 0.10 68)" }}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
