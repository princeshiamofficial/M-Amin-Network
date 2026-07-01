"use client";

import React, { useState } from "react";

interface CustomerBill {
  clientId: string;
  name: string;
  phone: string;
  planName: string;
  speed: string;
  monthlyBill: number;
  dueBill: number;
  dueDate: string;
}

export default function BillPayment() {
  const [clientIdInput, setClientIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [billDetails, setBillDetails] = useState<CustomerBill | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Payment states
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");

  const gateways = [
    { id: "bkash", name: "bKash", color: "bg-[#e2136e] border-[#e2136e]/20 hover:border-[#e2136e]" },
    { id: "nagad", name: "Nagad", color: "bg-[#f57c20] border-[#f57c20]/20 hover:border-[#f57c20]" },
    { id: "rocket", name: "Rocket", color: "bg-[#8c258d] border-[#8c258d]/20 hover:border-[#8c258d]" },
    { id: "card", name: "Visa / Mastercard", color: "bg-brand-blue border-brand-blue/20 hover:border-brand-cyan" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIdInput.trim()) return;

    setSearching(true);
    setBillDetails(null);
    setHasSearched(false);

    setTimeout(() => {
      setSearching(false);
      setHasSearched(true);

      const idLower = clientIdInput.toLowerCase();
      if (idLower === "man-9988") {
        setBillDetails({
          clientId: "MAN-9988",
          name: "Tanvir Ahmed",
          phone: phoneInput || "01707009267",
          planName: "Home Standard",
          speed: "20 Mbps",
          monthlyBill: 800,
          dueBill: 0,
          dueDate: "01 July 2026",
        });
      } else if (idLower === "man-5432") {
        setBillDetails({
          clientId: "MAN-5432",
          name: "Kamrul Hasan",
          phone: phoneInput || "01707009267",
          planName: "Gamer Professional",
          speed: "40 Mbps",
          monthlyBill: 1250,
          dueBill: 1250,
          dueDate: "05 July 2026",
        });
      } else {
        // Default mock user
        setBillDetails({
          clientId: clientIdInput.toUpperCase(),
          name: "M. Amin Network Subscriber",
          phone: phoneInput || "017XXXXXXXX",
          planName: "Home Elite",
          speed: "30 Mbps",
          monthlyBill: 1000,
          dueBill: 1000,
          dueDate: "10 July 2026",
        });
      }
    }, 1200);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGateway || !billDetails) return;

    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentSuccess(true);
      setTxnId(`TXN-${selectedGateway.toUpperCase()}-${Date.now().toString().slice(-6)}-${Math.floor(10000 + Math.random() * 90000)}`);
      
      // Update local state to reflect paid status
      setBillDetails((prev) => (prev ? { ...prev, dueBill: 0 } : null));
    }, 2000);
  };

  const handleReset = () => {
    setClientIdInput("");
    setPhoneInput("");
    setBillDetails(null);
    setHasSearched(false);
    setSelectedGateway(null);
    setPaymentSuccess(false);
    setTxnId("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow flex flex-col justify-center">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Secure Online{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Bill Payment
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Pay your monthly subscription invoices quickly and securely. Input your Client ID to lookup your active billing due and choose your preferred local payment gateway.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        {/* Form panel */}
        <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-xl text-left">
          {!hasSearched ? (
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="border-b border-brand-border/40 pb-4 mb-2">
                <span className="bg-brand-cyan/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                  Invoice lookup
                </span>
                <h3 className="text-white font-extrabold text-lg mt-3">Search Subscriber Account</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your assigned subscriber Client ID (e.g. <code className="text-brand-cyan font-mono bg-brand-dark px-1.5 py-0.5 rounded">MAN-5432</code> or <code className="text-brand-cyan font-mono bg-brand-dark px-1.5 py-0.5 rounded">MAN-9988</code>) to fetch current invoices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Client ID (Required)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MAN-5432"
                    value={clientIdInput}
                    onChange={(e) => setClientIdInput(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Registered Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. 01707009267"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={searching}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
              >
                {searching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    Fetching Invoice Details...
                  </>
                ) : (
                  "Find Billing Details"
                )}
              </button>
            </form>
          ) : (
            // Show billing details & payment form
            <div>
              {!paymentSuccess ? (
                <div className="space-y-6">
                  {/* Account overview card */}
                  <div className="border-b border-brand-border/40 pb-4 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-white font-extrabold text-xl">{billDetails?.name}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Client ID: {billDetails?.clientId} | Phone: {billDetails?.phone}
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-xs text-slate-400 hover:text-brand-cyan font-semibold border border-brand-border px-2.5 py-1 rounded-lg hover:bg-brand-border/30 transition-colors cursor-pointer"
                    >
                      Change Account
                    </button>
                  </div>

                  {/* Pricing metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-brand-dark/50 border border-brand-border p-4 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                        Assigned Plan
                      </span>
                      <span className="text-white font-bold text-sm block mt-1">
                        {billDetails?.planName}
                      </span>
                      <span className="text-brand-cyan text-xs font-semibold">{billDetails?.speed}</span>
                    </div>

                    <div className="bg-brand-dark/50 border border-brand-border p-4 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                        Monthly Rate
                      </span>
                      <span className="text-white font-extrabold text-sm block mt-1 font-mono">
                        ৳{billDetails?.monthlyBill} BDT
                      </span>
                      <span className="text-slate-500 text-xs">Standard cycle</span>
                    </div>

                    <div className="bg-brand-dark/50 border border-brand-border p-4 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                        Outstanding Due
                      </span>
                      <span
                        className={`font-extrabold text-sm block mt-1 font-mono ${
                          (billDetails?.dueBill ?? 0) > 0 ? "text-amber-400" : "text-emerald-400"
                        }`}
                      >
                        ৳{billDetails?.dueBill} BDT
                      </span>
                      <span className="text-slate-500 text-xs">Due by: {billDetails?.dueDate}</span>
                    </div>
                  </div>

                  {/* Payment Selection Form */}
                  {(billDetails?.dueBill ?? 0) > 0 ? (
                    <form onSubmit={handlePaymentSubmit} className="space-y-6 border-t border-brand-border/40 pt-6">
                      <div className="text-left">
                        <label className="text-xs text-slate-300 font-bold uppercase tracking-wider block mb-3">
                          Select Online Payment Gateway
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {gateways.map((gt) => (
                            <button
                              key={gt.id}
                              type="button"
                              onClick={() => setSelectedGateway(gt.id)}
                              className={`p-4 rounded-2xl border text-center font-bold text-white transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden ${gt.color} ${
                                selectedGateway === gt.id
                                  ? "ring-2 ring-brand-cyan/80 bg-opacity-95 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                                  : "bg-brand-card/75 bg-opacity-30 border-brand-border/60 hover:bg-brand-border/40"
                              }`}
                            >
                              {selectedGateway === gt.id && (
                                <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-brand-cyan text-brand-dark rounded-full flex items-center justify-center text-[10px] font-black">
                                  ✓
                                </div>
                              )}
                              <span className="text-sm tracking-wide">{gt.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Info warning */}
                      <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed flex gap-2">
                        <svg className="w-5 h-5 text-brand-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>
                          Payments are processed through SSL encrypted gateways. Your active broadband profile will be automatically renewed and unblocked (if disabled) within 60 seconds of a successful transaction.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={paying || !selectedGateway}
                        className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {paying ? (
                          <>
                            <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                            Establishing Secure Gateway connection...
                          </>
                        ) : (
                          `Pay ৳${billDetails?.dueBill} BDT Now`
                        )}
                      </button>
                    </form>
                  ) : (
                    // Account paid in full state
                    <div className="border-t border-brand-border/40 pt-8 text-center space-y-4">
                      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-lg">Account Paid in Full</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          There are no outstanding invoices or subscription dues currently registered under Client ID {billDetails?.clientId}. Next billing cycle begins on {billDetails?.dueDate}.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="bg-brand-border hover:bg-brand-border/80 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Find Another Account
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Payment Success Screen
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-extrabold text-2xl">Bill Paid Successfully!</h3>
                    <p className="text-sm text-slate-400">
                      Payment confirmed for <span className="text-slate-200 font-bold">{billDetails?.name}</span>.
                    </p>
                  </div>

                  {/* Receipt overview */}
                  <div className="bg-brand-dark border border-brand-border rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                    <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                      <span>Transaction ID</span>
                      <span className="text-brand-cyan font-bold text-right truncate max-w-[160px]">{txnId}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                      <span>Gateway Method</span>
                      <span className="text-white font-bold uppercase">{selectedGateway}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                      <span>Amount Received</span>
                      <span className="text-white font-bold">৳1250 BDT</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Account Status</span>
                      <span className="text-emerald-400 font-bold">ACTIVE / RENEWED</span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => alert("Receipt download simulated: Receipt-MAN-2026.pdf has been generated.")}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs font-black transition-opacity cursor-pointer"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
