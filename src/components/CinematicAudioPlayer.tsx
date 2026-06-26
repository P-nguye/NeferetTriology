"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Download, Loader2 } from "lucide-react"

export interface CinematicAudioPlayerProps {
  src: string
  title: string
  subtitle: string
  category?: string
  downloadUrl?: string
  className?: string
  style?: React.CSSProperties
}

function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return "0:00"
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function CinematicAudioPlayer({
  src,
  title,
  subtitle,
  category,
  downloadUrl,
  className = "",
  style: styleProp,
}: CinematicAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => { if (isFinite(audio.duration)) setDuration(audio.duration) }
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0) }
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)
    const onError = () => { setHasError(true); setIsLoading(false); setIsPlaying(false) }

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("durationchange", onMeta)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("waiting", onWaiting)
    audio.addEventListener("canplay", onCanPlay)
    audio.addEventListener("error", onError)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("durationchange", onMeta)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("waiting", onWaiting)
      audio.removeEventListener("canplay", onCanPlay)
      audio.removeEventListener("error", onError)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio || hasError) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    const next = !isMuted
    audio.muted = next
    setIsMuted(next)
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value)
    setVolume(v)
    const audio = audioRef.current
    if (audio) {
      audio.volume = v
      const shouldMute = v === 0
      audio.muted = shouldMute
      setIsMuted(shouldMute)
    }
  }

  function seekToRatio(ratio: number) {
    if (!duration || !audioRef.current) return
    const t = Math.max(0, Math.min(1, ratio)) * duration
    audioRef.current.currentTime = t
    setCurrentTime(t)
  }

  function handleProgressPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    seekToRatio((e.clientX - rect.left) / rect.width)
  }

  function handleProgressPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    seekToRatio((e.clientX - rect.left) / rect.width)
  }

  function handleProgressPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setIsDragging(false)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const volDisplay = isMuted ? 0 : volume

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.03 262) 0%, oklch(0.14 0.04 258) 55%, oklch(0.11 0.025 264) 100%)",
        border: `1px solid ${isHovered ? "oklch(0.58 0.14 68 / 0.50)" : "oklch(0.22 0.04 260)"}`,
        boxShadow: isHovered
          ? "0 8px 40px oklch(0.58 0.14 68 / 0.14), 0 4px 16px oklch(0 0 0 / 0.40)"
          : "0 4px 24px oklch(0 0 0 / 0.35)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        ...styleProp,
      }}
    >
      {/* Playing ambient glow */}
      {isPlaying && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 8% 50%, oklch(0.58 0.14 68 / 0.07) 0%, transparent 55%)",
          }}
        />
      )}

      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="relative z-10 px-5 py-5 space-y-4">

        {/* ── Row 1: Play · Meta · Volume · Download ──────────── */}
        <div className="flex items-center gap-4">

          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            disabled={hasError}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="audio-play-btn relative flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: "52px",
              height: "52px",
              background: isPlaying ? "oklch(0.58 0.14 68)" : "oklch(0.16 0.04 260)",
              border: `1px solid ${isPlaying ? "oklch(0.72 0.14 72 / 0.45)" : "oklch(0.58 0.14 68 / 0.40)"}`,
              boxShadow: isPlaying
                ? "0 0 22px oklch(0.58 0.14 68 / 0.55), 0 0 50px oklch(0.58 0.14 68 / 0.12)"
                : "none",
              cursor: hasError ? "not-allowed" : "pointer",
              opacity: hasError ? 0.45 : 1,
            }}
          >
            {isLoading ? (
              <Loader2
                className="size-5 animate-spin"
                style={{ color: isPlaying ? "oklch(0.08 0.01 262)" : "oklch(0.72 0.12 72)" }}
              />
            ) : isPlaying ? (
              <Pause className="size-5" style={{ color: "oklch(0.08 0.01 262)" }} />
            ) : (
              <Play className="size-5 translate-x-0.5" style={{ color: "oklch(0.72 0.12 72)" }} />
            )}
          </button>

          {/* Track metadata */}
          <div className="flex-1 min-w-0">
            {category && (
              <p
                className="text-[10px] uppercase tracking-[0.28em] mb-0.5 truncate"
                style={{ color: "oklch(0.58 0.14 68)", fontFamily: "var(--font-display)" }}
              >
                {category}
              </p>
            )}
            <h3
              className="font-bold truncate leading-tight"
              style={{
                fontSize: "1rem",
                fontFamily: "var(--font-display)",
                color: "oklch(0.92 0.022 75)",
              }}
            >
              {title}
            </h3>
            <p
              className="text-xs truncate mt-0.5"
              style={{
                color: "oklch(0.55 0.07 68)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Volume (desktop) */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              style={{
                color: "oklch(0.50 0.04 70)",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.12 72)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.50 0.04 70)")}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volDisplay}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="audio-range"
              style={{
                width: "72px",
                background: `linear-gradient(to right, oklch(0.58 0.14 68) ${volDisplay * 100}%, oklch(0.20 0.03 260) ${volDisplay * 100}%)`,
              }}
            />
          </div>

          {/* Download */}
          <a
            href={downloadUrl ?? src}
            download
            aria-label="Download track"
            className="flex-shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium"
            style={{
              background: "oklch(0.15 0.035 260)",
              border: "1px solid oklch(0.26 0.04 260)",
              color: "oklch(0.56 0.05 70)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
              transition: "border-color 0.2s ease, color 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.58 0.14 68 / 0.55)"
              e.currentTarget.style.color = "oklch(0.72 0.12 72)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.26 0.04 260)"
              e.currentTarget.style.color = "oklch(0.56 0.05 70)"
            }}
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>

        {/* ── Progress bar ─────────────────────────────────────── */}
        <div className="space-y-1.5">
          <div
            ref={progressRef}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 100}
            aria-valuenow={Math.round(currentTime)}
            tabIndex={0}
            className="relative h-2 rounded-full overflow-hidden group/bar"
            style={{
              background: "oklch(0.18 0.03 260)",
              cursor: isDragging ? "grabbing" : "pointer",
              touchAction: "none",
              outline: "none",
            }}
            onPointerDown={handleProgressPointerDown}
            onPointerMove={handleProgressPointerMove}
            onPointerUp={handleProgressPointerUp}
            onKeyDown={(e) => {
              if (!duration) return
              const step = duration * 0.05
              if (e.key === "ArrowRight") seekToRatio((currentTime + step) / duration)
              if (e.key === "ArrowLeft") seekToRatio((currentTime - step) / duration)
            }}
          >
            {/* Gold fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, oklch(0.50 0.13 65), oklch(0.68 0.14 72))",
                boxShadow: isPlaying ? "0 0 8px oklch(0.58 0.14 68 / 0.55)" : "none",
                transition: isDragging ? "none" : "width 0.1s linear",
              }}
            />
            {/* Scrub thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150"
              style={{
                left: `${progress}%`,
                background: "oklch(0.78 0.13 72)",
                boxShadow: "0 0 8px oklch(0.58 0.14 68 / 0.65)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Timestamps */}
          <div className="flex justify-between items-center">
            <span
              className="text-[11px] tabular-nums"
              style={{
                color: "oklch(0.48 0.04 70)",
                fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
              }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              className="text-[11px] tabular-nums"
              style={{
                color: hasError ? "oklch(0.55 0.18 25)" : "oklch(0.38 0.03 70)",
                fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
              }}
            >
              {hasError ? "unavailable" : duration > 0 ? formatTime(duration) : "--:--"}
            </span>
          </div>
        </div>

        {/* ── Mobile volume ─────────────────────────────────────── */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            style={{ color: "oklch(0.50 0.04 70)", cursor: "pointer" }}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volDisplay}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="audio-range flex-1"
            style={{
              background: `linear-gradient(to right, oklch(0.58 0.14 68) ${volDisplay * 100}%, oklch(0.20 0.03 260) ${volDisplay * 100}%)`,
            }}
          />
        </div>

      </div>
    </div>
  )
}
