"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Clock, 
  Calendar, 
  Key, 
  UserCheck,
  Loader2,
  HelpCircle
} from "lucide-react";

interface SystemConfig {
  peeringBandwidthLimit: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  estimatedReturn?: string;
}

const defaultSystemConfig: SystemConfig = {
  peeringBandwidthLimit: "10 Gbps",
  maintenanceMode: false,
  maintenanceMessage: "M-Amin Network is currently undergoing scheduled backend fiber infrastructure upgrades. We will be back online shortly.",
  estimatedReturn: new Date(Date.now() + 3600000 * 2).toISOString().slice(0, 16) // 2 hours from now
};

export default function SettingsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(defaultSystemConfig);
  const [adminAuth, setAdminAuth] = useState({ email: "", password: "", username: "", lastPasswordChanged: "", lastLogin: "" });
  
  // Account Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password Visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Loading states
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [isSavingMaintenance, setIsSavingMaintenance] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("system_config").then(saved => {
      if (saved) {
        const config = saved as Record<string, unknown>;
        setSystemConfig({
          peeringBandwidthLimit: (config.peeringBandwidthLimit as string) || "10 Gbps",
          maintenanceMode: !!config.maintenanceMode,
          maintenanceMessage: (config.maintenanceMessage as string) || defaultSystemConfig.maintenanceMessage,
          estimatedReturn: (config.estimatedReturn as string) || defaultSystemConfig.estimatedReturn
        });
      } else {
        setSetting("system_config", defaultSystemConfig);
        setSystemConfig(defaultSystemConfig);
      }
    });

    getSetting("admin_auth").then(savedAuth => {
      if (savedAuth) {
        const parsed = savedAuth as Record<string, string>;
        setAdminAuth({
          email: parsed.email || "",
          password: parsed.password || "",
          username: parsed.username || "",
          lastPasswordChanged: parsed.lastPasswordChanged || "7/13/2026, 12:45 PM",
          lastLogin: parsed.lastLogin || new Date().toLocaleString()
        });
      }
    });
  }, [router]);

  async function hashPassword(msg: string) {
    const msgBuffer = new TextEncoder().encode(msg);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200", textColor: "text-slate-400" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score <= 1) return { score, label: "Weak", color: "bg-red-500 w-1/3", textColor: "text-red-500" };
    if (score <= 3) return { score, label: "Medium", color: "bg-amber-500 w-2/3", textColor: "text-amber-500" };
    return { score, label: "Strong", color: "bg-emerald-500 w-full", textColor: "text-emerald-500" };
  };

  const strength = getPasswordStrength(newPassword);

  const saveAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAccount(true);

    // Simulate network delay
    setTimeout(async () => {
      try {
        const updatedAuth = { ...adminAuth };
        
        // If they want to change password
        if (newPassword.trim() !== "") {
          if (!currentPassword) {
            toast.error("Please enter your current password to proceed.");
            setIsSavingAccount(false);
            return;
          }
          const currentHashed = await hashPassword(currentPassword);
          if (currentHashed !== adminAuth.password) {
            toast.error("The current password you entered is incorrect.");
            setIsSavingAccount(false);
            return;
          }
          if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            setIsSavingAccount(false);
            return;
          }
          if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long.");
            setIsSavingAccount(false);
            return;
          }
          const hashed = await hashPassword(newPassword);
          updatedAuth.password = hashed;
          updatedAuth.lastPasswordChanged = new Date().toLocaleString();
        }

        setSetting("admin_auth", updatedAuth);
        setAdminAuth(updatedAuth);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Account settings updated successfully!");
      } catch {
        toast.error("An error occurred while updating account credentials.");
      }
      setIsSavingAccount(false);
    }, 1000);
  };

  const saveSystemConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMaintenance(true);

    setTimeout(() => {
      try {
        setSetting("system_config", systemConfig);
        toast.success("Maintenance configurations saved successfully!");
      } catch {
        toast.error("Failed to update system configurations.");
      }
      setIsSavingMaintenance(false);
    }, 1000);
  };

  if (!auth) return null;

  return (
    <div className="space-y-6 w-full text-left pb-16 font-sans">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Forms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Account Settings Card */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Account Settings</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                  Update your admin login username, email identifier, and account access password securely.
                </p>
              </div>
            </div>

            <form onSubmit={saveAdminAuth} className="space-y-5">
              {/* Username field (Read-only/Disabled for safety) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Profile Username</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400">
                    <UserCheck className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    disabled
                    value={adminAuth.username || "admin"}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-500 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={adminAuth.email}
                    onChange={(e) => setAdminAuth({ ...adminAuth, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold transition-all"
                    placeholder="admin@m-amin.net"
                  />
                </div>
              </div>

              {/* Password update section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Change Password</h4>
                
                {/* Current Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Current Password</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold transition-all"
                      placeholder="Required only to set a new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Grid for New & Confirm Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* New Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">New Password</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold transition-all"
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="space-y-1.5 pt-1.5 px-0.5">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-slate-400 uppercase">Strength:</span>
                          <span className={`${strength.textColor} uppercase`}>{strength.label}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-300 ${strength.color}`} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Confirm New Password</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold transition-all"
                        placeholder="Re-type new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-extrabold text-slate-700 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingAccount}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 disabled:opacity-80"
                >
                  {isSavingAccount ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Maintenance Mode Card */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Maintenance Mode</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Configure maintenance triggers to temporarily restrict landing page queries during infrastructure outages.
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 pt-1">
                {systemConfig.maintenanceMode ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Maintenance Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={saveSystemConfig} className="space-y-5">
              {/* Large Toggle Switch */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Enable Maintenance Status</h4>
                  <p className="text-[10px] text-slate-500 max-w-sm">
                    When enabled, visitors will see the maintenance page while administrators retain access.
                  </p>
                </div>
                {/* Switch Button */}
                <button
                  type="button"
                  onClick={() => setSystemConfig({ ...systemConfig, maintenanceMode: !systemConfig.maintenanceMode })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none p-0.5 ${
                    systemConfig.maintenanceMode ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      systemConfig.maintenanceMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Conditional Inputs */}
              {systemConfig.maintenanceMode && (
                <div className="space-y-4 animate-fade-in">
                  {/* Maintenance Message Textarea */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Maintenance Message</label>
                    <textarea
                      rows={3}
                      value={systemConfig.maintenanceMessage || ""}
                      onChange={(e) => setSystemConfig({ ...systemConfig, maintenanceMessage: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none font-medium"
                      placeholder="Display message for landing page visitors..."
                    />
                  </div>

                  {/* Estimated Return Time */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Estimated Return Time</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-slate-400">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        type="datetime-local"
                        value={systemConfig.estimatedReturn || ""}
                        onChange={(e) => setSystemConfig({ ...systemConfig, estimatedReturn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Controls */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSavingMaintenance}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 disabled:opacity-80"
                >
                  {isSavingMaintenance ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving Configuration...
                    </>
                  ) : (
                    "Save Configuration"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Security Details & Metadata info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section 3: Security Card */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 space-y-5">
            <div className="flex gap-3.5 items-start pb-3.5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Console Security</h4>
                <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">Two-factor login metrics.</p>
              </div>
            </div>

            {/* 2FA Disabled Switch Placeholder */}
            <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Two-Factor Auth</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[8.5px] font-bold uppercase tracking-wide">
                  Enterprise Only
                </span>
              </div>
              <p className="text-[9.5px] text-slate-500 leading-normal">
                Enforce authenticator app OTP validation during administrator sign-in.
              </p>
              <div className="pt-2 flex justify-start">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1 bg-slate-200 text-slate-500 rounded-lg text-[9px] font-extrabold cursor-not-allowed"
                >
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Security Logs / Meta Information */}
            <div className="space-y-4 pt-3.5 border-t border-slate-100">
              <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Access Metadata</h5>
              
              {/* Last Password Changed */}
              <div className="flex items-start gap-3 text-xs">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Last Password Reset</span>
                  <span className="text-slate-800 font-mono text-[10px] font-semibold">{adminAuth.lastPasswordChanged}</span>
                </div>
              </div>

              {/* Last Login details */}
              <div className="flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Last Dashboard Login</span>
                  <span className="text-slate-800 font-mono text-[10px] font-semibold">{adminAuth.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-900 border border-slate-850 shadow-md rounded-2xl p-6 text-white space-y-4 relative overflow-hidden">
            {/* Background absolute decor */}
            <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

            <div className="flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-300 shrink-0">
                <HelpCircle className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider pt-1">Console Help Center</h4>
            </div>
            
            <p className="text-[10.5px] text-slate-300 leading-relaxed font-medium">
              Need assistance setting credentials or setting up network restrictions? Our technical operations desk is available 24/7.
            </p>

            <div className="pt-2 flex justify-start">
              <a
                href="mailto:support@m-amin.net"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black tracking-wider uppercase transition-colors shadow-md shadow-indigo-600/10"
              >
                Contact SysAdmin
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Save Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 flex gap-3 shadow-lg justify-end select-none">
        <button
          type="button"
          onClick={() => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-[10px] font-extrabold text-slate-700 cursor-pointer"
        >
          Reset Inputs
        </button>
        <button
          onClick={saveAdminAuth}
          disabled={isSavingAccount}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black tracking-wider uppercase cursor-pointer transition-colors shadow-md flex items-center gap-1.5 disabled:opacity-85"
        >
          {isSavingAccount ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

