import { SKILL_COLORS } from "@/lib/mock-data";

interface SkillTagProps {
  skill: string;
  size?: "sm" | "md";
  glowing?: boolean;
}

export function SkillTag({ skill, size = "sm", glowing = false }: SkillTagProps) {
  const color = SKILL_COLORS[skill] || "#8B8FA8";
  return (
    <span
      className={`inline-flex items-center rounded-pill font-medium ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}30`,
        boxShadow: glowing ? `0 0 12px ${color}40` : undefined,
      }}
    >
      {skill}
    </span>
  );
}
