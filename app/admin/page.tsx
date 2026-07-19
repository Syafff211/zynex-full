import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminUser } from "@/lib/is-admin";
import AdminUsersTable from "@/components/AdminUsersTable";

export type AdminUserRow = {
  id: string;
  email: string;
  role: "admin" | "user";
  confirmed: boolean;
  createdAt: string;
  rawCreatedAt: string;
};

export default async function AdminPage() {
  const canLoad =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  let rows: AdminUserRow[] = [];
  let loadError = "";

  if (canLoad) {
    try {
      const admin = createAdminClient();
      const { data, error } = await admin.auth.admin.listUsers();
      if (error) throw error;
      rows = (data.users || [])
        .map((u) => ({
          id: u.id,
          email: u.email || "—",
          role: (isAdminUser(u) ? "admin" : "user") as "admin" | "user",
          confirmed: !!u.email_confirmed_at,
          rawCreatedAt: u.created_at,
          createdAt: new Date(u.created_at).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          }),
        }))
        .sort((a, b) => b.rawCreatedAt.localeCompare(a.rawCreatedAt));
    } catch (e) {
      loadError = e instanceof Error ? e.message : "Gagal memuat user";
    }
  }

  const now = Date.now();
  const total = rows.length;
  const admins = rows.filter((r) => r.role === "admin").length;
  const pending = rows.filter((r) => !r.confirmed).length;
  const new30 = rows.filter((r) => now - new Date(r.rawCreatedAt).getTime() < 30 * 864e5).length;

  const stats = [
    { label: "TOTAL USERS", value: String(total), change: "all time" },
    { label: "NEW (30D)", value: String(new30), change: "growth" },
    { label: "ADMINS", value: String(admins), change: "privileged" },
    { label: "PENDING", value: String(pending), change: "unconfirmed" },
  ];

  return (
    <>
      <section className="dash-hero">
        <div>
          <span className="dash-eyebrow admin-eyebrow">— ADMIN PANEL</span>
          <h1>User Management</h1>
          <p>Manage studio members and their access levels.</p>
        </div>
        <a href="/dashboard" className="dash-cta admin-ghost">← DASHBOARD</a>
      </section>

      <section className="dash-stats">
        {stats.map((s) => (
          <div className="dash-stat" key={s.label}>
            <span className="dash-stat-label">{s.label}</span>
            <span className="dash-stat-value">{s.value}</span>
            <span className="dash-stat-change">{s.change}</span>
          </div>
        ))}
      </section>

      {!canLoad && (
        <div className="dash-card admin-notice">
          <h2>Service role belum terpasang</h2>
          <p>
            Tambahkan <code>SUPABASE_SERVICE_ROLE_KEY</code> di Vercel → Settings →
            Environment Variables, lalu Redeploy. Tanpa itu, daftar user tidak bisa
            dimuat (demi keamanan Supabase).
          </p>
        </div>
      )}

      {canLoad && loadError && <p className="auth-error">{loadError}</p>}

      {canLoad && !loadError && (
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>All Users</h2>
            <span className="admin-count">{total} total</span>
          </div>
          <AdminUsersTable users={rows} canMutate={canLoad} />
        </section>
      )}
    </>
  );
}
