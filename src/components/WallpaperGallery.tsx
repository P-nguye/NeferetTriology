"use client"

import { useState } from "react"
import { Download, Check } from "lucide-react"

interface Resolution {
  label: string
  dimensions: string
  filesize: string
}

interface Wallpaper {
  id: string
  title: string
  subtitle: string
  description: string
  featured: boolean
  gradient: string
  symbol: string
  resolutions: Resolution[]
}

const WALLPAPERS: Wallpaper[] = [
  {
    id: "giza-dawn",
    title: "Giza at the Dawn of an Age",
    subtitle: "The Half-Built Plateau",
    description: "A majestic panorama of the half-constructed Giza Plateau: raw limestone ramps snake upward as the Great Pyramid rises incomplete against a burning sky. Two colossal Sphinxes flank the sacred ground, their stone faces catching the last light of dusk.",
    featured: true,
    symbol: "𓃭",
    gradient: "linear-gradient(135deg, oklch(0.10 0.04 55) 0%, oklch(0.22 0.08 60) 25%, oklch(0.35 0.12 65) 50%, oklch(0.25 0.09 55) 75%, oklch(0.12 0.04 50) 100%)",
    resolutions: [
      { label: "Desktop HD", dimensions: "1920×1080", filesize: "~4.2 MB" },
      { label: "Desktop 2K", dimensions: "2560×1440", filesize: "~7.1 MB" },
      { label: "Desktop 4K", dimensions: "3840×2160", filesize: "~14.8 MB" },
      { label: "Mobile", dimensions: "1080×1920", filesize: "~3.9 MB" },
    ],
  },
  {
    id: "eight-gate",
    title: "The Eight Gate",
    subtitle: "The Cave Beneath Indiana",
    description: "Inside a limestone cave in southern Indiana, a circular stone archway pulses with impossible light — ancient hieroglyphs carved along its face illuminated from within by a force that predates electricity.",
    featured: false,
    symbol: "◈",
    gradient: "linear-gradient(135deg, oklch(0.08 0.03 265) 0%, oklch(0.18 0.10 270) 40%, oklch(0.28 0.14 260) 60%, oklch(0.10 0.04 265) 100%)",
    resolutions: [
      { label: "Desktop HD", dimensions: "1920×1080", filesize: "~3.8 MB" },
      { label: "Desktop 4K", dimensions: "3840×2160", filesize: "~13.2 MB" },
      { label: "Mobile", dimensions: "1080×1920", filesize: "~3.5 MB" },
    ],
  },
  {
    id: "royal-court",
    title: "The Royal Court of Khufu",
    subtitle: "The Palace at Giza",
    description: "The grand hall of the Pharaoh's palace — lapis columns rising to a painted sky ceiling, servants and nobles arrayed in ranked silence, gold oil lamps casting everything in amber and shadow.",
    featured: false,
    symbol: "𓂀",
    gradient: "linear-gradient(135deg, oklch(0.12 0.05 55) 0%, oklch(0.20 0.07 60) 30%, oklch(0.28 0.09 55) 55%, oklch(0.18 0.06 48) 100%)",
    resolutions: [
      { label: "Desktop HD", dimensions: "1920×1080", filesize: "~4.5 MB" },
      { label: "Desktop 4K", dimensions: "3840×2160", filesize: "~15.6 MB" },
      { label: "Mobile", dimensions: "1080×1920", filesize: "~4.1 MB" },
    ],
  },
  {
    id: "neferet-portrait",
    title: "Portrait of Neferet",
    subtitle: "Princess of Egypt",
    description: "A regal portrait of Princess Neferet — eyes lined in kohl, collar of carnelian and gold at her throat, an expression that holds equal measures of dignity and longing.",
    featured: false,
    symbol: "𓆤",
    gradient: "linear-gradient(145deg, oklch(0.14 0.06 65) 0%, oklch(0.24 0.10 70) 35%, oklch(0.38 0.14 68) 55%, oklch(0.20 0.07 60) 100%)",
    resolutions: [
      { label: "Desktop HD", dimensions: "1920×1080", filesize: "~3.6 MB" },
      { label: "Desktop 4K", dimensions: "3840×2160", filesize: "~12.8 MB" },
      { label: "Mobile", dimensions: "1080×1920", filesize: "~3.3 MB" },
    ],
  },
  {
    id: "nile-night",
    title: "The Nile Under Stars",
    subtitle: "Sacred Waters at Night",
    description: "The Nile at night — feluccas drifting on obsidian water, the stars overhead arranged as the Egyptians mapped them, the far bank glowing faintly with torchlight from the sacred precincts.",
    featured: false,
    symbol: "𓇌",
    gradient: "linear-gradient(180deg, oklch(0.05 0.04 265) 0%, oklch(0.10 0.08 260) 30%, oklch(0.15 0.06 255) 60%, oklch(0.20 0.05 250) 100%)",
    resolutions: [
      { label: "Desktop HD", dimensions: "1920×1080", filesize: "~4.0 MB" },
      { label: "Desktop 4K", dimensions: "3840×2160", filesize: "~14.0 MB" },
      { label: "Mobile", dimensions: "1080×1920", filesize: "~3.7 MB" },
    ],
  },
]

