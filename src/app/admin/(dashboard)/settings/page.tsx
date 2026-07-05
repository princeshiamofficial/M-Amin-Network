"use client";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_system_config");
    if (saved) {
      setSystemConfig(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_system_config", JSON.stringify(defaultSystemConfig));
      setSystemConfig(defaultSystemConfig);
    }
  }, [router]);

  const saveSystemConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_system_config", JSON.stringify(systemConfig));
    alert("Configuration saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">General Core Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure general gateway parameters, simulated traffic ceilings, and maintenance triggers.</p>
      </div>
      <form onSubmit={saveSystemConfig} className="space-y-4 max-w-md">
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
  );
}
