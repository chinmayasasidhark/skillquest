import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setUsers([
      { rank: 1, name: "Chinmaya", xp: 500 },
      { rank: 2, name: "Rishikesh", xp: 400 },
      { rank: 3, name: "User3", xp: 300 },
      { rank: 4, name: "User4", xp: 250 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-12">
        🏆 Leaderboard
      </h1>

      {/* TOP 3 SECTION */}
      <div className="flex justify-center items-end gap-6 mb-12">

        {/* #2 */}
        {users[1] && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-48 text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-xl">🥈 #{users[1].rank}</h2>
            <p className="mt-2">{users[1].name}</p>
            <p className="font-bold">{users[1].xp} XP</p>
          </div>
        )}

        {/* #1 */}
        {users[0] && (
          <div className="bg-yellow-400 text-black p-8 rounded-2xl w-60 text-center shadow-2xl scale-110">
            <h2 className="text-2xl font-bold">🥇 #{users[0].rank}</h2>
            <p className="mt-2 text-lg">{users[0].name}</p>
            <p className="font-bold text-lg">{users[0].xp} XP</p>
          </div>
        )}

        {/* #3 */}
        {users[2] && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-48 text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-xl">🥉 #{users[2].rank}</h2>
            <p className="mt-2">{users[2].name}</p>
            <p className="font-bold">{users[2].xp} XP</p>
          </div>
        )}
      </div>

      {/* REST USERS */}
      <div className="max-w-2xl mx-auto space-y-3">
        {users.slice(3).map((user) => (
          <div
            key={user.rank}
            className="flex justify-between items-center bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <span className="font-medium">
              #{user.rank} {user.name}
            </span>
            <span className="font-bold text-green-400">
              {user.xp} XP
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}