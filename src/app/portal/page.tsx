"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { defaultPortalPageContent } from "@/app/admin/(dashboard)/portal-page/page";

interface UserProfile {
  name: string;
  clientId: string;
  planName: string;
  speed: string;
  status: "Active" | "Expired" | "Suspended";
  dueAmount: number;
  dueDate: string;
  rxPower: string;
  uptime: string;
}

export default function Portal() {
  const [pageContent, setPageContent] = React.useState(defaultPortalPageContent);
  React.useEffect(() => {
    const s = localStorage.getItem("portal_page_content");
    if (s) {
      try { setPageContent(JSON.parse(s)); } catch { /* ignore */ }
    }
  }, []);

  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translatePlanName = (name: string) => {
    if (name === "Home Standard") return t(pageContent.str1En, pageContent.str1Bn);
    if (name === "Gamer Professional") return t(pageContent.str2En, pageContent.str2Bn);
    if (name === "Home Elite") return t(pageContent.str3En, pageContent.str3Bn);
    if (name.startsWith("Upgraded Pack")) {
      return name.replace("Upgraded Pack", t(pageContent.str4En, pageContent.str4Bn));
    }
    return name;
  };

  const translateStatus = (st: string) => {
    if (st === "Active") return t(pageContent.str5En, pageContent.str5Bn);
    if (st === "Expired") return t(pageContent.str6En, pageContent.str6Bn);
    if (st === "Suspended") return t(pageContent.str7En, pageContent.str7Bn);
    return st;
  };

  const translateUptime = (up: string) => {
    return up
      .replace("Days", t(pageContent.str8En, pageContent.str8Bn))
      .replace("Hours", t(pageContent.str9En, pageContent.str9Bn));
  };

  const translateDueDate = (date: string) => {
    if (date.includes("July")) {
      return date.replace("July", t(pageContent.str10En, pageContent.str10Bn));
    }
    return date;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Simulated live graph data
  const [liveDownload, setLiveDownload] = useState(14.8);
  const [liveUpload, setLiveUpload] = useState(4.2);

  // Upgrade Plan state
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState("30 Mbps");

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const mockUsers: Record<string, UserProfile> = {
    "man-5432": {
      name: "Kamrul Hasan",
      clientId: "MAN-5432",
      planName: "Gamer Professional",
      speed: "40 Mbps",
      status: "Active",
      dueAmount: 1250,
      dueDate: "05 July 2026",
      rxPower: "-19.1 dBm",
      uptime: "14 Days, 6 Hours",
    },
    "man-9988": {
      name: "Mehan Ahmed",
      clientId: "MAN-9988",
      planName: "Home Standard",
      speed: "20 Mbps",
      status: "Active",
      dueAmount: 0,
      dueDate: "01 July 2026",
      rxPower: "-18.5 dBm",
      uptime: "3 Days, 12 Hours",
    },
  };

  // Simulate live usage counter
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      // Generate random fluctuating values around package speeds
      const maxSpeed = profile ? parseInt(profile.speed, 10) : 30;
      const download = (Math.random() * (maxSpeed - 2) + 2).toFixed(1);
      const upload = (Math.random() * (maxSpeed / 3) + 1).toFixed(1);
      setLiveDownload(parseFloat(download));
      setLiveUpload(parseFloat(upload));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoggedIn, profile]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoggingIn(true);

    setTimeout(() => {
      setLoggingIn(false);
      const idKey = clientId.toLowerCase().trim();
      
      if (mockUsers[idKey]) {
        setProfile(mockUsers[idKey]);
        setIsLoggedIn(true);
      } else {
        // Create a default subscriber profile if client ID doesn't exist
        if (idKey.startsWith("man-")) {
          const generatedProfile: UserProfile = {
            name: t(pageContent.str11En, pageContent.str11Bn),
            clientId: clientId.toUpperCase(),
            planName: "Home Elite",
            speed: "30 Mbps",
            status: "Active",
            dueAmount: 1000,
            dueDate: "10 July 2026",
            rxPower: "-19.5 dBm",
            uptime: "8 Days, 2 Hours",
          };
          setProfile(generatedProfile);
          setIsLoggedIn(true);
        } else {
          setErrorMsg(t(pageContent.str12En, pageContent.str12Bn));
        }
      }
    }, 1200);
  };

  const handleUpgradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpgrading(true);
    setTimeout(() => {
      setUpgrading(false);
      setUpgradeSuccess(true);
      if (profile) {
        setProfile({
          ...profile,
          speed: selectedUpgrade,
          planName: `Upgraded Pack (${selectedUpgrade})`,
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 grow flex flex-col justify-center text-left">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {!isLoggedIn ? (
        // Login View
        <div className="max-w-md mx-auto w-full text-left">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] mx-auto mb-4">
                M
              </div>
              <h2 className="text-2xl font-extrabold text-white">{t(pageContent.str13En, pageContent.str13Bn)}</h2>
              <p className="text-xs text-slate-400 mt-1">
                {t(pageContent.str14En, pageContent.str14Bn)}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t(pageContent.str15En, pageContent.str15Bn)}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MAN-5432"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t(pageContent.str16En, pageContent.str16Bn)}</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              {errorMsg && <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
              >
                {loggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    {t(pageContent.str17En, pageContent.str17Bn)}
                  </>
                ) : (
                  t(pageContent.str18En, pageContent.str18Bn)
                )}
              </button>
            </form>

            <div className="border-t border-brand-border/40 pt-4 text-center">
              <p className="text-xs text-slate-500">
                {t(pageContent.str19En, pageContent.str19Bn)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Authenticated Dashboard View
        <div className="space-y-8 text-left">
          {/* Dashboard Header Bar */}
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg text-left">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                {profile?.name.charAt(0)}
              </div>
              <div className="text-left">
                <h2 className="text-white font-extrabold text-xl">{profile?.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400 font-mono text-left">
                  <span>{t(pageContent.str15En, pageContent.str15Bn)}: {profile?.clientId}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {profile ? translateStatus(profile.status) : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-brand-border hover:bg-brand-border/80 border border-brand-border text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                {t(pageContent.str20En, pageContent.str20Bn)}
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: t(pageContent.str21En, pageContent.str21Bn), val: profile?.speed, desc: profile ? translatePlanName(profile.planName) : "", metric: t(pageContent.str22En, pageContent.str22Bn) },
              { title: t(pageContent.str23En, pageContent.str23Bn), val: profile?.rxPower, desc: t(pageContent.str24En, pageContent.str24Bn), metric: t(pageContent.str25En, pageContent.str25Bn) },
              { title: t(pageContent.str26En, pageContent.str26Bn), val: profile ? translateUptime(profile.uptime) : "", desc: t(pageContent.str27En, pageContent.str27Bn), metric: t(pageContent.str28En, pageContent.str28Bn) },
              { title: t(pageContent.str29En, pageContent.str29Bn), val: profile?.dueAmount ? `৳${profile.dueAmount} BDT` : t(pageContent.str30En, pageContent.str30Bn), desc: `${t(pageContent.str31En, pageContent.str31Bn)} ${profile ? translateDueDate(profile.dueDate) : ""}`, metric: t(pageContent.str32En, pageContent.str32Bn) },
            ].map((metric, i) => (
              <div key={i} className="glass-panel border-brand-border/40 p-6 rounded-2xl text-left">
                <span className="text-[10px] text-brand-cyan uppercase tracking-wider font-bold block mb-1">
                  {metric.metric}
                </span>
                <span className="text-white font-black text-xl sm:text-2xl block tracking-tight font-mono">
                  {metric.val}
                </span>
                <h4 className="text-xs text-slate-400 mt-2 font-semibold">{metric.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{metric.desc}</p>
              </div>
            ))}
          </div>

          {/* Core Analytics: Live Bandwidth Tracker and Upgrade Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Live Bandwidth usage graph (SVG) */}
            <div className="lg:col-span-8 glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[350px] text-left">
              <div className="flex justify-between items-center mb-6 text-left">
                <div className="text-left">
                  <h3 className="text-white font-extrabold text-lg">{t(pageContent.str33En, pageContent.str33Bn)}</h3>
                  <p className="text-xs text-slate-400">{t(pageContent.str34En, pageContent.str34Bn)}</p>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                    {t(pageContent.str35En, pageContent.str35Bn)} {liveDownload} Mbps
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-blue">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                    {t(pageContent.str36En, pageContent.str36Bn)} {liveUpload} Mbps
                  </span>
                </div>
              </div>

              {/* Dynamic Wave Chart SVG */}
              <div className="w-full grow flex items-end justify-center py-6 relative text-left">
                <svg className="w-full h-48" viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Download curve */}
                  <path
                    d={`M0 80 Q 80 ${100 - liveDownload * 1.8} 160 ${70 + liveDownload * 0.5} T 320 ${90 - liveDownload * 1.2} T 500 ${100 - liveDownload * 2}`}
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="3"
                    className="transition-all duration-1000 ease-in-out text-glow"
                  />
                  <path
                    d={`M0 80 Q 80 ${100 - liveDownload * 1.8} 160 ${70 + liveDownload * 0.5} T 320 ${90 - liveDownload * 1.2} T 500 ${100 - liveDownload * 2} L 500 100 L 0 100 Z`}
                    fill="url(#cyan-glow)"
                    className="transition-all duration-1000 ease-in-out opacity-10"
                  />

                  {/* Upload curve */}
                  <path
                    d={`M0 90 Q 70 ${100 - liveUpload * 5} 140 ${85 + liveUpload * 1} T 280 ${95 - liveUpload * 4} T 500 ${100 - liveUpload * 6}`}
                    fill="none"
                    stroke="#0072ff"
                    strokeWidth="2"
                    className="transition-all duration-1000 ease-in-out"
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="cyan-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" />
                      <stop offset="100%" stopColor="#070b19" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Simulated live grid line indicators */}
                <div className="absolute inset-0 border-b border-brand-border/40 pointer-events-none flex flex-col justify-between">
                  <div className="border-b border-brand-border/20 w-full h-0 text-[8px] text-slate-600 font-mono text-left pl-2">{t(pageContent.str37En, pageContent.str37Bn)}</div>
                  <div className="border-b border-brand-border/20 w-full h-0 text-[8px] text-slate-600 font-mono text-left pl-2">{t(pageContent.str38En, pageContent.str38Bn)}</div>
                  <div className="w-full text-[8px] text-slate-600 font-mono text-left pl-2">{t(pageContent.str39En, pageContent.str39Bn)}</div>
                </div>
              </div>

              <div className="border-t border-brand-border/40 pt-4 flex justify-between items-center text-xs text-slate-400 text-left">
                <span>{t(pageContent.str40En, pageContent.str40Bn)}</span>
                <span>{t(pageContent.str41En, pageContent.str41Bn)}</span>
              </div>
            </div>

            {/* Upgrade & Actions Panel */}
            <div className="lg:col-span-4 space-y-6 text-left">
              {/* Billing Quick link */}
              {profile && profile.dueAmount > 0 && (
                <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/25 flex flex-col gap-4 text-left">
                  <div>
                    <h3 className="text-white font-bold text-base">{t(pageContent.str42En, pageContent.str42Bn)}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {t(pageContent.str43En, pageContent.str43Bn)} <span className="text-amber-400 font-bold font-mono">৳{profile.dueAmount} BDT</span> {t(pageContent.str44En, pageContent.str44Bn)}
                    </p>
                  </div>
                  <Link
                    href={`/bill-payment?id=${profile.clientId}`}
                    className="w-full text-center bg-linear-to-r from-amber-500 to-amber-600 text-brand-dark py-2.5 rounded-xl font-bold text-xs shadow-md transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    {t(pageContent.str45En, pageContent.str45Bn)}
                  </Link>
                </div>
              )}

              {/* Interactive Upgrade Panel */}
              <div className="glass-panel border-brand-border/60 rounded-3xl p-6 text-left space-y-5">
                {!upgradeSuccess ? (
                  <form onSubmit={handleUpgradeSubmit} className="space-y-4 text-left">
                    <div>
                      <h3 className="text-white font-bold text-base">{t(pageContent.str46En, pageContent.str46Bn)}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {t(pageContent.str47En, pageContent.str47Bn)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider text-left">{t(pageContent.str48En, pageContent.str48Bn)}</label>
                      <select
                        value={selectedUpgrade}
                        onChange={(e) => setSelectedUpgrade(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="30 Mbps" className="bg-brand-card">{t(pageContent.str49En, pageContent.str49Bn)}</option>
                        <option value="50 Mbps" className="bg-brand-card">{t(pageContent.str50En, pageContent.str50Bn)}</option>
                        <option value="60 Mbps" className="bg-brand-card">{t(pageContent.str51En, pageContent.str51Bn)}</option>
                        <option value="100 Mbps" className="bg-brand-card">{t(pageContent.str52En, pageContent.str52Bn)}</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={upgrading}
                      className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {upgrading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          {t(pageContent.str53En, pageContent.str53Bn)}
                        </>
                      ) : (
                        t(pageContent.str54En, pageContent.str54Bn)
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">{t(pageContent.str55En, pageContent.str55Bn)}</h4>
                      <p className="text-xs text-slate-400">
                        {t(pageContent.str56En, pageContent.str56Bn)}{" "}
                        <span className="text-brand-cyan font-bold font-mono">{profile?.speed}</span>.
                      </p>
                    </div>
                    <button
                      onClick={() => setUpgradeSuccess(false)}
                      className="px-4 py-2 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {t(pageContent.str57En, pageContent.str57Bn)}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

