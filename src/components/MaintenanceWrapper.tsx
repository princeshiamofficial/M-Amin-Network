"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MaintenanceWrapper({ children, isMaintenance, maintenanceMessage }: { children: React.ReactNode; isMaintenance: boolean; maintenanceMessage?: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMaintenanceState, setIsMaintenanceState] = useState(isMaintenance);
  const [maintenanceMessageState, setMaintenanceMessageState] = useState(maintenanceMessage || "");

  useEffect(() => {
    setIsMaintenanceState(isMaintenance);
  }, [isMaintenance]);

  useEffect(() => {
    setMaintenanceMessageState(maintenanceMessage || "");
  }, [maintenanceMessage]);

  useEffect(() => {
    setMounted(true);

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let isDestroyed = false;

    let retryCount = 0;
    const MAX_RETRIES = 3;

    function connectWS() {
      if (isDestroyed || retryCount >= MAX_RETRIES) return;

      try {
        const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${wsProtocol}//${window.location.hostname}:3015`;

        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          retryCount = 0;
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data && typeof data.isMaintenance === "boolean") {
              setIsMaintenanceState(data.isMaintenance);
              setMaintenanceMessageState(data.maintenanceMessage || "");
            }
          } catch {
            // Ignore error
          }
        };

        socket.onerror = () => {
          try { socket?.close(); } catch { /* ignore */ }
        };

        socket.onclose = () => {
          if (!isDestroyed && retryCount < MAX_RETRIES) {
            retryCount++;
            reconnectTimeout = setTimeout(connectWS, Math.min(5000 * Math.pow(2, retryCount - 1), 30000));
          }
        };
      } catch {
        if (!isDestroyed && retryCount < MAX_RETRIES) {
          retryCount++;
          reconnectTimeout = setTimeout(connectWS, Math.min(5000 * Math.pow(2, retryCount - 1), 30000));
        }
      }
    }

    connectWS();

    return () => {
      isDestroyed = true;
      if (socket) {
        try { socket.close(); } catch { /* ignore */ }
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  // Only show maintenance screen if enabled and we are not on an admin route
  const showMaintenance = isMaintenanceState && !pathname.startsWith("/admin");

  if (showMaintenance) {
    return (
      <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden w-full h-full font-sans">
        {/* Large Light Blue Background Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[800px] max-h-[800px] bg-[#f2f9fd] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full mt-[-80px]">
          {/* Typography */}
          <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] font-semibold text-[#015296] text-center leading-[1.2] tracking-tight">
            This site is under maintenance
          </h1>
          <p className="text-[#63a1cb] text-lg sm:text-xl md:text-2xl mt-5 font-normal tracking-wide text-center px-6 max-w-2xl leading-relaxed">
            {maintenanceMessageState || "We're preparing to serve you better."}
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
