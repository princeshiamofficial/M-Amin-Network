"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  username: string;
  role: string;
  email: string;
  lastLogin: string;
}

const defaultAdminUsers: AdminUser[] = [
  { id: "USR-1", username: "admin", role: "Super Administrator", email: "admin@maminnetwork.test", lastLogin: "7/3/2026, 10:30 AM" },
  { id: "USR-2", username: "moderator_support", role: "Support Staff", email: "support@maminnetwork.test", lastLogin: "7/2/2026, 04:15 PM" },
];

export default function UsersRolesPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("admin_users").then(saved => {
      if (saved) {
        setAdminUsers(saved as any);
      } else {
        setSetting("admin_users", defaultAdminUsers as any);
        setAdminUsers(defaultAdminUsers);
      }
    });
  }, [router]);

  const deleteAdminUser = (id: string) => {
    if (id === "USR-1") {
      toast("Cannot revoke primary Super Administrator!");
      return;
    }
    if (!confirm("Are you sure you want to revoke this admin user?")) return;
    const updated = adminUsers.filter((u) => u.id !== id);
    setAdminUsers(updated);
    setSetting("admin_users", updated as any);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Administrator Accounts &amp; Team Roles</h2>
        <p className="text-xs text-slate-500 mt-1">Audit administrative personnel and scope roles across the dashboard.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">User ID</th>
              <th className="pb-3">Username</th>
              <th className="pb-3">Scope Role</th>
              <th className="pb-3">Contact Email</th>
              <th className="pb-3">Last Active Login</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-bold font-mono text-brand-blue">{u.id}</td>
                <td className="py-3.5 font-extrabold text-slate-800">{u.username}</td>
                <td className="py-3.5 font-semibold text-slate-600">{u.role}</td>
                <td className="py-3.5 text-slate-500 font-mono">{u.email}</td>
                <td className="py-3.5 text-slate-500">{u.lastLogin}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => deleteAdminUser(u.id)}
                    className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Revoke User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

