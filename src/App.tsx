import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import VerifyPage from "@/pages/VerifyPage";
import RoadmapPage from "@/pages/RoadmapPage";
import InterviewPage from "@/pages/InterviewPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import ComparePage from "@/pages/ComparePage";
import InternshipsPage from "@/pages/InternshipsPage";
import NotFound from "@/pages/NotFound";
import SkillGapPage from "./pages/SkillGapPage";
import ResumePage from "@/pages/ResumePage";

// 🔥 Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 LOCAL USER
  const localUser = localStorage.getItem("currentUser");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading SkillQuest...
      </div>
    );
  }

  const isAuthenticated = user || localUser;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 PROTECTED */}
        <Route
          element={
            isAuthenticated ? (
              <AppLayout user={user || { username: localUser }} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/skill-gap" element={<SkillGapPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/internships" element={<InternshipsPage />} />
        </Route>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;