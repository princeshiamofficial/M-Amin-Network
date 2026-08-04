"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface LogoCloudItem {
  name: string;
  role?: string;
  src?: string;
}

// --- Marquee Component ---
export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  repeat = 4,
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  repeat?: number;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:2.5rem] [gap:var(--gap)] select-none",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] items-center animate-marquee",
              {
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// --- Default Network Logos ---
export const Logo01 = () => (
  <div className="flex items-center gap-2 font-black text-slate-400 hover:text-brand-blue transition-colors text-lg tracking-wider">
    <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
    <span>YOUTUBE CACHE</span>
  </div>
);

export const Logo02 = () => (
  <div className="flex items-center gap-2 font-black text-slate-400 hover:text-brand-blue transition-colors text-lg tracking-wider">
    <svg className="w-6 h-6 text-blue-600 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
    <span>FACEBOOK FNA</span>
  </div>
);

export const Logo03 = () => (
  <div className="flex items-center gap-2 font-black text-slate-400 hover:text-brand-blue transition-colors text-lg tracking-wider">
    <svg className="w-6 h-6 text-emerald-500 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>BDIX PEERING</span>
  </div>
);

export const Logo04 = () => (
  <div className="flex items-center gap-2 font-black text-slate-400 hover:text-brand-blue transition-colors text-lg tracking-wider">
    <svg className="w-6 h-6 text-amber-500 fill-current" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
    <span>AS150164 BGP</span>
  </div>
);

export const Logo05 = () => (
  <div className="flex items-center gap-2 font-black text-slate-400 hover:text-brand-blue transition-colors text-lg tracking-wider">
    <svg className="w-6 h-6 text-purple-500 fill-current" viewBox="0 0 24 24">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
    </svg>
    <span>CDN ULTRA FAST</span>
  </div>
);

export const LogoCloud = ({ items }: { items?: LogoCloudItem[] }) => {
  const hasCustomItems = items && items.length > 0;

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 py-2">
      <div className="relative w-full max-w-5xl rounded-2xl bg-transparent p-1">
        <div className="grid">
          <div className="flex min-w-0 items-center justify-center gap-x-14 gap-y-10 p-2 sm:p-4 *:h-14">
            <Marquee className="[--duration:20s]" pauseOnHover repeat={hasCustomItems ? 6 : 4}>
              {hasCustomItems ? (
                items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 font-black text-slate-700 hover:text-brand-blue transition-colors text-sm sm:text-base tracking-wider px-3 py-1 bg-slate-100/60 rounded-xl border border-slate-200/50 shrink-0"
                  >
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">{item.name}</span>
                      {item.role && (
                        <span className="text-[10px] text-slate-400 font-normal">{item.role}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <Logo01 />
                  <Logo02 />
                  <Logo03 />
                  <Logo04 />
                  <Logo05 />
                </>
              )}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
