'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { RequestAccessModal } from '../modals/RequestAccessModal';

export function ExpiredTokenCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-varyz-navy flex items-center justify-center p-4 sm:p-6 bg-map-grid">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/30 text-center space-y-6 shadow-2xl bg-gradient-to-b from-varyz-navy-light to-varyz-navy">
        
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">Prototype Link Expired or Invalid</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            The prototype access token you provided is invalid or has expired after 30 days of inactivity.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-200">Need a fresh access link?</p>
          <p>Click below to request a new prototype access token sent directly to your email.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Request New Access Link</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl font-semibold bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </Link>
        </div>

      </div>

      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
