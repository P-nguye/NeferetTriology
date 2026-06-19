import Link from "next/link"
import { NewsletterSignup } from "./NewsletterSignup"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter CTA */}
        <div className="mb-10 rounded-xl bg-muted p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">Stay in the story</p>
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
            Join the Neferet Chronicle
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Receive updates on new chapters, artwork, and future animated episodes.
          </p>
          <NewsletterSignup variant="compact" />
        </div>

        {/* Links + copy */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center md:justify-start">
            <Link href="/books" className="hover:text-primary transition-colors">Books</Link>
            <Link href="/characters" className="hover:text-primary transition-colors">Characters</Link>
            <Link href="/world" className="hover:text-primary transition-colors">World of Neferet</Link>
            <Link href="/animation" className="hover:text-primary transition-colors">Animation</Link>
            <Link href="/author" className="hover:text-primary transition-colors">Author</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Neferet Trilogy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
