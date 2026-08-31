import Link from 'next/link';
import { ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | Varyz Drone Intelligence Platform',
  description: 'Varyz Terms of Use governing access to the website, prototype access tokens, and platform features.',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-varyz-navy text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-varyz-lime hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Varyz Homepage</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 text-xs font-mono font-bold text-varyz-lime">
            TERMS & CONDITIONS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Use</h1>
          <p className="text-sm text-slate-400">Last updated: August 16, 2026</p>
        </div>

        {/* Notice Banner */}
        <div className="glass-panel p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong>Prototype Testing Agreement:</strong> Access to the Varyz prototype workspace is provided strictly for evaluation, testing, and feedback purposes.
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 space-y-6 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By requesting access to or viewing the Varyz website and prototype workspace, you agree to comply with and be bound by these Terms of Use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Prototype License & Confidentiality</h2>
            <p>
              Varyz grants verified testers a non-exclusive, non-transferable, revocable license to access the interactive prototype workspace. The prototype contains proprietary user interface designs, visual assets, and operational workflows. Testers agree not to reverse engineer, reproduce, or redistribute prototype components without prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Access Token Security</h2>
            <p>
              Prototype access links contain unique single-user tokens. You are responsible for maintaining the confidentiality of your link and agree not to share your access token publicly. Varyz reserves the right to revoke access tokens at any time if unauthorized distribution is detected.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. User Responsibilities & Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Use automated scripts, bots, or scrapers to submit access request forms.</li>
              <li>Attempt to bypass rate limiting or security controls.</li>
              <li>Submit fraudulent, misleading, or abusive information.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Information to be Provided by Varyz Team Prior to Launch</h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
              <p>The following corporate parameters must be finalized prior to commercial contract deployment:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>[COMMERCIAL GOVERNING LAW & JURISDICTION]</li>
                <li>[LIMITATION OF LIABILITY LIABILITIES CAP]</li>
                <li>[SERVICE LEVEL AGREEMENT (SLA) DEFINITIONS]</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Inquiries</h2>
            <p>
              For questions concerning these Terms, contact{' '}
              <a href="mailto:terms@varyz.io" className="text-varyz-lime underline">terms@varyz.io</a>.
            </p>
          </section>

        </div>

        <div className="text-center text-xs text-slate-500 pt-4">
          © 2026 Varyz. All rights reserved.
        </div>

      </div>
    </div>
  );
}
