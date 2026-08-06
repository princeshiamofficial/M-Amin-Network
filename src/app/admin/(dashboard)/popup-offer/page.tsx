"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { 
  Sparkles,
  Upload,
  X,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import Image from "next/image";

function normalizePopupEnabled(value: unknown): boolean {
  if (value === true || value === 1 || value === "true" || value === "1" || value === "on" || value === "yes") return true;
  if (value === false || value === 0 || value === "false" || value === "0" || value === "off" || value === "no") return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.toLowerCase());
  return false;
}

export default function PopupOfferPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [systemConfig, setSystemConfig] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

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
          ...config,
          popupEnabled: normalizePopupEnabled(config.popupEnabled),
          popupImage: (config.popupImage as string) || "",
        });
      } else {
        const defaultSys = {
          peeringBandwidthLimit: "10 Gbps",
          maintenanceMode: false,
          maintenanceMessage: "M-Amin Network is currently undergoing scheduled backend fiber infrastructure upgrades. We will be back online shortly.",
          popupEnabled: false,
          popupImage: ""
        };
        setSetting("system_config", defaultSys);
        setSystemConfig(defaultSys);
      }
    });
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(async () => {
      try {
        const payload = {
          ...systemConfig,
          popupEnabled: normalizePopupEnabled(systemConfig.popupEnabled),
          popupImage: (systemConfig.popupImage as string) || "",
        };
        const saved = await setSetting("system_config", payload);
        if (!saved) {
          toast.error("Save failed. Please log in again and try once more.");
          return;
        }
        setSystemConfig(payload);
        toast.success("Pop-up campaign configuration saved successfully!");
      } catch {
        toast.error("Failed to update pop-up configurations.");
      }
      setIsSaving(false);
    }, 1000);
  };

  if (!auth) return null;

  const isEnabled = systemConfig.popupEnabled === true;
  const popupImage = (systemConfig.popupImage as string) || "";

  return (
    <div className="space-y-6 w-full text-left pb-16 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Pop-up Offer Campaign</h2>
          <p className="text-slate-500 text-xs mt-0.5">Manage details and availability of the campaign pop-up advertisement modal.</p>
        </div>
      </div>

      <div className="max-w-4xl">
        {/* Section: Promotional Pop-up Card */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-start pb-4 border-b border-slate-100">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-650 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Promotional Pop-up</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                  Configure the site-wide marketing or announcement modal displayed to homepage visitors.
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="shrink-0 pt-1">
              {isEnabled ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-violet-50 text-violet-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-550 animate-pulse" />
                  Campaign Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Disabled
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Enable campaign pop-up modal</h4>
                <p className="text-[10px] text-slate-500 max-w-sm">
                  Toggle to determine if users are presented with the promotion upon loading the website.
                </p>
              </div>
              {/* Switch Button */}
              <button
                type="button"
                onClick={() => setSystemConfig({ ...systemConfig, popupEnabled: !isEnabled })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none p-0.5 ${
                  isEnabled ? "bg-violet-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Conditional Inputs */}
            {isEnabled && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Campaign Banner Image</label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    {/* Image Preview */}
                    <div className="relative w-40 h-40 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                      {popupImage ? (
                        <Image
                          src={popupImage}
                          alt="Campaign Pop-up Banner"
                          width={160}
                          height={160}
                          className="object-contain w-full h-full select-none"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-3">
                          <ImageIcon className="w-8 h-8 opacity-60" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">No Banner Selected</span>
                        </div>
                      )}
                    </div>

                    {/* File Controls */}
                    <div className="space-y-2 text-center sm:text-left">
                      <h5 className="text-xs font-bold text-slate-800">Upload Campaign Image</h5>
                      <p className="text-[9.5px] text-slate-500 max-w-xs leading-normal">
                        Supported formats: WebP, PNG, JPEG, GIF. Maximum file size: 500KB to ensure quick load times for visitors.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <label className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[10px] font-black tracking-wider uppercase cursor-pointer transition-colors shadow-sm inline-flex items-center gap-1.5">
                          <Upload className="w-3 h-3" />
                          {popupImage ? "Change Image" : "Select Image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 500 * 1024) {
                                  toast.error("File size exceeds 500KB. Please compress the image to ensure best performance.");
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const base64 = event.target?.result as string;
                                  setSystemConfig({ ...systemConfig, popupImage: base64 });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        {popupImage && (
                          <button
                            type="button"
                            onClick={() => setSystemConfig({ ...systemConfig, popupImage: "" })}
                            className="px-3.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-[10px] font-black tracking-wider uppercase cursor-pointer transition-colors inline-flex items-center gap-1.5"
                          >
                            <X className="w-3 h-3" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Controls */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-violet-600/10 flex items-center gap-1.5 disabled:opacity-80"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Campaign...
                  </>
                ) : (
                  "Save Pop-up Settings"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
