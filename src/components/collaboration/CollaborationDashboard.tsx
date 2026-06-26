import { PartnerCard } from "./PartnerCard"
import { MilestoneTimeline } from "./MilestoneTimeline"
import { CollaborationInquiryForm } from "./CollaborationInquiryForm"
import type { Partner, Milestone } from "@/types/collaboration"

interface Props {
  partners: Partner[]
  milestones: Milestone[]
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10">
      <p
        className="text-xs uppercase tracking-[0.4em] mb-3"
        style={{ color: "oklch(0.58 0.14 68)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-display)",
          color: "oklch(0.94 0.025 75)",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-sm leading-relaxed max-w-xl"
          style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

function GoldRule() {
  return (
    <div className="flex items-center gap-4 my-16">
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, oklch(0.58 0.14 68 / 0.25))" }}
      />
      <span
        className="select-none text-sm"
        style={{ color: "oklch(0.45 0.08 68)" }}
        aria-hidden
      >
        𓃭
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left, transparent, oklch(0.58 0.14 68 / 0.25))" }}
      />
    </div>
  )
}

export function CollaborationDashboard({ partners, milestones }: Props) {
  return (
    <div>
      {/* ── Partners grid ───────────────────────────────────────────── */}
      <section id="partners">
        <SectionHeader
          eyebrow="◈  Co-Creators & Partners"
          title="The Production Circle"
          subtitle="The studios, creators, and specialists bringing the world of Neferet to life across every medium."
        />

        {partners.length === 0 ? (
          <div
            className="rounded-xl py-14 text-center"
            style={{
              background: "oklch(0.10 0.02 262)",
              border: "1px solid oklch(0.22 0.03 260)",
            }}
          >
            <p
              className="text-sm"
              style={{ color: "oklch(0.42 0.025 260)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Partner profiles coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </section>

      <GoldRule />

      {/* ── Milestones ──────────────────────────────────────────────── */}
      <section id="roadmap">
        <SectionHeader
          eyebrow="𓂀  Production Roadmap"
          title="Shared Milestones"
          subtitle="The phased journey from page to screen — each milestone a coordinated step between creative and production partners."
        />

        <div
          className="rounded-xl p-6 sm:p-10"
          style={{
            background: "oklch(0.10 0.02 262)",
            border: "1px solid oklch(0.22 0.03 260)",
          }}
        >
          <MilestoneTimeline milestones={milestones} />
        </div>
      </section>

      <GoldRule />

      {/* ── Inquiry form ────────────────────────────────────────────── */}
      <section id="inquire">
        <SectionHeader
          eyebrow="𓃭  Work With Us"
          title="Collaboration Inquiry"
          subtitle="We welcome inquiries from producers, distributors, investors, and media partners who share a vision for premium storytelling."
        />

        <div
          className="mx-auto max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.11 0.025 260)",
            border: "1px solid oklch(0.22 0.03 260)",
            boxShadow: "0 4px 32px oklch(0 0 0 / 0.4)",
          }}
        >
          {/* Form header */}
          <div
            className="px-7 py-5"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.12 0.04 265) 0%, oklch(0.16 0.06 65) 100%)",
              borderBottom: "1px solid oklch(0.22 0.03 260)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "oklch(0.55 0.10 68)", fontFamily: "var(--font-display)" }}
            >
              Professional Inquiry Portal
            </p>
          </div>
          <div className="px-7 py-8">
            <CollaborationInquiryForm />
          </div>
        </div>
      </section>
    </div>
  )
}
