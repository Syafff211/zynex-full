import { createClient } from "@/lib/supabase/server";

const stats = [
  { label: "ACTIVE PROJECTS", value: "12", change: "+3" },
  { label: "COMPLETED", value: "50+", change: "+8" },
  { label: "REVENUE", value: "$24.8K", change: "+18%" },
  { label: "CLIENTS", value: "32", change: "+5" },
];

const projects = [
  { name: "Lumen Finance", status: "Live", date: "2h ago" },
  { name: "Orbit SaaS", status: "In Review", date: "1d ago" },
  { name: "Nova Studio", status: "Draft", date: "3d ago" },
  { name: "Atlas Brand", status: "Live", date: "1w ago" },
];

export default async function DashboardPage() {
  let name = "Creator";

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    name = data.user?.email?.split("@")[0] || "Creator";
  }

  return (
    <>
      <section className="dash-hero">
        <div>
          <span className="dash-eyebrow">— DASHBOARD</span>
          <h1>Welcome back, {name}</h1>
          <p>Here&apos;s what&apos;s happening with your studio today.</p>
        </div>
        <button className="dash-cta" type="button">
          + NEW PROJECT
        </button>
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

      <section className="dash-grid">
        <div className="dash-card dash-card-wide">
          <div className="dash-card-head">
            <h2>Recent Projects</h2>
            <a href="#">View all</a>
          </div>
          <div className="dash-table">
            {projects.map((p) => (
              <div className="dash-row" key={p.name}>
                <span className="dash-row-name">{p.name}</span>
                <span
                  className={`dash-badge dash-badge-${p.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {p.status}
                </span>
                <span className="dash-row-date">{p.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h2>Quick Actions</h2>
          </div>
          <div className="dash-actions">
            <button type="button">New Project</button>
            <button type="button">Invite Client</button>
            <button type="button">View Analytics</button>
            <button type="button">Settings</button>
          </div>
        </div>
      </section>
    </>
  );
}