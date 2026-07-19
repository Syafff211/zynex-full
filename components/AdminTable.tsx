"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { promoteUser, demoteUser, removeUser } from "@/lib/actions/admin";
import type { AdminUserRow } from "@/app/admin/page";

export default function AdminUsersTable({
  users,
  canMutate,
}: {
  users: AdminUserRow[];
  canMutate: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const run = (
    action: (fd: FormData) => Promise<{ ok: boolean; error?: string }>,
    id: string
  ) => {
    const fd = new FormData();
    fd.set("id", id);
    start(async () => {
      const res = await action(fd);
      if (!res.ok) alert(res.error || "Gagal");
      router.refresh();
    });
  };

  if (users.length === 0)
    return <p className="admin-empty">Belum ada user. Daftar lewat /register dulu.</p>;

  return (
    <div className="admin-table">
      <div className="admin-table-head">
        <span>USER</span><span>ROLE</span><span>STATUS</span>
        <span>JOINED</span><span className="admin-table-actions-head">ACTIONS</span>
      </div>
      {users.map((u) => (
        <div className="admin-table-row" key={u.id}>
          <span className="admin-cell-user">
            <span className="admin-row-avatar">{u.email.charAt(0).toUpperCase()}</span>
            {u.email}
          </span>
          <span><span className={`admin-role admin-role-${u.role}`}>{u.role.toUpperCase()}</span></span>
          <span><span className={`dash-badge ${u.confirmed ? "dash-badge-live" : "dash-badge-draft"}`}>{u.confirmed ? "VERIFIED" : "PENDING"}</span></span>
          <span className="admin-cell-muted">{u.createdAt}</span>
          <span className="admin-table-actions">
            {canMutate && u.role === "user" && (
              <button className="admin-btn admin-btn-promote" disabled={pending} onClick={() => run(promoteUser, u.id)}>PROMOTE</button>
            )}
            {canMutate && u.role === "admin" && (
              <button className="admin-btn admin-btn-demote" disabled={pending} onClick={() => run(demoteUser, u.id)}>DEMOTE</button>
            )}
            {canMutate && (
              <button className="admin-btn admin-btn-delete" disabled={pending}
                onClick={() => { if (confirm(`Hapus ${u.email}?`)) run(removeUser, u.id); }}>DELETE</button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
