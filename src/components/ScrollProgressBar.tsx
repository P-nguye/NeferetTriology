"use client"

import { useScrollProgress } from "@/hooks/useScrollProgress"

export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-primary transition-[width] duration-75 ease-linear"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
