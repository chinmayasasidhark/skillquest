import { useState } from "react";

type Job = {
  title: string;
  company: string;
  link: string;
  match: string;
};

export default function InternshipsPage() {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const findInternships = async () => {
  setLoading(true);

  const prompt = `
    User skills: ${skills}

    Suggest 3 job roles ONLY (no links).
    Example:
    ["Frontend Developer Intern", "React Developer", "Web Developer"]
    `;

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "openrouter/free",
            messages: [{ role: "user", content: prompt }]
          })
        });

        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || "";

        let roles: string[] = [];

        try {
          roles = JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || "[]");
        } catch {
          roles = [];
        }

        // 🔥 fallback roles (if AI fails)
        if (!roles.length) {
          if (skills.includes("react")) {
            roles = ["Frontend Developer Intern", "React Developer"];
          } else if (skills.includes("node")) {
            roles = ["Backend Developer Intern", "Node.js Developer"];
          } else if (skills.includes("dsa")) {
            roles = ["Software Engineer Intern", "SDE Intern"];
          } else {
            roles = ["Software Intern"];
          }
        }

        // 🔥 convert roles → REAL LinkedIn links
        const jobs = roles.map((role) => {
          const query = role.replace(/\s+/g, "%20");

          return {
            title: role,
            company: "LinkedIn Jobs",
            link: `https://www.linkedin.com/jobs/search/?keywords=${query}&f_TPR=r86400`,
            match: "Based on your skills"
          };
        });

        setJobs(jobs);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10 text-center">
        🎯 AI Internship Matcher
      </h1>

      {/* INPUT */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <input
          placeholder="Enter skills (react, node, dsa)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="p-3 w-80 rounded-xl bg-white/10 border border-white/20 outline-none"
        />

        <button
          onClick={findInternships}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
        >
          {loading ? "Finding..." : "Find Internships"}
        </button>
      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {jobs.map((job, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold mb-1">
              {job.title}
            </h2>

            <p className="text-gray-400 mb-2">
              {job.company}
            </p>

            <p className="text-green-400 text-sm mb-3">
              🤖 {job.match}
            </p>

            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-semibold"
            >
              Apply →
            </a>
          </div>
        ))}

      </div>
    </div>
  );
}