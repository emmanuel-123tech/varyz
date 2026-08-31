'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProductIntro } from '@/components/landing/ProductIntro';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { CoreCapabilities } from '@/components/landing/CoreCapabilities';
import { RoleWorkspaces } from '@/components/landing/RoleWorkspaces';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PrototypePreview } from '@/components/landing/PrototypePreview';
import { Benefits } from '@/components/landing/Benefits';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { RequestAccessModal } from '@/components/modals/RequestAccessModal';

export default function HomePage() {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const handleOpenAccessModal = () => {
    setIsAccessModalOpen(true);
  };

  const handleCloseAccessModal = () => {
    setIsAccessModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-varyz-navy text-varyz-offwhite flex flex-col selection:bg-varyz-lime selection:text-varyz-navy">
      {/* Sticky Header */}
      <Header onOpenAccessModal={handleOpenAccessModal} />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        <HeroSection onOpenAccessModal={handleOpenAccessModal} />
        <ProductIntro />
        <ProblemSolution onOpenAccessModal={handleOpenAccessModal} />
        <CoreCapabilities onOpenAccessModal={handleOpenAccessModal} />
        <RoleWorkspaces onOpenAccessModal={handleOpenAccessModal} />
        <HowItWorks onOpenAccessModal={handleOpenAccessModal} />
        <PrototypePreview onOpenAccessModal={handleOpenAccessModal} />
        <Benefits />
        <FAQSection />
        <FinalCTA onOpenAccessModal={handleOpenAccessModal} />
      </main>

      {/* Footer */}
      <Footer onOpenAccessModal={handleOpenAccessModal} />

      {/* Prototype Access Request Modal */}
      <RequestAccessModal
        isOpen={isAccessModalOpen}
        onClose={handleCloseAccessModal}
      />
    </div>
  );
}
