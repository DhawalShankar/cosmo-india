// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/user?action=me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkAuth(); }, []);

  // ── Login (unchanged) ──
  const login = async (email, password) => {
    const res = await fetch("/api/user?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setLoading(true);
      await checkAuth();
      return { success: true };
    }
    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.error };
  };

  // ── Register (unchanged — kept so nothing else breaks) ──
  const register = async (name, email, password) => {
    const res = await fetch("/api/user?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      setLoading(true);
      await checkAuth();
      return { success: true };
    }
    return { success: false };
  };

  // ── NEW: Step 1 — send OTP ──
  const sendOtp = async (name, email, password) => {
    const res = await fetch("/api/user?action=send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, error: data.error };
  };

  // ── NEW: Step 2 — verify OTP & create account ──
  const verifyOtp = async (email, otp) => {
    const res = await fetch("/api/user?action=verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setLoading(true);
      await checkAuth();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  // ── Logout (unchanged) ──
  const logout = async () => {
    await fetch("/api/user?action=logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, sendOtp, verifyOtp, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};