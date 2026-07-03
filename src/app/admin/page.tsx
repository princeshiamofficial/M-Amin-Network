"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Claim {
  id: string;
  name: string;
  phone: string;
  address: string;
  promoCode: string;
  promoTitle: string;
  date: string;
  status: "Pending" | "Approved" | "Cancelled";
}

interface Complaint {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
  status: "Pending" | "Investigating" | "Resolved";
}

interface Ticket {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
  status: "Open" | "Assigned" | "Resolved";
}

interface Payment {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  planName: string;
  speed: string;
  amount: number;
  gateway: string;
  date: string;
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "claims" | "tickets" | "complaints" | "payments" | "config">("overview");

  // Database states
  const [claims, setClaims] = useState<Claim[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // System stats mockup states
  const [activeClients, setActiveClients] = useState(1482);
  const [networkUptime, setNetworkUptime] = useState("99.98%");
  const [totalBandwidthGbps, setTotalBandwidthGbps] = useState(4.2);

  const defaultClaims: Claim[] = [
    {
      id: "CLM-72648-2849",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      address: "House 12, Road 4, Kadomtoli, South Keraniganj",
      promoCode: "ANNUAL10",
      promoTitle: "Pay 10 Months, Get 12",
      date: "7/2/2026, 11:34 AM",
      status: "Pending",
    },
    {
      id: "CLM-19472-8829",
      name: "Nasrin Sultana",
      phone: "01819284920",
      address: "Block C, Bashundhara R/A, South Keraniganj",
      promoCode: "FREEINSTALL2026",
      promoTitle: "Zero Installation Fee",
      date: "7/2/2026, 2:15 PM",
      status: "Approved",
    },
  ];

  const defaultComplaints: Complaint[] = [
    {
      id: "CMP-88239-1102",
      clientId: "MAN-5432",
      name: "Kamrul Hasan",
      phone: "01707009267",
      category: "Frequent Disconnections",
      desc: "Signal drops every time it rains. Optical link patch cable light changes to red.",
      date: "7/2/2026, 10:10 AM",
      status: "Pending",
    },
    {
      id: "CMP-54211-9238",
      clientId: "MAN-2244",
      name: "Rahim Uddin",
      phone: "01552394829",
      category: "Speed Not Matching Pack",
      desc: "Subscribed to 30Mbps Gamer Pack but getting only 5Mbps on speedtest. Net is sluggish.",
      date: "7/1/2026, 4:30 PM",
      status: "Investigating",
    },
  ];

  const defaultTickets: Ticket[] = [
    {
      id: "TKT-29384-9988",
      clientId: "MAN-9988",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      category: "Physical Cable Broken",
      desc: "Cable got cut by construction workers near Kadomtoli intersection.",
      date: "7/2/2026, 9:20 AM",
      status: "Open",
    },
    {
      id: "TKT-11234-8844",
      clientId: "MAN-1199",
      name: "Sheikh Nabil",
      phone: "01911928392",
      category: "Billing Issue",
      desc: "Paid bill via Bkash portal, but account still shows inactive.",
      date: "7/2/2026, 3:45 PM",
      status: "Resolved",
    },
  ];

  const defaultPayments: Payment[] = [
    {
      id: "TXN-BKASH-38291-92839",
      clientId: "MAN-5432",
      name: "Kamrul Hasan",
      phone: "01707009267",
      planName: "Gamer Professional",
      speed: "40 Mbps",
      amount: 1250,
      gateway: "bkash",
      date: "7/2/2026, 5:00 PM",
    },
    {
      id: "TXN-CARD-11920-88392",
      clientId: "MAN-9988",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      planName: "Home Standard",
      speed: "20 Mbps",
      amount: 800,
      gateway: "card",
      date: "7/1/2026, 12:15 PM",
    },
  ];

  // Initialize and load database from localStorage
  const loadDatabase = () => {
    if (typeof window !== "undefined") {
      const storedClaims = localStorage.getItem("m_amin_claims");
      const storedComplaints = localStorage.getItem("m_amin_complaints");
      const storedTickets = localStorage.getItem("m_amin_tickets");
      const storedPayments = localStorage.getItem("m_amin_payments");

      if (storedClaims) {
        setClaims(JSON.parse(storedClaims));
      } else {
        localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
        setClaims(defaultClaims);
      }

      if (storedComplaints) {
        setComplaints(JSON.parse(storedComplaints));
      } else {
        localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
        setComplaints(defaultComplaints);
      }

      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      } else {
        localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
        setTickets(defaultTickets);
      }

      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      } else {
        localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
        setPayments(defaultPayments);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    loadDatabase();
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("m_amin_admin_authenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
    // Simulate minor fluctuational changes in bandwidth metric
    const interval = setInterval(() => {
      setTotalBandwidthGbps((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset the admin database to pre-populated mock data? All your custom entries will be lost.")) {
      localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
      localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
      localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
      localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
      loadDatabase();
    }
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to completely clear the local database?")) {
      localStorage.setItem("m_amin_claims", JSON.stringify([]));
      localStorage.setItem("m_amin_complaints", JSON.stringify([]));
      localStorage.setItem("m_amin_tickets", JSON.stringify([]));
      localStorage.setItem("m_amin_payments", JSON.stringify([]));
      setClaims([]);
      setComplaints([]);
      setTickets([]);
      setPayments([]);
    }
  };

  // Helper actions
  const updateClaimStatus = (id: string, status: "Pending" | "Approved" | "Cancelled") => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status } : c));
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const deleteClaim = (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const updateComplaintStatus = (id: string, status: "Pending" | "Investigating" | "Resolved") => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status } : c));
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const deleteComplaint = (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const updateTicketStatus = (id: string, status: "Open" | "Assigned" | "Resolved") => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status } : t));
    setTickets(updated);
    localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };

  const deleteTicket = (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };

  const deletePayment = (id: string) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
    localStorage.setItem("m_amin_payments", JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("m_amin_admin_authenticated", "true");
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("m_amin_admin_authenticated");
    setUsername("");
    setPassword("");
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
      <div className="min-h-screen -mt-24 bg-brand-dark flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

        {/* Back Link */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to M-Amin Network
          </Link>
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center font-bold text-brand-dark text-xl shadow-lg shadow-brand-cyan/15 mx-auto">
              AM
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Portal Access</h2>
            <p className="text-xs text-slate-400">Operations Control Panel Authentication</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex gap-2 items-center">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-350 font-bold uppercase tracking-wider">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-350 font-bold uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center cursor-pointer mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Demo helper banner */}
          <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-3.5 text-xs text-slate-400 leading-normal text-center">
            <span className="text-[10px] bg-brand-cyan/15 text-brand-cyan font-bold tracking-wider px-1.5 py-0.5 rounded border border-brand-cyan/25 uppercase inline-block mb-1.5">Demo credentials</span>
            <div className="font-mono text-[11px] text-slate-300">
              User: <span className="text-brand-cyan font-bold">admin</span> | Pass: <span className="text-brand-cyan font-bold">admin123</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingClaimsCount = claims.filter((c) => c.status === "Pending").length;
  const activeTicketsCount = tickets.filter((t) => t.status !== "Resolved").length;
  const activeComplaintsCount = complaints.filter((c) => c.status !== "Resolved").length;

  return (
    <div className="min-h-screen -mt-24 bg-brand-dark text-slate-100 flex flex-col">
      {/* Top Banner Dashboard Nav */}
      <div className="bg-brand-card/90 border-b border-brand-border/60 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center font-bold text-brand-dark text-lg shadow-lg shadow-brand-cyan/10">
              AM
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wider text-white">M-AMIN NETWORK</h1>
              <span className="text-[10px] text-brand-cyan font-mono font-bold tracking-widest uppercase">
                Operations Administration Console
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 border border-brand-border hover:border-brand-cyan/40 hover:bg-brand-border/40 text-slate-355 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              ← Back to Website
            </Link>
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 bg-brand-blue/15 hover:bg-brand-blue/30 text-brand-cyan border border-brand-cyan/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Reset Mock DB
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500/30 hover:border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="glass-panel border-brand-border/65 rounded-3xl p-5 space-y-2 sticky top-24 shadow-xl">
            <div className="pb-3 border-b border-brand-border/40 mb-3 px-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Admin Panel</span>
              <span className="text-xs text-slate-300 font-mono">AS150164 Network</span>
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>📊 Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("claims")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "claims"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>🎁 Connection Claims</span>
              {pendingClaimsCount > 0 && (
                <span className="bg-brand-cyan text-brand-dark px-2 py-0.5 rounded-full text-[10px] font-black">
                  {pendingClaimsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("tickets")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "tickets"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>🛠️ Support Tickets</span>
              {activeTicketsCount > 0 && (
                <span className="bg-amber-400 text-brand-dark px-2 py-0.5 rounded-full text-[10px] font-black">
                  {activeTicketsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("complaints")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "complaints"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>⚖️ Formal Complaints</span>
              {activeComplaintsCount > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                  {activeComplaintsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "payments"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>💳 Quick Payments</span>
            </button>

            <button
              onClick={() => setActiveTab("config")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "config"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-brand-border/40"
              }`}
            >
              <span>⚙️ System Configuration</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-grow min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 shadow-lg flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Clients (Sim)</span>
                  <span className="text-3xl font-extrabold text-white mt-2">{activeClients}</span>
                  <span className="text-xs text-emerald-400 font-bold mt-1">● Online across Keraniganj</span>
                </div>

                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 shadow-lg flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Bandwidth</span>
                  <span className="text-3xl font-extrabold text-brand-cyan mt-2">{totalBandwidthGbps} Gbps</span>
                  <span className="text-xs text-slate-400 mt-1">Simulated Live Traffic (AS150164)</span>
                </div>

                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 shadow-lg flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Gateway SLA</span>
                  <span className="text-3xl font-extrabold text-white mt-2">{networkUptime}</span>
                  <span className="text-xs text-emerald-400 font-bold mt-1">● Optimal signaling metrics</span>
                </div>

                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 shadow-lg flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Revenue</span>
                  <span className="text-3xl font-extrabold text-emerald-400 mt-2">৳{totalRevenue} BDT</span>
                  <span className="text-xs text-slate-400 mt-1">Processed from {payments.length} transactions</span>
                </div>
              </div>

              {/* Graphic Visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SVG Revenue Graph */}
                <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-lg space-y-4">
                  <div>
                    <h3 className="text-white font-extrabold text-sm tracking-wide">Processed Revenue Trend</h3>
                    <p className="text-[11px] text-slate-450 mt-0.5">Mock analytics (past 6 months in BDT)</p>
                  </div>
                  <div className="w-full h-48 bg-brand-dark/40 rounded-2xl flex items-end justify-center p-3 relative border border-brand-border/40 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#0072ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />

                      {/* Line chart fill */}
                      <path
                        d="M0,90 Q50,75 100,80 T200,45 T300,25 L300,100 L0,100 Z"
                        fill="url(#gradient-chart)"
                      />
                      {/* Chart Stroke */}
                      <path
                        d="M0,90 Q50,75 100,80 T200,45 T300,25"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                      {/* Key Points */}
                      <circle cx="100" cy="80" r="3" fill="#00f0ff" />
                      <circle cx="200" cy="45" r="3" fill="#0072ff" />
                      <circle cx="300" cy="25" r="3" fill="#ffffff" />
                    </svg>
                    {/* Month labels */}
                    <div className="absolute bottom-1.5 inset-x-4 flex justify-between text-[8px] text-slate-500 font-mono uppercase">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun/Jul</span>
                    </div>
                  </div>
                </div>

                {/* SFP Signal power distribution */}
                <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-lg space-y-4">
                  <div>
                    <h3 className="text-white font-extrabold text-sm tracking-wide">GPON Signal Health (SFP Metrics)</h3>
                    <p className="text-[11px] text-slate-455 mt-0.5">Distribution of subscriber ONT receiving power</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Optimal (-16 to -22 dBm)</span>
                        <span className="text-emerald-400 font-bold">94.8%</span>
                      </div>
                      <div className="w-full h-2.5 bg-brand-dark border border-brand-border/60 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-50 rounded-full" style={{ width: "94.8%" }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Acceptable (-23 to -26 dBm)</span>
                        <span className="text-yellow-400 font-bold">4.2%</span>
                      </div>
                      <div className="w-full h-2.5 bg-brand-dark border border-brand-border/60 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "4.2%" }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Critical Signal drop (&gt; -27 dBm)</span>
                        <span className="text-red-400 font-bold">1.0%</span>
                      </div>
                      <div className="w-full h-2.5 bg-brand-dark border border-brand-border/60 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "1.0%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Queues quick summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Claims Summary */}
                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold text-sm">Recent Deal Claims</h3>
                    <button onClick={() => setActiveTab("claims")} className="text-[10px] text-brand-cyan font-bold hover:underline">
                      Manage All →
                    </button>
                  </div>
                  <div className="divide-y divide-brand-border/30 max-h-40 overflow-y-auto pr-1">
                    {claims.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No active promo claims found.</p>
                    ) : (
                      claims.slice(0, 3).map((c) => (
                        <div key={c.id} className="py-2.5 flex justify-between items-center gap-2">
                          <div>
                            <span className="text-xs font-bold text-white block">{c.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{c.promoCode} | {c.phone}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            c.status === "Approved" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
                            c.status === "Cancelled" ? "bg-slate-500/10 border border-slate-500/30 text-slate-400" :
                            "bg-amber-400/10 border border-amber-400/30 text-amber-400 animate-pulse"
                          }`}>
                            {c.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Support Tickets Summary */}
                <div className="glass-panel border-brand-border/60 rounded-3xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold text-sm">Active Support Tickets</h3>
                    <button onClick={() => setActiveTab("tickets")} className="text-[10px] text-brand-cyan font-bold hover:underline">
                      Manage All →
                    </button>
                  </div>
                  <div className="divide-y divide-brand-border/30 max-h-40 overflow-y-auto pr-1">
                    {tickets.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No active tickets found.</p>
                    ) : (
                      tickets.slice(0, 3).map((t) => (
                        <div key={t.id} className="py-2.5 flex justify-between items-center gap-2">
                          <div>
                            <span className="text-xs font-bold text-white block">{t.name} ({t.clientId})</span>
                            <span className="text-[10px] text-slate-400">{t.category}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            t.status === "Resolved" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
                            t.status === "Assigned" ? "bg-blue-500/10 border border-blue-500/30 text-blue-400" :
                            "bg-amber-400/10 border border-amber-400/30 text-amber-400"
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONNECTION CLAIMS */}
          {activeTab === "claims" && (
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Connection Claims & Reservations</h2>
                  <p className="text-xs text-slate-400 mt-1">Manage connection bookings claimed by clients via the offers page.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan w-full sm:w-44"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-slate-350 cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/40 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3">Client Details</th>
                      <th className="pb-3">Address</th>
                      <th className="pb-3">Promo code</th>
                      <th className="pb-3">Claim Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                    {claims
                      .filter((c) => {
                        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm);
                        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-brand-border/10 transition-colors">
                          <td className="py-4">
                            <span className="font-bold text-white block">{c.name}</span>
                            <span className="text-slate-400 font-mono block mt-0.5">{c.phone}</span>
                            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{c.id}</span>
                          </td>
                          <td className="py-4 max-w-[180px] text-slate-300 leading-normal pr-4">{c.address}</td>
                          <td className="py-4 font-mono font-bold">
                            <span className="text-brand-cyan block">{c.promoCode}</span>
                            <span className="text-[10px] text-slate-500 font-sans font-medium block mt-0.5">{c.promoTitle}</span>
                          </td>
                          <td className="py-4 text-slate-400">{c.date}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              c.status === "Approved" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                              c.status === "Cancelled" ? "bg-slate-500/10 border-slate-500/30 text-slate-400" :
                              "bg-amber-400/10 border-amber-400/30 text-amber-400"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                            {c.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateClaimStatus(c.id, "Approved")}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateClaimStatus(c.id, "Cancelled")}
                                  className="bg-brand-border hover:bg-brand-border/80 text-slate-300 font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => deleteClaim(c.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete Claim Log"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    {claims.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-500 font-medium">
                          No connection claims found. Try claiming one on the Offers page or seeding mock database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SUPPORT TICKETS */}
          {activeTab === "tickets" && (
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Automated Support Tickets</h2>
                  <p className="text-xs text-slate-400 mt-1">Inspect routing, diagnostic errors, and field technician dispatch queue.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by client ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan w-full sm:w-48"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-slate-350 cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/40 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3">Ticket ID & Account</th>
                      <th className="pb-3">Subscriber</th>
                      <th className="pb-3">Issue Category</th>
                      <th className="pb-3">Detailed Description</th>
                      <th className="pb-3">Created</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                    {tickets
                      .filter((t) => {
                        const matchesSearch =
                          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === "All" || t.status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((t) => (
                        <tr key={t.id} className="hover:bg-brand-border/10 transition-colors">
                          <td className="py-4">
                            <span className="text-brand-cyan font-bold font-mono block">{t.id}</span>
                            <span className="bg-brand-dark border border-brand-border px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-300 inline-block mt-1 uppercase">
                              {t.clientId}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="font-bold text-white block">{t.name}</span>
                            <span className="text-slate-400 font-mono block mt-0.5">{t.phone}</span>
                          </td>
                          <td className="py-4 text-slate-300 font-medium">{t.category}</td>
                          <td className="py-4 max-w-[200px] text-slate-400 leading-relaxed pr-4">{t.desc}</td>
                          <td className="py-4 text-slate-400">{t.date}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              t.status === "Resolved" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                              t.status === "Assigned" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                              "bg-amber-400/10 border-amber-400/30 text-amber-400"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                            {t.status === "Open" && (
                              <button
                                onClick={() => updateTicketStatus(t.id, "Assigned")}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                Assign Team
                              </button>
                            )}
                            {t.status !== "Resolved" && (
                              <button
                                onClick={() => updateTicketStatus(t.id, "Resolved")}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => deleteTicket(t.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete Ticket"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                          No support tickets found. Create some in the Support Center page or seed database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLAINTS */}
          {activeTab === "complaints" && (
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Grievance & Complaint Audit Logs</h2>
                  <p className="text-xs text-slate-400 mt-1">Audit queues bypassing local engineers and reviewed under BTRC standards.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan w-full sm:w-44"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-slate-350 cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/40 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3">Complaint Ref</th>
                      <th className="pb-3">Account & Caller</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Incident details</th>
                      <th className="pb-3">Filed At</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                    {complaints
                      .filter((c) => {
                        const matchesSearch =
                          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-brand-border/10 transition-colors">
                          <td className="py-4">
                            <span className="text-amber-400 font-bold font-mono block">{c.id}</span>
                          </td>
                          <td className="py-4">
                            <span className="font-bold text-white block">{c.name}</span>
                            <span className="text-slate-400 block mt-0.5">Phone: {c.phone}</span>
                            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">ID: {c.clientId.toUpperCase()}</span>
                          </td>
                          <td className="py-4 text-slate-300 font-medium">{c.category}</td>
                          <td className="py-4 max-w-[200px] text-slate-400 leading-relaxed pr-4">{c.desc}</td>
                          <td className="py-4 text-slate-400">{c.date}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              c.status === "Resolved" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                              c.status === "Investigating" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                              "bg-red-500/10 border-red-500/30 text-red-400"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                            {c.status === "Pending" && (
                              <button
                                onClick={() => updateComplaintStatus(c.id, "Investigating")}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                Investigate
                              </button>
                            )}
                            {c.status !== "Resolved" && (
                              <button
                                onClick={() => updateComplaintStatus(c.id, "Resolved")}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => deleteComplaint(c.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete Complaint"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    {complaints.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                          No grievances registered. File some in the Complain Box page or seed database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: QUICK PAYMENTS */}
          {activeTab === "payments" && (
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Online Transaction Logs</h2>
                  <p className="text-xs text-slate-400 mt-1">Secure payment logs processed via local gateways (bKash, Nagad, etc.)</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by Txn ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan w-full sm:w-52"
                  />
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/40 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3">Transaction TxnID</th>
                      <th className="pb-3">Subscriber & Account</th>
                      <th className="pb-3">Assigned Plan & Speed</th>
                      <th className="pb-3">Gateway</th>
                      <th className="pb-3">Amount Received</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                    {payments
                      .filter((p) => {
                        return (
                          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.clientId.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                      })
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-brand-border/10 transition-colors">
                          <td className="py-4 font-mono text-brand-cyan font-bold">{p.id}</td>
                          <td className="py-4">
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-slate-400 font-mono block mt-0.5">{p.phone} | Account: {p.clientId.toUpperCase()}</span>
                          </td>
                          <td className="py-4">
                            <span className="text-slate-350 block">{p.planName}</span>
                            <span className="text-[10px] text-slate-500 block font-mono mt-0.5">{p.speed}</span>
                          </td>
                          <td className="py-4 font-mono font-bold text-slate-300 uppercase">{p.gateway}</td>
                          <td className="py-4 font-mono font-extrabold text-emerald-400">৳{p.amount} BDT</td>
                          <td className="py-4 text-slate-400">{p.date}</td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => deletePayment(p.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete Transaction Log"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                          No transactions recorded. Process a bill payment in the Bill Payment page or seed database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CONFIGURATION */}
          {activeTab === "config" && (
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-8 text-left">
              <div>
                <h2 className="text-xl font-extrabold text-white">System Configuration</h2>
                <p className="text-xs text-slate-400 mt-1">Configure virtual parameters, simulate client growth, or wipe the operations database.</p>
              </div>

              {/* Virtual configurations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-brand-border/30 pb-6">
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-sm">Simulated Live Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-400">Total Virtual Clients</label>
                      <input
                        type="number"
                        value={activeClients}
                        onChange={(e) => setActiveClients(Number(e.target.value))}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan w-full font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-400">Target Core Network Uptime</label>
                      <input
                        type="text"
                        value={networkUptime}
                        onChange={(e) => setNetworkUptime(e.target.value)}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan w-full font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold text-sm">AS150164 Global Gateways</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    M Amin Network runs a customized autonomous infrastructure. To override peering route links, configure routing metric tables, or inspect physical fiber splice reports, contact the system operations lead or check BTRC compliance forms.
                  </p>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-400">
                    <strong>Notice:</strong> Overriding routing metric queues changes localized speeds instantly.
                  </div>
                </div>
              </div>

              {/* Data actions */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-sm">Database Maintenance & Safety Wipes</h3>
                <p className="text-xs text-slate-400">Manage local state values for frontend demonstration. Resetting to defaults will populate standard sample bookings, tickets, and complaints.</p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={resetToDefaults}
                    className="px-5 py-3 bg-brand-blue text-brand-dark hover:opacity-95 font-bold rounded-xl text-xs transition-opacity cursor-pointer shadow-lg"
                  >
                    Reset Mock Database Seeds
                  </button>
                  <button
                    onClick={clearAllData}
                    className="px-5 py-3 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Wipe Database (Delete All Logs)
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
