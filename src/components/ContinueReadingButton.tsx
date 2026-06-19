"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface ReadingProgress {
  bookSlug: string
  chapterSlug: string
  bookTitle: string
  chapterTitle: string
}

const STORAGE_KEY = "neferet_progress"

export function getStoredProgress(): ReadingProgress | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ReadingProgress) : null
  } catch {
    return null
  }
}

export function saveProgress(progress: ReadingProgress) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function ContinueReadingButton() {
  const [progress, setProgress] = useState<ReadingProgress | null>(null)

  useEffect(() => {
    setProgress(getStoredProgress())
  }, [])

  if (!progress) return null

  return (
    <Button asChild variant="outline" size="lg" className="gap-2">
      <Link href={`/books/${progress.bookSlug}/${progress.chapterSlug}`}>
        <BookOpen className="size-4" />
        Continue: {progress.chapterTitle}
      </Link>
    </Button>
  )
}
