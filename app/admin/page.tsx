import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminTable from "@/components/AdminTable";

export const metadata = {
  title: "Admin Panel — Zynex Studio",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Cek role admin di database profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="dash-hero">
      <div>
        <span className="dash-eyebrow">— ADMIN PANEL</span>
        <h1>User Management</h1>
        <p>Manage studio members and their access levels.</p>
      </div>
      {/* Tombol logout manual jika needed */}
    </div>
  );
}