import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-20),
        {
          id: Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 3 + 2,
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // 🔐 Username login (localStorage)
  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username]) {
      alert("User not found");
      return;
    }

    if (users[username] !== password) {
      alert("Wrong password");
      return;
    }

    localStorage.setItem("currentUser", username);
    navigate("/dashboard");
  };

  // 🔐 Google login (Firebase)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0f1a] to-black" />

      <div className="absolute w-[600px] h-[600px] bg-green-400/10 blur-[140px] top-[-200px] right-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] bottom-[-200px] left-[-200px]" />

      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: `${s.left}%`,
            bottom: "-10px",
            width: s.size,
            height: s.size,
            animation: `floatUp ${s.duration}s linear`,
          }}
        />
      ))}

      <div className="relative z-10 w-[380px] p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          🚀 SkillQuest
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600"
        >
          {loading ? "Entering..." : "Login"}
        </button>

        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-xs opacity-60">OR</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm mt-6 opacity-70">
          New here?{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Create account
          </span>
        </p>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}