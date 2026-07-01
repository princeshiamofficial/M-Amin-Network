"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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
      name: "Tanvir Ahmed",
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
            name: "M. Amin Network Subscriber",
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
          setErrorMsg("Invalid Client ID. (Try 'MAN-5432' or 'MAN-9988', or start with 'MAN-')");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow flex flex-col justify-center">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {!isLoggedIn ? (
        // Login View
        <div className="max-w-md mx-auto w-full">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] mx-auto mb-4">
                M
              </div>
              <h2 className="text-2xl font-extrabold text-white">Client Self-Care</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your subscription credentials to manage your line
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Client ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MAN-5432"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Portal Password</label>
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
                className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
              >
                {loggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    Authenticating Subscriber...
                  </>
                ) : (
                  "Access Client Dashboard"
                )}
              </button>
            </form>

            <div className="border-t border-brand-border/40 pt-4 text-center">
              <p className="text-xs text-slate-500">
                Forget your password or looking for Client ID? Contact our support desk at +8801707009267
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Authenticated Dashboard View
        <div className="space-y-8 text-left">
          {/* Dashboard Header Bar */}
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                {profile?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-white font-extrabold text-xl">{profile?.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                  <span>Client ID: {profile?.clientId}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {profile?.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-brand-border hover:bg-brand-border/80 border border-brand-border text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Allocated Bandwidth", val: profile?.speed, desc: profile?.planName, metric: "Speed Target" },
              { title: "ONT Optical Power", val: profile?.rxPower, desc: "Healthy range: -15 to -25 dBm", metric: "Signal Status" },
              { title: "Line Connection Uptime", val: profile?.uptime, desc: "BGP Auto-Re-routing enabled", metric: "Uptime" },
              { title: "Billing Invoice Dues", val: profile?.dueAmount ? `৳${profile.dueAmount} BDT` : "Paid in Full", desc: `Next cycle due: ${profile?.dueDate}`, metric: "Invoice status" },
            ].map((metric, i) => (
              <div key={i} className="glass-panel border-brand-border/40 p-6 rounded-2xl">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Live Bandwidth usage graph (SVG) */}
            <div className="lg:col-span-8 glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[350px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white font-extrabold text-lg">Real-Time Bandwidth Usage</h3>
                  <p className="text-xs text-slate-400">Live throughput graphs updating every 2 seconds</p>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                    Download: {liveDownload} Mbps
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-blue">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                    Upload: {liveUpload} Mbps
                  </span>
                </div>
              </div>

              {/* Dynamic Wave Chart SVG */}
              <div className="w-full flex-grow flex items-end justify-center py-6 relative">
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
                  <div className="border-b border-brand-border/20 w-full h-0 text-[8px] text-slate-600 font-mono text-left pl-2">Peak Cap</div>
                  <div className="border-b border-brand-border/20 w-full h-0 text-[8px] text-slate-600 font-mono text-left pl-2">Median</div>
                  <div className="w-full text-[8px] text-slate-600 font-mono text-left pl-2">Idle</div>
                </div>
              </div>

              <div className="border-t border-brand-border/40 pt-4 flex justify-between items-center text-xs text-slate-400">
                <span>Direct Peering: Google GGC, Facebook FNA, BDIX, Torrents Caches</span>
                <span>AS150164 BGP Uplink</span>
              </div>
            </div>

            {/* Upgrade & Actions Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Billing Quick link */}
              {profile && profile.dueAmount > 0 && (
                <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/25 flex flex-col gap-4 text-left">
                  <div>
                    <h3 className="text-white font-bold text-base">Payment Overdue</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      An invoice of <span className="text-amber-400 font-bold font-mono">৳{profile.dueAmount} BDT</span> remains unpaid for this cycle.
                    </p>
                  </div>
                  <Link
                    href={`/bill-payment?id=${profile.clientId}`}
                    className="w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-brand-dark py-2.5 rounded-xl font-bold text-xs shadow-md transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    Quick Pay Bill
                  </Link>
                </div>
              )}

              {/* Interactive Upgrade Panel */}
              <div className="glass-panel border-brand-border/60 rounded-3xl p-6 text-left space-y-5">
                {!upgradeSuccess ? (
                  <form onSubmit={handleUpgradeSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-white font-bold text-base">Speed Upgrade Center</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Select a target package speed to dynamically request line profile updates.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Choose Speed</label>
                      <select
                        value={selectedUpgrade}
                        onChange={(e) => setSelectedUpgrade(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="30 Mbps">30 Mbps Gamer (৳1000/mo)</option>
                        <option value="50 Mbps">50 Mbps Ultra (৳1500/mo)</option>
                        <option value="60 Mbps">60 Mbps Gamer Pro (৳1800/mo)</option>
                        <option value="100 Mbps">100 Mbps SOHO (৳2500/mo)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={upgrading}
                      className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {upgrading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          Upgrading Port Speed...
                        </>
                      ) : (
                        "Request Speed Upgrade"
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
                      <h4 className="text-white font-bold text-sm">Port Speed Updated!</h4>
                      <p className="text-xs text-slate-400">
                        Line speed successfully provisioned to <span className="text-brand-cyan font-bold font-mono">{profile?.speed}</span>.
                      </p>
                    </div>
                    <button
                      onClick={() => setUpgradeSuccess(false)}
                      className="px-4 py-2 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      OK
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
