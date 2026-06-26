"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Character, CharacterEra } from "@/lib/database.types"

interface Props {
  character: Character
  era: CharacterEra
  onClose: () => void
}

const ERA_CONFIG = {
  indiana: {
    label: "Present-Day Indiana",
    symbol: "◈",
    accentClass: "text-indigo-400",
    traitBg: "bg-indigo-950/60 text-indigo-200 border border-indigo-700/40",
    dividerGradient: "from-transparent via-indigo-500/50 to-transparent",
  },
  egypt: {
    label: "Ancient Egypt",
    symbol: "𓂀",
    accentClass: "text-gold",
    traitBg: "bg-amber-950/60 text-amber-200 border border-amber-700/40",
    dividerGradient: "from-transparent via-gold/50 to-transparent",
  },
}

function FullIllustrationPlaceholder({ character, era }: { character: Character; era: CharacterEra }) {
  const initials = character.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none",
        era === "indiana" ? "portrait-indiana" : "portrait-egypt"
      )}
    >
      {/* Outer decorative ring */}
      <div
        className="absolute inset-6 rounded-full opacity-10"
        style={{
          border: `1px solid ${era === "egypt" ? "oklch(0.72 0.14 72)" : "oklch(0.55 0.15 265)"}`,
          boxShadow: `0 0 60px ${era === "egypt" ? "oklch(0.58 0.14 68 / 0.15)" : "oklch(0.42 0.14 265 / 0.15)"}`,
        }}
      />
      <div
        className="absolute inset-12 rounded-full opacity-8"
        style={{
          border: `1px solid ${era === "egypt" ? "oklch(0.72 0.14 72)" : "oklch(0.55 0.15 265)"}`,
        }}
      />

      {/* Initials */}
      <span
        className="relative z-10 text-8xl font-bold tracking-widest opacity-60"
        style={{
          fontFamily: "var(--font-display)",
          color: era === "egypt" ? "oklch(0.78 0.12 75)" : "oklch(0.65 0.14 265)",
          textShadow: `0 0 40px ${era === "egypt" ? "oklch(0.58 0.14 68 / 0.4)" : "oklch(0.42 0.14 265 / 0.4)"}`,
        }}
      >
        {initials}
      </span>

      {/* Era symbol */}
      <span
        className="relative z-10 mt-4 text-2xl opacity-40"
        style={{ color: era === "egypt" ? "oklch(0.72 0.14 72)" : "oklch(0.55 0.15 265)" }}
      >
        {ERA_CONFIG[era].symbol}
      </span>

      {/* Bottom label */}
      <p
        className="absolute bottom-5 left-0 right-0 text-center text-xs tracking-[0.3em] uppercase opacity-30"
        style={{
          fontFamily: "var(--font-display)",
          color: era === "egypt" ? "oklch(0.78 0.12 75)" : "oklch(0.7 0.12 265)",
        }}
      >
        Illustration Coming Soon
      </p>
    </div>
  )
}

export function CharacterModal({ character, era, onClose }: Props) {
  const cfg = ERA_CONFIG[era]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const traits = character.personality ? character.personality.split(",").map((t) => t.trim()) : []

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "oklch(0.05 0.01 260 / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="animate-modal-in relative flex flex-col lg:flex-row w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
        style={{
          background: "oklch(0.10 0.025 260)",
          border: "1px solid oklch(0.58 0.14 68 / 0.3)",
          boxShadow: "0 25px 80px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.58 0.14 68 / 0.1)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          style={{ background: "oklch(0.18 0.03 260 / 0.9)", border: "1px solid oklch(0.30 0.03 260)" }}
          aria-label="Close character profile"
        >
          <X className="h-4 w-4" style={{ color: "oklch(0.65 0.04 70)" }} />
        </button>

        {/* Left — full illustration */}
        <div className="flex-shrink-0 lg:w-72 h-56 lg:h-auto">
          <FullIllustrationPlaceholder character={character} era={era} />
        </div>

        {/* Vertical divider */}
        <div
          className="hidden lg:block w-px self-stretch my-6 opacity-30"
          style={{ background: `linear-gradient(to bottom, transparent, oklch(0.58 0.14 68), transparent)` }}
        />

        {/* Right — character info */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Era badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: era === "egypt" ? "oklch(0.28 0.08 65 / 0.5)" : "oklch(0.20 0.08 265 / 0.5)",
                color: era === "egypt" ? "oklch(0.78 0.12 75)" : "oklch(0.70 0.14 265)",
                border: `1px solid ${era === "egypt" ? "oklch(0.58 0.14 68 / 0.4)" : "oklch(0.42 0.14 265 / 0.4)"}`,
              }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Name */}
          <h2
            className="text-3xl lg:text-4xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: era === "egypt" ? "0 0 30px oklch(0.58 0.14 68 / 0.25)" : "none",
            }}
          >
            {character.name}
          </h2>

          {character.age && (
            <p className="text-sm mb-4" style={{ color: "oklch(0.55 0.04 70)" }}>
              Age: {character.age}
            </p>
          )}

          {/* Gold / indigo rule */}
          <div
            className="h-px mb-5"
            style={{ background: `linear-gradient(to right, ${era === "egypt" ? "oklch(0.58 0.14 68 / 0.6)" : "oklch(0.42 0.14 265 / 0.6)"}, transparent)` }}
          />

          {/* Description */}
          {character.description && (
            <div className="mb-5">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.50 0.04 70)", fontFamily: "var(--font-display)" }}
              >
                Biography
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.78 0.02 75)", fontFamily: "Georgia, serif" }}>
                {character.description}
              </p>
            </div>
          )}

          {/* Personality traits */}
          {traits.length > 0 && (
            <div className="mb-5">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.50 0.04 70)", fontFamily: "var(--font-display)" }}
              >
                Character Traits
              </p>
              <div className="flex flex-wrap gap-1.5">
                {traits.map((trait) => (
                  <span
                    key={trait}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: era === "egypt" ? "oklch(0.22 0.06 65 / 0.6)" : "oklch(0.18 0.08 265 / 0.6)",
                      color: era === "egypt" ? "oklch(0.80 0.10 72)" : "oklch(0.72 0.14 265)",
                      border: `1px solid ${era === "egypt" ? "oklch(0.40 0.10 68 / 0.4)" : "oklch(0.42 0.14 265 / 0.4)"}`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Story role */}
          {character.story_role && (
            <div className="mb-5">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.50 0.04 70)", fontFamily: "var(--font-display)" }}
              >
                Role in the Story
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.68 0.025 70)", fontFamily: "Georgia, serif" }}>
                {character.story_role}
              </p>
            </div>
          )}

          {/* Book appearances */}
          {character.book_ids.length > 0 && (
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.50 0.04 70)", fontFamily: "var(--font-display)" }}
              >
                Appears In
              </p>
              <div className="flex flex-wrap gap-2">
                {character.book_ids.map((slug) => (
                  <span
                    key={slug}
                    className="text-xs px-2.5 py-1 rounded"
                    style={{
                      background: "oklch(0.16 0.02 260)",
                      border: "1px solid oklch(0.28 0.03 260)",
                      color: "oklch(0.65 0.04 70)",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
