'use client';

import Image from 'next/image';
import { ArrowRight, Lock, ShieldCheck, Activity, Layers, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onOpenAccessModal: () => void;
}

export function HeroSection({ onOpenAccessModal }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-map-grid">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-gradient rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-varyz-lime/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pill Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-varyz-lime/30 text-xs font-semibold text-varyz-lime-bright backdrop-blur-md shadow-glow-lime animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-varyz-lime animate-ping" />
            <span>Geo-Security & Agriculture Drone Platform</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Turn drone data into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-varyz-lime via-varyz-lime-bright to-emerald-300">
              decisions that move.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Varyz connects drone missions, aerial analysis, agricultural intelligence, security monitoring and project reporting in one clear platform.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenAccessModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime hover:scale-[1.03] active:scale-[0.98]"
            >
              <Lock className="w-5 h-5" />
              <span>Request Prototype Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              <span>See How Varyz Works</span>
            </a>
          </div>

          {/* Key Value Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-varyz-lime" />
              <span>Role-Based Secure Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-varyz-lime" />
              <span>Real-Time Telemetry & NDVI</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-varyz-lime" />
              <span>Multi-Source Aerial Analytics</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Hero Screenshot */}
        <div className="mt-14 relative max-w-5xl mx-auto group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-varyz-lime/30 via-varyz-purple/30 to-emerald-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-varyz-navy-light shadow-2xl">
            {/* Top Browser Toolbar Mockup */}
            <div className="bg-varyz-navy px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                <MapPin className="w-3 h-3 text-varyz-lime" />
                <span>varyz.io/app/dashboard</span>
              </div>
              <div className="text-xs font-mono text-varyz-lime">LIVE PREVIEW</div>
            </div>

            {/* Main Screenshot Container */}
            <div className="relative w-full aspect-[16/9] bg-slate-950">
              <Image
                src="/assets/hero-dashboard.png"
                alt="Varyz Operational Intelligence Dashboard"
                fill
                className="object-cover object-top hover:scale-[1.01] transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
