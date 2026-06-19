import { getSupabase } from "./supabase"
import type { Book, Chapter, Character, LoreArticle, BlogPost } from "./database.types"

export async function getBooks(): Promise<Book[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("books")
    .select("*")
    .order("order", { ascending: true })
  if (error) throw error
  return data
}

export async function getBook(slug: string): Promise<Book | null> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("books")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}

export async function getChaptersByBook(bookId: string): Promise<Chapter[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .order("order", { ascending: true })
  if (error) throw error
  return data
}

export async function getChapter(bookId: string, slug: string): Promise<Chapter | null> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}

export async function getAdjacentChapters(
  bookId: string,
  currentOrder: number
): Promise<{ prev: Chapter | null; next: Chapter | null }> {
  const sb = getSupabase()
  const [prevResult, nextResult] = await Promise.all([
    sb
      .from("chapters")
      .select("*")
      .eq("book_id", bookId)
      .lt("order", currentOrder)
      .order("order", { ascending: false })
      .limit(1)
      .single(),
    sb
      .from("chapters")
      .select("*")
      .eq("book_id", bookId)
      .gt("order", currentOrder)
      .order("order", { ascending: true })
      .limit(1)
      .single(),
  ])
  return {
    prev: prevResult.data ?? null,
    next: nextResult.data ?? null,
  }
}

export async function getCharacters(): Promise<Character[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("characters")
    .select("*")
    .order("order", { ascending: true })
  if (error) throw error
  return data
}

export async function getLoreArticles(): Promise<LoreArticle[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("lore_articles")
    .select("*")
    .order("order", { ascending: true })
  if (error) throw error
  return data
}

export async function getLoreArticle(slug: string): Promise<LoreArticle | null> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("lore_articles")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}
