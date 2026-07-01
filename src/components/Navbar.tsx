"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Internet Packages", href: "/packages" },
    { name: "About Us", href: "/about" },
    { name: "Special Offers", href: "/offers" },
    { name: "Coverage Area", href: "/coverage" },
    { name: "FTP & Multimedia", href: "/multimedia" },
    { name: "Diagnostics & Support", href: "/support" },
    { name: "Quick Pay", href: "/bill-payment" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/80 backdrop-blur-md border-b border-brand-border/60 py-3 shadow-lg shadow-brand-dark/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-brand-dark font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wide leading-none group-hover:text-brand-cyan transition-colors">
                  M AMIN
                </span>
                <span className="text-brand-cyan text-xs font-semibold tracking-widest leading-none mt-1">
                  NETWORK
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 hover:text-brand-cyan relative py-1 ${
                    isActive ? "text-brand-cyan font-semibold" : "text-slate-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Client Portal Button */}
          <div className="hidden lg:block">
            <Link
              href="/portal"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold text-white rounded-xl group bg-gradient-to-br from-brand-blue to-brand-cyan group-hover:from-brand-blue group-hover:to-brand-cyan hover:text-white focus:ring-2 focus:outline-none focus:ring-brand-cyan/50 transition-all cursor-pointer"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-brand-dark rounded-x[10px] group-hover:bg-opacity-0">
                Client Portal
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-brand-border/40 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-brand-dark/95 border-b border-brand-border/60 backdrop-blur-lg px-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-brand-blue/20 text-brand-cyan border-l-4 border-brand-cyan"
                    : "text-slate-300 hover:bg-brand-border/30 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 border-t border-brand-border/40 mt-4">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-base font-semibold shadow-lg shadow-brand-blue/20"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
