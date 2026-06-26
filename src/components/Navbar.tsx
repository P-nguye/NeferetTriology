"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

/* ─── Nav config ──────────────────────────────────────────────────────── */

interface NavChild {
  label: string
  href: string
}

interface DirectLink {
  kind: "link"
  label: string
  href: string
}

interface DropdownGroup {
  kind: "dropdown"
  id: string
  label: string
  items: NavChild[]
}

type NavEntry = DirectLink | DropdownGroup

const NAV: NavEntry[] = [
  { kind: "link", label: "Home", href: "/" },
  {
    kind: "dropdown",
    id: "universe",
    label: "The Universe",
    items: [
      { label: "World of Neferet", href: "/world" },
      { label: "Characters",       href: "/characters" },
      { label: "Animation Project", href: "/animation" },
    ],
  },
  { kind: "link", label: "Books", href: "/books" },
  {
    kind: "dropdown",
    id: "media",
    label: "Media Kit",
    items: [
      { label: "Wallpapers",    href: "/wallpapers" },
      { label: "Audio Files",   href: "/audio" },
      { label: "PDF Downloads", href: "/downloads" },
    ],
  },
  {
    kind: "dropdown",
    id: "trilogy",
    label: "Trilogy Project",
    items: [
      { label: "Collaboration",    href: "/collaboration" },
      { label: "Blog & Updates",   href: "/blog" },
      { label: "About the Author", href: "/author" },
    ],
  },
  { kind: "link", label: "Contact", href: "/contact" },
]

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

function hasActiveChild(items: NavChild[], pathname: string): boolean {
  return items.some((c) => isActive(c.href, pathname))
}

/* ─── Dropdown panel ──────────────────────────────────────────────────── */

function DropdownPanel({
  items,
  isOpen,
  pathname,
}: {
  items: NavChild[]
  isOpen: boolean
  pathname: string
}) {
  return (
    /* pt-1.5 acts as a transparent bridge between the trigger and the panel
       so the mouse stays within the <li> while moving downward */
    <div
      className="absolute left-0 top-full z-50 pt-1.5"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      aria-hidden={!isOpen}
    >
      <div
        className="w-52 overflow-hidden rounded-xl"
        style={{
          background: "oklch(0.09 0.025 262 / 0.97)",
          border: "1px solid oklch(0.58 0.14 68 / 0.22)",
          boxShadow:
            "0 12px 40px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(0.58 0.14 68 / 0.06), 0 4px 16px oklch(0.58 0.14 68 / 0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}
      >
        {/* Gold accent line across the top */}
        <div
          aria-hidden
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, oklch(0.58 0.14 68 / 0.55) 30%, oklch(0.58 0.14 68 / 0.55) 70%, transparent)",
          }}
        />

        {/* Items */}
        <div className="p-1.5 space-y-px">
          {items.map((child) => {
            const active = isActive(child.href, pathname)
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "nav-dropdown-item",
                  active && "nav-dropdown-item--active"
                )}
              >
                <span className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap">
                  {active && (
                    <span
                      aria-hidden
                      className="shrink-0"
                      style={{ color: "oklch(0.58 0.14 68)", fontSize: "0.6rem" }}
                    >
                      ◈
                    </span>
                  )}
                  {child.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="h-1" aria-hidden />
      </div>
    </div>
  )
}

/* ─── Navbar ──────────────────────────────────────────────────────────── */

export function Navbar() {
  const pathname = usePathname()
  const [openId, setOpenId] = useState<string | null>(null)

  /* Close on route change */
  useEffect(() => {
    setOpenId(null)
  }, [pathname])

  /* Close on Escape */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2 font-serif text-lg font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary text-2xl">𓂀</span>
          <span className="whitespace-nowrap">The Neferet Trilogy</span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV.map((entry) => {
            /* Direct link */
            if (entry.kind === "link") {
              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className={cn(
                      "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary hover:bg-muted",
                      isActive(entry.href, pathname)
                        ? "text-primary bg-muted"
                        : "text-muted-foreground"
                    )}
                  >
                    {entry.label}
                  </Link>
                </li>
              )
            }

            /* Dropdown group */
            const groupActive = hasActiveChild(entry.items, pathname)
            const isOpen = openId === entry.id

            return (
              <li
                key={entry.id}
                className="relative"
                onMouseEnter={() => setOpenId(entry.id)}
                onMouseLeave={() => setOpenId(null)}
              >
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  className={cn(
                    "flex items-center gap-0.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary hover:bg-muted",
                    groupActive || isOpen
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {entry.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <DropdownPanel
                  items={entry.items}
                  isOpen={isOpen}
                  pathname={pathname}
                />
              </li>
            )
          })}
        </ul>

        {/* ── Mobile hamburger ──────────────────────────────────────── */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open navigation menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="font-serif text-left text-foreground">
                The Neferet Trilogy
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4">
              {NAV.map((entry) => {
                if (entry.kind === "link") {
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary hover:bg-muted",
                        isActive(entry.href, pathname)
                          ? "text-primary bg-muted"
                          : "text-foreground"
                      )}
                    >
                      {entry.label}
                    </Link>
                  )
                }

                /* Mobile group */
                const groupActive = hasActiveChild(entry.items, pathname)
                return (
                  <div key={entry.id} className="space-y-0.5">
                    {/* Group label */}
                    <p
                      className={cn(
                        "px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider",
                        groupActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {entry.label}
                    </p>
                    {/* Children */}
                    {entry.items.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-md py-2 pl-5 pr-3 text-sm transition-colors hover:text-primary hover:bg-muted",
                          isActive(child.href, pathname)
                            ? "text-primary bg-muted font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>

      </nav>
    </header>
  )
}
