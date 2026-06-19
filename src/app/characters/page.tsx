import type { Metadata } from "next"
import { CharacterCard } from "@/components/CharacterCard"
import { FamilyTree } from "@/components/FamilyTree"
import { getCharacters } from "@/lib/data"
import type { Character } from "@/lib/database.types"

export const metadata: Metadata = {
  title: "Characters",
  description: "Meet John Carter, Princess Neferet, and the Royal Family of Egypt in the Neferet Trilogy.",
}

const fallbackCharacters: Character[] = [
  { id: "1", name: "John Carter", age: "24", role: "main", description: "Graduate student and historian with dark brown hair and an athletic build. Discovered the Eight Gate during a routine cave survey in Indiana.", personality: "Curious, Courageous, Empathetic", story_role: "The protagonist whose accidental activation of the Eight Gate sets the entire trilogy in motion.", book_ids: ["the-eight-gate", "princess-neferet"], order: 1 },
  { id: "2", name: "Princess Neferet", age: "Early 20s", role: "main", description: "Daughter of Pharaoh Khufu. Egyptian royal beauty — intelligent, graceful, with the bearing of someone raised to lead.", personality: "Intelligent, Dignified, Fiercely Adaptable", story_role: "Co-protagonist whose displacement through time mirrors John's. Her journey of adaptation in the modern era forms the heart of Book 2.", book_ids: ["the-eight-gate", "princess-neferet"], order: 2 },
  { id: "3", name: "Jack Reynolds", age: "Mid-20s", role: "main", description: "John's research assistant. Slightly broader build, short light-brown hair, often wearing practical outdoor clothing or technical gear.", personality: "Pragmatic, Resourceful, Quietly Funny", story_role: "Primary supporting character providing both comic relief and essential problem-solving.", book_ids: ["the-eight-gate"], order: 3 },
  { id: "4", name: "Dr. Ethan Mitchell", age: "Late 50s", role: "main", description: "Distinguished physics professor with glasses and the unhurried manner of someone who has spent decades being right about improbable things.", personality: "Methodical, Brilliant, Calm in Crisis", story_role: "The scientific mentor. His understanding of the physics behind the Eight Gate deepens across all three books.", book_ids: ["the-eight-gate"], order: 4 },
  { id: "5", name: "Ethan Blake", age: "40s", role: "main", description: "Successful corporate executive. Polished, confident, and charismatic in the way of someone used to being the most important person in any room.", personality: "Ambitious, Controlled, Perceptive", story_role: "Secondary antagonist in Books 2 and 3. His interest in the Eight Gate creates significant conflict.", book_ids: ["princess-neferet"], order: 5 },
  { id: "6", name: "Pharaoh Khufu", age: "Mid-50s", role: "royal_family", description: "The King of Egypt, overseeing construction of the Great Pyramid. Commands respect throughout the kingdom.", personality: "Wise, Strategic, Authoritative, Protective", story_role: "Father figure and moral authority. His growing acceptance of John forms one of the trilogy's key arcs.", book_ids: ["the-eight-gate"], order: 6 },
  { id: "7", name: "Queen Meritites", age: "Early 40s", role: "royal_family", description: "Wife of Pharaoh Khufu. Elegant and highly respected throughout the royal court. Possesses strong intuition.", personality: "Compassionate, Intelligent, Diplomatic, Warm-hearted", story_role: "One of the first to realize Neferet's feelings for John. Her reunion with Neferet in Book 3 is emotionally pivotal.", book_ids: ["the-eight-gate"], order: 7 },
  { id: "8", name: "Princess Henutsen", age: "15–16", role: "royal_family", description: "Neferet's younger sister. Playful, energetic, and curious about everything.", personality: "Cheerful, Mischievous, Loyal, Fearless", story_role: "Appears in Neferet's dreams during Book 2. Their reunion in Book 3 is one of the most anticipated payoffs of the series.", book_ids: ["the-eight-gate"], order: 8 },
]

export default async function CharactersPage() {
  let characters: Character[] = []
  try {
    characters = await getCharacters()
  } catch {
    characters = fallbackCharacters
  }

  if (characters.length === 0) characters = fallbackCharacters

  const mainCharacters = characters.filter((c) => c.role === "main")
  const royalFamily = characters.filter((c) => c.role === "royal_family")

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="text-center mb-14">
        <div className="divider-egypt mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-3">The Neferet Trilogy</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Characters</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Meet the explorers, royals, and dreamers whose choices shape two worlds.
        </p>
      </div>

      {/* Main characters */}
      <section className="mb-20">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 flex items-center gap-3">
          <span className="text-primary">𓂀</span> Main Characters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      {/* Royal Family */}
      <section>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-2 flex items-center gap-3">
          <span className="text-primary">𓆤</span> The Royal Family of Neferet
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          The dynasty of Pharaoh Khufu, set during the construction of the Great Pyramid, circa 2560 BCE.
        </p>

        <FamilyTree royalFamily={royalFamily} />

        {/* Royal character cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {royalFamily.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>
    </div>
  )
}
