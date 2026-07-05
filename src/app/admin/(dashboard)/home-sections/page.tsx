"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HomeSections {
  hero: boolean;
  packages: boolean;
  offers: boolean;
  coverage: boolean;
  testimonials: boolean;
  faq: boolean;
}

const defaultHomeSections: HomeSections = {
  hero: true,
  packages: true,
  offers: true,
  coverage: true,
  testimonials: true,
  faq: true,
};

export default function HomeSectionsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [homeSections, setHomeSections] = useState<HomeSections>(defaultHomeSections);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_home_sections");
    if (saved) {
      setHomeSections(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_home_sections", JSON.stringify(defaultHomeSections));
      setHomeSections(defaultHomeSections);
    }
  }, [router]);

  const toggleSection = (key: keyof HomeSections) => {
    const updated = { ...homeSections, [key]: !homeSections[key] };
    setHomeSections(updated);
    localStorage.setItem("m_amin_home_sections", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Enable/Disable Homepage Rows</h2>
        <p className="text-xs text-slate-500 mt-1">Switch sections on/off instantly across the consumer landing page.</p>
      </div>
      <div className="space-y-4 max-w-sm">
        {(Object.keys(homeSections) as Array<keyof HomeSections>).map((key) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{key} Section</span>
            <button
              onClick={() => toggleSection(key)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                homeSections[key]
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {homeSections[key] ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
