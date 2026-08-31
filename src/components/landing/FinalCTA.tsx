import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenAccessModal: () => void;
}

export function FinalCTA({ onOpenAccessModal }: FinalCTAProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-varyz-navy-light/40 to-varyz-navy border-t border-white/5 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-varyz-lime/10 via-varyz-purple/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-white/15 space-y-8 shadow-2xl bg-gradient-to-br from-varyz-navy-light/90 via-varyz-navy/95 to-varyz-navy-surface">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Tester Access Open</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to see aerial intelligence differently?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Request access and explore how Varyz connects missions, information and decisions.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAccessModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl text-base font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime hover:scale-105 active:scale-95"
            >
              <Lock className="w-5 h-5" />
              <span>Get Prototype Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            Instant email delivery • 30-day full prototype access • Dedicated tester feedback portal
          </p>

        </div>
      </div>
    </section>
  );
}
