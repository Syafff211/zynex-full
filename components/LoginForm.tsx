"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect. Check Supabase configuration.");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch {
      setError("Unable to connect. Check Supabase configuration.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="auth-field">
        <label htmlFor="email">EMAIL</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? "SIGNING IN..." : "SIGN IN"}
      </button>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button
        type="button"
        className="auth-google"
        onClick={handleGoogle}
        disabled={loading}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            fill="#F4F0E8"
            d="M21.35 11.1h-9.17v2.92h5.27c-.23 1.4-1.64 4.1-5.27 4.1-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.84 3.93 14.73 3 12.18 3 6.95 3 2.7 7.25 2.7 12.5S6.95 22 12.18 22c6.02 0 10-4.23 10-10.2 0-.68-.07-1.2-.18-1.7z"
          />
        </svg>
        CONTINUE WITH GOOGLE
      </button>
    </form>
  );
}