import { useState } from "react";
import { motion } from "framer-motion";

// ✅ fallback skills
const SKILLS = ["React", "Node.js", "DSA"];

type RoadmapStep = {
  id: string;
  week: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  completed: boolean;
};

// ✅ SAFE AI FUNCTION
async function generateRoadmapAI(skill: string, level: string): Promise<RoadmapStep[]> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: `Create a roadmap for ${skill} at ${level} level in JSON array format.`,
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || "";

    let parsed = [];

    try {
      parsed = JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || "[]");
    } catch {
      parsed = [];
    }

    // 🔥 fallback if AI fails
    if (!parsed.length) {
      parsed = [
        {
          title: "Learn Basics",
          description: "Start with fundamentals",
          duration: "1 week",
          difficulty: "Beginner",
        },
        {
          title: "Build Projects",
          description: "Apply your knowledge",
          duration: "2 weeks",
          difficulty: "Intermediate",
        },
      ];
    }

    return parsed.map((step: any, i: number) => ({
      id: String(i),
      week: `Week ${i + 1}`,
      title: step.title,
      description: step.description,
      duration: step.duration || "1 week",
      difficulty: step.difficulty || "Intermediate",
      completed: false,
    }));
  } catch (err) {
    console.error(err);

    // 🔥 HARD fallback (always works)
    return [
      {
        id: "1",
        week: "Week 1",
        title: "Start Basics",
        description: "Learn fundamentals",
        duration: "1 week",
        difficulty: "Beginner",
        completed: false,
      },
      {
        id: "2",
        week: "Week 2",
        title: "Build Projects",
        description: "Create real-world apps",
        duration: "2 weeks",
        difficulty: "Intermediate",
        completed: false,
      },
    ];
  }
}

export default function RoadmapPage() {
  const [skill, setSkill] = useState("React");
  const [level, setLevel] = useState("Intermediate");
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(false);

  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [strongSkills, setStrongSkills] = useState<string[]>([]);

  const generate = async () => {
    setLoading(true);

    // 🔥 Skill Gap Logic
    const roleSkills: Record<string, string[]> = {
      React: ["javascript", "react", "css", "html", "typescript"],
      "Node.js": ["node", "api", "database", "auth"],
      DSA: ["arrays", "graphs", "algorithms", "problem solving"],
    };

    const userSkills = skill.toLowerCase().split(",").map((s) => s.trim());
    const required = roleSkills[skill] || [];

    const missing = required.filter((s) => !userSkills.includes(s));
    const strong = userSkills.filter((s) => required.includes(s));

    setMissingSkills(missing);
    setStrongSkills(strong);

    // 🔥 AI + fallback roadmap
    const res = await generateRoadmapAI(skill, level);
    console.log("Generated Steps:", res); // debug

    setSteps(res);
    setLoading(false);
  };

  const toggleComplete = (id: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="max-w-4xl mx-auto text-white p-6">

      <h1 className="text-3xl font-bold mb-2">
        🧠 AI Roadmap Generator
      </h1>

      <p className="text-gray-400 mb-6">
        Personalized learning + skill gap analysis
      </p>

      {/* INPUT */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
        >
          {SKILLS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {["Beginner", "Intermediate", "Advanced"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded ${
                level === l ? "bg-yellow-400 text-black" : "bg-gray-800"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="px-6 py-2 rounded bg-yellow-400 text-black font-bold"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {/* 🔥 Skill Gap */}
      {(missingSkills.length > 0 || strongSkills.length > 0) && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl">
          <p>❌ Missing Skills: {missingSkills.join(", ") || "None"}</p>
          <p>✅ Strengths: {strongSkills.join(", ") || "None"}</p>
        </div>
      )}

      {/* 🔥 ROADMAP */}
      {steps.length > 0 && (
        <>
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm">
              <span>{completedCount}/{steps.length}</span>
              <span>{Math.round((completedCount / steps.length) * 100)}%</span>
            </div>

            <div className="h-2 bg-gray-700 rounded">
              <motion.div
                animate={{
                  width: `${(completedCount / steps.length) * 100}%`,
                }}
                className="h-2 bg-green-400 rounded"
              />
            </div>
          </div>

          {/* Steps */}
          {steps.map((step) => (
            <div key={step.id} className="mb-4 p-4 bg-gray-800 rounded-xl">
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>

              <button
                onClick={() => toggleComplete(step.id)}
                className="mt-2 px-3 py-1 bg-green-500 rounded"
              >
                {step.completed ? "Completed" : "Mark Complete"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}