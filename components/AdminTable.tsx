"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Profile = {
  id: string;
  email: string | null;
  role: string;
  full_name: string | null;
};

export default function AdminTable() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("profiles").select("*");
    if (data) setUsers(data);
    setLoading(false);
  };

  const updateUserRole = async (id: string, newRole: "user" | "admin") => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);

    if (!error) fetchUsers();
  };

  if (loading) return <div className="dash-content">Loading...</div>;

  return (
    <div className="dash-card dash-card-wide">
      <div className="dash-card-head">
        <h2>ALL USERS</h2>
        <button className="dash-cta" onClick={() => window.location.href="/login"} style={{padding: "6px 12px", fontSize: "9px"}}>
          BACK TO LOGIN
        </button>
      </div>
      <div className="dash-table">
        {users.map((user) => (
          <div key={user.id} className="dash-row" style={{ gridTemplateColumns: "1fr 1fr 1fr auto" }}>
            <div>
              <div style={{ color: "var(--ivory)", fontWeight: 600 }}>{user.full_name || "Unknown"}</div>
              <div style={{ color: "var(--muted)", fontSize: "11px" }}>{user.email}</div>
            </div>
            
            <div>
              <span className={`dash-badge ${user.role === 'admin' ? 'dash-badge-live' : 'dash-badge-draft'}`}>
                {user.role.toUpperCase()}
              </span>
            </div>

            <div style={{ color: "var(--muted)", fontSize: "10px" }}>
              Created: {new Date().toLocaleDateString()}
            </div>

            <div>
              {user.role !== "admin" ? (
                <button 
                  onClick={() => updateUserRole(user.id, "admin")}
                  style={{ 
                    padding: "6px 10px", 
                    border: "1px solid #d8c6a4", 
                    background: "transparent", 
                    color: "#d8c6a4", 
                    cursor: "pointer",
                    fontSize: "9px"
                  }}
                >
                  PROMOTE
                </button>
              ) : (
                <button 
                  onClick={() => updateUserRole(user.id, "user")}
                  style={{ 
                    padding: "6px 10px", 
                    border: "1px solid rgba(255,255,255,0.3)", 
                    background: "rgba(255,255,255,0.1)", 
                    color: "var(--ivory)", 
                    cursor: "pointer",
                    fontSize: "9px"
                  }}
                >
                  DEMOTE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}