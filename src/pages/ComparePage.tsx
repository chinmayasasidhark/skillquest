import { motion } from "framer-motion";
import { useState } from "react";

export default function ComparePage() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("Frontend Developer");
  const [result, setResult] = useState("");

  const handleCompare = () => {
    if (!name) return;

    const output = `
${name} vs ${target}

Analysis:
You are on a strong path 🚀 but to match a ${target}, you need:

• More real-world projects
• Strong DSA foundation
• Consistency in learning

Recommendation:
Focus on building projects + practicing problems daily.
    `;

    setResult(output);
  };

  return (
    <div className="text-white flex flex-col items-center">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] bg-clip-text text-transparent"
      >
        ⚔️ Skill Comparison Engine
      </motion.h1>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(123,110,246,0.1)] space-y-4"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[#00FFA3]"
          />

          <input
            placeholder="Compare With"
            className="p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[#7B6EF6]"
          />

          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-white/10"
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack</option>
            <option>AI Engineer</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCompare}
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] text-black"
        >
          Compare Now ⚡
        </motion.button>
      </motion.div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mt-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,163,0.1)]"
        >
          <h3 className="text-lg font-semibold mb-3 text-[#7B6EF6]">
            🤖 AI Analysis
          </h3>

          <pre className="whitespace-pre-wrap text-sm opacity-80">
            {result}
          </pre>
        </motion.div>
      )}
    </div>
  );
}