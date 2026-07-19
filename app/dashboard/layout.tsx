import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Allow UI preview without Supabase env
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <div className="dash-shell">
        <DashboardSidebar />
        <div className="dash-main">
          <DashboardHeader
            user={{
              email: "demo@zynex.studio",
            }}
          />
          <main className="dash-content">{children}</main>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  return (
    <div className="dash-shell">
      <DashboardSidebar />
      <div className="dash-main">
        <DashboardHeader user={data.user} />
        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
}