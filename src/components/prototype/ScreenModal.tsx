'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PrototypeScreen } from '@/types';
import { X, ChevronLeft, ChevronRight, CheckCircle2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ScreenModalProps {
  screen: PrototypeScreen | null;
  allScreens: PrototypeScreen[];
  onClose: () => void;
  onSelectScreen: (screen: PrototypeScreen) => void;
}

export function ScreenModal({ screen, allScreens, onClose, onSelectScreen }: ScreenModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [screen]);

  useEffect(() => {
    if (!screen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, allScreens]);

  if (!screen) return null;

  const currentIndex = allScreens.findIndex((s) => s.id === screen.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectScreen(allScreens[currentIndex - 1]);
    } else {
      onSelectScreen(allScreens[allScreens.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allScreens.length - 1) {
      onSelectScreen(allScreens[currentIndex + 1]);
    } else {
      onSelectScreen(allScreens[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Lightbox Wrapper */}
      <div className="relative w-full max-w-6xl max-h-[92vh] glass-panel rounded-3xl border border-white/20 bg-varyz-navy-light/95 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-varyz-navy">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 text-xs font-bold text-varyz-lime">
              {screen.categoryLabel}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
              {screen.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-1 mr-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-300 px-2">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2))}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Close Preview (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Content (Image + Explanation Panel) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-varyz-navy/90 border border-white/20 text-white hover:bg-varyz-lime hover:text-varyz-navy transition-all shadow-xl hover:scale-110"
            title="Previous Screen (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-[360px] top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-varyz-navy/90 border border-white/20 text-white hover:bg-varyz-lime hover:text-varyz-navy transition-all shadow-xl hover:scale-110"
            title="Next Screen (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Screenshot Display Panel */}
          <div className="lg:col-span-8 p-4 sm:p-6 bg-slate-950 flex items-center justify-center min-h-[400px] overflow-auto relative">
            <div
              className="relative w-full max-w-full transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
              <img
                src={screen.imagePath}
                alt={screen.title}
                className="w-full h-auto object-contain max-h-[70vh] rounded-xl border border-white/10 shadow-2xl mx-auto"
              />
            </div>
          </div>

          {/* Screen Explanation & Capabilities Sidebar */}
          <div className="lg:col-span-4 p-6 bg-varyz-navy-light space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-white/10 pb-3">
                <span>SCREEN {currentIndex + 1} OF {allScreens.length}</span>
                <span>Use ← → keys to navigate</span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{screen.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{screen.description}</p>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-varyz-lime">
                  Key Module Capabilities:
                </h4>
                <ul className="space-y-2">
                  {screen.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-varyz-lime shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {currentIndex + 1} / {allScreens.length}
              </span>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
