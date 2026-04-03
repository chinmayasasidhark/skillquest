import { motion } from "framer-motion";

const users = [
  { name: "You", xp: 1280 },
  { name: "Alex", xp: 1100 },
  { name: "Riya", xp: 980 },
  { name: "Karthik", xp: 850 },
];

export default function LeaderboardPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00FFA3] to-[#7B6EF6] bg-clip-text text-transparent">
        🏆 Leaderboard
      </h1>

      <div className="space-y-4">
        {users.map((u, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,255,163,0.1)] flex justify-between"
          >
            <div className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#00FFA3]">
                #{i + 1}
              </span>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                {u.name[0]}
              </div>
              <p>{u.name}</p>
            </div>

            <div>
              <p className="font-bold">{u.xp} XP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}