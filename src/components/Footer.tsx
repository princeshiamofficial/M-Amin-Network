import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-border/60 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-lg shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base tracking-wide leading-none">
                  M AMIN
                </span>
                <span className="text-brand-cyan text-[10px] font-semibold tracking-widest leading-none mt-1">
                  NETWORK
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses.
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="bg-brand-border px-2.5 py-1 rounded text-brand-cyan font-mono border border-brand-border/80">
                ASN: AS150164
              </span>
              <span className="bg-brand-border px-2.5 py-1 rounded text-emerald-400 font-semibold border border-brand-border/80">
                BTRC Licensed
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-cyan transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-brand-cyan transition-colors">
                  Broadband Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-brand-cyan transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-brand-cyan transition-colors">
                  Coverage Area
                </Link>
              </li>
              <li>
                <Link href="/multimedia" className="hover:text-brand-cyan transition-colors">
                  Multimedia &amp; FTP Portal
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-brand-cyan transition-colors">
                  Router Check &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/bill-payment" className="hover:text-brand-cyan transition-colors">
                  Pay Bill Online
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-cyan transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/complain" className="hover:text-brand-cyan transition-colors">
                  File a Complain
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-cyan transition-colors">
                  Careers &amp; Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-2.5 items-start">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  House No. 68, Kadomtoli, Aganagar,
                  <br />
                  South Keraniganj, Dhaka-1310,
                  <br />
                  Bangladesh.
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.114-3.758-6.583-6.583l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a href="tel:+8801707009267" className="hover:text-brand-cyan transition-colors">
                  +880 1707-009267
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:info@m-aminnetwork.com"
                  className="hover:text-brand-cyan transition-colors"
                >
                  info@m-aminnetwork.com
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation and Badges */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Our Affiliations
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              We are a proud, active member of the Internet Service Providers Association of Bangladesh (ISPAB).
            </p>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-lg bg-brand-card border border-brand-border text-center flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest text-slate-300">
                  ISPAB MEMBER
                </span>
              </div>
              <div className="p-3 rounded-lg bg-brand-card border border-brand-border text-center flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest text-brand-cyan">
                  AS150164 BGP NETWORK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-brand-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} M Amin Network. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <span className="text-slate-400">Keraniganj ISP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
