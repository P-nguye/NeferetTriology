import type { Metadata } from "next"
import { CollaborationDashboard } from "@/components/collaboration/CollaborationDashboard"
import type { Partner, Milestone } from "@/types/collaboration"

export const metadata: Metadata = {
  title: "Collaboration",
  description:
    "Partner with the Neferet Trilogy — production, distribution, investment, and creative collaboration opportunities.",
}

/* ─────────────────────────────────────────────────────────────────────────
   Seed / fallback data
   Replace with Supabase queries once the tables exist.
───────────────────────────────────────────────────────────────────────── */

const PARTNERS: Partner[] = [
  {
    id: "1",
    name: "Phong Nguyen",
    role: "Author & Creative Director",
    description:
      "Creator of the Neferet Trilogy. Oversees narrative direction, world-building, and the creative vision across all media.",
    avatar_url: null,
    url: null,
    order: 0,
  },
  {
    id: "2",
    name: "Animation Studio",
    role: "Lead Animation Partner",
    description:
      "Responsible for visual development, character design, and the animated series production pipeline.",
    avatar_url: null,
    url: null,
    order: 1,
  },
  {
    id: "3",
    name: "Script Consultant",
    role: "Screenplay & Adaptation",
    description:
      "Adapting the trilogy's narrative arcs into series-format screenplays, maintaining fidelity to the source material.",
    avatar_url: null,
    url: null,
    order: 2,
  },
  {
    id: "4",
    name: "Distribution Partner",
    role: "International Distribution",
    description:
      "Evaluating global licensing and streaming partnerships for the animated series across all major platforms.",
    avatar_url: null,
    url: null,
    order: 3,
  },
]

const MILESTONES: Milestone[] = [
  {
    id: "1",
    phase: 1,
    title: "Script & Concept Development",
    description:
      "Translating the three-book trilogy into a structured series bible, episode outlines, and pilot screenplay. Establishing visual tone, character design language, and world-building guidelines.",
    status: "completed",
    deliverables: ["Series Bible", "Pilot Script", "Character Design Sheets", "Visual Style Guide"],
    date_label: "Q1–Q2 2024",
  },
  {
    id: "2",
    phase: 2,
    title: "Media Production & Animation",
    description:
      "Full production of the animated pilot episode and promotional trailers. Voice casting, storyboard approval, and compositing pipeline established. Concurrent social and digital asset creation.",
    status: "active",
    deliverables: ["Animated Pilot", "Promo Trailers", "Voice Recordings", "Soundtrack"],
    date_label: "Q3 2024 – Q2 2025",
  },
  {
    id: "3",
    phase: 3,
    title: "Platform & Distribution Strategy",
    description:
      "Securing distribution agreements for YouTube premiere and ancillary streaming platforms. Festival submission strategy for animated shorts. Licensing groundwork for international markets.",
    status: "upcoming",
    deliverables: ["Distribution Agreements", "Festival Submissions", "Licensing Packages"],
    date_label: "Q3–Q4 2025",
  },
  {
    id: "4",
    phase: 4,
    title: "Series Launch & Audience Growth",
    description:
      "Public launch of the animated series. Coordinated press campaign, reader-to-viewer conversion strategy, and community engagement across all platforms. Merchandise and publishing tie-ins.",
    status: "upcoming",
    deliverables: ["Series Launch", "Press Campaign", "Merchandise Line", "Publishing Tie-ins"],
    date_label: "2026",
  },
]

export default function CollaborationPage() {
  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>
      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.07 0.03 265) 0%, oklch(0.10 0.025 262) 55%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, oklch(0.58 0.14 68 / 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-10 right-1/4 h-48 w-48 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, oklch(0.42 0.14 265 / 0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          aria-hidden
        />

        {/* Watermark glyph */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ opacity: 0.025 }}
          aria-hidden
        >
          <span
            style={{
              fontSize: "22rem",
              fontFamily: "var(--font-display)",
              color: "oklch(0.72 0.14 72)",
              lineHeight: 1,
            }}
          >
            𓂀
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p
              className="text-xs uppercase tracking-[0.55em] mb-5"
              style={{ color: "oklch(0.58 0.14 68)" }}
            >
              𓂀 &nbsp; Production Partnership &nbsp; 𓂀
            </p>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "oklch(0.94 0.025 75)",
                textShadow: "0 0 80px oklch(0.58 0.14 68 / 0.18)",
              }}
            >
              The Neferet Trilogy
              <br />
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl mt-1"
                style={{ color: "oklch(0.72 0.12 72)" }}
              >
                Creative Collaboration
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{
                color: "oklch(0.60 0.025 70)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              A three-book epic spanning Ancient Egypt and present-day Indiana is being
              brought to life across animation, digital media, and global distribution. We
              invite producers, studios, investors, and distributors who share a commitment
              to premium, story-first storytelling to explore partnership.
            </p>

            {/* Quick-nav anchors */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["#partners", "#roadmap", "#inquire"].map((href) => (
                <a key={href} href={href} className="collab-nav-pill">
                  {href.replace("#", "").replace(/^\w/, (c) => c.toUpperCase())}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dashboard body ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <CollaborationDashboard partners={PARTNERS} milestones={MILESTONES} />
      </div>
    </div>
  )
}
