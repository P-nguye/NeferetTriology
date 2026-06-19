import type { MetadataRoute } from "next"
import { getBooks, getChaptersByBook, getLoreArticles, getBlogPosts } from "@/lib/data"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://neferet-trilogy.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/books`, priority: 0.9 },
    { url: `${BASE_URL}/characters`, priority: 0.8 },
    { url: `${BASE_URL}/world`, priority: 0.8 },
    { url: `${BASE_URL}/animation`, priority: 0.6 },
    { url: `${BASE_URL}/author`, priority: 0.7 },
    { url: `${BASE_URL}/blog`, priority: 0.7 },
    { url: `${BASE_URL}/contact`, priority: 0.5 },
  ]

  try {
    const books = await getBooks()
    const bookRoutes: MetadataRoute.Sitemap = []
    for (const book of books) {
      bookRoutes.push({ url: `${BASE_URL}/books/${book.slug}`, priority: 0.85 })
      const chapters = await getChaptersByBook(book.id)
      for (const chapter of chapters) {
        bookRoutes.push({ url: `${BASE_URL}/books/${book.slug}/${chapter.slug}`, priority: 0.75 })
      }
    }

    const loreArticles = await getLoreArticles()
    const loreRoutes: MetadataRoute.Sitemap = loreArticles.map((a) => ({
      url: `${BASE_URL}/world/${a.slug}`,
      priority: 0.65,
    }))

    const posts = await getBlogPosts()
    const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : undefined,
      priority: 0.6,
    }))

    return [...staticRoutes, ...bookRoutes, ...loreRoutes, ...blogRoutes]
  } catch {
    return staticRoutes
  }
}
