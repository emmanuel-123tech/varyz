import Image from 'next/image';
import { Lock, Eye, ArrowRight, ShieldAlert } from 'lucide-react';
import { PROTOTYPE_SCREENS } from '@/lib/prototype-data';

interface PrototypePreviewProps {
  onOpenAccessModal: () => void;
}

export function PrototypePreview({ onOpenAccessModal }: PrototypePreviewProps) {
  // Publicly showcase exactly 4 strong screens
  const publicScreens = PROTOTYPE_SCREENS.filter((s) => s.isPublicPreview).slice(0, 4);

  return (
    <section id="prototype-preview" className="py-20 md:py-28 bg-varyz-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/30 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            Public Teaser Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See how Varyz works before it takes flight.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Below is a limited teaser of 4 public screens. To unlock and test the complete interactive prototype (20+ role-based screens), submit a brief access request.
          </p>
        </div>

        {/* 4 Teaser Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publicScreens.map((screen) => (
            <div
              key={screen.id}
              onClick={onOpenAccessModal}
              className="glass-panel glass-panel-hover rounded-2xl border border-white/10 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-950 border-b border-white/10 overflow-hidden">
                <Image
                  src={screen.imagePath}
                  alt={screen.title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-varyz-navy/90 border border-white/20 text-xs font-semibold text-varyz-lime backdrop-blur-md">
                  {screen.categoryLabel}
                </div>

                <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-varyz-lime text-varyz-navy text-xs font-bold shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public Teaser</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-varyz-lime transition-colors">
                  {screen.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {screen.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lock Banner Push for Complete Prototype Access */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-varyz-lime/30 bg-gradient-to-r from-varyz-navy-light via-varyz-navy to-varyz-navy-surface text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-varyz-lime/20 border border-varyz-lime/40 mx-auto flex items-center justify-center text-varyz-lime">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Unlock the Complete 20+ Screen Working Prototype
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Explore deep drone maintenance schedules, active telemetry video streams, AI disease model datasets, security incident logs, and client GIS asset download hubs.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenAccessModal}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime hover:scale-105"
            >
              <Lock className="w-4 h-4" />
              <span>Request Prototype Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
