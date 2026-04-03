import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ REGISTER FUNCTION (FIXED)
  const handleRegister = () => {
    if (!username || !password) {
      alert("Enter credentials");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      alert("User already exists");
      return;
    }

    // ✅ Save new user
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Save current logged in user
    localStorage.setItem("currentUser", username);

    alert("Account created successfully 🚀");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[380px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">

        <h1 className="text-2xl font-bold text-center mb-6">
          🚀 Create Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/10"
        />

        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}