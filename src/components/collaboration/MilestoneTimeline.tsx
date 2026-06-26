import type { Milestone } from "@/types/collaboration"
import { Check, Circle, Clock } from "lucide-react"

interface Props {
  milestones: Milestone[]
}

const STATUS_CONFIG = {
  completed: {
    Icon: Check,
    iconColor: "oklch(0.65 0.18 145)",
    ringColor: "oklch(0.32 0.12 145 / 0.6)",
    labelColor: "oklch(0.60 0.14 145)",
    label: "Completed",
  },
  active: {
    Icon: Clock,
    iconColor: "oklch(0.72 0.14 72)",
    ringColor: "oklch(0.40 0.12 68 / 0.6)",
    labelColor: "oklch(0.65 0.12 70)",
    label: "In Progress",
  },
  upcoming: {
    Icon: Circle,
    iconColor: "oklch(0.40 0.03 260)",
    ringColor: "oklch(0.22 0.03 260)",
    labelColor: "oklch(0.40 0.03 260)",
    label: "Upcoming",
  },
}

export function MilestoneTimeline({ milestones }: Props) {
  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div
        className="absolute left-[1.85rem] top-8 bottom-8 w-px hidden sm:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.58 0.14 68 / 0.25) 15%, oklch(0.58 0.14 68 / 0.25) 85%, transparent)",
        }}
        aria-hidden
      />

      <ol className="space-y-0">
        {milestones.map((milestone, i) => {
          const cfg = STATUS_CONFIG[milestone.status]
          const isLast = i === milestones.length - 1

          return (
            <li key={milestone.id} className="relative flex gap-5 sm:gap-7">
              {/* Icon node */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full"
                  style={{
                    background: "oklch(0.11 0.025 260)",
                    border: `1px solid ${cfg.ringColor}`,
                    boxShadow:
                      milestone.status === "active"
                        ? `0 0 16px oklch(0.58 0.14 68 / 0.20)`
                        : "none",
                  }}
                >
                  <cfg.Icon
                    className="size-5"
                    style={{ color: cfg.iconColor }}
                    strokeWidth={milestone.status === "completed" ? 2.5 : 1.5}
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 pb-10 ${isLast ? "pb-0" : ""}`}>
                {/* Phase label + status */}
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: "oklch(0.45 0.08 68)", fontFamily: "var(--font-display)" }}
                  >
                    Phase {milestone.phase}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.14 0.02 260 / 0.8)",
                      border: `1px solid ${cfg.ringColor}`,
                      color: cfg.labelColor,
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold mb-1.5 leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color:
                      milestone.status === "upcoming"
                        ? "oklch(0.55 0.025 70)"
                        : "oklch(0.92 0.025 75)",
                  }}
                >
                  {milestone.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-2"
                  style={{ color: "oklch(0.55 0.025 70)", fontFamily: "Georgia, serif" }}
                >
                  {milestone.description}
                </p>

                {/* Deliverables chips */}
                {milestone.deliverables && milestone.deliverables.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {milestone.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-xs px-2.5 py-0.5 rounded"
                        style={{
                          background: "oklch(0.15 0.025 260)",
                          border: "1px solid oklch(0.24 0.03 260)",
                          color: "oklch(0.58 0.025 70)",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                {/* Timeline date */}
                {milestone.date_label && (
                  <p
                    className="mt-2 text-xs"
                    style={{ color: "oklch(0.40 0.08 68)", fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                  >
                    {milestone.date_label}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
