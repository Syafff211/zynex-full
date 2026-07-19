// components/AdminTable.tsx
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      
      // Fetch all profiles
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      
      if (data) {
        setUsers(data);
      } else {
        setError("No users found.");
      }
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (id: string, newRole: "user" | "admin") => {
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", id);

      if (updateError) throw updateError;
      
      // Refresh list setelah update sukses
      fetchUsers();
    } catch (err: any) {
      alert(`Failed to update role: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#D8C6A4] font-display tracking-wider animate-pulse">LOADING DATA...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dash-card">
        <div className="p-6 border border-red-500/30 bg-red-900/10 rounded text-center">
          <h3 className="text-red-400 font-bold mb-2">ERROR</h3>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={fetchUsers} 
            className="mt-4 px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-card dash-card-wide">
      <div className="dash-card-head flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[#F4F0E8]">ALL USERS ({users.length})</h2>
        <button 
          className="px-4 py-2 bg-[#D8C6A4] text-black text-xs font-bold tracking-wider hover:bg-[#c4b08f] transition-colors"
          onClick={() => window.location.href="/login"}
        >
          BACK TO LOGIN
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-500 italic">
          No users registered yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-[#D8C6A4] font-semibold text-xs uppercase tracking-wider">User</th>
                <th className="py-4 px-4 text-[#D8C6A4] font-semibold text-xs uppercase tracking-wider">Role</th>
                <th className="py-4 px-4 text-[#D8C6A4] font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-[#F4F0E8]">{user.full_name || "Unknown User"}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wide
                      ${user.role === 'admin' 
                        ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700'
                      }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {user.role !== "admin" ? (
                        <button 
                          onClick={() => updateUserRole(user.id, "admin")}
                          className="px-3 py-1.5 text-xs bg-[#D8C6A4]/10 text-[#D8C6A4] border border-[#D8C6A4]/30 hover:bg-[#D8C6A4] hover:text-black transition-all rounded"
                        >
                          PROMOTE TO ADMIN
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateUserRole(user.id, "user")}
                          className="px-3 py-1.5 text-xs bg-red-900/10 text-red-400 border border-red-800/30 hover:bg-red-500 hover:text-white transition-all rounded"
                        >
                          DEMOTE TO USER
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
