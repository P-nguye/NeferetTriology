import type { Metadata } from "next"
import { getCharacters } from "@/lib/data"
import type { Character } from "@/lib/database.types"
import { CharacterDirectoryClient } from "@/components/CharacterDirectoryClient"

export const metadata: Metadata = {
  title: "Characters",
  description: "Meet the explorers, royals, and visionaries whose choices reshape two worlds — from modern-day Indiana to the courts of Ancient Egypt.",
}

const fallbackCharacters: Character[] = [
  /* ── Present-Day Indiana ────────────────────────────────────────────── */
  {
    id: "1",
    name: "John Carter",
    age: "24",
    role: "main",
    era: "indiana",
    description: "Graduate student and historian with dark brown hair and an athletic build. Discovered the Eight Gate during a routine cave survey in southern Indiana. Quietly driven by an obsession with impossible things.",
    personality: "Curious, Courageous, Empathetic, Determined",
    story_role: "The protagonist whose accidental activation of the Eight Gate sets the entire trilogy in motion. His journey from skeptic to believer — and from outsider to Pharaoh's trusted friend — is the spine of the series.",
    book_ids: ["the-eight-gate", "princess-neferet", "the-journey-home"],
    order: 1,
  },
  {
    id: "2",
    name: "Jack Reynolds",
    age: "Mid-20s",
    role: "main",
    era: "indiana",
    description: "John's research assistant. Slightly broader build, short light-brown hair, and a talent for making the most impossible situations feel manageable. Often the first to crack a dark-humour joke in a crisis.",
    personality: "Pragmatic, Resourceful, Quietly Funny, Fiercely Loyal",
    story_role: "Primary supporting character who provides both comic relief and essential problem-solving. His bond with John anchors the human stakes of each time-jump.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 2,
  },
  {
    id: "3",
    name: "Dr. Ethan Mitchell",
    age: "Late 50s",
    role: "main",
    era: "indiana",
    description: "Distinguished physics professor with rimless glasses and the unhurried confidence of someone who has spent decades being right about improbable things. His office is a museum of anomaly.",
    personality: "Methodical, Brilliant, Calm in Crisis, Principled",
    story_role: "The scientific mentor. His understanding of the physics behind the Eight Gate deepens across all three books, and he carries the weight of both possibility and consequence.",
    book_ids: ["the-eight-gate", "princess-neferet", "the-journey-home"],
    order: 3,
  },
  {
    id: "4",
    name: "Ethan Blake",
    age: "40s",
    role: "main",
    era: "indiana",
    description: "Successful corporate executive. Polished, confident, and charismatic in the way of someone used to being the most important person in any room. Hides his obsession with the Eight Gate beneath a veneer of philanthropy.",
    personality: "Ambitious, Controlled, Perceptive, Calculating",
    story_role: "Secondary antagonist whose interest in the Eight Gate creates significant conflict across Books 2 and 3. His motivations are more complex — and more dangerous — than they first appear.",
    book_ids: ["princess-neferet", "the-journey-home"],
    order: 4,
  },
  {
    id: "5",
    name: "Michael Carter",
    age: "54",
    role: "supporting",
    era: "indiana",
    description: "John's father. A retired civil engineer with broad shoulders and patient eyes. He speaks in measured sentences and thinks in load-bearing structures. His quiet pride in John has never once needed to be said aloud.",
    personality: "Steady, Protective, Pragmatic, Warm",
    story_role: "Represents John's roots and the world he risks losing. His reaction when the truth finally reaches him is one of the trilogy's most quietly powerful moments.",
    book_ids: ["princess-neferet", "the-journey-home"],
    order: 5,
  },
  {
    id: "6",
    name: "Sarah Carter",
    age: "51",
    role: "supporting",
    era: "indiana",
    description: "John's mother. An English literature professor with an instinct for subtext and an uncanny ability to know when her son is hiding something. She is the person John calls last — and regrets it most.",
    personality: "Perceptive, Warm, Quietly Fierce, Graceful",
    story_role: "Her maternal intuition threads through the series as a compass for John's emotional honesty. Her eventual understanding of what really happened forms a deeply moving subplot.",
    book_ids: ["princess-neferet", "the-journey-home"],
    order: 6,
  },
  {
    id: "7",
    name: "Emily Carter",
    age: "19",
    role: "supporting",
    era: "indiana",
    description: "John's younger sister. Pre-med student with her mother's sharp eyes and her father's stubbornness. She's the first person to believe John without requiring proof.",
    personality: "Sharp, Loyal, Stubborn, Brave",
    story_role: "A crucial tether to John's present-day life. Her unconditional belief becomes one of his greatest sources of courage across the trilogy.",
    book_ids: ["princess-neferet", "the-journey-home"],
    order: 7,
  },

  /* ── Ancient Egypt ──────────────────────────────────────────────────── */
  {
    id: "8",
    name: "Princess Neferet",
    age: "Early 20s",
    role: "main",
    era: "egypt",
    description: "Daughter of Pharaoh Khufu. Egyptian royal beauty — intelligent and graceful, with the bearing of someone raised to lead and the quiet restlessness of someone who was not raised to follow.",
    personality: "Intelligent, Dignified, Fiercely Adaptable, Tender",
    story_role: "Co-protagonist whose displacement through time mirrors John's journey in reverse. Her navigation of the modern world in Book 2 is as much a story of identity as it is of survival.",
    book_ids: ["the-eight-gate", "princess-neferet", "the-journey-home"],
    order: 8,
  },
  {
    id: "9",
    name: "King Khufu",
    age: "Mid-50s",
    role: "royal_family",
    era: "egypt",
    description: "The Pharaoh of Egypt, overseeing construction of the Great Pyramid at Giza. Commands absolute loyalty throughout the kingdom. His presence fills a room before he speaks.",
    personality: "Wise, Strategic, Authoritative, Protective",
    story_role: "Father figure and moral authority of the Egyptian storyline. His evolving relationship with John — from suspicion to reluctant respect — is one of the trilogy's longest and most rewarding arcs.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 9,
  },
  {
    id: "10",
    name: "The Queen",
    age: "Early 40s",
    role: "royal_family",
    era: "egypt",
    description: "Queen Meritites, wife of Pharaoh Khufu. Elegant and highly respected throughout the royal court. Possesses the rare quality of seeing people — not roles — and being entirely unhurried about it.",
    personality: "Compassionate, Intelligent, Diplomatic, Warm-hearted",
    story_role: "One of the first to understand what Neferet feels for John. Her eventual reunion with her daughter in Book 3 is one of the most emotionally anticipated payoffs of the entire series.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 10,
  },
  {
    id: "11",
    name: "Princess Henutsen",
    age: "15–16",
    role: "royal_family",
    era: "egypt",
    description: "Neferet's younger sister. Playful, energetic, and fearlessly curious about everything from the stars to strangers. She has a gift for disarming tension with a single perfectly-timed laugh.",
    personality: "Cheerful, Mischievous, Loyal, Fearless",
    story_role: "Appears in Neferet's dreams and memories during Book 2. Their long-awaited reunion in Book 3 carries the weight of everything the sisters lost and everything they fought to keep.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 11,
  },
  {
    id: "12",
    name: "The Prince",
    age: "Late 20s",
    role: "royal_family",
    era: "egypt",
    description: "Crown Prince Djedefre, eldest son of Khufu and heir to the Double Crown. Sharp-eyed and meticulous, he has spent his life preparing to rule a kingdom still being built.",
    personality: "Measured, Proud, Duty-bound, Perceptive",
    story_role: "Represents the political weight pressing down on Neferet's personal choices. His complicated relationship with his father's favour and his sister's destiny creates one of the series' most nuanced tensions.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 12,
  },
  {
    id: "13",
    name: "Menka",
    age: "40s",
    role: "supporting",
    era: "egypt",
    description: "High Priest of Thoth and keeper of the sacred archives beneath the temple complex. Wiry, still, and possessed of an unsettling patience. He has been waiting for someone like John his entire life.",
    personality: "Enigmatic, Devoted, Insightful, Ancient in spirit",
    story_role: "Holds the key to the Eight Gate's true nature and its place in Egyptian cosmology. His role shifts between guide and obstacle depending on which truth he believes John is ready to carry.",
    book_ids: ["the-eight-gate", "the-journey-home"],
    order: 13,
  },
]

export default async function CharactersPage() {
  let characters: Character[] = []
  try {
    characters = await getCharacters()
  } catch {
    characters = fallbackCharacters
  }

  if (characters.length === 0) characters = fallbackCharacters

  return (
    <div>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.06 0.02 265) 0%, oklch(0.10 0.025 260) 60%, oklch(0.10 0.02 260) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        {/* Decorative background hieroglyph */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          <span style={{ fontSize: "30vw", fontFamily: "var(--font-display)", color: "oklch(0.72 0.14 72)" }}>
            𓂀
          </span>
        </div>

        {/* Ambient gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-48 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, oklch(0.58 0.14 68 / 0.10) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; The Neferet Trilogy &nbsp; 𓂀
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 60px oklch(0.58 0.14 68 / 0.20)",
              letterSpacing: "-0.01em",
            }}
          >
            Character Directory
          </h1>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.60 0.03 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Meet the explorers, royals, and visionaries whose choices reshape two worlds —
            from modern-day Indiana to the courts of Ancient Egypt.
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
        </div>
      </div>

      {/* Directory body */}
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.08 0.015 262)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <CharacterDirectoryClient characters={characters} />
        </div>
      </div>
    </div>
  )
}
