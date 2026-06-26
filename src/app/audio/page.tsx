import type { Metadata } from "next"
import { CinematicAudioPlayer } from "@/components/CinematicAudioPlayer"

export const metadata: Metadata = {
  title: "Audio — The Neferet Trilogy",
  description:
    "Official audio for the Neferet Trilogy: original score, ambient soundscapes, and exclusive audiobook narration teasers.",
}

/* ─── Track data ──────────────────────────────────────────────────────────
   Replace src/downloadUrl paths with real files in public/assets/audio/.
   All players render with graceful error state when files are absent.
─────────────────────────────────────────────────────────────────────────── */

interface AudioTrack {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  src: string
  downloadUrl: string
}

const FEATURED_TRACK: AudioTrack = {
  id: "main-theme",
  title: "Main Theme — The Neferet Trilogy",
  subtitle: "Original Score · Orchestral Premiere Cut",
  category: "Original Score",
  description:
    "The sweeping cinematic theme that opens the animated series, blending ancient Egyptian melodic motifs with a full orchestral arrangement. Composed to capture the duality of the story's two worlds: the golden sands of Thebes and the quiet Indiana plains where the journey begins.",
  src: "/assets/audio/neferet-main-theme.mp3",
  downloadUrl: "/assets/audio/neferet-main-theme.mp3",
}

const SECONDARY_TRACKS: AudioTrack[] = [
  {
    id: "ambient-egypt",
    title: "Ancient Egypt — Ambient Soundscape",
    subtitle: "Atmospheric · Production Reference",
    category: "Ambient",
    description:
      "An immersive ambient bed evoking the heat, dust, and ceremony of the ancient world — designed for reading atmosphere and production reference.",
    src: "/assets/audio/neferet-ambient-egypt.mp3",
    downloadUrl: "/assets/audio/neferet-ambient-egypt.mp3",
  },
  {
    id: "indiana-soundscape",
    title: "Indiana Dusk — Ambient Soundscape",
    subtitle: "Atmospheric · Present-Day Era",
    category: "Ambient",
    description:
      "Crickets, wind, and distant highway hum paint the quiet American Midwest setting of Book One — a counterpoint to the Egyptian grandeur.",
    src: "/assets/audio/neferet-ambient-indiana.mp3",
    downloadUrl: "/assets/audio/neferet-ambient-indiana.mp3",
  },
  {
    id: "chapter-one-narration",
    title: "The Eight Gate — Chapter One",
    subtitle: "Audiobook Narration Teaser · Book One",
    category: "Narration",
    description:
      "A narrated excerpt from the opening chapter of Book One, performed in the style of the upcoming audiobook production. Experience the story as spoken word.",
    src: "/assets/audio/neferet-ch1-narration.mp3",
    downloadUrl: "/assets/audio/neferet-ch1-narration.mp3",
  },
  {
    id: "neferet-theme-variation",
    title: "Princess Neferet — Theme Variation",
    subtitle: "Character Leitmotif · Score",
    category: "Original Score",
    description:
      "An intimate, chamber-scale variation of the main theme centered on Neferet's personal arc — quieter, more introspective, carrying the weight of destiny.",
    src: "/assets/audio/neferet-theme-variation.mp3",
    downloadUrl: "/assets/audio/neferet-theme-variation.mp3",
  },
  {
    id: "journey-home-preview",
    title: "The Journey Home — Closing Theme",
    subtitle: "Score Preview · Book Three",
    category: "Original Score",
    description:
      "A preview of the emotional finale cue from the Book Three adaptation — resolving the trilogy's central musical tension across two eras and two worlds.",
    src: "/assets/audio/neferet-journey-home.mp3",
    downloadUrl: "/assets/audio/neferet-journey-home.mp3",
  },
  {
    id: "press-reel",
    title: "Official Press Reel — Audio Teaser",
    subtitle: "Media Kit · 60-Second Cut",
    category: "Press",
    description:
      "A 60-second distillation of the trilogy's audio identity for press and distribution partners — featuring theme, narration, and ambient layers.",
    src: "/assets/audio/neferet-press-reel.mp3",
    downloadUrl: "/assets/audio/neferet-press-reel.mp3",
  },
]

