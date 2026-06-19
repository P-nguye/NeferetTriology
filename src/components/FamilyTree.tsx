import type { Character } from "@/lib/database.types"
import { Badge } from "@/components/ui/badge"

interface Props {
  royalFamily: Character[]
}

function getRoyalMember(members: Character[], name: string) {
  return members.find((m) => m.name.toLowerCase().includes(name.toLowerCase()))
}

export function FamilyTree({ royalFamily }: Props) {
  const khufu = getRoyalMember(royalFamily, "khufu")
  const meritites = getRoyalMember(royalFamily, "meritites")
  const neferet = getRoyalMember(royalFamily, "neferet")
  const henutsen = getRoyalMember(royalFamily, "henutsen")

  return (
    <div className="my-8">
      {/* Parents row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center gap-6 sm:gap-0">
        <FamilyMemberCard member={khufu} label="The King / Father" />

        {/* Connector */}
        <div className="flex flex-col items-center justify-center sm:pt-8 sm:mx-4">
          <div className="text-muted-foreground font-serif text-xl hidden sm:block">+</div>
          <div className="w-px h-6 bg-border sm:hidden" />
          <div className="text-muted-foreground font-serif text-xl sm:hidden">+</div>
        </div>

        <FamilyMemberCard member={meritites} label="The Heart of the Royal Family / Mother" />
      </div>

      {/* Vertical line down */}
      <div className="flex justify-center">
        <div className="w-px h-10 bg-border" />
      </div>

      {/* Horizontal line */}
      <div className="flex justify-center">
        <div className="flex items-center">
          <div className="w-24 sm:w-40 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-border" />
          <div className="w-24 sm:w-40 h-px bg-border" />
        </div>
      </div>

      {/* Children row */}
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 mt-0">
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-border" />
          <FamilyMemberCard member={neferet} label="Older Daughter" highlight />
        </div>
        <div className="hidden sm:block w-16" />
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-border" />
          <FamilyMemberCard member={henutsen} label="Younger Daughter" />
        </div>
      </div>

      {/* Dynamics */}
      <div className="mt-10 rounded-xl border border-border bg-muted p-6">
        <h4 className="font-serif text-base font-semibold text-foreground mb-4 text-center">Family Dynamics</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
          <li className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Khufu ↔ Neferet</span>
            <span className="text-muted-foreground">Duty vs. freedom</span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Meritites ↔ Neferet</span>
            <span className="text-muted-foreground">Motherly understanding</span>
          </li>
          <li className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Henutsen ↔ Neferet</span>
            <span className="text-muted-foreground">Best friends as well as sisters</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function FamilyMemberCard({
  member,
  label,
  highlight = false,
}: {
  member: Character | undefined
  label: string
  highlight?: boolean
}) {
  if (!member) {
    return (
      <div className="w-56 rounded-xl border border-border bg-muted p-4 text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    )
  }
  return (
    <div className={`w-56 rounded-xl border p-4 text-center ${highlight ? "border-primary/50 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className="font-serif font-semibold text-foreground">{member.name}</p>
      {member.age && <p className="text-xs text-muted-foreground mt-0.5">Age: {member.age}</p>}
      {member.personality && (
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {member.personality
            .split(",")
            .slice(0, 2)
            .map((t) => (
              <Badge key={t.trim()} variant="outline" className="text-[10px] px-1.5 py-0">
                {t.trim()}
              </Badge>
            ))}
        </div>
      )}
    </div>
  )
}
