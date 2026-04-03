import { getLevelColor } from "@/lib/gamification";

interface GradientBadgeProps {
  level: string;
  className?: string;
}

export function GradientBadge({ level, className = "" }: GradientBadgeProps) {
  const color = getLevelColor(level);
  const isPro = level === "Pro";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-pill text-xs font-semibold font-heading ${isPro ? "shimmer" : ""} ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {level}
    </span>
  );
}
