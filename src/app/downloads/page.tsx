import type { Metadata } from "next"
import { PdfDownloadCard } from "@/components/PdfDownloadCard"
import type { PdfAsset } from "@/types/pdf-assets"

export const metadata: Metadata = {
  title: "Downloads — Neferet Trilogy",
  description:
    "Access premium Neferet Trilogy documents: production scripts, lore guides, concept art packets, and press materials.",
}

/* ─── Seed / fallback assets ──────────────────────────────────────────────
   Replace with Supabase query once the table exists.
─────────────────────────────────────────────────────────────────────────── */

const FEATURED_ASSET: PdfAsset = {
  id: "featured-1",
  title: "The Eight Gate — Production Script",
  subtitle: "Pilot Episode · Animated Series Adaptation",
  description:
    "The complete pilot-episode screenplay adapting Book One of The Neferet Trilogy into series format. Includes scene breakdowns, director's notes, character action lines, and dialogue as approved for production. An essential reference for creative partners and licensees.",
  category: "Script",
  file_path: "/assets/documents/neferet-production-script.pdf",
  file_size: "4.2 MB",
  page_count: 68,
  version: "v1.2",
  cover_url: null,
  featured: true,
  order: 0,
}

const ASSETS: PdfAsset[] = [
  {
    id: "asset-1",
    title: "World of Neferet — Lore Compendium",
    subtitle: "Ancient Egypt · Indiana · Complete Canon",
    description:
      "Encyclopedic reference covering geography, mythology, character genealogies, and dual-era timeline for both the Ancient Egyptian and present-day Indiana settings.",
    category: "Lore",
    file_path: "/assets/documents/neferet-lore-compendium.pdf",
    file_size: "6.8 MB",
    page_count: 112,
    version: "v2.0",
    cover_url: null,
    featured: false,
    order: 1,
  },
  {
    id: "asset-2",
    title: "Series Production Bible",
    subtitle: "Animation · Season One Framework",
    description:
      "Complete series-development document: episode structure, tone guides, visual language, character voice profiles, and season-arc breakdown for production partners.",
    category: "Production",
    file_path: "/assets/documents/neferet-production-bible.pdf",
    file_size: "3.1 MB",
    page_count: 44,
    version: "v1.0",
    cover_url: null,
    featured: false,
    order: 2,
  },
  {
    id: "asset-3",
    title: "Official Press Kit",
    subtitle: "Media · Distribution · Licensing",
    description:
      "Press materials including project overview, key cast & crew bios, loglines, synopsis (one-page and full), approved images, and contact information for media inquiries.",
    category: "Press Kit",
    file_path: "/assets/documents/neferet-press-kit.pdf",
    file_size: "2.4 MB",
    page_count: 24,
    version: "v1.1",
    cover_url: null,
    featured: false,
    order: 3,
  },
  {
    id: "asset-4",
    title: "Concept Art & Visual Development",
    subtitle: "Character Design · Environment Art · Storyboards",
    description:
      "Curated selection of approved concept art exploring character aesthetics, Ancient Egyptian environmental design, color palette explorations, and key-scene storyboard frames.",
    category: "Concept Art",
    file_path: "/assets/documents/neferet-concept-art.pdf",
    file_size: "18.5 MB",
    page_count: 56,
    version: "v1.0",
    cover_url: null,
    featured: false,
    order: 4,
  },
]

export default function DownloadsPage() {
  return (
    <div className="dark" style={{ background: "oklch(0.08 0.015 262)", minHeight: "100vh" }}>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.02 265) 0%, oklch(0.10 0.025 260) 60%, oklch(0.08 0.015 262) 100%)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.15)",
        }}
      >
        {/* Ambient glow — left */}
        <div
          className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.58 0.14 68 / 0.10) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />
        {/* Ambient glow — right */}
        <div
          className="pointer-events-none absolute top-0 right-1/4 h-56 w-56 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.42 0.12 265 / 0.10) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
          aria-hidden
        />

        {/* Watermark hieroglyph */}
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
          <p
            className="text-xs uppercase tracking-[0.55em] mb-5"
            style={{ color: "oklch(0.58 0.14 68)" }}
          >
            𓂀 &nbsp; Premium Assets &nbsp; 𓂀
          </p>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.94 0.025 75)",
              textShadow: "0 0 80px oklch(0.58 0.14 68 / 0.18)",
            }}
          >
            Downloads
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "oklch(0.60 0.025 70)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Production scripts, world-building lore, concept art, and press materials for
            the Neferet Trilogy animated series — curated for creative partners, media,
            and dedicated readers.
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Featured document */}
        <section>
          <div className="flex items-center gap-4 mb-7">
            <p
              className="text-xs uppercase tracking-[0.45em]"
              style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
            >
              Featured Document
            </p>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.58 0.14 68 / 0.30), transparent)",
              }}
            />
          </div>

          <PdfDownloadCard asset={FEATURED_ASSET} variant="featured" />
        </section>

        {/* Asset grid */}
        <section>
          <div className="flex items-center gap-4 mb-7">
            <p
              className="text-xs uppercase tracking-[0.45em]"
              style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
            >
              All Documents
            </p>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.58 0.14 68 / 0.30), transparent)",
              }}
            />
            <span
              className="text-xs"
              style={{ color: "oklch(0.40 0.04 68)", fontFamily: "var(--font-display)" }}
            >
              {ASSETS.length} documents
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ASSETS.map((asset) => (
              <PdfDownloadCard key={asset.id} asset={asset} variant="default" />
            ))}
          </div>
        </section>

        {/* Footer notice */}
        <div
          className="rounded-xl px-6 py-5 text-center"
          style={{
            background: "oklch(0.11 0.025 260)",
            border: "1px solid oklch(0.20 0.03 260)",
          }}
        >
          <p
            className="text-sm"
            style={{ color: "oklch(0.45 0.03 68)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            All documents are for reference and partnership purposes. Content is subject to change
            as production progresses.{" "}
            <a
              href="/contact"
              style={{ color: "oklch(0.58 0.14 68)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Contact us
            </a>{" "}
            for licensing, distribution, or press inquiries.
          </p>
        </div>

      </div>
    </div>
  )
}
