import type { Partner } from "@/types/collaboration"

interface Props {
  partner: Partner
}

function AvatarPlaceholder({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div
      className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
      style={{
        background: gradient,
        border: "2px solid oklch(0.58 0.14 68 / 0.35)",
        boxShadow: "0 0 20px oklch(0.58 0.14 68 / 0.15)",
      }}
    >
      <span
        className="select-none font-bold tracking-widest"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          color: "oklch(0.85 0.10 72)",
          opacity: 0.8,
        }}
      >
        {initials}
      </span>
    </div>
  )
}

const AVATAR_GRADIENTS = [
  "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.26 0.10 65) 100%)",
  "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 100%)",
  "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 100%)",
  "linear-gradient(145deg, oklch(0.14 0.05 50) 0%, oklch(0.24 0.08 62) 100%)",
]

export function PartnerCard({ partner }: Props) {
  const initials = partner.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const gradient = AVATAR_GRADIENTS[partner.order % AVATAR_GRADIENTS.length]

  return (
    <div
      className="card-glow-hover flex flex-col items-center text-center rounded-xl px-6 py-8"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.20 0.03 260)",
      }}
    >
      {/* Avatar / logo slot */}
      {partner.avatar_url ? (
        <div
          className="relative mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full"
          style={{ border: "2px solid oklch(0.58 0.14 68 / 0.35)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={partner.avatar_url}
            alt={partner.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <AvatarPlaceholder initials={initials} gradient={gradient} />
      )}

      {/* Name */}
      <h3
        className="mb-1 text-base font-bold leading-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "oklch(0.92 0.025 75)",
        }}
      >
        {partner.name}
      </h3>

      {/* Role badge */}
      <span
        className="mb-3 inline-block text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full"
        style={{
          background: "oklch(0.20 0.06 65 / 0.45)",
          border: "1px solid oklch(0.45 0.10 68 / 0.4)",
          color: "oklch(0.72 0.10 72)",
        }}
      >
        {partner.role}
      </span>

      {/* Description */}
      {partner.description && (
        <p
          className="text-xs leading-relaxed"
          style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
        >
          {partner.description}
        </p>
      )}

      {/* Optional link */}
      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs transition-colors"
          style={{ color: "oklch(0.58 0.14 68)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 72)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.58 0.14 68)")}
        >
          Visit →
        </a>
      )}
    </div>
  )
}
