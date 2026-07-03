"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

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

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // Database states
  const [claims, setClaims] = useState<Claim[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

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
      clientId: "SUB-88293",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      category: "Billing Dispute",
      desc: "Charged double for the standard premium plan subscription this month without notice.",
      date: "7/2/2026, 1:44 PM",
      status: "Pending",
    },
    {
      id: "CMP-38492-9903",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      category: "Frequent Disconnections",
      desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.",
      date: "7/2/2026, 4:50 PM",
      status: "Investigating",
    },
  ];

  const defaultTickets: Ticket[] = [
    {
      id: "TCK-19482-9902",
      clientId: "SUB-88293",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      category: "Hardware",
      desc: "ONU device power indicator is red, no optical signal received.",
      date: "7/2/2026, 3:12 PM",
      status: "Open",
    },
    {
      id: "TCK-88392-1209",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      category: "Line Issue",
      desc: "Broadband speeds capped at 5Mbps instead of the committed 30Mbps.",
      date: "7/2/2026, 5:30 PM",
      status: "Resolved",
    },
  ];

  const defaultPayments: Payment[] = [
    {
      id: "TXN-99883-29402",
      clientId: "SUB-88293",
      name: "Tanvir Ahmed",
      phone: "01707009267",
      planName: "Premium Home",
      speed: "30 Mbps",
      amount: 1250,
      gateway: "bKash",
      date: "7/2/2026, 12:30 PM",
    },
    {
      id: "TXN-12049-88392",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      planName: "Standard Starter",
      speed: "15 Mbps",
      amount: 800,
      gateway: "Nagad",
      date: "7/2/2026, 4:12 PM",
    },
  ];

  const defaultMessages: ContactMessage[] = [
    {
      id: "MSG-00192-2849",
      name: "Rashedul Karim",
      email: "rashed@gmail.com",
      phone: "01712345678",
      subject: "Corporate Pricing Query",
      message: "Please send corporate peering rates for a 100Mbps dedicated splice link in Aganagar.",
      date: "7/2/2026, 10:15 AM",
    },
  ];

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("m_amin_admin_authenticated");
      if (auth !== "true") {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
        loadDatabase();
      }
    }

    // Simulate minor fluctuational changes in bandwidth metric
    const interval = setInterval(() => {
      setTotalBandwidthGbps((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 4000);
    return () => clearInterval(interval);
  }, [router]);

  const loadDatabase = () => {
    if (typeof window === "undefined") return;

    const savedClaims = localStorage.getItem("m_amin_claims");
    if (savedClaims) {
      setClaims(JSON.parse(savedClaims));
    } else {
      localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
      setClaims(defaultClaims);
    }

    const savedComplaints = localStorage.getItem("m_amin_complaints");
    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    } else {
      localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
      setComplaints(defaultComplaints);
    }

    const savedTickets = localStorage.getItem("m_amin_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
      setTickets(defaultTickets);
    }

    const savedPayments = localStorage.getItem("m_amin_payments");
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
      setPayments(defaultPayments);
    }

    const savedMessages = localStorage.getItem("m_amin_contact_submissions");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify(defaultMessages));
      setMessages(defaultMessages);
    }
  };

  const resetToDefaults = () => {
    if (typeof window === "undefined") return;
    if (confirm("Are you sure you want to reset mock database to default seeded values?")) {
      localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
      localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
      localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
      localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify(defaultMessages));
      setClaims(defaultClaims);
      setComplaints(defaultComplaints);
      setTickets(defaultTickets);
      setPayments(defaultPayments);
      setMessages(defaultMessages);
      alert("Mock database has been reset successfully!");
    }
  };

  const clearAllData = () => {
    if (typeof window === "undefined") return;
    if (confirm("WARNING: Are you sure you want to delete all entries in the mock database? This cannot be undone.")) {
      localStorage.setItem("m_amin_claims", JSON.stringify([]));
      localStorage.setItem("m_amin_complaints", JSON.stringify([]));
      localStorage.setItem("m_amin_tickets", JSON.stringify([]));
      localStorage.setItem("m_amin_payments", JSON.stringify([]));
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify([]));
      setClaims([]);
      setComplaints([]);
      setTickets([]);
      setPayments([]);
      setMessages([]);
      alert("Mock database cleared successfully!");
    }
  };

  const updateClaimStatus = (id: string, newStatus: "Approved" | "Cancelled") => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const deleteClaim = (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const updateComplaintStatus = (id: string, newStatus: "Investigating" | "Resolved") => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const deleteComplaint = (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const updateTicketStatus = (id: string, newStatus: "Assigned" | "Resolved") => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
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

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("m_amin_contact_submissions", JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("m_amin_admin_authenticated");
    router.push("/admin");
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-brand-dark text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest">LOADING SECURE ACCESS CONTROL...</span>
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
    <div className="min-h-screen -mt-24 bg-brand-dark text-slate-100 flex overflow-hidden">
      {/* Reusable left sidebar component */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleLogout} />

      {/* Main Dynamic View Content Pane */}
      <main className="flex-1 h-screen flex flex-col bg-brand-dark/20 overflow-hidden">
        {/* Reusable Admin Top Navbar Component */}
        <AdminNavbar
          activeTab={activeTab}
          onResetDatabase={resetToDefaults}
          onSignOut={handleLogout}
        />

        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {/* 1. OVERVIEW VIEW */}
        {activeTab === "Overview" && (
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
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="#1e294b" strokeWidth="0.5" strokeDasharray="4" />

                    <path d="M0,90 Q50,75 100,80 T200,45 T300,25 L300,100 L0,100 Z" fill="url(#gradient-chart)" />
                    <path d="M0,90 Q50,75 100,80 T200,45 T300,25" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
                    <circle cx="100" cy="80" r="3" fill="#00f0ff" />
                    <circle cx="200" cy="45" r="3" fill="#0072ff" />
                    <circle cx="300" cy="25" r="3" fill="#ffffff" />
                  </svg>
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

            {/* Quick overview lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claims summary */}
              <div className="glass-panel border-brand-border/60 rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold text-sm">Recent Deal Claims</h3>
                  <button onClick={() => setActiveTab("Offers")} className="text-[10px] text-brand-cyan font-bold hover:underline">Manage All →</button>
                </div>
                <div className="divide-y divide-brand-border/30 max-h-40 overflow-y-auto pr-1">
                  {claims.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No active deal claims.</p>
                  ) : (
                    claims.slice(0, 3).map((c) => (
                      <div key={c.id} className="py-2.5 flex justify-between items-center gap-2">
                        <div>
                          <span className="text-xs font-bold text-white block">{c.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.promoCode} | {c.phone}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400">{c.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Tickets summary */}
              <div className="glass-panel border-brand-border/60 rounded-3xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold text-sm">Active Support Tickets</h3>
                  <button onClick={() => setActiveTab("Tickets")} className="text-[10px] text-brand-cyan font-bold hover:underline">Manage All →</button>
                </div>
                <div className="divide-y divide-brand-border/30 max-h-40 overflow-y-auto pr-1">
                  {tickets.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No active support tickets.</p>
                  ) : (
                    tickets.slice(0, 3).map((t) => (
                      <div key={t.id} className="py-2.5 flex justify-between items-center gap-2">
                        <div>
                          <span className="text-xs font-bold text-white block">{t.name} ({t.clientId})</span>
                          <span className="text-[10px] text-slate-400">{t.category}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400">{t.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PACKAGES VIEW */}
        {activeTab === "Packages" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Active Broadband Package Catalog</h2>
              <p className="text-xs text-slate-450 mt-1">Simulated consumer and business plans rendered across Southern Keraniganj.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Starter Lite", speed: "10 Mbps", price: "৳500/mo", type: "Standard" },
                { name: "Premium Home", speed: "30 Mbps", price: "৳1,250/mo", type: "Popular" },
                { name: "Enterprise Splice", speed: "100 Mbps", price: "৳5,000/mo", type: "Corporate" },
              ].map((p) => (
                <div key={p.name} className="glass-panel border-brand-border/50 rounded-2xl p-5 space-y-4">
                  <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest">{p.type}</span>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{p.name}</h3>
                    <p className="text-2xl font-black text-emerald-400 mt-1">{p.price}</p>
                  </div>
                  <div className="text-xs text-slate-400">
                    Capped Speed: <strong className="text-white">{p.speed}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. OFFERS VIEW */}
        {activeTab === "Offers" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-white">Connection Claims & Reservations</h2>
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
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Client Details</th>
                    <th className="pb-3">Address</th>
                    <th className="pb-3">Promo Code</th>
                    <th className="pb-3">Claim Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {claims.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">No connection deal claims found.</td>
                    </tr>
                  ) : (
                    claims
                      .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm))
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-brand-border/10 transition-colors">
                          <td className="py-3.5">
                            <span className="font-extrabold text-white block">{c.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{c.phone}</span>
                          </td>
                          <td className="py-3.5 text-slate-300">{c.address}</td>
                          <td className="py-3.5 font-semibold text-brand-cyan">{c.promoCode}</td>
                          <td className="py-3.5 text-slate-400">{c.date}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              c.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              c.status === "Cancelled" ? "bg-slate-500/10 text-slate-400 border border-slate-500/20" :
                              "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                            }`}>{c.status}</span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            {c.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateClaimStatus(c.id, "Approved")}
                                  className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 rounded-lg font-bold text-[10px] cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateClaimStatus(c.id, "Cancelled")}
                                  className="px-2.5 py-1 bg-slate-500/15 hover:bg-slate-500/25 border border-slate-500/30 text-slate-400 rounded-lg font-bold text-[10px] cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => deleteClaim(c.id)}
                              className="px-2.5 py-1 border border-brand-border hover:bg-red-500/10 hover:text-red-400 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. COVERAGE AREAS VIEW */}
        {activeTab === "Coverage Areas" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Coverage Sectors & Node Loads</h2>
              <p className="text-xs text-slate-450 mt-1">Interactive status mapping for Southern Keraniganj broadband cells.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "South Keraniganj", load: "84%", latency: "11ms", status: "Optimal" },
                { name: "Aganagar Central", load: "92%", latency: "14ms", status: "High Load" },
                { name: "Kadomtoli Splice Point", load: "45%", latency: "8ms", status: "Optimal" },
              ].map((c) => (
                <div key={c.name} className="glass-panel border-brand-border/50 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-extrabold text-white">{c.name}</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Node Load:</span>
                      <span className="text-white font-bold">{c.load}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Backbone Latency:</span>
                      <span className="text-brand-cyan font-bold">{c.latency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-bold ${c.status === "Optimal" ? "text-emerald-400" : "text-yellow-400"}`}>{c.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. APPLICATIONS VIEW */}
        {activeTab === "Applications" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Connection Applications</h2>
              <p className="text-xs text-slate-450 mt-1">Review raw connection reservations pending system verification.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Application ID</th>
                    <th className="pb-3">Client Details</th>
                    <th className="pb-3">Package Details</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {claims.map((c) => (
                    <tr key={c.id} className="hover:bg-brand-border/10 transition-colors">
                      <td className="py-3.5 font-bold font-mono text-brand-cyan">{c.id}</td>
                      <td className="py-3.5">
                        <span className="font-extrabold text-white block">{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.phone} | {c.address}</span>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-300">{c.promoTitle || "General Link Booking"}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0c1e35] text-white border border-brand-border/40">
                          {c.status === "Pending" ? "Verifying Address" : "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. CUSTOMERS VIEW */}
        {activeTab === "Customers" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Active Subscriber Accounts</h2>
              <p className="text-xs text-slate-450 mt-1">Simulated listing of active optical fiber subscribers (AS150164).</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Subscriber ID</th>
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Address</th>
                    <th className="pb-3">Signal Power</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {[
                    { id: "SUB-88293", name: "Tanvir Ahmed", address: "Kadomtoli, South Keraniganj", signal: "-19.2 dBm (Optimal)" },
                    { id: "SUB-19402", name: "Sheikh Nabil", address: "Aganagar Central, Dhaka", signal: "-24.1 dBm (Acceptable)" },
                    { id: "SUB-22839", name: "Nasrin Sultana", address: "Bashundhara R/A, South Keraniganj", signal: "-18.5 dBm (Optimal)" },
                  ].map((u) => (
                    <tr key={u.id} className="hover:bg-brand-border/10 transition-colors">
                      <td className="py-3.5 font-bold font-mono text-brand-cyan">{u.id}</td>
                      <td className="py-3.5 font-extrabold text-white">{u.name}</td>
                      <td className="py-3.5 text-slate-300">{u.address}</td>
                      <td className="py-3.5 font-semibold text-emerald-400">{u.signal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. BILLS VIEW */}
        {activeTab === "Bills" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Online Transaction Logs</h2>
              <p className="text-xs text-slate-400 mt-1">Audit customer payments received online through bKash, Nagad, and Cards.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Transaction ID</th>
                    <th className="pb-3">Subscriber</th>
                    <th className="pb-3">Gateway Method</th>
                    <th className="pb-3">Amount Paid</th>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">No payment transaction records found.</td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-brand-border/10 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-cyan text-sm">{p.id}</td>
                        <td className="py-3.5">
                          <span className="font-extrabold text-white block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{p.phone}</span>
                        </td>
                        <td className="py-3.5 font-extrabold text-slate-355 uppercase">{p.gateway}</td>
                        <td className="py-3.5 font-black text-emerald-400 text-sm">৳{p.amount} BDT</td>
                        <td className="py-3.5 text-slate-400">{p.date}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deletePayment(p.id)}
                            className="px-2.5 py-1 border border-brand-border hover:bg-red-500/10 hover:text-red-400 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Wipe Log
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. TICKETS VIEW */}
        {activeTab === "Tickets" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Technical Support Tickets</h2>
              <p className="text-xs text-slate-400 mt-1">Review customer reports, assign field teams, and log resolved support tickets.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Client details</th>
                    <th className="pb-3">Topic / Category</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Register Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">No tickets found.</td>
                    </tr>
                  ) : (
                    tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-brand-border/10 transition-colors">
                        <td className="py-3.5">
                          <span className="font-extrabold text-white block">{t.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{t.phone}</span>
                        </td>
                        <td className="py-3.5 font-semibold text-brand-cyan">{t.category}</td>
                        <td className="py-3.5 max-w-xxs truncate text-slate-300">{t.desc}</td>
                        <td className="py-3.5 text-slate-400">{t.date}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            t.status === "Resolved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            t.status === "Assigned" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                          }`}>{t.status}</span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          {t.status === "Open" && (
                            <button
                              onClick={() => updateTicketStatus(t.id, "Assigned")}
                              className="px-2.5 py-1 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Assign Team
                            </button>
                          )}
                          {t.status !== "Resolved" && (
                            <button
                              onClick={() => updateTicketStatus(t.id, "Resolved")}
                              className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}
                          <button
                            onClick={() => deleteTicket(t.id)}
                            className="px-2.5 py-1 border border-brand-border hover:bg-red-500/10 hover:text-red-400 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. PACKAGE REQUESTS VIEW */}
        {activeTab === "Package Requests" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Broadband Package Upgrade Requests</h2>
              <p className="text-xs text-slate-450 mt-1">Audit billing adjustments and speed alterations requested by active clients.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Account Number</th>
                    <th className="pb-3">Requested Plan</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  <tr className="hover:bg-brand-border/10 transition-colors">
                    <td className="py-3.5 font-bold font-mono text-brand-cyan">SUB-88293 (Tanvir Ahmed)</td>
                    <td className="py-3.5 font-extrabold text-white">Upgrade to Enterprise Splice (100 Mbps)</td>
                    <td className="py-3.5 text-slate-400">Upgrade Speed</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0c1e35] text-white border border-brand-border/45 animate-pulse">
                        Splicing Scheduled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. CONTACT MESSAGES VIEW */}
        {activeTab === "Contact Messages" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Web Contact Form Inquiries</h2>
              <p className="text-xs text-slate-450 mt-1">Review contact/peering messages submitted by site users.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Sender Details</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Message Body</th>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No contact messages received.</td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m.id} className="hover:bg-brand-border/10 transition-colors">
                        <td className="py-3.5">
                          <span className="font-extrabold text-white block">{m.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{m.email} | {m.phone}</span>
                        </td>
                        <td className="py-3.5 font-semibold text-brand-cyan">{m.subject}</td>
                        <td className="py-3.5 max-w-xs truncate text-slate-300">{m.message}</td>
                        <td className="py-3.5 text-slate-400">{m.date}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deleteMessage(m.id)}
                            className="px-2.5 py-1 border border-brand-border hover:bg-red-500/10 hover:text-red-400 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete Message
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 11. COMPLAINTS VIEW */}
        {activeTab === "Complaints" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Official Grievances Queue (BTRC Standards)</h2>
              <p className="text-xs text-slate-400 mt-1">Review formal SLA compliance complaints submitted by subscribers.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border/40 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Complainant</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Description Details</th>
                    <th className="pb-3">Date Filed</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {complaints.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">No active complaints found.</td>
                    </tr>
                  ) : (
                    complaints.map((c) => (
                      <tr key={c.id} className="hover:bg-brand-border/10 transition-colors">
                        <td className="py-3.5">
                          <span className="font-extrabold text-white block">{c.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.clientId}</span>
                        </td>
                        <td className="py-3.5 font-mono">{c.phone}</td>
                        <td className="py-3.5 font-semibold text-brand-cyan">{c.category}</td>
                        <td className="py-3.5 max-w-xxs truncate text-slate-300">{c.desc}</td>
                        <td className="py-3.5 text-slate-400">{c.date}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            c.status === "Resolved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            c.status === "Investigating" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                          }`}>{c.status}</span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          {c.status === "Pending" && (
                            <button
                              onClick={() => updateComplaintStatus(c.id, "Investigating")}
                              className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Investigate
                            </button>
                          )}
                          {c.status !== "Resolved" && (
                            <button
                              onClick={() => updateComplaintStatus(c.id, "Resolved")}
                              className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}
                          <button
                            onClick={() => deleteComplaint(c.id)}
                            className="px-2.5 py-1 border border-brand-border hover:bg-red-500/10 hover:text-red-400 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 12. REALTIME DEMO VIEW */}
        {activeTab === "Realtime Demo" && (
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-white">Realtime Demo Settings</h2>
              <p className="text-xs text-slate-400 mt-1">Adjust virtual peering traffic and trigger bulk operations database seeds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-brand-border/40">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider text-brand-cyan">Simulated Active Clients</h4>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={activeClients}
                    onChange={(e) => setActiveClients(Number(e.target.value))}
                    className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2 text-xs text-white max-w-[120px]"
                  />
                  <span className="text-[11px] text-slate-450 flex items-center">Active subscribers in simulated GPON map</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider text-brand-cyan">Virtual Peering Flow</h4>
                <div className="flex gap-4">
                  <input
                    type="number"
                    step="0.01"
                    value={totalBandwidthGbps}
                    onChange={(e) => setTotalBandwidthGbps(Number(e.target.value))}
                    className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2 text-xs text-white max-w-[120px]"
                  />
                  <span className="text-[11px] text-slate-450 flex items-center">Gbps real-time peering bandwidth rate</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm">Database Actions</h3>
              <p className="text-xs text-slate-400">Manage mock database entries for client applications. Resetting to defaults will populate standard sample bookings, support tickets, and complaints.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={resetToDefaults}
                  className="px-5 py-3 bg-brand-blue text-brand-dark hover:opacity-95 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg"
                >
                  Reset Mock Database Seeds
                </button>
                <button
                  onClick={clearAllData}
                  className="px-5 py-3 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Wipe Database (Delete All Logs)
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
