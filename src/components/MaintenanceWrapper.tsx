"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MaintenanceWrapper({ children, isMaintenance }: { children: React.ReactNode; isMaintenance: boolean }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  // Only show maintenance screen if enabled and we are not on an admin route
  const showMaintenance = isMaintenance && !pathname.startsWith("/admin");

  if (showMaintenance) {
    return (
      <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden w-full h-full font-sans">
        {/* Large Light Blue Background Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[800px] max-h-[800px] bg-[#f2f9fd] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full mt-[-80px]">
          {/* Typography */}
          <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] font-semibold text-[#015296] text-center leading-[1.2] tracking-tight">
            This site is under<br />maintenance
          </h1>
          <p className="text-[#63a1cb] text-lg sm:text-xl md:text-2xl mt-5 font-normal tracking-wide">
            We&apos;re preparing to serve you better.
          </p>

          {/* SVG Plugs Illustration */}
          <div className="w-full max-w-[1000px] mt-16 sm:mt-24 px-4">
            <svg 
              viewBox="0 0 1000 200" 
              className="w-full h-auto drop-shadow-sm" 
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: 'visible' }}
            >
              <g transform="translate(0, -10)">
                {/* --- LEFT PLUG --- */}
                {/* Left Wire */}
                <rect x="-1000" y="94" width="1357" height="12" fill="#fff" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Left Base */}
                <rect x="357" y="82" width="15" height="36" rx="3" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Left Bell */}
                <path d="M 372 82 C 390 82, 395 62, 445 62 L 445 138 C 395 138, 390 118, 372 118 Z" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Left Lip */}
                <rect x="445" y="57" width="15" height="86" rx="3" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Left Prongs */}
                <path d="M 460 82 L 490 82 C 496 82, 496 92, 490 92 L 460 92 Z" fill="#fff" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                <path d="M 460 108 L 490 108 C 496 108, 496 118, 490 118 L 460 118 Z" fill="#fff" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />

                {/* --- RIGHT PLUG --- */}
                {/* Right Wire */}
                <rect x="638" y="94" width="1362" height="12" fill="#fff" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Right Base */}
                <rect x="623" y="82" width="15" height="36" rx="3" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Right Bell */}
                <path d="M 623 82 C 605 82, 600 62, 550 62 L 550 138 C 600 138, 605 118, 623 118 Z" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
                {/* Right Lip */}
                <rect x="535" y="57" width="15" height="86" rx="3" fill="#8ec3df" stroke="#015296" strokeWidth="5.5" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

