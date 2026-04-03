import type { SkillVerification, RoadmapStep } from "./mock-data";

const skillResults: Record<string, SkillVerification> = {
  React: {
    score: 87, label: "Expert Level",
    strengths: ["Strong understanding of hooks and state management", "Excellent component composition patterns", "Good knowledge of performance optimization"],
    weaknesses: ["Server components and RSC patterns need work", "Testing coverage could be improved"],
    suggestions: ["Build a project using Next.js App Router fully", "Learn React Testing Library deeply", "Explore Zustand or Jotai for state management"],
  },
  TypeScript: {
    score: 78, label: "Advanced",
    strengths: ["Good use of generics and utility types", "Solid understanding of type narrowing", "Clean interface design patterns"],
    weaknesses: ["Advanced conditional types need more practice", "Module augmentation could be improved"],
    suggestions: ["Study advanced type gymnastics on type-challenges", "Read the TypeScript compiler source for deeper understanding", "Practice building type-safe library APIs"],
  },
  Python: {
    score: 72, label: "Proficient",
    strengths: ["Good grasp of core Python idioms", "Understanding of decorators and context managers", "Solid data structure usage"],
    weaknesses: ["Async/await patterns need improvement", "Type hints usage is inconsistent"],
    suggestions: ["Build a project using FastAPI with full type hints", "Explore asyncio deeply", "Study design patterns in Python"],
  },
};

const defaultResult: SkillVerification = {
  score: 75, label: "Proficient",
  strengths: ["Good foundational knowledge", "Solid problem-solving approach", "Consistent code quality"],
  weaknesses: ["Advanced patterns need more practice", "Could benefit from more real-world projects"],
  suggestions: ["Build a production-grade project", "Contribute to open source", "Study system design patterns"],
};

export function verifySkill(skill: string, _level: string, _input: string): Promise<SkillVerification> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(skillResults[skill] || defaultResult), 2000);
  });
}

const roadmapTemplates: Record<string, RoadmapStep[]> = {
  React: [
    { id: "r1", week: "Week 1-2", title: "Master React Fundamentals", description: "Deep dive into hooks, state management, and props patterns. Build small focused apps.", resources: [{ type: "video", title: "React Hooks Deep Dive", url: "#" }, { type: "article", title: "Thinking in React", url: "#" }], duration: "~10 hours", difficulty: "Beginner", completed: false },
    { id: "r2", week: "Week 3-4", title: "Component Patterns", description: "Learn HOC, render props, compound components, and composition patterns.", resources: [{ type: "course", title: "Advanced React Patterns", url: "#" }, { type: "article", title: "Composition vs Inheritance", url: "#" }], duration: "~12 hours", difficulty: "Intermediate", completed: false },
    { id: "r3", week: "Week 5-6", title: "State Management", description: "Master Context API, Redux Toolkit, Zustand, and when to use each.", resources: [{ type: "video", title: "State Management Guide", url: "#" }, { type: "article", title: "Zustand vs Redux", url: "#" }], duration: "~10 hours", difficulty: "Intermediate", completed: false },
    { id: "r4", week: "Week 7-8", title: "Performance Optimization", description: "Learn React.memo, useMemo, useCallback, lazy loading, and React Profiler.", resources: [{ type: "article", title: "React Performance Tips", url: "#" }, { type: "video", title: "Profiling React Apps", url: "#" }], duration: "~8 hours", difficulty: "Advanced", completed: false },
    { id: "r5", week: "Week 9-10", title: "Testing", description: "Master Jest, React Testing Library, and Cypress for E2E testing.", resources: [{ type: "course", title: "Testing React Apps", url: "#" }, { type: "article", title: "RTL Best Practices", url: "#" }], duration: "~10 hours", difficulty: "Intermediate", completed: false },
    { id: "r6", week: "Week 11-12", title: "Full Stack React", description: "Build with Next.js, API Routes, Server Components, and deployment.", resources: [{ type: "course", title: "Next.js Mastery", url: "#" }, { type: "video", title: "Server Components Explained", url: "#" }], duration: "~14 hours", difficulty: "Advanced", completed: false },
  ],
};

const defaultRoadmap: RoadmapStep[] = [
  { id: "d1", week: "Week 1-2", title: "Core Fundamentals", description: "Build a solid foundation with core concepts and syntax.", resources: [{ type: "course", title: "Official Documentation", url: "#" }], duration: "~10 hours", difficulty: "Beginner", completed: false },
  { id: "d2", week: "Week 3-4", title: "Intermediate Concepts", description: "Explore patterns, best practices, and common architectures.", resources: [{ type: "video", title: "Intermediate Guide", url: "#" }], duration: "~12 hours", difficulty: "Intermediate", completed: false },
  { id: "d3", week: "Week 5-6", title: "Advanced Topics", description: "Tackle advanced patterns and production-grade techniques.", resources: [{ type: "article", title: "Advanced Patterns", url: "#" }], duration: "~10 hours", difficulty: "Advanced", completed: false },
  { id: "d4", week: "Week 7-8", title: "Real World Project", description: "Build a complete project applying everything learned.", resources: [{ type: "course", title: "Project-Based Learning", url: "#" }], duration: "~16 hours", difficulty: "Advanced", completed: false },
];

export function generateRoadmap(skill: string, _level: string): Promise<RoadmapStep[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roadmapTemplates[skill] || defaultRoadmap), 1500);
  });
}

const interviewQuestions: Record<string, string[]> = {
  React: [
    "Explain the virtual DOM and how React reconciliation works.",
    "What's the difference between useMemo and useCallback? When would you use each?",
    "How would you optimize a React app rendering 10,000 list items?",
    "Explain React's fiber architecture and its benefits.",
    "How do you handle side effects in functional components?",
  ],
};

const defaultQuestions = [
  "Explain the core concepts of this technology.",
  "How would you architect a scalable application?",
  "What are common performance pitfalls?",
  "Describe a challenging bug you've fixed.",
  "How do you approach testing?",
];

export function getInterviewQuestion(skill: string, index: number): string {
  const questions = interviewQuestions[skill] || defaultQuestions;
  return questions[index % questions.length];
}

export function getInterviewFeedback(_answer: string): { score: number; feedback: string } {
  const score = Math.floor(Math.random() * 25) + 65;
  const feedbacks = [
    "Good explanation of core concepts. Consider adding more specific examples.",
    "Strong technical depth. Try to structure your answer with a clear framework.",
    "Solid answer! You could improve by mentioning trade-offs and alternatives.",
    "Great practical knowledge shown. Consider discussing edge cases too.",
  ];
  return { score, feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)] };
}
