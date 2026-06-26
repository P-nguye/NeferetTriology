import type { Metadata } from "next"
import { NewsletterSignup } from "@/components/NewsletterSignup"

export const metadata: Metadata = {
  title: "Author",
  description: "The story behind the Neferet Trilogy — why Egypt, why time travel, and why love.",
}

const sections = [
  {
    heading: "Why I Wrote This Story",
    body: "Every story begins with a question. For me, the question was simple: what if the past wasn't gone? I've been fascinated by ancient Egypt since childhood — the scale of the monuments, the complexity of the mythology, the sheer ambition of a civilization that decided the most important thing it could build was something that would last forever. The Great Pyramid is still standing because it was built by people who understood permanence in a way we've largely forgotten. But the thing that moved me most wasn't the monuments. It was the people. We know their names. We have their letters and their shopping lists. They were real people who loved and worried and hoped — and they have been gone for four thousand years. The Neferet Trilogy is my attempt to close that distance.",
    glyph: "𓂀",
  },
  {
    heading: "Why Egypt Fascinates Me",
    body: "Egypt sits at a unique intersection of the mythic and the historical. The civilization lasted over three thousand years — longer than the gap between us and ancient Rome, multiplied three times over. Within that span they developed one of humanity's first writing systems, built monuments we still cannot fully explain, and maintained a cultural coherence that most nations never achieve in a century. But beyond the facts, Egypt has always felt like a place where the veil between the visible and invisible worlds is thin. Their art, their religion, their architecture — all of it is animated by a belief that meaning runs deeper than what the eye can see. That's a sensibility I find endlessly compelling as a writer.",
    glyph: "𓃭",
  },
  {
    heading: "Why Time Travel and Why Romance",
    body: "Time travel, to me, is the purest form of the stranger-in-a-strange-land story. When John Carter steps through the Eight Gate, he loses every advantage modernity gives him — his language, his technology, his social framework, his sense of how the world works. He is reduced, in the best possible way, to himself. What's left when you strip everything away? Character. Values. Courage. That's what I wanted to test. The romance between John and Neferet isn't incidental — it's the point. Because love is the one thing that seems to survive the passage of time. It's the reason the pyramids were built to last: so that something of the people who made them, and the people they loved, might endure. I wanted to write a love story worthy of that ambition.",
    glyph: "◈",
  },
]

export default function AuthorPage() {
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
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; Meet the Author &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 50px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            The Author
          </h1>
          <p
            className="max-w-md mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.58 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            The story behind the story — why ancient Egypt, why time travel,
            and why love is at the center of it all.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-0">
          {sections.map((section, i) => (
            <article key={i}>
              {/* Section header */}
              <div className="flex items-start gap-5 mb-5">
                <span
                  className="text-2xl flex-shrink-0 mt-1 select-none"
                  style={{ color: "oklch(0.55 0.10 68)" }}
                  aria-hidden
                >
                  {section.glyph}
                </span>
                <h2
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(0.88 0.025 75)",
                  }}
                >
                  {section.heading}
                </h2>
              </div>

              <p
                className="leading-[1.9] pl-9 text-base"
                style={{
                  color: "oklch(0.62 0.025 70)",
                  fontFamily: "Georgia, serif",
                }}
              >
                {section.body}
              </p>

              {/* Gold rule divider (not after last) */}
              {i < sections.length - 1 && (
                <div className="flex items-center gap-4 my-12 pl-9">
                  <div
                    className="flex-1 h-px"
                    style={{ background: "linear-gradient(to right, oklch(0.58 0.14 68 / 0.3), transparent)" }}
                  />
                  <span
                    className="text-xs select-none"
                    style={{ color: "oklch(0.45 0.08 68)" }}
                    aria-hidden
                  >
                    𓃭
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-16 rounded-2xl p-8 sm:p-10"
          style={{
            background: "oklch(0.10 0.02 262)",
            border: "1px solid oklch(0.22 0.03 260)",
          }}
        >
          <NewsletterSignup variant="full" />
        </div>
      </div>
    </div>
  )
}
