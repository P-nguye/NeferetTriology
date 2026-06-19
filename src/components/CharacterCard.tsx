import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Character } from "@/lib/database.types"

interface Props {
  character: Character
}

export function CharacterCard({ character }: Props) {
  return (
    <Card className="flex flex-col h-full">
      {/* Name banner */}
      <div className="bg-gradient-to-r from-[oklch(0.28_0.06_68)] to-[oklch(0.22_0.04_260)] rounded-t-xl px-6 py-4">
        <h3 className="font-serif text-lg font-bold text-white">{character.name}</h3>
        {character.age && (
          <p className="text-xs text-white/50 mt-0.5">Age: {character.age}</p>
        )}
      </div>

      <CardContent className="pt-5 flex flex-col gap-4 flex-1">
        {character.description && (
          <p className="text-sm text-foreground leading-relaxed">{character.description}</p>
        )}

        {character.personality && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Personality</p>
            <div className="flex flex-wrap gap-1.5">
              {character.personality.split(",").map((trait) => (
                <Badge key={trait.trim()} variant="secondary" className="text-xs font-normal">
                  {trait.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {character.story_role && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Story Role</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{character.story_role}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
