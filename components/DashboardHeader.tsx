"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type HeaderUser = {
  email?: string | null;
};

export default function DashboardHeader({ user }: { user: HeaderUser }) {
  const router = useRouter();
  const email = user.email || "demo@zynex.studio";

  const handleLogout = async () => {
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch {
      // ignore
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="dash-header">
      <div className="dash-search">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input type="text" placeholder="Search projects, clients..." />
      </div>

      <div className="dash-header-right">
        <button className="dash-icon-btn" aria-label="Notifications" type="button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>

        <div className="dash-user">
          <div className="dash-avatar">{email.charAt(0).toUpperCase()}</div>
          <div className="dash-user-info">
            <span className="dash-user-name">{email.split("@")[0]}</span>
            <span className="dash-user-email">{email}</span>
          </div>
          <button onClick={handleLogout} className="dash-logout" type="button">
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
}