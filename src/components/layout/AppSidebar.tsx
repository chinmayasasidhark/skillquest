import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Zap, LayoutDashboard, BadgeCheck, Map, Mic, Trophy,
  GitCompareArrows, Briefcase, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X, Sun, Moon
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { GradientBadge } from "@/components/shared/GradientBadge";
import { getLevelProgress } from "@/lib/gamification";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Verify Skill", path: "/verify", icon: BadgeCheck },
  { title: "Roadmap", path: "/roadmap", icon: Map },
  { title: "Interview", path: "/interview", icon: Mic },
  { title: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { title: "Compare", path: "/compare", icon: GitCompareArrows },
  { title: "Internships", path: "/internships", icon: Briefcase },

  // 🔥 ADD THIS LINE ONLY
  { title: "Resume", path: "/resume", icon: Briefcase },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const progress = user ? getLevelProgress(user.xp) : null;

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(0,255,163,0.12)]">
          <Zap className="w-5 h-5" style={{ color: "#00FFA3" }} />
        </div>
        {!collapsed && (
          <div>
            <span className="font-heading text-lg text-gradient-hero font-bold">SkillQuest</span>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">AI Career OS</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                color: active ? "#00FFA3" : "var(--inactive-nav, #4A4D6A)",
                fontWeight: active ? 600 : 500,
              }}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "rgba(0,255,163,0.08)",
                    boxShadow: "4px 0 20px rgba(0,255,163,0.1)",
                  }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-sm"
                  style={{ background: "#00FFA3" }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <item.icon
                className="w-5 h-5 relative z-10 transition-all duration-200 group-hover:scale-110"
                style={{ color: active ? "#00FFA3" : undefined }}
              />
              {!collapsed && <span className="relative z-10 group-hover:text-foreground transition-colors">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div className="px-3 mb-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.04)] transition-all"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>

      {/* User Section */}
      {user && !collapsed && (
        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-3 mb-3">
            <UserAvatar name={user.name} level={user.level} pulse />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <GradientBadge level={user.level} className="mt-0.5" />
            </div>
          </div>
          {progress && (
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>{progress.current} XP</span>
                <span>{progress.max} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00FFA3] via-[#7B6EF6] to-[#FF6EEB] xp-shimmer" style={{ width: `${progress.percentage}%` }} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <Settings className="w-3.5 h-3.5" />Settings
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Collapse Toggle (desktop) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center mx-3 mb-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass-card text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] z-50"
              style={{
                background: "var(--bg-sidebar)",
                borderRight: "1px solid rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px)",
              }}
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1 text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
              <NavContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30"
        style={{
          background: "var(--bg-sidebar)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <NavContent />
      </motion.aside>

      {/* Spacer */}
      <motion.div animate={{ width: collapsed ? 72 : 240 }} transition={{ duration: 0.2 }} className="hidden lg:block flex-shrink-0" />
    </>
  );
}
