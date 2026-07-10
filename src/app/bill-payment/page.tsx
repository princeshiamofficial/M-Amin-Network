"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { defaultBillPaymentPageContent } from "@/app/admin/(dashboard)/bill-payment-page/page";

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
  const [pageContent, setPageContent] = React.useState(defaultBillPaymentPageContent);
  React.useEffect(() => {
    const s = localStorage.getItem("m_amin_bill_payment_page_content");
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
    return name;
  };

  const translateDueDate = (date: string) => {
    if (date.includes("July")) {
      return date.replace("July", t(pageContent.str4En, pageContent.str4Bn));
    }
    return date;
  };

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
          name: "Mehan Ahmed",
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
          name: t(pageContent.str5En, pageContent.str5Bn),
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
      const generatedTxn = `TXN-${selectedGateway.toUpperCase()}-${Date.now().toString().slice(-6)}-${Math.floor(10000 + Math.random() * 90000)}`;
      try {
        const payments = JSON.parse(localStorage.getItem("m_amin_payments") || "[]");
        const newPayment = {
          id: generatedTxn,
          clientId: billDetails.clientId,
          name: billDetails.name,
          phone: billDetails.phone,
          planName: billDetails.planName,
          speed: billDetails.speed,
          amount: billDetails.dueBill,
          gateway: selectedGateway,
          date: new Date().toLocaleString(),
          dueDate: billDetails.dueDate,
          paidDate: new Date().toLocaleString()
        };
        payments.push(newPayment);
        localStorage.setItem("m_amin_payments", JSON.stringify(payments));
      } catch (err) {
        console.error("Error saving payment:", err);
      }
      setPaying(false);
      setPaymentSuccess(true);
      setTxnId(generatedTxn);
      
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
    <div className="w-full py-12 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header - Dark Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight text-center w-full block">
            {t(pageContent.str6En, pageContent.str6Bn)}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t(pageContent.str7En, pageContent.str7Bn)}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base text-center">
            {t(pageContent.str8En, pageContent.str8Bn)}
          </p>
        </div>
      </div>

      {/* Bill Content - White Background Section */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Form panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
            {!hasSearched ? (
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="border-b border-slate-200 pb-4 mb-2 text-left">
                  <span className="bg-brand-cyan/10 text-brand-blue text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                    {t(pageContent.str9En, pageContent.str9Bn)}
                  </span>
                  <h3 className="text-slate-900 font-extrabold text-lg mt-3">{t(pageContent.str10En, pageContent.str10Bn)}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(pageContent.str11En, pageContent.str11Bn)}
                    <code className="text-brand-blue font-mono bg-slate-100 px-1.5 py-0.5 rounded">MAN-5432</code>{" "}
                    {t(pageContent.str12En, pageContent.str12Bn)}{" "}
                    <code className="text-brand-blue font-mono bg-slate-100 px-1.5 py-0.5 rounded">MAN-9988</code>
                    {t(pageContent.str13En, pageContent.str13Bn)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str14En, pageContent.str14Bn)}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MAN-5432"
                      value={clientIdInput}
                      onChange={(e) => setClientIdInput(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str15En, pageContent.str15Bn)}</label>
                    <input
                      type="tel"
                      placeholder="e.g. 01707009267"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={searching}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {searching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t(pageContent.str16En, pageContent.str16Bn)}
                    </>
                  ) : (
                    t(pageContent.str17En, pageContent.str17Bn)
                  )}
                </button>
              </form>
            ) : (
              // Show billing details & payment form
              <div>
                {!paymentSuccess ? (
                  <div className="space-y-6">
                    {/* Account overview card */}
                    <div className="border-b border-slate-200 pb-4 flex justify-between items-start gap-4 text-left">
                      <div>
                        <h3 className="text-slate-900 font-extrabold text-xl">{billDetails?.name}</h3>
                        <p className="text-xs text-slate-600 font-mono mt-0.5">
                          {t(pageContent.str18En, pageContent.str18Bn)}: {billDetails?.clientId} | {t(pageContent.str19En, pageContent.str19Bn)}: {billDetails?.phone}
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-xs text-slate-600 hover:text-brand-blue font-semibold border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        {t(pageContent.str20En, pageContent.str20Bn)}
                      </button>
                    </div>

                    {/* Pricing metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                          {t(pageContent.str21En, pageContent.str21Bn)}
                        </span>
                        <span className="text-slate-900 font-bold text-sm block mt-1">
                          {billDetails ? translatePlanName(billDetails.planName) : ""}
                        </span>
                        <span className="text-brand-blue text-xs font-semibold">{billDetails?.speed}</span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                          {t(pageContent.str22En, pageContent.str22Bn)}
                        </span>
                        <span className="text-slate-900 font-extrabold text-sm block mt-1 font-mono">
                          ৳{billDetails?.monthlyBill} BDT
                        </span>
                        <span className="text-slate-500 text-xs">{t(pageContent.str23En, pageContent.str23Bn)}</span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                          {t(pageContent.str24En, pageContent.str24Bn)}
                        </span>
                        <span
                          className={`font-extrabold text-sm block mt-1 font-mono ${
                            (billDetails?.dueBill ?? 0) > 0 ? "text-amber-600" : "text-emerald-600"
                          }`}
                        >
                          ৳{billDetails?.dueBill} BDT
                        </span>
                        <span className="text-slate-500 text-xs">
                          {t(pageContent.str25En, pageContent.str25Bn)} {billDetails ? translateDueDate(billDetails.dueDate) : ""}
                        </span>
                      </div>
                    </div>

                    {/* Payment Selection Form */}
                    {(billDetails?.dueBill ?? 0) > 0 ? (
                      <form onSubmit={handlePaymentSubmit} className="space-y-6 border-t border-slate-200 pt-6">
                        <div className="text-left">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider block mb-3">
                            {t(pageContent.str26En, pageContent.str26Bn)}
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            {gateways.map((gt) => (
                              <button
                                key={gt.id}
                                type="button"
                                onClick={() => setSelectedGateway(gt.id)}
                                className={`p-4 rounded-2xl border text-center font-bold text-white transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden ${gt.color} ${
                                  selectedGateway === gt.id
                                    ? "ring-2 ring-brand-cyan/80 bg-opacity-95 shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100/80"
                                }`}
                              >
                                {selectedGateway === gt.id && (
                                  <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-white text-brand-dark rounded-full flex items-center justify-center text-[10px] font-black">
                                    ✓
                                  </div>
                                )}
                                <span className="text-sm tracking-wide">{gt.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Info warning */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed flex gap-2">
                          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>
                            {t(pageContent.str27En, pageContent.str27Bn)}
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={paying || !selectedGateway}
                          className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                          {paying ? (
                            <>
                              <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                              {t(pageContent.str28En, pageContent.str28Bn)}
                            </>
                          ) : (
                            `${t(pageContent.str29En, pageContent.str29Bn)}${billDetails?.dueBill} ${t(pageContent.str30En, pageContent.str30Bn)}`
                          )}
                        </button>
                      </form>
                    ) : (
                      // Account paid in full state
                      <div className="border-t border-slate-200 pt-8 text-center space-y-4">
                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-slate-900 font-bold text-lg">{t(pageContent.str31En, pageContent.str31Bn)}</h4>
                          <p className="text-xs text-slate-600 max-w-sm mx-auto">
                            {t(pageContent.str32En, pageContent.str32Bn)}{" "}
                            {billDetails?.clientId} {t(pageContent.str33En, pageContent.str33Bn)}{" "}
                            {t(pageContent.str34En, pageContent.str34Bn)}{" "}
                            {billDetails ? translateDueDate(billDetails.dueDate) : ""}.
                          </p>
                        </div>
                        <button
                          onClick={handleReset}
                          className="bg-slate-200 hover:bg-slate-350/80 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          {t(pageContent.str35En, pageContent.str35Bn)}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Payment Success Screen
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-slate-900 font-extrabold text-2xl">{t(pageContent.str36En, pageContent.str36Bn)}</h3>
                      <p className="text-sm text-slate-600">
                        {t(pageContent.str37En, pageContent.str37Bn)} <span className="text-slate-900 font-bold">{billDetails?.name}</span>.
                      </p>
                    </div>

                    {/* Receipt overview */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left text-slate-700">
                      <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                        <span>{t(pageContent.str38En, pageContent.str38Bn)}</span>
                        <span className="text-brand-blue font-bold text-right truncate max-w-[160px]">{txnId}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                        <span>{t(pageContent.str39En, pageContent.str39Bn)}</span>
                        <span className="text-slate-800 font-bold uppercase">{selectedGateway}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                        <span>{t(pageContent.str40En, pageContent.str40Bn)}</span>
                        <span className="text-slate-800 font-bold">৳১২৫০ BDT</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{t(pageContent.str41En, pageContent.str41Bn)}</span>
                        <span className="text-emerald-600 font-bold">{t(pageContent.str42En, pageContent.str42Bn)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {t(pageContent.str43En, pageContent.str43Bn)}
                      </button>
                      <button
                        onClick={() => alert(lang === "BN" ? "রসিদ ডাউনলোড: Receipt-MAN-2026.pdf তৈরি করা হয়েছে।" : "Receipt download simulated: Receipt-MAN-2026.pdf has been generated.")}
                        className="px-6 py-2.5 rounded-xl bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs font-black transition-opacity cursor-pointer"
                      >
                        {t(pageContent.str44En, pageContent.str44Bn)}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
