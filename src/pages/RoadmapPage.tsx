import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ExternalLink, BookOpen, Video, GraduationCap } from "lucide-react";
import { PageTransition } from "@/components/shared/AnimatedNumber";
import { SKILLS } from "@/lib/mock-data";
import type { RoadmapStep } from "@/lib/mock-data";

const resourceIcons: Record<string, React.ElementType> = {
  video: Video,
  article: BookOpen,
  course: GraduationCap,
};

// ✅ REAL AI FUNCTION (UNCHANGED)
async function generateRoadmapAI(skill: string, level: string): Promise<RoadmapStep[]> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: `Create a structured roadmap to learn ${skill} at ${level} level.

Return JSON array:
[
  {
    "title": "Step name",
    "description": "what to learn",
    "duration": "time",
    "difficulty": "Beginner | Intermediate | Advanced"
  }
]`,
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;

    const parsed = JSON.parse(text.match(/\[[\s\S]*\]/)[0]);

    return parsed.map((step: any, i: number) => ({
      id: String(i),
      week: `Week ${i + 1}`,
      title: step.title,
      description: step.description,
      duration: step.duration || "1 week",
      difficulty: step.difficulty || "Intermediate",
      completed: false,
      resources: [
        {
          title: "Learn Resource",
          url: "https://youtube.com",
          type: "video",
        },
      ],
    }));
  } catch (err) {
    console.error(err);

    return [
      {
        id: "1",
        week: "Week 1",
        title: "Start Basics",
        description: "Learn fundamentals",
        duration: "1 week",
        difficulty: "Beginner",
        completed: false,
        resources: [{ title: "YouTube", url: "#", type: "video" }],
      },
    ];
  }
}

export default function RoadmapPage() {
  const [skill, setSkill] = useState("React");
  const [level, setLevel] = useState("Intermediate");
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW STATES (Skill Gap)
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [strongSkills, setStrongSkills] = useState<string[]>([]);

  // ✅ UPDATED FUNCTION
  const generate = async () => {
    setLoading(true);

    // 🔥 SKILL GAP LOGIC
    const roleSkills: Record<string, string[]> = {
      "React": ["javascript", "react", "css", "html", "typescript"],
      "Node.js": ["node", "api", "database", "auth"],
      "DSA": ["arrays", "graphs", "algorithms", "problem solving"],
    };

    const userSkills = skill.toLowerCase().split(",").map((s) => s.trim());
    const required = roleSkills[skill] || [];

    const missing = required.filter((s) => !userSkills.includes(s));
    const strong = userSkills.filter((s) => required.includes(s));

    setMissingSkills(missing);
    setStrongSkills(strong);

    // 🔥 EXISTING AI ROADMAP
    const res = await generateRoadmapAI(skill, level);
    setSteps(res);

    setLoading(false);
  };

  const toggleComplete = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;

  const cardStyle = {
    background: `linear-gradient(135deg, var(--bg-card-start), var(--bg-card-end))`,
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow:
      "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
  };

  return (
    <PageTransition className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading text-foreground mb-1">
        Your Learning Roadmap
      </h1>
      <p className="text-muted-foreground mb-6">
        AI-generated personalized learning path
      </p>

      {/* INPUT */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm"
        >
          {SKILLS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-xl text-sm ${
                level === l
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl font-heading text-white bg-gradient-hero"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {/* 🔥 SKILL GAP UI */}
      {(missingSkills.length > 0 || strongSkills.length > 0) && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl space-y-2">
          <p>
            ❌ <b>Missing Skills:</b>{" "}
            {missingSkills.join(", ") || "None"}
          </p>
          <p>
            ✅ <b>Your Strengths:</b>{" "}
            {strongSkills.join(", ") || "None"}
          </p>
        </div>
      )}

      {/* ROADMAP */}
      {steps.length > 0 && (
        <>
          <div className="p-4 rounded-[20px] mb-8" style={cardStyle}>
            <div className="flex justify-between text-sm mb-2">
              <span>
                {completedCount} / {steps.length}
              </span>
              <span>
                {Math.round((completedCount / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-muted/20">
              <motion.div
                animate={{
                  width: `${(completedCount / steps.length) * 100}%`,
                }}
                className="h-full bg-green-400"
              />
            </div>
          </div>

          {steps.map((step) => (
            <div key={step.id} className="mb-4 p-4 bg-gray-800 rounded-xl">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <button onClick={() => toggleComplete(step.id)}>
                {step.completed ? "Completed" : "Mark Complete"}
              </button>
            </div>
          ))}
        </>
      )}
    </PageTransition>
  );
}