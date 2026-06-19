import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import { NewsletterSignup } from "@/components/NewsletterSignup"

export const metadata: Metadata = {
  title: "Author",
  description: "The story behind the Neferet Trilogy — why Egypt, why time travel, and why love.",
}

const sections = [
  {
    heading: "Why I Wrote This Story",
    body: "Every story begins with a question. For me, the question was simple: what if the past wasn't gone? I've been fascinated by ancient Egypt since childhood — the scale of the monuments, the complexity of the mythology, the sheer ambition of a civilization that decided the most important thing it could build was something that would last forever. The Great Pyramid is still standing because it was built by people who understood permanence in a way we've largely forgotten. But the thing that moved me most wasn't the monuments. It was the people. We know their names. We have their letters and their shopping lists. They were real people who loved and worried and hoped — and they have been gone for four thousand years. The Neferet Trilogy is my attempt to close that distance.",
  },
  {
    heading: "Why Egypt Fascinates Me",
    body: "Egypt sits at a unique intersection of the mythic and the historical. The civilization lasted over three thousand years — longer than the gap between us and ancient Rome, multiplied three times over. Within that span they developed one of humanity's first writing systems, built monuments we still cannot fully explain, and maintained a cultural coherence that most nations never achieve in a century. But beyond the facts, Egypt has always felt like a place where the veil between the visible and invisible worlds is thin. Their art, their religion, their architecture — all of it is animated by a belief that meaning runs deeper than what the eye can see. That's a sensibility I find endlessly compelling as a writer.",
  },
  {
    heading: "Why Time Travel and Why Romance",
    body: "Time travel, to me, is the purest form of the stranger-in-a-strange-land story. When John Carter steps through the Eight Gate, he loses every advantage modernity gives him — his language, his technology, his social framework, his sense of how the world works. He is reduced, in the best possible way, to himself. What's left when you strip everything away? Character. Values. Courage. That's what I wanted to test. The romance between John and Neferet isn't incidental — it's the point. Because love is the one thing that seems to survive the passage of time. It's the reason the pyramids were built to last: so that something of the people who made them, and the people they loved, might endure. I wanted to write a love story worthy of that ambition.",
  },
]

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">Meet the Author</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">The Author</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The story behind the story — why ancient Egypt, why time travel, and why love is at the center of it all.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, i) => (
          <article key={i}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{section.heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            {i < sections.length - 1 && <Separator className="mt-12" />}
          </article>
        ))}
      </div>

      <div className="mt-16 pt-12 border-t border-border">
        <NewsletterSignup variant="full" />
      </div>
    </div>
  )
}
