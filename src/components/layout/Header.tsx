'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Instagram, Linkedin, Lock, ChevronRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAccessModal: () => void;
}

export function Header({ onOpenAccessModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for creative highlight
      const sections = ['product', 'solutions', 'workspaces', 'how-it-works', 'prototype-preview', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product', href: '#product', id: 'product' },
    { label: 'Solutions', href: '#solutions', id: 'solutions' },
    { label: 'Workspaces', href: '#workspaces', id: 'workspaces' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Prototype', href: '#prototype-preview', id: 'prototype-preview' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/usevarys?igsh=Ym5oZDF5ZHJzamt2',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/varyz/',
      icon: Linkedin,
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Add glowing pulse highlight animation to target section heading
      element.classList.add('ring-2', 'ring-varyz-lime', 'ring-offset-8', 'ring-offset-varyz-navy', 'rounded-3xl', 'transition-all', 'duration-700');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-varyz-lime', 'ring-offset-8', 'ring-offset-varyz-navy', 'rounded-3xl');
      }, 1500);

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-varyz-navy/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Varyz Logo with Pulse animation */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-varyz-lime/40 bg-varyz-navy-light group-hover:border-varyz-lime transition-all duration-300 shadow-glow-lime">
              <Image
                src="/assets/logo.png"
                alt="Varyz Logo"
                fill
                className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-varyz-lime transition-colors">
                VARYZ
              </span>
              <span className="text-[10px] uppercase tracking-wider text-varyz-lime font-medium -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-varyz-lime animate-ping" />
                Drone Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active Indicator Pills */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md shadow-inner" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-varyz-lime text-varyz-navy shadow-glow-lime scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-varyz-lime" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Social Links & CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-varyz-lime transition-all p-2 rounded-xl hover:bg-white/10 hover:scale-110"
                    aria-label={`Visit Varyz on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <button
              onClick={onOpenAccessModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-varyz-lime to-varyz-lime-bright text-varyz-navy hover:shadow-glow-lime transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Request Prototype Access</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onOpenAccessModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all"
            >
              Access
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-varyz-navy-light/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 animate-in slide-in-from-top-2">
          <div className="px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-varyz-lime/20 text-varyz-lime border border-varyz-lime/30'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 space-y-4 border-t border-white/10">
              <div className="flex items-center justify-center space-x-6 py-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-varyz-lime"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccessModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime"
              >
                <Lock className="w-4 h-4" />
                <span>Request Prototype Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
