"use client"

import { useState, useRef } from "react"
import { Download, Check, BookOpen, Scroll, Film, Newspaper, Palette } from "lucide-react"
import type { PdfAsset, PdfCategory } from "@/types/pdf-assets"

/* ─── Category config ──────────────────────────────────────────────────── */

const CATEGORY_CONFIG: Record<
  PdfCategory,
  { Icon: React.ElementType; gradient: string; badgeColor: string; badgeBg: string }
> = {
  Script: {
    Icon: Scroll,
    gradient: "linear-gradient(145deg, oklch(0.10 0.06 265) 0%, oklch(0.20 0.10 265) 50%, oklch(0.12 0.04 260) 100%)",
    badgeColor: "oklch(0.65 0.14 265)",
    badgeBg: "oklch(0.18 0.08 265 / 0.5)",
  },
  Lore: {
    Icon: BookOpen,
    gradient: "linear-gradient(145deg, oklch(0.14 0.06 55) 0%, oklch(0.26 0.10 65) 50%, oklch(0.15 0.04 50) 100%)",
    badgeColor: "oklch(0.72 0.10 72)",
    badgeBg: "oklch(0.20 0.06 65 / 0.5)",
  },
  Production: {
    Icon: Film,
    gradient: "linear-gradient(145deg, oklch(0.12 0.04 260) 0%, oklch(0.22 0.08 58) 50%, oklch(0.14 0.04 265) 100%)",
    badgeColor: "oklch(0.68 0.08 70)",
    badgeBg: "oklch(0.18 0.05 60 / 0.5)",
  },
  "Press Kit": {
    Icon: Newspaper,
    gradient: "linear-gradient(145deg, oklch(0.10 0.04 260) 0%, oklch(0.18 0.06 262) 50%, oklch(0.12 0.03 258) 100%)",
    badgeColor: "oklch(0.60 0.04 70)",
    badgeBg: "oklch(0.16 0.02 262 / 0.6)",
  },
  "Concept Art": {
    Icon: Palette,
    gradient: "linear-gradient(145deg, oklch(0.14 0.05 50) 0%, oklch(0.24 0.09 62) 50%, oklch(0.16 0.05 55) 100%)",
    badgeColor: "oklch(0.70 0.09 68)",
    badgeBg: "oklch(0.20 0.06 62 / 0.5)",
  },
}

/* ─── Document icon ────────────────────────────────────────────────────── */

function DocumentIcon({
  cfg,
  size = "default",
}: {
  cfg: (typeof CATEGORY_CONFIG)[PdfCategory]
  size?: "default" | "featured"
}) {
  const dim = size === "featured" ? "h-20 w-16" : "h-16 w-12"
  const iconSize = size === "featured" ? "size-7" : "size-5"

  return (
    <div className={`relative flex-shrink-0 ${dim}`}>
      {/* Page body */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          background: cfg.gradient,
          border: "1px solid oklch(0.58 0.14 68 / 0.25)",
          boxShadow: "0 4px 16px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(0.80 0.10 72 / 0.08)",
        }}
      />
      {/* Dog-ear fold */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: size === "featured" ? "18px" : "14px",
          height: size === "featured" ? "18px" : "14px",
          background: "oklch(0.08 0.015 262)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          borderLeft: "1px solid oklch(0.58 0.14 68 / 0.20)",
          borderBottom: "1px solid oklch(0.58 0.14 68 / 0.20)",
        }}
      />
      {/* Content lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-2 pt-3">
        <cfg.Icon className={`${iconSize} mb-1`} style={{ color: "oklch(0.72 0.12 72)", opacity: 0.9 }} />
        {[60, 75, 50].map((w, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: `${w}%`,
              height: "2px",
              background: "oklch(0.72 0.12 72 / 0.18)",
            }}
          />
        ))}
      </div>
      {/* Gold shimmer border on hover (via parent group) */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 16px oklch(0.58 0.14 68 / 0.30), inset 0 0 8px oklch(0.58 0.14 68 / 0.06)" }}
      />
    </div>
  )
}

/* ─── Download button ──────────────────────────────────────────────────── */

type DlState = "idle" | "downloading" | "done"