/* ─── Category badge ──────────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "Original Score": { color: "oklch(0.72 0.10 72)", bg: "oklch(0.20 0.06 65 / 0.45)" },
  Ambient:          { color: "oklch(0.65 0.14 265)", bg: "oklch(0.18 0.08 265 / 0.45)" },
  Narration:        { color: "oklch(0.68 0.08 70)", bg: "oklch(0.18 0.05 60 / 0.45)" },
  Press:            { color: "oklch(0.60 0.04 70)", bg: "oklch(0.16 0.02 262 / 0.55)" },
}

function CategoryBadge({ label }: { label: string }) {
  const cfg = CATEGORY_COLORS[label] ?? CATEGORY_COLORS["Original Score"]
  return (
    <span
      className="inline-block text-[10px] uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.color}40`,
        color: cfg.color,
        fontFamily: "var(--font-display)",
      }}
    >
      {label}
    </span>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function AudioPage() {
  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.02 265) 0%, oklch(0.10 0.025 260) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.58 0.14 68 / 0.09) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-4 right-1/4 h-52 w-52 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.42 0.12 265 / 0.09) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
          aria-hidden
        />

        {/* Watermark glyph */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ opacity: 0.025 }}
          aria-hidden
        >
          <span
            style={{
              fontSize: "22rem",
              fontFamily: "var(--font-display)",
              color: "oklch(0.72 0.14 72)",
              lineHeight: 1,
            }}
          >
            𓂀
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p
            className="text-xs uppercase tracking-[0.55em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; Official Audio &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 80px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            Original Audio
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "oklch(0.60 0.025 70)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            The sonic world of the Neferet Trilogy — original orchestral score, immersive
            ambient soundscapes, and exclusive narration excerpts from the upcoming animated
            series and audiobook productions.
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Featured track */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <p
              className="text-xs uppercase tracking-[0.45em] flex-shrink-0"
              style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
            >
              Now Playing
            </p>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, oklch(0.58 0.14 68 / 0.30), transparent)",
              }}
            />
          </div>

          {/* Featured card wrapper with description */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.58 0.14 68 / 0.20)",
              background: "oklch(0.09 0.02 262)",
            }}
          >
            {/* Description banner above player */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <CategoryBadge label={FEATURED_TRACK.category} />
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.40 0.03 70)", fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                >
                  Featured Track
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: "oklch(0.56 0.025 70)", fontFamily: "Georgia, serif" }}
              >
                {FEATURED_TRACK.description}
              </p>
            </div>

            {/* Thin gold divider */}
            <div
              className="mx-6 mb-0"
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, oklch(0.58 0.14 68 / 0.22), oklch(0.22 0.03 260) 60%, transparent)",
              }}
            />

            {/* Player */}
            <CinematicAudioPlayer
              src={FEATURED_TRACK.src}
              title={FEATURED_TRACK.title}
              subtitle={FEATURED_TRACK.subtitle}
              downloadUrl={FEATURED_TRACK.downloadUrl}
              className="rounded-none border-0 shadow-none"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
              } as React.CSSProperties}
            />
          </div>
        </section>

        {/* Track library */}
        <section>
          <div className="flex items-center gap-4 mb-7">
            <p
              className="text-xs uppercase tracking-[0.45em] flex-shrink-0"
              style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
            >
              Track Library
            </p>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, oklch(0.58 0.14 68 / 0.30), transparent)",
              }}
            />
            <span
              className="text-xs flex-shrink-0"
              style={{ color: "oklch(0.38 0.03 70)", fontFamily: "var(--font-display)" }}
            >
              {SECONDARY_TRACKS.length} tracks
            </span>
          </div>

          <div className="space-y-3">
            {SECONDARY_TRACKS.map((track) => (
              <div key={track.id} className="flex flex-col sm:flex-row gap-0 overflow-hidden rounded-xl"
                style={{
                  background: "oklch(0.10 0.022 262)",
                  border: "1px solid oklch(0.20 0.03 260)",
                }}
              >
                {/* Description sidebar */}
                <div
                  className="sm:w-52 flex-shrink-0 px-4 py-4 sm:border-r flex flex-col justify-between gap-2"
                  style={{ borderColor: "oklch(0.18 0.025 260)" }}
                >
                  <CategoryBadge label={track.category} />
                  <p
                    className="text-xs leading-relaxed mt-2 hidden sm:block"
                    style={{ color: "oklch(0.48 0.022 70)", fontFamily: "Georgia, serif" }}
                  >
                    {track.description}
                  </p>
                </div>

                {/* Player fills remaining width */}
                <CinematicAudioPlayer
                  src={track.src}
                  title={track.title}
                  subtitle={track.subtitle}
                  downloadUrl={track.downloadUrl}
                  className="flex-1 rounded-none border-0 shadow-none"
                  style={{
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                  } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer notice */}
        <div
          className="rounded-xl px-6 py-5 text-center"
          style={{
            background: "oklch(0.11 0.025 260)",
            border: "1px solid oklch(0.20 0.03 260)",
          }}
        >
          <p
            className="text-sm"
            style={{
              color: "oklch(0.45 0.03 68)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            All audio is original material for the Neferet Trilogy animated series. For licensing,
            sync rights, or press inquiries,{" "}
            <a
              href="/contact"
              style={{
                color: "oklch(0.58 0.14 68)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              contact us
            </a>
            .
          </p>
        </div>

      </div>
    </div>
  )
}
