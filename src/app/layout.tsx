import type { Metadata } from "next"
import { Geist, Geist_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "The Neferet Trilogy",
    template: "%s | The Neferet Trilogy",
  },
  description:
    "A timeless adventure of love, destiny, and the mysteries hidden beyond the Eight Gate.",
  keywords: ["Neferet", "Egypt", "time travel", "romance", "fantasy", "book series"],
  openGraph: {
    title: "The Neferet Trilogy",
    description: "A love that crossed two worlds and spanned 4000 years.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
