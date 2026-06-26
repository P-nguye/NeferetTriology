export interface Partner {
  id: string
  name: string
  role: string
  description: string | null
  avatar_url: string | null
  url: string | null
  order: number
}

export type MilestoneStatus = "completed" | "active" | "upcoming"

export interface Milestone {
  id: string
  phase: number
  title: string
  description: string
  status: MilestoneStatus
  deliverables: string[]
  date_label: string | null
}
