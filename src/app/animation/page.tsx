import type { Metadata } from "next"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { Film, Palette, Clapperboard } from "lucide-react"

export const metadata: Metadata = {
  title: "Animation Project",
  description: "The Neferet Trilogy animated adaptation — coming to YouTube.",
}

const plannedContent = [
  {
    icon: Film,
    title: "Trailers & Episodes",
    description: "Full animated episodes and promotional trailers for the YouTube series.",
    gradient: "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 50%, oklch(0.12 0.04 260) 100%)",
    glyph: "▶",
  },
  {
    icon: Palette,
    title: "Character Designs",
    description: "Concept art and finalized character designs for John, Neferet, and the royal court.",
    gradient: "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.26 0.10 65) 50%, oklch(0.16 0.05 50) 100%)",
    glyph: "𓂀",
  },
  {
    icon: Clapperboard,
    title: "Behind the Scenes",
    description: "Development diaries, storyboards, and the creative process behind the adaptation.",
    gradient: "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 50%, oklch(0.14 0.04 265) 100%)",
    glyph: "◈",
  },
]

export default function AnimationPage() {
  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.08 0.04 265) 0%, oklch(0.10 0.025 262) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-36 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.42 0.14 265 / 0.10) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* "In Development" badge */}
          <div className="flex justify-center mb-5">
            <span
              className="text-xs uppercase tracking-[0.3em] px-3 py-1.5 rounded-full"
              style={{
                background: "oklch(0.20 0.08 265 / 0.5)",
                border: "1px solid oklch(0.42 0.14 265 / 0.5)",
                color: "oklch(0.65 0.14 265)",
                fontFamily: "var(--font-display)",
              }}
            >
              In Development
            </span>
          </div>
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; Coming Soon &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 50px oklch(0.42 0.14 265 / 0.20)",
            }}
          >
            Animation Project
          </h1>
          <p
            className="max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.58 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            The Neferet Trilogy is being adapted as an animated series for YouTube. This page
            will become the home for everything related to the animated world of Neferet.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Content tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {plannedContent.map(({ icon: Icon, title, description, gradient, glyph }) => (
            <div
              key={title}
              className="card-glow-hover flex flex-col overflow-hidden rounded-xl"
              style={{
                background: "oklch(0.11 0.025 260)",
                border: "1px solid oklch(0.20 0.03 260)",
              }}
            >
              {/* Banner with icon */}
              <div
                className="relative flex flex-col items-center justify-center py-10 px-6 gap-4"
                style={{ background: gradient }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "oklch(0.10 0.03 260 / 0.5)",
                    border: "1px solid oklch(0.58 0.14 68 / 0.25)",
                  }}
                >
                  <Icon className="size-6" style={{ color: "oklch(0.72 0.12 72)" }} />
                </div>
                <span
                  className="absolute top-3 right-3 select-none text-2xl opacity-15"
                  style={{ color: "oklch(0.80 0.10 72)" }}
                  aria-hidden
                >
                  {glyph}
                </span>
              </div>

              {/* Text */}
              <div className="px-5 py-5 flex-1 flex flex-col gap-2 text-center">
                <h3
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "oklch(0.90 0.025 75)",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter panel */}
        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: "oklch(0.10 0.02 262)",
            border: "1px solid oklch(0.22 0.03 260)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
          >
            Be the First to Know
          </p>
          <h2
            className="text-2xl font-semibold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.92 0.025 75)",
            }}
          >
            Stay Inside the Story
          </h2>
          <p
            className="text-sm mb-7 max-w-md mx-auto"
            style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
          >
            Join the Neferet Chronicle to receive updates the moment new animation content is released.
          </p>
          <NewsletterSignup variant="compact" />
        </div>
      </div>
    </div>
  )
}
