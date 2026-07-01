import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          Corporate Profile
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            M Amin Network
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
          Discover our history, network infrastructure capabilities, and why we are South Keraniganj&apos;s most trusted broadband provider.
        </p>
      </div>

      <div className="space-y-16">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Operating our own Autonomous System Number (**AS150164**), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
              <h3 className="text-white font-bold text-base">Key Credentials</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2.5">
                  <span className="text-xs text-slate-400">License Authority</span>
                  <span className="text-xs font-bold text-white uppercase">BTRC Bangladesh</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2.5">
                  <span className="text-xs text-slate-400">ISP Association Membership</span>
                  <span className="text-xs font-bold text-white">ISPAB Active Member</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2.5">
                  <span className="text-xs text-slate-400">Autonomous System (ASN)</span>
                  <span className="text-xs font-bold text-brand-cyan font-mono">AS150164</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2.5">
                  <span className="text-xs text-slate-400">Service Coverage</span>
                  <span className="text-xs font-bold text-white">South Keraniganj, Dhaka</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Line Configuration</span>
                  <span className="text-xs font-bold text-emerald-400">100% Fiber (FTTH)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Infrastructure highlights */}
        <section className="space-y-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Infrastructure Powerhouse</h2>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">
              We leverage modern networking standards to maintain steady throughput, routing, and uptime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "BGP Multi-Homing Routing",
                desc: "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
              },
              {
                title: "Local Exchange Peering",
                desc: "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ),
              },
              {
                title: "24/7 On-Field Dispatch",
                desc: "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((infra, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-brand-card/50 border border-brand-border/60 glass-panel glass-panel-hover flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/20">
                  {infra.icon}
                </div>
                <h4 className="text-lg font-bold text-white tracking-wide">{infra.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{infra.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Integrity pledge */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-blue/20 via-brand-dark to-brand-cyan/15 border border-brand-border/80 text-center relative overflow-hidden glass-panel">
          <div className="absolute inset-0 bg-brand-blue/5 animate-pulse-slow pointer-events-none" />
          <h3 className="text-2xl font-extrabold text-white mb-4">Our Integrity Guarantee</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all cursor-pointer"
            >
              Explore Packages
            </Link>
            <Link
              href="/support"
              className="bg-brand-card hover:bg-brand-border/60 border border-brand-border text-white px-8 py-3 rounded-xl text-sm font-bold transition-all"
            >
              Support Center
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
