import type { Metadata } from "next"
import { WallpaperGallery } from "@/components/WallpaperGallery"

export const metadata: Metadata = {
  title: "Wallpapers",
  description: "Download premium cinematic wallpapers from the world of the Neferet Trilogy — Ancient Egypt, the Indiana cave, and the court of Pharaoh Khufu.",
}

export default function WallpapersPage() {
  return (
    <div>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.08 0.03 55) 0%, oklch(0.10 0.025 60) 50%, oklch(0.09 0.02 260) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.58 0.14 68 / 0.12) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
          aria-hidden
        />

        {/* Decorative pyramid shape */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{ opacity: 0.04 }}
          aria-hidden
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "30vw solid transparent",
              borderRight: "30vw solid transparent",
              borderBottom: "18vw solid oklch(0.72 0.14 72)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓃭 &nbsp; The Neferet Trilogy &nbsp; 𓃭
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 60px oklch(0.58 0.14 68 / 0.25)",
              letterSpacing: "-0.01em",
            }}
          >
            Wallpapers
          </h1>
          <p
            className="max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.60 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Cinematic artwork from across two worlds. Free to download — for your desktop,
            your phone, and the corner of your mind that still lives in Ancient Egypt.
          </p>

          {/* Gold rule */}
          <div className="flex items-center gap-4 mt-8 max-w-xs mx-auto">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, oklch(0.58 0.14 68 / 0.6))" }}
            />
            <span style={{ color: "oklch(0.58 0.14 68)", fontSize: "1.1rem" }}>𓃭</span>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, oklch(0.58 0.14 68 / 0.6))" }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { value: "5", label: "Wallpapers" },
              { value: "4K", label: "Max Resolution" },
              { value: "Free", label: "Always" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 72)" }}
                >
                  {value}
                </p>
                <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: "oklch(0.42 0.03 70)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery body */}
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.08 0.015 262)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <WallpaperGallery />
        </div>
      </div>
    </div>
  )
}
