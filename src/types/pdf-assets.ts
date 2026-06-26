export type PdfCategory =
  | "Script"
  | "Lore"
  | "Production"
  | "Press Kit"
  | "Concept Art"

export interface PdfAsset {
  id: string
  title: string
  subtitle: string
  description: string
  category: PdfCategory
  file_path: string       // e.g. "/assets/documents/neferet-production-script.pdf"
  file_size: string       // e.g. "4.2 MB"
  page_count: number
  version: string         // e.g. "v1.2"
  cover_url: string | null
  featured: boolean
  order: number
}
