import Image from 'next/image';
import { PrototypeScreen } from '@/types';
import { Maximize2, CheckCircle2 } from 'lucide-react';

interface ScreenGridProps {
  screens: PrototypeScreen[];
  onSelectScreen: (screen: PrototypeScreen) => void;
}

export function ScreenGrid({ screens, onSelectScreen }: ScreenGridProps) {
  if (screens.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl border border-white/10 max-w-md mx-auto space-y-3">
        <p className="text-base text-slate-300 font-medium">No screens available for this workspace category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {screens.map((screen) => (
        <div
          key={screen.id}
          onClick={() => onSelectScreen(screen)}
          className="glass-panel glass-panel-hover rounded-2xl border border-white/10 overflow-hidden cursor-pointer group flex flex-col justify-between"
        >
          {/* Screenshot Container with Aspect Ratio Preservation */}
          <div className="relative aspect-[16/10] w-full bg-slate-950 border-b border-white/10 overflow-hidden">
            <Image
              src={screen.imagePath}
              alt={screen.title}
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
            />

            {/* Hover Expand Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-varyz-lime text-varyz-navy font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize2 className="w-4 h-4" />
                <span>Open Large Preview</span>
              </div>
            </div>

            {/* Category Tag */}
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-varyz-navy/90 border border-white/20 text-[11px] font-semibold text-varyz-lime backdrop-blur-md">
              {screen.categoryLabel}
            </div>
          </div>

          {/* Details Footer */}
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white group-hover:text-varyz-lime transition-colors">
                {screen.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {screen.description}
              </p>
            </div>

            {/* Key Capabilities List */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                Key Features:
              </span>
              <ul className="space-y-1">
                {screen.keyFeatures.slice(0, 2).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-varyz-lime shrink-0" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
