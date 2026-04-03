export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  skills: string[];
  xp: number;
  level: string;
  streak: number;
  joinedAt: string;
  rank: number;
  weeklyActivity: number[];
}

export interface SkillVerification {
  score: number;
  label: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface RoadmapStep {
  id: string;
  week: string;
  title: string;
  description: string;
  resources: { type: string; title: string; url: string }[];
  duration: string;
  difficulty: string;
  completed: boolean;
}

export interface InterviewMessage {
  role: "ai" | "user" | "feedback";
  content: string;
  timestamp: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  salary: string;
  skills: string[];
  match: number;
  deadline: string;
  industry: string;
}

export interface Activity {
  id: string;
  icon: string;
  description: string;
  xp: number;
  timestamp: string;
}

export const SKILLS = [
  "React", "TypeScript", "Python", "Node.js", "SQL",
  "System Design", "Docker", "AWS", "GraphQL", "MongoDB"
] as const;

export const SKILL_COLORS: Record<string, string> = {
  React: "#61DAFB",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  "Node.js": "#339933",
  SQL: "#FF6600",
  "System Design": "#9B8FFF",
  Docker: "#2496ED",
  AWS: "#FF9900",
  GraphQL: "#E535AB",
  MongoDB: "#47A248",
};

export const currentUser: User = {
  id: "user_1",
  name: "Alex Chen",
  email: "alex@skillquest.ai",
  avatar: null,
  skills: ["React", "TypeScript", "Python", "Node.js", "SQL"],
  xp: 2840,
  level: "Advanced",
  streak: 12,
  joinedAt: "2024-01-15",
  rank: 3,
  weeklyActivity: [45, 62, 38, 85, 70, 90, 55],
};

export const leaderboardUsers: User[] = [
  { id: "u2", name: "Sarah Kim", email: "sarah@sq.ai", avatar: null, skills: ["React","TypeScript","Node.js","System Design","Docker"], xp: 5240, level: "Pro", streak: 24, joinedAt: "2023-11-01", rank: 1, weeklyActivity: [80,90,75,95,88,92,85] },
  { id: "u3", name: "Marcus Lee", email: "marcus@sq.ai", avatar: null, skills: ["Python","SQL","AWS","Docker","MongoDB"], xp: 4890, level: "Pro", streak: 18, joinedAt: "2023-12-10", rank: 2, weeklyActivity: [70,85,60,90,75,88,80] },
  { ...currentUser, rank: 3 },
  { id: "u4", name: "Priya Sharma", email: "priya@sq.ai", avatar: null, skills: ["React","Python","GraphQL","Node.js"], xp: 2650, level: "Advanced", streak: 9, joinedAt: "2024-02-01", rank: 4, weeklyActivity: [55,60,45,70,65,50,48] },
  { id: "u5", name: "Jordan Brooks", email: "jordan@sq.ai", avatar: null, skills: ["TypeScript","React","Node.js"], xp: 2400, level: "Advanced", streak: 15, joinedAt: "2024-01-20", rank: 5, weeklyActivity: [40,55,50,60,45,70,65] },
  { id: "u6", name: "Yuki Tanaka", email: "yuki@sq.ai", avatar: null, skills: ["Python","SQL","AWS","System Design"], xp: 2100, level: "Advanced", streak: 7, joinedAt: "2024-03-05", rank: 6, weeklyActivity: [35,50,42,55,48,60,38] },
  { id: "u7", name: "Carlos Rivera", email: "carlos@sq.ai", avatar: null, skills: ["React","TypeScript","Docker"], xp: 1800, level: "Intermediate", streak: 5, joinedAt: "2024-03-15", rank: 7, weeklyActivity: [30,45,38,50,42,55,40] },
  { id: "u8", name: "Emma Wilson", email: "emma@sq.ai", avatar: null, skills: ["Python","MongoDB","SQL"], xp: 1500, level: "Intermediate", streak: 3, joinedAt: "2024-04-01", rank: 8, weeklyActivity: [25,40,35,45,38,50,30] },
  { id: "u9", name: "David Okafor", email: "david@sq.ai", avatar: null, skills: ["React","Node.js","GraphQL"], xp: 1200, level: "Intermediate", streak: 8, joinedAt: "2024-04-10", rank: 9, weeklyActivity: [20,35,30,40,32,45,28] },
  { id: "u10", name: "Lily Zhang", email: "lily@sq.ai", avatar: null, skills: ["TypeScript","AWS","Docker"], xp: 900, level: "Intermediate", streak: 2, joinedAt: "2024-05-01", rank: 10, weeklyActivity: [15,30,25,35,28,40,22] },
];

export const internships: Internship[] = [
  { id: "i1", company: "Google", role: "Frontend Developer Intern", location: "Mountain View, CA", type: "Hybrid", salary: "$8,000/mo", skills: ["React","TypeScript"], match: 95, deadline: "2024-06-30", industry: "Tech" },
  { id: "i2", company: "Stripe", role: "Full Stack Intern", location: "San Francisco, CA", type: "Remote", salary: "$9,000/mo", skills: ["React","Node.js","TypeScript"], match: 88, deadline: "2024-07-15", industry: "Fintech" },
  { id: "i3", company: "Vercel", role: "Software Engineer Intern", location: "Remote", type: "Remote", salary: "$7,500/mo", skills: ["React","TypeScript"], match: 82, deadline: "2024-06-15", industry: "Developer Tools" },
  { id: "i4", company: "Supabase", role: "Backend Intern", location: "Remote", type: "Remote", salary: "$7,000/mo", skills: ["Node.js","SQL"], match: 71, deadline: "2024-07-01", industry: "Developer Tools" },
  { id: "i5", company: "Snowflake", role: "Data Engineering Intern", location: "Bozeman, MT", type: "Onsite", salary: "$8,500/mo", skills: ["Python","SQL"], match: 68, deadline: "2024-06-20", industry: "Data" },
  { id: "i6", company: "Figma", role: "Frontend Intern", location: "San Francisco, CA", type: "Hybrid", salary: "$8,200/mo", skills: ["React","TypeScript"], match: 90, deadline: "2024-07-10", industry: "Design" },
  { id: "i7", company: "Cloudflare", role: "Systems Intern", location: "Austin, TX", type: "Hybrid", salary: "$7,800/mo", skills: ["Node.js","Docker","AWS"], match: 62, deadline: "2024-06-25", industry: "Infrastructure" },
  { id: "i8", company: "Linear", role: "Product Engineer Intern", location: "Remote", type: "Remote", salary: "$8,000/mo", skills: ["React","TypeScript","GraphQL"], match: 85, deadline: "2024-07-20", industry: "Productivity" },
];

export const recentActivities: Activity[] = [
  { id: "a1", icon: "✅", description: "Verified React skill", xp: 50, timestamp: "2 hours ago" },
  { id: "a2", icon: "📚", description: "Completed roadmap step: Component Patterns", xp: 20, timestamp: "5 hours ago" },
  { id: "a3", icon: "🎤", description: "Finished mock interview: TypeScript", xp: 75, timestamp: "1 day ago" },
  { id: "a4", icon: "💼", description: "Applied to Google Frontend Intern", xp: 15, timestamp: "2 days ago" },
  { id: "a5", icon: "🔥", description: "12 day streak achieved!", xp: 10, timestamp: "3 days ago" },
];

export const skillRadarData = [
  { skill: "React", value: 88 },
  { skill: "TypeScript", value: 75 },
  { skill: "Python", value: 70 },
  { skill: "Node.js", value: 65 },
  { skill: "SQL", value: 60 },
  { skill: "Sys Design", value: 55 },
];
