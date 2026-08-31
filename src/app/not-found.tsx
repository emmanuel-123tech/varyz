import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-varyz-navy text-varyz-offwhite flex items-center justify-center p-6 bg-map-grid">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-varyz-lime/10 border border-varyz-lime/30 text-varyz-lime flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-varyz-lime uppercase tracking-wider">404 Error</span>
          <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            The aerial coordinates or page location you are attempting to access does not exist on Varyz.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
