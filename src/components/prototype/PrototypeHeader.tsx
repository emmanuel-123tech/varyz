import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, MessageSquare, ArrowLeft } from 'lucide-react';

interface PrototypeHeaderProps {
  email: string;
  onOpenFeedbackModal: () => void;
}

export function PrototypeHeader({ email, onOpenFeedbackModal }: PrototypeHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-varyz-navy/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand & Exit Link */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Return to Public Landing Page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-varyz-lime/30">
              <Image src="/assets/logo.png" alt="Varyz Logo" fill className="object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">VARYZ</span>
                <span className="px-2 py-0.5 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 text-[10px] font-mono font-bold text-varyz-lime">
                  PROTOTYPE WORKSPACE
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Authorized Tester: <strong className="text-slate-200">{email}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Security Badge & Feedback Button */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Token Access Active</span>
          </div>

          <button
            onClick={onOpenFeedbackModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-varyz-purple text-white hover:bg-varyz-purple-light transition-all shadow-glow-purple"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </div>

      </div>
    </header>
  );
}
