"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Redirect ke halaman konfirmasi atau dashboard tergantung config
      router.push("/login"); // Bisa diganti /dashboard jika auto-login
      router.refresh();
    } catch {
      setError("Registration failed. Please check your internet connection.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <div className="auth-field">
        <label htmlFor="name">FULL NAME</label>
        <input
          id="name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="email">EMAIL</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </div>

      <div className="auth-field">
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
      </button>
    </form>
  );
}