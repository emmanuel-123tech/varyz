import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Shield, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAccessModal: () => void;
}

export function Footer({ onOpenAccessModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-varyz-navy border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Radar Accent */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-varyz-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-varyz-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-varyz-lime/30 group-hover:border-varyz-lime transition-colors">
                <Image
                  src="/assets/logo.png"
                  alt="Varyz Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-varyz-lime transition-colors">
                  VARYZ
                </span>
                <span className="text-[10px] uppercase tracking-wider text-varyz-lime font-medium -mt-1">
                  Geo-Security & Agri-Intelligence
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Varyz is a drone intelligence and operational management platform that turns aerial information into clear, actionable decisions across drone operations, agriculture analysis, security surveillance, and client project reporting.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/usevarys?igsh=Ym5oZDF5ZHJzamt2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-varyz-lime hover:border-varyz-lime/40 transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/varyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-varyz-lime hover:border-varyz-lime/40 transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product & Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product & Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#product" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Operational Picture
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Problem & Solution
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#workspaces" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Role-Based Workspaces
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Prototype & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Access & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onOpenAccessModal}
                  className="text-varyz-lime hover:text-varyz-lime-bright font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Request Prototype Access</span>
                </button>
              </li>
              <li>
                <a href="#prototype-preview" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Public Prototype Preview
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-slate-400 hover:text-varyz-lime transition-colors">
                  Platform Benefits
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Privacy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-500 leading-relaxed">
                Varyz operates under strict data privacy protocols. Prototype access is restricted to verified testers.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Varyz. All rights reserved. Geo-Security & Agriculture Intelligence Platform.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-slate-400 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