function DownloadButton({ asset, dlState, onDownload }: { asset: PdfAsset; dlState: DlState; onDownload: () => void }) {
  const isDownloading = dlState === "downloading"
  const isDone = dlState === "done"

  return (
    <a
      href={asset.file_path}
      download
      onClick={onDownload}
      aria-label={`Download ${asset.title}`}
      className="group/btn relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 overflow-hidden"
      style={{
        background: isDone
          ? "oklch(0.28 0.10 145 / 0.6)"
          : "oklch(0.58 0.14 68)",
        color: isDone ? "oklch(0.80 0.14 145)" : "oklch(0.06 0.01 260)",
        border: isDone ? "1px solid oklch(0.45 0.14 145 / 0.5)" : "1px solid transparent",
        boxShadow: isDone
          ? "none"
          : "0 2px 12px oklch(0.58 0.14 68 / 0.30)",
        fontFamily: "var(--font-display)",
        letterSpacing: "0.04em",
        pointerEvents: isDownloading ? "none" : "auto",
        opacity: isDownloading ? 0.7 : 1,
        transform: isDownloading ? "scale(0.97)" : "scale(1)",
      }}
    >
      {/* Hover glow overlay */}
      {!isDone && (
        <span
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 rounded-lg"
          style={{ background: "oklch(0.72 0.14 72 / 0.15)", boxShadow: "0 0 20px oklch(0.58 0.14 68 / 0.40)" }}
          aria-hidden
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {isDone ? (
          <Check className="size-4" />
        ) : (
          <Download
            className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5"
            style={{ animation: isDownloading ? "bounce 0.6s infinite" : "none" }}
          />
        )}
        {isDone ? "Downloaded" : isDownloading ? "Preparing…" : "Download PDF"}
      </span>
    </a>
  )
}

/* ─── Metadata chip ────────────────────────────────────────────────────── */

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-[10px] uppercase tracking-widest"
        style={{ color: "oklch(0.42 0.06 68)", fontFamily: "var(--font-display)" }}
      >
        {label}
      </span>
      <span className="text-xs font-medium" style={{ color: "oklch(0.70 0.025 70)" }}>
        {value}
      </span>
    </div>
  )
}

/* ─── PdfDownloadCard ──────────────────────────────────────────────────── */

interface Props {
  asset: PdfAsset
  variant?: "default" | "featured"
}

export function PdfDownloadCard({ asset, variant = "default" }: Props) {
  const [dlState, setDlState] = useState<DlState>("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleDownload() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDlState("downloading")
    timerRef.current = setTimeout(() => {
      setDlState("done")
      timerRef.current = setTimeout(() => setDlState("idle"), 3000)
    }, 1000)
  }

  const cfg = CATEGORY_CONFIG[asset.category]
  const isFeatured = variant === "featured"

  return (
    <div
      className={`group card-glow-hover overflow-hidden rounded-xl ${
        isFeatured ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.20 0.03 260)",
      }}
    >
      {/* ── Cover / icon panel ── */}
      <div
        className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${
          isFeatured ? "sm:w-52 h-48 sm:h-auto" : "h-40"
        }`}
        style={{ background: cfg.gradient }}
      >
        {/* Ambient inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.58 0.14 68 / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {asset.cover_url ? (
          // Real cover image when provided
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.cover_url}
            alt={`${asset.title} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          // Elegant placeholder document icon
          <DocumentIcon cfg={cfg} size={isFeatured ? "featured" : "default"} />
        )}

        {/* Category badge overlay */}
        <span
          className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
          style={{
            background: cfg.badgeBg,
            border: `1px solid ${cfg.badgeColor}40`,
            color: cfg.badgeColor,
            fontFamily: "var(--font-display)",
            backdropFilter: "blur(4px)",
          }}
        >
          {asset.category}
        </span>
      </div>

      {/* ── Content panel ── */}
      <div className={`flex flex-col flex-1 ${isFeatured ? "p-7 sm:p-8" : "p-5"} gap-4`}>
        {/* Title block */}
        <div className="flex-1">
          <h3
            className={`font-bold leading-tight mb-1 ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg"}`}
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.92 0.025 75)",
            }}
          >
            {asset.title}
          </h3>
          <p
            className="text-sm mb-3"
            style={{ color: "oklch(0.55 0.08 68)", fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            {asset.subtitle}
          </p>
          <p
            className={`leading-relaxed ${isFeatured ? "text-sm" : "text-xs"}`}
            style={{ color: "oklch(0.56 0.025 70)", fontFamily: "Georgia, serif" }}
          >
            {asset.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, oklch(0.58 0.14 68 / 0.20), oklch(0.22 0.03 260) 60%, transparent)",
          }}
        />

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <MetaChip label="File Size" value={asset.file_size} />
          <MetaChip label="Pages" value={String(asset.page_count)} />
          <MetaChip label="Version" value={asset.version} />

          {/* Spacer pushes button right on featured */}
          {isFeatured && <div className="flex-1" />}

          <DownloadButton asset={asset} dlState={dlState} onDownload={handleDownload} />
        </div>
      </div>
    </div>
  )
}
