import Link from 'next/link';
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Varyz Drone Intelligence Platform',
  description: 'Varyz Privacy Policy governing prototype access requests, data collection, and privacy standards.',
};

export default function PrivacyPolicyPage() {
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
            LEGAL COMPLIANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: August 16, 2026</p>
        </div>

        {/* Highlight Banner */}
        <div className="glass-panel p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong>Notice to Reviewers:</strong> This policy applies to prototype testing and access requests for the Varyz platform. Formal corporate address and legal jurisdiction entities are marked below as placeholders to be specified by the Varyz founding team prior to public commercial deployment.
          </div>
        </div>

        {/* Main Legal Content */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 space-y-6 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Overview</h2>
            <p>
              Varyz ("we", "us", or "our") respects your privacy and is committed to protecting the personal data collected through our landing page, prototype access request forms, and interactive prototype workspace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>When you request prototype access or submit tester feedback, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>Contact Information:</strong> Full name, email address, organisation name, and job title/role.</li>
              <li><strong>Usage Parameters:</strong> Primary use case (e.g., Agriculture, Security, Drone Operations), country, and testing goals.</li>
              <li><strong>Feedback Submissions:</strong> Ratings, workspace feature reviews, and improvement suggestions.</li>
              <li><strong>Technical Logs:</strong> IP address, browser type, access token timestamps, and session activity logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p>We use collected information solely to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Provision secure prototype access links and authenticate authorized testers.</li>
              <li>Communicate platform updates, bug fixes, and feature testing rounds.</li>
              <li>Analyze tester feedback to improve Varyz user interfaces and operational workflows.</li>
              <li>Prevent unauthorized access and enforce rate limiting controls.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Data Storage & Security</h2>
            <p>
              Submissions are stored in database tables hosted on Supabase with Row Level Security (RLS) policies enabled. Access tokens are encrypted and set to expire after 30 days. We do not sell, rent, or trade your personal information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Information to be Provided by Varyz Team Prior to Commercial Launch</h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
              <p>The following items must be filled in with official company credentials prior to public production deployment:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>[VARYZ LEGAL ENTITY NAME]</li>
                <li>[REGISTERED CORPORATE ADDRESS]</li>
                <li>[DATA PROTECTION OFFICER CONTACT EMAIL]</li>
                <li>[GOVERNING JURISDICTION / COUNTRY OF INCORPORATION]</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request deletion of your tester profile, please reach out to us at{' '}
              <a href="mailto:privacy@varyz.io" className="text-varyz-lime underline">privacy@varyz.io</a>.
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
