export const LEVELS = [
  { name: "Beginner", minXP: 0, maxXP: 500 },
  { name: "Intermediate", minXP: 500, maxXP: 1500 },
  { name: "Advanced", minXP: 1500, maxXP: 3000 },
  { name: "Pro", minXP: 3000, maxXP: Infinity },
];

export const XP_VALUES = {
  verifySkill: 50,
  completeStep: 20,
  completeInterview: 75,
  dailyLogin: 10,
  applyInternship: 15,
} as const;

export function getLevel(xp: number): string {
  const level = LEVELS.find((l) => xp >= l.minXP && xp < l.maxXP);
  return level?.name || "Pro";
}

export function getLevelProgress(xp: number): { current: number; max: number; percentage: number; nextLevel: string } {
  const level = LEVELS.find((l) => xp >= l.minXP && xp < l.maxXP);
  if (!level || level.maxXP === Infinity) return { current: xp, max: xp, percentage: 100, nextLevel: "Max Level" };
  const progress = xp - level.minXP;
  const range = level.maxXP - level.minXP;
  const nextIdx = LEVELS.indexOf(level) + 1;
  return { current: xp, max: level.maxXP, percentage: (progress / range) * 100, nextLevel: LEVELS[nextIdx]?.name || "Max" };
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "Beginner": return "#8B8FA8";
    case "Intermediate": return "#4FC3F7";
    case "Advanced": return "#9B8FFF";
    case "Pro": return "#FFD166";
    default: return "#8B8FA8";
  }
}
