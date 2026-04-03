import { useState } from "react";

export default function ResumePage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");

  const generateResume = () => {
    const skillList = skills.split(",").map((s) => s.trim());

    const text = `
${name}

Skills:
${skillList.join(", ")}

Projects:
- Built real-world applications using ${skillList[0] || "modern technologies"}
- Developed projects with ${skillList.slice(0, 2).join(", ")}

Experience:
- Strong understanding of ${skillList.join(", ")}
- Hands-on experience through projects

Objective:
Motivated developer seeking internship opportunities to apply and enhance skills.
`;

    setResume(text);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        📄 Resume Builder
      </h1>

      {/* INPUTS */}
      <div className="flex flex-col gap-4 max-w-md">

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 bg-white/10 rounded border border-white/20 outline-none"
        />

        <input
          placeholder="Skills (react, node, dsa)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="p-3 bg-white/10 rounded border border-white/20 outline-none"
        />

        <button
          onClick={generateResume}
          className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:scale-105 transition"
        >
          Generate Resume
        </button>

      </div>

      {/* OUTPUT */}
      {resume && (
        <div className="mt-10 max-w-2xl bg-white/5 p-6 rounded-xl whitespace-pre-line border border-white/10">
          {resume}
        </div>
      )}

    </div>
  );
}