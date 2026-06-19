export type BookStatus = "published" | "coming_soon"
export type CharacterRole = "main" | "royal_family"

export interface Book {
  id: string
  slug: string
  title: string
  short_description: string | null
  order: number
  status: BookStatus
  created_at: string
}

export interface Chapter {
  id: string
  book_id: string
  slug: string
  title: string
  order: number
  content: string
  published_at: string | null
}

export interface Character {
  id: string
  name: string
  age: string | null
  role: CharacterRole
  description: string | null
  personality: string | null
  story_role: string | null
  book_ids: string[]
  order: number
}

export interface LoreArticle {
  id: string
  slug: string
  title: string
  content: string | null
  category: string | null
  order: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  content: string | null
  published_at: string | null
  excerpt: string | null
}

export interface Database {
  public: {
    Tables: {
      books: { Row: Book; Insert: Omit<Book, "id" | "created_at">; Update: Partial<Book> }
      chapters: { Row: Chapter; Insert: Omit<Chapter, "id">; Update: Partial<Chapter> }
      characters: { Row: Character; Insert: Omit<Character, "id">; Update: Partial<Character> }
      lore_articles: { Row: LoreArticle; Insert: Omit<LoreArticle, "id">; Update: Partial<LoreArticle> }
      blog_posts: { Row: BlogPost; Insert: Omit<BlogPost, "id">; Update: Partial<BlogPost> }
    }
  }
}
