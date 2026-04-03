import { useState } from "react";
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export default function ComparePage() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [data, setData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);

  const handleCompare = async () => {
    // TEMP DATA (later from backend/AI)
    const skills = [
      { skill: "DSA", user: 60, target: 80 },
      { skill: "React", user: 85, target: 90 },
      { skill: "System Design", user: 40, target: 75 },
      { skill: "Communication", user: 70, target: 85 },
      { skill: "Projects", user: 75, target: 90 },
    ];

    setData(skills);

    // 🤖 AI INSIGHT (mock for now)
    setInsights({
      betterIn: ["React", "Projects"],
      weakerIn: ["System Design", "DSA"],
      suggestion:
        "Focus on DSA (Arrays, Graphs) and System Design basics. You are close to industry level.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        ⚔️ Skill Comparison Engine
      </h1>

      {/* INPUTS */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
          placeholder="Your Name"
          className="p-3 rounded bg-white/10 outline-none"
        />
        <input
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
          placeholder="Compare With"
          className="p-3 rounded bg-white/10 outline-none"
        />

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option className="bg-gray-900 text-white">
            Frontend Developer
          </option>
          <option className="bg-gray-900 text-white">
            Backend Developer
          </option>
          <option className="bg-gray-900 text-white">
            Full Stack Developer
          </option>
          <option className="bg-gray-900 text-white">
            Software Engineer (FAANG)
          </option>
        </select>
      </div>

      {/* BUTTON */}
      <div className="text-center mb-10">
        <button
          onClick={handleCompare}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition"
        >
          Compare Now
        </button>
      </div>

      {/* 📊 RADAR CHART */}
      {data.length > 0 && (
        <div className="flex justify-center mb-12">
          <RadarChart width={400} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis />
            <Radar
              name="You"
              dataKey="user"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
            />
            <Radar
              name={role}
              dataKey="target"
              stroke="#facc15"
              fill="#facc15"
              fillOpacity={0.3}
            />
          </RadarChart>
        </div>
      )}

      {/* 🤖 AI INSIGHTS */}
      {insights && (
        <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-xl space-y-4">

          <p>
            🔥 <b>You are strong in:</b> {insights.betterIn.join(", ")}
          </p>

          <p>
            ⚠️ <b>Need improvement:</b> {insights.weakerIn.join(", ")}
          </p>

          <p className="text-green-400">
            🤖 AI Suggestion: {insights.suggestion}
          </p>

        </div>
      )}
    </div>
  );
}