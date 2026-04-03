import { useState } from "react";

export default function SkillGapPage() {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [result, setResult] = useState<any>(null);

  const analyzeSkills = () => {
    const userSkills = skills.toLowerCase().split(",").map(s => s.trim());

    // 🎯 ROLE REQUIREMENTS
    const roleSkills: any = {
      "Frontend Developer": ["html", "css", "javascript", "react", "typescript"],
      "Backend Developer": ["node", "express", "database", "api", "auth"],
      "Full Stack Developer": ["react", "node", "database", "api"],
      "Software Engineer (FAANG)": ["dsa", "system design", "problem solving", "algorithms"]
    };

    const required = roleSkills[role];

    const missing = required.filter((skill: string) => !userSkills.includes(skill));

    const strong = userSkills.filter((skill: string) => required.includes(skill));

    setResult({
      missing,
      strong,
      roadmap: [
        `Start with ${missing[0] || "advanced topics"}`,
        `Then learn ${missing[1] || "projects"}`,
        `Build 2-3 projects`,
        `Practice interview questions`
      ]
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        🧠 Skill Gap Analyzer
      </h1>

      {/* INPUT */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (comma separated)"
          className="p-3 w-96 rounded bg-white/10 outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>Software Engineer (FAANG)</option>
        </select>

        <button
          onClick={analyzeSkills}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition"
        >
          Analyze Now
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-xl space-y-4">

          <p>
            ❌ <b>Missing Skills:</b> {result.missing.join(", ") || "None"}
          </p>

          <p>
            ✅ <b>Your Strengths:</b> {result.strong.join(", ") || "None"}
          </p>

          <div>
            🎯 <b>Roadmap:</b>
            <ul className="list-disc ml-5 mt-2">
              {result.roadmap.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}