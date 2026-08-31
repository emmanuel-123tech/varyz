'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-varyz-navy text-varyz-offwhite flex items-center justify-center p-6 bg-map-grid">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">System Exception</span>
          <h1 className="text-2xl font-extrabold text-white">Something Went Wrong</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            An unexpected error occurred while loading this view. Please try resetting the component or return home.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl font-semibold bg-white/5 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
