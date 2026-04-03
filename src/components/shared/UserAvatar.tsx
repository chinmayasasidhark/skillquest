import { getLevelColor } from "@/lib/gamification";

interface UserAvatarProps {
  name: string;
  level: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export function UserAvatar({ name, level, size = "md", pulse = false }: UserAvatarProps) {
  const color = getLevelColor(level);
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };

  return (
    <div
      className={`relative rounded-full flex items-center justify-center font-heading font-bold ${sizes[size]} ${pulse ? "animate-pulse-ring" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        color: color,
        boxShadow: `0 0 0 2px ${color}60`,
      }}
    >
      {initials}
    </div>
  );
}
