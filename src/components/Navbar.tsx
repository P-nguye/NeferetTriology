"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/characters", label: "Characters" },
  { href: "/world", label: "World of Neferet" },
  { href: "/wallpapers", label: "Wallpapers" },
  { href: "/audio", label: "Audio" },
  { href: "/animation", label: "Animation" },
  { href: "/collaboration", label: "Collaboration" },
  { href: "/downloads", label: "Downloads" },
  { href: "/author", label: "Author" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary text-2xl">𓂀</span>
          The Neferet Trilogy
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted",
                  pathname === href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open navigation menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader className="mb-6">
              <SheetTitle className="font-serif text-left text-foreground">
                The Neferet Trilogy
              </SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted",
                      pathname === href
                        ? "text-primary bg-muted"
                        : "text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
