"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Loader2,
  HelpCircle,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";

interface SystemConfig {
  peeringBandwidthLimit: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
}

const defaultSystemConfig: SystemConfig = {
  peeringBandwidthLimit: "10 Gbps",
  maintenanceMode: false,
  maintenanceMessage: "M-Amin Network is currently undergoing scheduled backend fiber infrastructure upgrades. We will be back online shortly.",
};

type LogoVariant = "horizontal" | "square";

const getLogoUrl = (value: unknown, variant: LogoVariant = "horizontal"): string | null => {
  const preferredKey = variant === "square" ? "squareUrl" : "horizontalUrl";
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record[preferredKey] === "string") return record[preferredKey];
    if (typeof record.url === "string") return record.url;
  }
  if (Array.isArray(value)) {
    const firstLogo = value.find((item) => item && typeof item === "object" && "url" in item);
    if (firstLogo && typeof firstLogo === "object" && "url" in firstLogo && typeof firstLogo.url === "string") {
      return firstLogo.url;
    }
  }
  return null;
};

export default function SettingsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(defaultSystemConfig);

  const [isSavingMaintenance, setIsSavingMaintenance] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string>("/logo.png");
  const [squareLogo, setSquareLogo] = useState<string>("/xlogo.png");
  const [isUploadingHorizontalLogo, setIsUploadingHorizontalLogo] = useState(false);
  const [isUploadingSquareLogo, setIsUploadingSquareLogo] = useState(false);

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
        });
      } else {
        setSetting("system_config", defaultSystemConfig);
        setSystemConfig(defaultSystemConfig);
      }
    });

    getSetting("site_logo").then(saved => {
      const logoUrl = getLogoUrl(saved, "horizontal");
      const compactLogoUrl = getLogoUrl(saved, "square");
      if (logoUrl) setSiteLogo(logoUrl);
      if (compactLogoUrl) setSquareLogo(compactLogoUrl);
    });


  }, [router]);


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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, variant: LogoVariant) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if (variant === "horizontal") setIsUploadingHorizontalLogo(true);
    else setIsUploadingSquareLogo(true);
    try {
      const res = await fetch("/api/upload-site-logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const nextHorizontalLogo = variant === "horizontal" ? data.url : siteLogo;
      const nextSquareLogo = variant === "square" ? data.url : squareLogo;
      setSiteLogo(nextHorizontalLogo);
      setSquareLogo(nextSquareLogo);
      await setSetting("site_logo", {
        url: nextHorizontalLogo,
        horizontalUrl: nextHorizontalLogo,
        squareUrl: nextSquareLogo
      });
      toast.success("Brand logo updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload logo.");
    } finally {
      if (variant === "horizontal") setIsUploadingHorizontalLogo(false);
      else setIsUploadingSquareLogo(false);
      e.target.value = ""; // Reset input
    }
  };

  if (!auth) return null;

  return (
    <div className="space-y-6 w-full text-left pb-16 font-sans">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Forms */}
        <div className="lg:col-span-8 space-y-8">

          {/* Section: Brand Logo Card */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Brand Logos</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Update the horizontal website logo and compact square logo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-40 h-16 relative bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <Image src={siteLogo} alt="Horizontal Site Logo" fill className="object-contain p-2" />
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">Horizontal Logo</span>
                    <span className="text-[10px] text-slate-500">Used in website navbar, footer, and full-width admin branding.</span>
                  </div>
                  <label className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md inline-flex items-center gap-2">
                    {isUploadingHorizontalLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {isUploadingHorizontalLogo ? "Uploading..." : "Upload Horizontal Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(e, "horizontal")}
                      disabled={isUploadingHorizontalLogo}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-16 h-16 relative bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <Image src={squareLogo} alt="Square Site Logo" fill className="object-contain p-2" />
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">Square Logo</span>
                    <span className="text-[10px] text-slate-500">Used in compact admin icon areas.</span>
                  </div>
                  <label className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md inline-flex items-center gap-2">
                    {isUploadingSquareLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {isUploadingSquareLogo ? "Uploading..." : "Upload Square Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(e, "square")}
                      disabled={isUploadingSquareLogo}
                    />
                  </label>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Recommended: horizontal 200x80px, square 512x512px. Allowed formats: PNG, WEBP, JPG, SVG. Max size: 5MB.
            </p>
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


    </div>
  );
}

