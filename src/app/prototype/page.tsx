'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RoleWorkspaceType, PrototypeScreen, AccessTokenRecord } from '@/types';
import { PROTOTYPE_SCREENS } from '@/lib/prototype-data';
import { PrototypeHeader } from '@/components/prototype/PrototypeHeader';
import { RoleFilterTabs } from '@/components/prototype/RoleFilterTabs';
import { ScreenGrid } from '@/components/prototype/ScreenGrid';
import { ScreenModal } from '@/components/prototype/ScreenModal';
import { ExpiredTokenCard } from '@/components/prototype/ExpiredTokenCard';
import { FeedbackModal } from '@/components/modals/FeedbackModal';
import { Loader2 } from 'lucide-react';

function PrototypeContent() {
  const searchParams = useSearchParams();
  const tokenStr = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenRecord, setTokenRecord] = useState<AccessTokenRecord | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleWorkspaceType>('all');
  const [activeModalScreen, setActiveModalScreen] = useState<PrototypeScreen | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    async function checkToken() {
      if (!tokenStr) {
        setIsLoading(false);
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch(`/api/validate-token?token=${encodeURIComponent(tokenStr)}`);
        const data = await response.json();

        if (data.isValid) {
          setIsValidToken(true);
          setTokenRecord(data.tokenRecord);
        } else {
          setIsValidToken(false);
        }
      } catch (err) {
        console.error('Token validation failed:', err);
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkToken();
  }, [tokenStr]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<RoleWorkspaceType, number> = {
      all: PROTOTYPE_SCREENS.length,
      'drone-operator': 0,
      'agriculture-analyst': 0,
      'security-analyst': 0,
      'client-viewer': 0,
    };

    PROTOTYPE_SCREENS.forEach((s) => {
      if (counts[s.category] !== undefined) {
        counts[s.category] += 1;
      }
    });

    return counts;
  }, []);

  // Filter screens by role
  const filteredScreens = useMemo(() => {
    if (selectedRole === 'all') return PROTOTYPE_SCREENS;
    return PROTOTYPE_SCREENS.filter((s) => s.category === selectedRole);
  }, [selectedRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-varyz-navy flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-varyz-lime animate-spin" />
        <p className="text-sm font-mono text-slate-300">Validating Secure Prototype Access Token...</p>
      </div>
    );
  }

  if (!isValidToken || !tokenRecord) {
    return <ExpiredTokenCard />;
  }

  return (
    <div className="min-h-screen bg-varyz-navy text-varyz-offwhite flex flex-col">
      {/* Workspace Header */}
      <PrototypeHeader
        email={tokenRecord.email}
        onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        
        {/* Workspace Title & Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 text-xs font-mono font-bold text-varyz-lime">
            Interactive Working Prototype
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Varyz Operational Workspace Viewer
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Select a role workspace below to inspect real application screens. Click any thumbnail to launch the full-screen interactive viewer with keyboard navigation.
          </p>
        </div>

        {/* Role Filter Tabs */}
        <RoleFilterTabs
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          counts={categoryCounts}
        />

        {/* Screen Grid */}
        <ScreenGrid
          screens={filteredScreens}
          onSelectScreen={setActiveModalScreen}
        />
      </main>

      {/* Footer info bar */}
      <footer className="border-t border-white/10 py-6 bg-varyz-navy-light text-center text-xs text-slate-500">
        <p>© Varyz Protected Prototype Workspace. Confidential & Proprietary.</p>
      </footer>

      {/* Fullscreen Lightbox Modal */}
      <ScreenModal
        screen={activeModalScreen}
        allScreens={filteredScreens}
        onClose={() => setActiveModalScreen(null)}
        onSelectScreen={setActiveModalScreen}
      />

      {/* Tester Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        token={tokenRecord.token}
        email={tokenRecord.email}
      />
    </div>
  );
}

export default function PrototypePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-varyz-navy flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-varyz-lime animate-spin" />
          <p className="text-sm font-mono text-slate-300">Loading Prototype Workspace...</p>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
