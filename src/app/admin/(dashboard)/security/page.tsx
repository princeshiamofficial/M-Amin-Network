"use client";
import React, { useState, useEffect } from "react";
import { getSetting, updateAdminAccountAction } from "@/actions/content";
import { useRouter } from "next/navigation";
import { 
  Key, UserCheck, Mail, Lock, Eye, EyeOff, Loader2 
} from "lucide-react";
import { toast } from "sonner";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 16;

export default function SecurityPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);


  // Account Settings States
  const [adminAuth, setAdminAuth] = useState({ email: "", username: "", lastPasswordChanged: "", lastLogin: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingAccount, setIsSavingAccount] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);



    getSetting("admin_auth").then(savedAuth => {
      if (savedAuth) {
        const parsed = savedAuth as Record<string, string>;
        setAdminAuth({
          email: parsed.email || "",
          username: parsed.username || "",
          lastPasswordChanged: parsed.lastPasswordChanged || "7/13/2026, 12:45 PM",
          lastLogin: parsed.lastLogin || new Date().toLocaleString()
        });
      }
    });
  }, [router]);



  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200 w-0", textColor: "text-slate-400" };
    let score = 0;
    if (pass.length >= PASSWORD_MIN_LENGTH) score++;
    if (pass.length >= 12) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (pass.length < PASSWORD_MIN_LENGTH || score <= 1) return { score, label: "Weak", color: "bg-red-500 w-1/4", textColor: "text-red-500" };
    if (score <= 2) return { score, label: "Medium", color: "bg-amber-500 w-1/2", textColor: "text-amber-500" };
    if (score <= 4) return { score, label: "Strong", color: "bg-emerald-500 w-3/4", textColor: "text-emerald-500" };
    return { score, label: "Very Strong", color: "bg-emerald-600 w-full", textColor: "text-emerald-600" };
  };

  const strength = getPasswordStrength(newPassword);
  const normalizedNewPassword = newPassword.trim();
  const normalizedConfirmPassword = confirmPassword.trim();
  const isPasswordMismatch = Boolean(
    normalizedNewPassword &&
    normalizedConfirmPassword &&
    normalizedNewPassword !== normalizedConfirmPassword
  );
  const isPasswordMatch = Boolean(
    normalizedNewPassword &&
    normalizedConfirmPassword &&
    normalizedNewPassword === normalizedConfirmPassword
  );

  const saveAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAccount(true);

    try {
      const trimmedNewPassword = newPassword.trim();
      const trimmedConfirmPassword = confirmPassword.trim();

      if (trimmedNewPassword || trimmedConfirmPassword) {
        if (!currentPassword) {
          toast.error("Please enter your current password to proceed.");
          return;
        }
        if (!trimmedNewPassword || !trimmedConfirmPassword) {
          toast.error("Please enter and confirm the new password.");
          return;
        }
        if (trimmedNewPassword !== trimmedConfirmPassword) {
          toast.error("New passwords do not match.");
          return;
        }
        if (trimmedNewPassword.length < PASSWORD_MIN_LENGTH) {
          toast.error(`New password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
          return;
        }
        if (trimmedNewPassword.length > PASSWORD_MAX_LENGTH) {
          toast.error(`New password cannot be more than ${PASSWORD_MAX_LENGTH} characters long.`);
          return;
        }
      }

      const result = await updateAdminAccountAction({
        email: adminAuth.email,
        currentPassword,
        newPassword: trimmedNewPassword,
      });

      if (!result.success) {
        toast.error(result.error || "An error occurred while updating account credentials.");
        return;
      }

      if (result.auth) {
        setAdminAuth((current) => ({
          ...current,
          ...result.auth,
        }));
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(
        result.sessionsRotated
          ? "Account updated. Other devices have been signed out."
          : "Account settings updated successfully!"
      );
    } catch {
      toast.error("An error occurred while updating account credentials.");
    } finally {
      setIsSavingAccount(false);
    }
  };

  if (!auth) return null;

  return (
    <div className="space-y-6 w-full text-left pb-16 font-sans">
      
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
                    maxLength={PASSWORD_MAX_LENGTH}
                    onChange={(e) => setNewPassword(e.target.value.slice(0, PASSWORD_MAX_LENGTH))}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-semibold transition-all"
                    placeholder="8-16 characters"
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
                    maxLength={PASSWORD_MAX_LENGTH}
                    onChange={(e) => setConfirmPassword(e.target.value.slice(0, PASSWORD_MAX_LENGTH))}
                    className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 font-semibold transition-all ${
                      isPasswordMismatch
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : isPasswordMatch
                          ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                    placeholder="Re-type new password"
                    aria-invalid={isPasswordMismatch}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {isPasswordMismatch && (
                  <p className="text-[10px] font-bold text-red-500 px-0.5">Passwords do not match.</p>
                )}
                {isPasswordMatch && (
                  <p className="text-[10px] font-bold text-emerald-600 px-0.5">Passwords match.</p>
                )}
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


    </div>
  );
}
