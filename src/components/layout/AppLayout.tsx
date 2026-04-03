import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function AppLayout({ user }: { user: any }) {
  const navigate = useNavigate(); // ✅ added

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser"); // ✅ optional safety
    navigate("/login"); // ✅ FIX: redirect after logout
  };

  return (
    <div className="flex min-h-screen relative" style={{ background: "var(--bg-page)" }}>
      
      {/* 🌌 Glow Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: -150,
            right: -150,
            background: "rgba(0,255,163,0.07)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: -100,
            left: -100,
            background: "rgba(123,110,246,0.07)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <AppSidebar />

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 min-w-0 p-4 lg:p-8 pt-16 lg:pt-8 relative z-10 text-gray-900 dark:text-white">

        {/* 👤 TOP BAR */}
        <div className="flex justify-end items-center mb-6 gap-3">
          <img
            src={user?.photoURL || "/default.png"}
            className="w-9 h-9 rounded-full border border-white/10"
          />
          <div className="text-sm">
            <p className="font-semibold">{user?.displayName || "User"}</p>
            <p className="text-xs opacity-60">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm"
          >
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}