"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface SystemConfig {
  peeringBandwidthLimit: string;
  maintenanceMode: boolean;
}

const defaultSystemConfig: SystemConfig = {
  peeringBandwidthLimit: "10 Gbps",
  maintenanceMode: false,
};

export default function SettingsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(defaultSystemConfig);
  
  const defaultAdminAuth = { email: "admin@mamin.net", password: "admin123", username: "admin" };
  const [adminAuth, setAdminAuth] = useState(defaultAdminAuth);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("m_amin_system_config").then(saved => {
      if (saved) {
        setSystemConfig(saved as any);
      } else {
        setSetting("m_amin_system_config", defaultSystemConfig as any);
        setSystemConfig(defaultSystemConfig);
      }
    });

    getSetting("m_amin_admin_auth").then(savedAuth => {
      if (savedAuth) {
        setAdminAuth(savedAuth as any);
      } else {
        setSetting("m_amin_admin_auth", defaultAdminAuth as any);
      }
    });
  }, [router]);

  const saveSystemConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_system_config", systemConfig as any);
    toast("Configuration saved successfully!");
  };

  const saveAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAuth = { ...adminAuth };
    if (newPassword.trim() !== "") {
      updatedAuth.password = newPassword;
    }
    setSetting("m_amin_admin_auth", updatedAuth as any);
    setAdminAuth(updatedAuth);
    setNewPassword("");
    toast("Admin credentials updated successfully!");
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">General Core Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Configure general gateway parameters, simulated traffic ceilings, and maintenance triggers.</p>
        </div>
        <form onSubmit={saveSystemConfig} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Virtual Peering SLA Limit</label>
            <input
              type="text"
              value={systemConfig.peeringBandwidthLimit}
              onChange={(e) => setSystemConfig({ ...systemConfig, peeringBandwidthLimit: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="maint_mode"
              checked={systemConfig.maintenanceMode}
              onChange={(e) => setSystemConfig({ ...systemConfig, maintenanceMode: e.target.checked })}
              className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue"
            />
            <label htmlFor="maint_mode" className="text-xs font-bold text-slate-800 select-none cursor-pointer">
              Enable Landing Page Maintenance Banner
            </label>
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
          >
            Save Configuration
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Admin Login Credentials</h2>
          <p className="text-xs text-slate-500 mt-1">Update the email and password used to access the administrator dashboard.</p>
        </div>
        <form onSubmit={saveAdminAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Admin Email / Username</label>
            <input
              type="text"
              value={adminAuth.email}
              onChange={(e) => setAdminAuth({ ...adminAuth, email: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">New Password (leave blank to keep current)</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
          >
            Save Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
