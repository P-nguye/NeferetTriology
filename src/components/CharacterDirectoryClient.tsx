"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Character, CharacterEra } from "@/lib/database.types"
import { CharacterModal } from "./CharacterModal"

interface Props {
  characters: Character[]
}

const EGYPT_NAME_FRAGMENTS = new Set([
  "neferet", "khufu", "meritites", "henutsen", "menka", "the prince", "the queen",
])

function resolveEra(character: Character): CharacterEra {
  if (character.era) return character.era
  if (character.role === "royal_family") return "egypt"
  const lower = character.name.toLowerCase()
  for (const frag of EGYPT_NAME_FRAGMENTS) {
    if (lower.includes(frag)) return "egypt"
  }
  return "indiana"
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// Subtle per-character gradient offset so cards feel distinct, not identical
const PORTRAIT_OFFSETS = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180]

function CharacterHeadshot({
  character,
  era,
  index,
  onClick,
}: {
  character: Character
  era: CharacterEra
  index: number
  onClick: () => void
}) {
  const initials = getInitials(character.name)
  const hueShift = PORTRAIT_OFFSETS[index % PORTRAIT_OFFSETS.length]

  return (
    <button
      onClick={onClick}
      className="card-glow-hover group relative flex flex-col overflow-hidden rounded-xl text-left w-full cursor-pointer"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.22 0.03 260)",
      }}
    >
      {/* Portrait area — 3:4 ratio */}
      <div className="relative w-full" style={{ paddingBottom: "133%" }}>
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center overflow-hidden",
            era === "indiana" ? "portrait-indiana" : "portrait-egypt"
          )}
          style={{
            filter: `hue-rotate(${hueShift * 0.15}deg)`,
          }}
        >
          {/* Decorative ring */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: era === "egypt"
                ? "radial-gradient(ellipse at center, oklch(0.58 0.14 68 / 0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, oklch(0.42 0.14 265 / 0.08) 0%, transparent 70%)",
            }}
          />

          {/* Initials */}
          <span
            className="relative z-10 select-none font-bold tracking-widest"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: era === "egypt" ? "oklch(0.72 0.12 72)" : "oklch(0.62 0.14 265)",
              opacity: 0.55,
              textShadow: era === "egypt"
                ? "0 0 30px oklch(0.58 0.14 68 / 0.4)"
                : "0 0 30px oklch(0.42 0.14 265 / 0.4)",
            }}
          >
            {initials}
          </span>

          {/* Era glyph */}
          <span
            className="relative z-10 mt-2 select-none text-lg"
            style={{
              opacity: 0.25,
              color: era === "egypt" ? "oklch(0.72 0.12 72)" : "oklch(0.62 0.14 265)",
            }}
          >
            {era === "egypt" ? "𓂀" : "◈"}
          </span>

          {/* "View Profile" hover overlay */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <span
              className="text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                background: era === "egypt" ? "oklch(0.58 0.14 68 / 0.85)" : "oklch(0.42 0.14 265 / 0.85)",
                color: "oklch(0.06 0.01 260)",
                fontFamily: "var(--font-display)",
              }}
            >
              View Profile
            </span>
          </div>
        </div>
      </div>

      {/* Name plate */}
      <div className="px-3 py-3">
        <h3
          className="font-semibold text-sm leading-tight truncate"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.90 0.025 75)",
          }}
        >
          {character.name}
        </h3>
        {character.age && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "oklch(0.48 0.035 70)" }}>
            {character.age}
          </p>
        )}
      </div>
    </button>
  )
}

const ERA_TABS: { era: CharacterEra; label: string; sub: string; glyph: string }[] = [
  { era: "indiana", label: "Present-Day Indiana", sub: "Modern Era · USA", glyph: "◈" },
  { era: "egypt",   label: "Ancient Egypt",        sub: "2560 BCE · 4th Dynasty", glyph: "𓂀" },
]

