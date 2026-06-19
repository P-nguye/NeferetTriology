import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { Film, Palette, Clapperboard } from "lucide-react"

export const metadata: Metadata = {
  title: "Animation Project",
  description: "The Neferet Trilogy animated adaptation — coming to YouTube.",
}

const plannedContent = [
  { icon: Film, title: "Trailers & Episodes", description: "Full animated episodes and promotional trailers for the YouTube series." },
  { icon: Palette, title: "Character Designs", description: "Concept art and finalized character designs for John, Neferet, and the royal court." },
  { icon: Clapperboard, title: "Behind the Scenes", description: "Development diaries, storyboards, and the creative process behind the adaptation." },
]

export default function AnimationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <Badge variant="indigo" className="mb-4 text-sm px-4 py-1.5">In Development</Badge>
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">Coming Soon</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Animation Project</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The Neferet Trilogy is currently being adapted as an animated series for YouTube. This page will become the home for everything related to the animated world of Neferet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {plannedContent.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <Icon className="size-5 text-primary" />
              </div>
              <CardTitle className="font-serif text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-muted p-8 text-center mb-16">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">Be the First to Know</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Join the Neferet Chronicle to receive updates the moment new animation content is released.
        </p>
        <NewsletterSignup variant="compact" />
      </div>
    </div>
  )
}
