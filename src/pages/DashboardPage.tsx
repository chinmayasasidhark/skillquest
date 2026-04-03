import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [github, setGithub] = useState<any>(null);
  const [leetcode, setLeetcode] = useState<any>(null);

  const githubUsername = "chinmayasasidhark";
  const leetcodeUsername = "sasidhar_kalidasu";

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((res) => res.json())
      .then(setGithub);

    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`)
      .then((res) => res.json())
      .then((data) =>
        setLeetcode({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
        })
      )
      .catch(() =>
        setLeetcode({
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
        })
      );
  }, []);

  const chartData = [
    { day: "Mon", xp: 20 },
    { day: "Tue", xp: 45 },
    { day: "Wed", xp: 30 },
    { day: "Thu", xp: 60 },
    { day: "Fri", xp: 75 },
    { day: "Sat", xp: 90 },
    { day: "Sun", xp: 120 },
  ];

  return (
    <div className="text-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] bg-clip-text text-transparent"
      >
        ⚡ Skill Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* GitHub */}
        <motion.div whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,163,0.1)]">
          <h2 className="text-lg mb-3 text-[#00FFA3]">💻 GitHub</h2>
          {github ? (
            <>
              <p>Repos: {github.public_repos}</p>
              <p>Followers: {github.followers}</p>
              <p>Following: {github.following}</p>
            </>
          ) : <p>Loading...</p>}
        </motion.div>

        {/* LeetCode */}
        <motion.div whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(123,110,246,0.1)]">
          <h2 className="text-lg mb-3 text-[#7B6EF6]">🧠 LeetCode</h2>
          {leetcode ? (
            <>
              <p>Total: {leetcode.totalSolved}</p>
              <p>Easy: {leetcode.easySolved}</p>
              <p>Medium: {leetcode.mediumSolved}</p>
              <p>Hard: {leetcode.hardSolved}</p>
            </>
          ) : <p>Loading...</p>}
        </motion.div>

        {/* XP */}
        <motion.div whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,163,0.1)]">
          <h2 className="text-lg mb-3 text-[#00FFA3]">⚡ XP</h2>
          <p className="text-3xl font-bold">1280</p>
          <p className="opacity-60">Level 5</p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,255,163,0.1)]"
      >
        <h2 className="mb-4 text-[#00FFA3]">📈 Progress</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="xp" stroke="#00FFA3" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}