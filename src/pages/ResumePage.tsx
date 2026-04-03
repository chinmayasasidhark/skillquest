import { motion } from "framer-motion";
import { useState } from "react";

export default function ResumePage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");

  const generateResume = () => {
    if (!name || !skills) return;

    const output = `
Name: ${name}

Skills: ${skills}

Summary:
Passionate developer skilled in ${skills}, focused on building scalable and impactful applications.

Projects:
- Built modern web apps using ${skills}
- Focused on performance and UI/UX

Goal:
To become a top-tier developer and contribute to innovative tech solutions.
    `;

    setResume(output);
  };

  return (
    <div className="text-white flex flex-col items-center">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] bg-clip-text text-transparent"
      >
        📄 Resume Builder
      </motion.h1>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,255,163,0.1)] space-y-4"
      >

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[#00FFA3]"
        />

        <input
          placeholder="Skills (React, Node, DSA...)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[#7B6EF6]"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateResume}
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] text-black"
        >
          Generate Resume ⚡
        </motion.button>
      </motion.div>

      {/* RESULT */}
      {resume && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mt-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(123,110,246,0.1)]"
        >
          <h3 className="text-lg font-semibold mb-3 text-[#00FFA3]">
            🚀 Generated Resume
          </h3>

          <pre className="whitespace-pre-wrap text-sm opacity-80">
            {resume}
          </pre>
        </motion.div>
      )}
    </div>
  );
}