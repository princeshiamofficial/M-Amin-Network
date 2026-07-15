"use client";
import { toast } from "sonner";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { verifyAdminLoginAction, requestPasswordResetAction, resetPasswordAction, getSetting } from "@/actions/content";

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [siteLogo, setSiteLogo] = useState<string>("/logo.png");

  useEffect(() => {
    getSetting("site_logo").then(savedLogo => {
      if (savedLogo && typeof savedLogo === 'object' && 'url' in savedLogo) {
        setSiteLogo((savedLogo as { url: string }).url);
      }
    });
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot password views & states
  const [authView, setAuthView] = useState<"login" | "forgot" | "reset">("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth === "true") {
          localStorage.setItem("admin_token", "admin_logged_in_token");
          setIsAuthenticated(true);
          router.push("/admin/dashboard");
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const result = await verifyAdminLoginAction(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        setLoginError("");
        sessionStorage.setItem("admin_authenticated", "true");
        localStorage.setItem("admin_token", "admin_logged_in_token");
        localStorage.setItem("admin_username", result.username || "admin");
        localStorage.setItem("admin_user_role", result.role || "Super Administrator");
        router.push("/admin/dashboard");
      } else {
        setLoginError(result.error || "Invalid username or password. Please try again.");
      }
    } catch {
      setLoginError("An error occurred while verifying credentials.");
    }
    setIsLoggingIn(false);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    try {
      const res = await requestPasswordResetAction(forgotEmail);
      if (res.success && res.code) {
        setGeneratedCode(res.code);
        toast.success(`Verification code: ${res.code}`, {
          duration: 10000,
        });
        setAuthView("reset");
      } else {
        setLoginError(res.error || "Failed to find account.");
      }
    } catch {
      setLoginError("An error occurred. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");

    if (resetCode.trim() !== generatedCode) {
      setLoginError("Invalid verification code. Please enter the correct code.");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setLoginError("Passwords do not match. Please verify.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await resetPasswordAction(forgotEmail, newPassword);
      if (res.success) {
        toast.success("Password reset successfully! You can now log in.");
        setAuthView("login");
        setForgotEmail("");
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
        setGeneratedCode("");
      } else {
        setLoginError(res.error || "Password reset failed.");
      }
    } catch {
      setLoginError("Failed to update password. Try again.");
    }
    setIsSubmitting(false);
  };


  if (!mounted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-brand-dark text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest">LOADING SECURE ACCESS CONTROL...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen -mt-24 w-full flex flex-col justify-center items-center p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat font-sans"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10, 11, 16, 0.82), rgba(20, 24, 33, 0.95)), url('/sky_cloud_bg.png')"
        }}
      >
        {/* Background Decorative Arcs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg className="w-[850px] h-[850px] text-brand-cyan opacity-25" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="400" cy="400" r="160" strokeOpacity="0.3" />
            <circle cx="400" cy="400" r="260" strokeOpacity="0.22" />
            <circle cx="400" cy="400" r="360" strokeOpacity="0.15" />
            <circle cx="400" cy="400" r="460" strokeOpacity="0.09" />
          </svg>
        </div>

        {/* Top-left logo: M-Amin Network */}
        <div className="absolute top-6 left-6 flex items-center z-20">
          <Image
            src={siteLogo}
            alt="M-Amin Network"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
            priority
          />
        </div>

        {/* Back Link (Top Right) */}
        <div className="absolute top-6 right-6 z-20">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            ← Back to Website
          </Link>
        </div>

        {/* Login Card Container */}
        <div className="max-w-[400px] w-full bg-white/75 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 relative z-10 text-left space-y-6 backdrop-blur-xl">
          {/* Top Login Icon Box */}
          <div className="w-14 h-14 bg-white border border-white/90 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center mx-auto mb-4 rounded-2xl overflow-hidden p-2">
            <Image
              src={siteLogo}
              alt="M-Amin Network"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>

          {authView === "login" && (
            <>
              <div className="text-center space-y-1.5">
                <h2 className="text-[#111113] font-black text-[22px] tracking-tight text-center w-full block">Admin Portal Sign In</h2>
                <p className="text-[#4b5563] text-xs font-medium leading-relaxed px-2 text-center w-full block">
                  Access the administrative console to manage client databases, payments, and system alerts.
                </p>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex gap-2 items-center">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01M5.071 19a9 9 0 1112.728 0m-12.728 0h12.728" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>

                {/* Password Field */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-11 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.893 7.893L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("forgot");
                      setLoginError("");
                    }}
                    className="text-[11px] text-[#4b5563] font-bold hover:text-[#111113] transition-colors hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Get Started Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#1f2025] hover:bg-[#111113] active:scale-[0.985] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(31,32,37,0.15)] flex justify-center items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? "Logging in..." : "Get Started"}
                </button>
              </form>
            </>
          )}

          {authView === "forgot" && (
            <>
              <div className="text-center space-y-1.5">
                <h2 className="text-[#111113] font-black text-[22px] tracking-tight text-center w-full block">Forgot Password</h2>
                <p className="text-[#4b5563] text-xs font-medium leading-relaxed px-2 text-center w-full block">
                  Enter your registered administrator email to receive a password reset verification code.
                </p>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex gap-2 items-center">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01M5.071 19a9 9 0 1112.728 0m-12.728 0h12.728" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleRequestReset} className="space-y-4">
                {/* Email input */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Registered Email Address"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1f2025] hover:bg-[#111113] active:scale-[0.985] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(31,32,37,0.15)] flex justify-center items-center cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? "Requesting..." : "Send Verification Code"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("login");
                      setLoginError("");
                    }}
                    className="text-xs text-brand-blue font-bold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            </>
          )}

          {authView === "reset" && (
            <>
              <div className="text-center space-y-1.5">
                <h2 className="text-[#111113] font-black text-[22px] tracking-tight text-center w-full block">Reset Password</h2>
                <p className="text-[#4b5563] text-xs font-medium leading-relaxed px-2 text-center w-full block">
                  Enter the code and set your new administrative password.
                </p>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex gap-2 items-center">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01M5.071 19a9 9 0 1112.728 0m-12.728 0h12.728" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* Code Field */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 30v-3.75" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="6-Digit Reset Code"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-mono font-bold tracking-widest text-center"
                  />
                </div>

                {/* Password Fields */}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full bg-[#f3f4f6]/50 border border-[#e5e7eb]/45 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-slate-350 focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1f2025] hover:bg-[#111113] active:scale-[0.985] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(31,32,37,0.15)] flex justify-center items-center cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("login");
                      setLoginError("");
                    }}
                    className="text-xs text-brand-blue font-bold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="border-t border-slate-200 grow" />
            <span className="text-[10px] text-[#8c94a0] font-black tracking-widest uppercase font-sans">Or sign in with</span>
            <div className="border-t border-slate-200 grow" />
          </div>

          {/* Social Sign-In Grid */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl py-2.5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 15 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.96 3.07C6.43 7.37 9.01 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.82-.07-1.6-.21-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.46-5.02 3.46-8.73z" />
                <path fill="#FBBC05" d="M5.46 10.57c-.24-.72-.37-1.48-.37-2.27s.13-1.55.37-2.27L1.5 3.5C.54 5.41 0 7.56 0 9.8s.54 4.39 1.5 6.3l3.96-3.53z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.1.74-2.5 1.18-4.2 1.18-2.99 0-5.57-2.33-6.47-5.46L1.5 16.2C3.39 20.05 7.35 23 12 23z" />
              </svg>
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl py-2.5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white hover:bg-slate-50 border border-slate-200/70 rounded-xl py-2.5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4.5 h-4.5 text-black fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