function DownloadButton({ resolution, wallpaperId }: { resolution: Resolution; wallpaperId: string }) {
  const [state, setState] = useState<"idle" | "done">("idle")

  function handleDownload() {
    // Placeholder — real implementation would fetch the actual asset URL
    setState("done")
    setTimeout(() => setState("idle"), 2500)
  }

  return (
    <button
      onClick={handleDownload}
      className="group flex items-center justify-between gap-2 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer"
      style={{
        background: state === "done" ? "oklch(0.22 0.08 145 / 0.4)" : "oklch(0.14 0.02 260 / 0.8)",
        border: state === "done"
          ? "1px solid oklch(0.45 0.14 145 / 0.5)"
          : "1px solid oklch(0.24 0.03 260)",
      }}
      onMouseEnter={(e) => {
        if (state === "idle") {
          e.currentTarget.style.background = "oklch(0.20 0.06 65 / 0.4)"
          e.currentTarget.style.borderColor = "oklch(0.58 0.14 68 / 0.5)"
        }
      }}
      onMouseLeave={(e) => {
        if (state === "idle") {
          e.currentTarget.style.background = "oklch(0.14 0.02 260 / 0.8)"
          e.currentTarget.style.borderColor = "oklch(0.24 0.03 260)"
        }
      }}
    >
      <div>
        <p className="text-xs font-medium" style={{ color: "oklch(0.85 0.025 75)", fontFamily: "var(--font-display)" }}>
          {resolution.label}
        </p>
        <p className="text-xs" style={{ color: "oklch(0.45 0.03 260)" }}>
          {resolution.dimensions} &middot; {resolution.filesize}
        </p>
      </div>
      {state === "done" ? (
        <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "oklch(0.65 0.18 145)" }} />
      ) : (
        <Download
          className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
          style={{ color: "oklch(0.58 0.14 68)" }}
        />
      )}
    </button>
  )
}

