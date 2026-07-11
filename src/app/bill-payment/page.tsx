"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import Image from "next/image";
import { getSetting, setSetting } from "@/actions/content";
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
    const s = localStorage.getItem("bill_payment_page_content");
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

    setTimeout(async () => {
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
    setTimeout(async () => {
      const generatedTxn = `TXN-${selectedGateway.toUpperCase()}-${Date.now().toString().slice(-6)}-${Math.floor(10000 + Math.random() * 90000)}`;
      try {
        const payments = await getSetting("payments"); const paymentsArr = Array.isArray(payments) ? payments : [];
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
        paymentsArr.push(newPayment);
        setSetting("payments", paymentsArr);
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
    <div className="w-full py-0 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />


      {/* Bill Content - White Background Section */}
      <div className="w-full bg-white text-slate-800 py-12 grow border-t border-slate-200 relative z-10 flex items-center justify-center">
        <div className={`${hasSearched ? "max-w-2xl" : "max-w-5xl"} w-full mx-auto px-4 sm:px-6 transition-all duration-300`}>
          {!hasSearched ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xs grid md:grid-cols-2 grid-cols-1 md:gap-3 gap-8 md:divide-x divide-x-0 md:divide-y-0 divide-y dark:divide-[#3D4A67] divide-slate-100 selfCareCard">
              <div className="flex flex-col gap-5 text-left md:pr-12">
                <Image
                  alt="Quick Pay Icon"
                  src="/quickPayIcon.png"
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <h1 className="text-[#2563EB] dark:text-[#548AFF] text-3xl font-extrabold tracking-tight">
                  {t("Quick Pay", "কুইক পে")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                  {t(
                    "Instantly make your payment using a variety of available facilities, such as bKash, MasterCard, Visa card, and other payment methods.",
                    "বিকাশ, মাস্টারকার্ড, ভিসা কার্ড এবং অন্যান্য পেমেন্ট চ্যানেল ব্যবহার করে তাৎক্ষণিকভাবে আপনার পেমেন্ট করুন।"
                  )}
                </p>
                <div className="flex mt-2">
                  <div className="px-5 py-3 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-4 bg-white dark:bg-slate-950 shadow-2xs">
                    <Image
                      alt="Bkash Logo"
                      src="/bkashLogo.png"
                      width={72}
                      height={34}
                      className="block dark:hidden object-contain"
                    />
                    <Image
                      alt="Bkash White Logo"
                      src="/bkashWhiteLogo.png"
                      width={72}
                      height={34}
                      className="hidden dark:block object-contain"
                    />
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                    <Image
                      alt="Payment Methods"
                      src="/paymentMethods.png"
                      width={60}
                      height={45}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full md:pl-12 md:pt-0 pt-8">
                <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full text-left">
                  <label className="text-slate-600 dark:text-slate-350 font-bold text-sm">
                    {t("Customer ID", "গ্রাহক আইডি")}
                  </label>
                  <div className="flex items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all">
                    <span className="text-brand-blue pr-4 border-r border-slate-200 dark:border-slate-800 py-3 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={t("EX: 123456", "উদা: 123456")}
                      value={clientIdInput}
                      onChange={(e) => setClientIdInput(e.target.value)}
                      className="focus:outline-none px-4 py-3 bg-transparent text-sm w-full font-mono uppercase text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={true}
                    className="bg-[#85A5FF] disabled:opacity-75 disabled:cursor-not-allowed w-full rounded-xl text-white font-bold py-3.5 mt-8 flex items-center justify-center gap-2 transition-colors text-sm shadow-md shadow-blue-500/5"
                  >
                    {searching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("Verifying...", "যাচাই করা হচ্ছে...")}
                      </>
                    ) : (
                      <>
                        <span>{t("Pay Now", "পে নাও")}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              {/* Show billing details & payment form */}
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
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
                      className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {t(pageContent.str43En, pageContent.str43Bn)}
                    </button>
                    <button
                      onClick={() => toast(lang === "BN" ? "রসিদ ডাউনলোড: Receipt-MAN-2026.pdf তৈরি করা হয়েছে।" : "Receipt download simulated: Receipt-MAN-2026.pdf has been generated.")}
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
  );
}

