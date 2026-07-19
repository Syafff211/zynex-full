"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview", num: "01" },
  { href: "/dashboard/projects", label: "Projects", num: "02" },
  { href: "/dashboard/clients", label: "Clients", num: "03" },
  { href: "/dashboard/analytics", label: "Analytics", num: "04" },
  { href: "/dashboard/settings", label: "Settings", num: "05" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dash-sidebar">
      <Link href="/" className="dash-logo">
        <span className="brand-mark">
          <span />
          <span />
        </span>
        ZYNEX
      </Link>

      <nav className="dash-nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
          >
            <span className="dash-nav-num">{l.num}</span>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="dash-sidebar-footer">
        <span>v1.0.0</span>
        <span>© 2025</span>
      </div>
    </aside>
  );
}