function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="card-glow-hover rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.20 0.03 260)",
      }}
    >
      {/* Preview */}
      <div
        className="relative flex items-center justify-center select-none"
        style={{ background: wallpaper.gradient, aspectRatio: "16/9" }}
      >
        <span
          className="text-5xl opacity-30"
          style={{ color: "oklch(0.85 0.10 72)" }}
        >
          {wallpaper.symbol}
        </span>

        {/* Hover shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, oklch(0.58 0.14 68 / 0.05) 0%, transparent 50%)" }}
        />

        {/* "Preview" badge */}
        <div
          className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded"
          style={{
            background: "oklch(0.08 0.02 260 / 0.7)",
            color: "oklch(0.50 0.04 70)",
            border: "1px solid oklch(0.20 0.025 260)",
            backdropFilter: "blur(4px)",
          }}
        >
          Preview
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="font-semibold text-sm leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.90 0.025 75)" }}
          >
            {wallpaper.title}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.06 68)" }}>
            {wallpaper.subtitle}
          </p>
        </div>

        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "oklch(0.52 0.025 70)", fontFamily: "Georgia, serif" }}
        >
          {wallpaper.description}
        </p>

        {/* Resolutions toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs transition-colors duration-150 cursor-pointer"
          style={{ color: expanded ? "oklch(0.58 0.14 68)" : "oklch(0.45 0.04 70)" }}
        >
          <Download className="h-3 w-3" />
          {expanded ? "Close download options" : `Download — ${wallpaper.resolutions.length} resolutions`}
        </button>

        {expanded && (
          <div className="flex flex-col gap-1.5 mt-1">
            {wallpaper.resolutions.map((res) => (
              <DownloadButton key={res.dimensions} resolution={res} wallpaperId={wallpaper.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FeaturedWallpaper({ wallpaper }: { wallpaper: Wallpaper }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid oklch(0.58 0.14 68 / 0.35)",
        boxShadow: "0 0 60px oklch(0.58 0.14 68 / 0.10), 0 4px 24px oklch(0 0 0 / 0.5)",
      }}
    >
      {/* Large preview */}
      <div
        className="relative flex flex-col items-center justify-center select-none"
        style={{ background: wallpaper.gradient, minHeight: "340px" }}
      >
        {/* Atmospheric overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, oklch(0.10 0.04 55 / 0.6) 100%)",
          }}
        />

        {/* Center symbol */}
        <span
          className="relative z-10 text-8xl opacity-20"
          style={{ color: "oklch(0.85 0.12 72)" }}
        >
          {wallpaper.symbol}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div
            className="inline-block text-xs uppercase tracking-[0.3em] px-2.5 py-1 rounded mb-3"
            style={{
              background: "oklch(0.58 0.14 68 / 0.15)",
              border: "1px solid oklch(0.58 0.14 68 / 0.35)",
              color: "oklch(0.72 0.12 72)",
              fontFamily: "var(--font-display)",
            }}
          >
            Featured Wallpaper
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.95 0.025 75)",
              textShadow: "0 2px 20px oklch(0 0 0 / 0.8)",
            }}
          >
            {wallpaper.title}
          </h2>
          <p className="text-sm mt-1" style={{ color: "oklch(0.65 0.08 68)" }}>
            {wallpaper.subtitle}
          </p>
        </div>
      </div>

      {/* Info panel */}
      <div
        className="p-6 sm:p-8"
        style={{ background: "oklch(0.11 0.025 260)" }}
      >
        <p
          className="text-sm leading-relaxed mb-6 max-w-2xl"
          style={{ color: "oklch(0.62 0.025 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          {wallpaper.description}
        </p>

        {/* Download section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: expanded ? "oklch(0.30 0.08 65 / 0.6)" : "oklch(0.58 0.14 68)",
                color: expanded ? "oklch(0.72 0.10 72)" : "oklch(0.06 0.01 260)",
                border: expanded ? "1px solid oklch(0.58 0.14 68 / 0.5)" : "none",
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              <Download className="h-4 w-4" />
              {expanded ? "Hide Options" : "Download Wallpaper"}
            </button>

            <span className="text-xs" style={{ color: "oklch(0.38 0.025 260)" }}>
              {wallpaper.resolutions.length} resolutions available
            </span>
          </div>

          {expanded && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
              {wallpaper.resolutions.map((res) => (
                <DownloadButton key={res.dimensions} resolution={res} wallpaperId={wallpaper.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function WallpaperGallery() {
  const featured = WALLPAPERS.find((w) => w.featured)!
  const gallery = WALLPAPERS.filter((w) => !w.featured)

  return (
    <div>
      {/* Featured */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="h-px flex-1 max-w-8"
            style={{ background: "linear-gradient(to right, transparent, oklch(0.58 0.14 68 / 0.5))" }}
          />
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
          >
            Featured
          </p>
        </div>
        <FeaturedWallpaper wallpaper={featured} />
      </section>

      {/* Gallery grid */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(to right, transparent, oklch(0.28 0.03 260))" }}
          />
          <p
            className="text-xs uppercase tracking-[0.35em] flex-shrink-0"
            style={{ color: "oklch(0.42 0.03 260)", fontFamily: "var(--font-display)" }}
          >
            Gallery · {gallery.length} Wallpapers
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(to left, transparent, oklch(0.28 0.03 260))" }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {gallery.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      </section>
    </div>
  )
}