export function CharacterDirectoryClient({ characters }: Props) {
  const [activeEra, setActiveEra] = useState<CharacterEra>("indiana")
  const [selected, setSelected] = useState<Character | null>(null)

  const byEra = characters.reduce<Record<CharacterEra, Character[]>>(
    (acc, char) => {
      const era = resolveEra(char)
      acc[era].push(char)
      return acc
    },
    { indiana: [], egypt: [] }
  )

  const displayList = byEra[activeEra].sort((a, b) => a.order - b.order)

  return (
    <>
      {/* Era selector tabs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        {ERA_TABS.map(({ era, label, sub, glyph }) => {
          const isActive = activeEra === era
          const isEgypt = era === "egypt"
          return (
            <button
              key={era}
              onClick={() => setActiveEra(era)}
              className="relative flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all duration-300 cursor-pointer"
              style={{
                background: isActive
                  ? isEgypt ? "oklch(0.22 0.06 65 / 0.5)" : "oklch(0.16 0.08 265 / 0.5)"
                  : "oklch(0.11 0.02 260 / 0.8)",
                border: isActive
                  ? `1px solid ${isEgypt ? "oklch(0.58 0.14 68 / 0.7)" : "oklch(0.42 0.14 265 / 0.7)"}`
                  : "1px solid oklch(0.22 0.03 260)",
                boxShadow: isActive
                  ? `0 0 24px ${isEgypt ? "oklch(0.58 0.14 68 / 0.15)" : "oklch(0.42 0.14 265 / 0.15)"}`
                  : "none",
                minWidth: "220px",
              }}
            >
              <span
                className="text-3xl leading-none"
                style={{
                  color: isActive
                    ? isEgypt ? "oklch(0.72 0.14 72)" : "oklch(0.65 0.14 265)"
                    : "oklch(0.35 0.03 260)",
                }}
              >
                {glyph}
              </span>
              <div>
                <p
                  className="font-semibold text-sm leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: isActive ? "oklch(0.92 0.025 75)" : "oklch(0.50 0.03 260)",
                  }}
                >
                  {label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: isActive ? "oklch(0.60 0.04 70)" : "oklch(0.38 0.025 260)" }}
                >
                  {sub}
                </p>
              </div>

              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
                  style={{ background: isEgypt ? "oklch(0.72 0.14 72)" : "oklch(0.65 0.14 265)" }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Era heading */}
      <div className="text-center mb-8">
        <p
          className="text-xs uppercase tracking-[0.4em] mb-2"
          style={{ color: activeEra === "egypt" ? "oklch(0.58 0.14 68)" : "oklch(0.42 0.14 265)" }}
        >
          {activeEra === "egypt" ? "𓂀  The Royal Court & Companions" : "◈  The Modern World"}
        </p>
        <p className="text-sm" style={{ color: "oklch(0.50 0.03 260)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          {activeEra === "egypt"
            ? "Giza Plateau, Old Kingdom Egypt — during the construction of the Great Pyramid"
            : "Indiana, USA — present day"}
        </p>
      </div>

      {/* Character grid */}
      {displayList.length === 0 ? (
        <p className="text-center py-12" style={{ color: "oklch(0.40 0.025 260)" }}>
          No characters found for this era.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayList.map((char, i) => (
            <CharacterHeadshot
              key={char.id}
              character={char}
              era={activeEra}
              index={i}
              onClick={() => setSelected(char)}
            />
          ))}
        </div>
      )}

      {/* Character count label */}
      <p
        className="text-center mt-6 text-xs tracking-widest uppercase"
        style={{ color: "oklch(0.35 0.025 260)" }}
      >
        {displayList.length} {activeEra === "egypt" ? "Egyptian" : "Indiana"} Character{displayList.length !== 1 ? "s" : ""}
      </p>

      {/* Modal */}
      {selected && (
        <CharacterModal
          character={selected}
          era={resolveEra(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
