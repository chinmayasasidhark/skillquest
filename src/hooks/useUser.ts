import { useState, useEffect, useCallback } from "react";
import type { User } from "@/lib/mock-data";
import { currentUser } from "@/lib/mock-data";

const AUTH_KEY = "sq_auth";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem(AUTH_KEY); }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, _password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "alex@skillquest.ai" || email) {
          const u = { ...currentUser, email };
          localStorage.setItem(AUTH_KEY, JSON.stringify(u));
          setUser(u);
          resolve(u);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }, []);

  const register = useCallback((name: string, email: string, _password: string, skills: string[]): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const u: User = { ...currentUser, id: "user_new", name, email, skills, xp: 0, level: "Beginner", streak: 0, rank: 50 };
        localStorage.setItem(AUTH_KEY, JSON.stringify(u));
        setUser(u);
        resolve(u);
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const addXP = useCallback((amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, xp: prev.xp + amount };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { user, loading, login, register, logout, addXP };
}
