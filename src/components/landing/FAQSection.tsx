'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Varyz?',
      answer: 'Varyz is an enterprise drone intelligence and operational management platform that unifies aerial data collection, automated GIS processing (NDVI, soil moisture, thermal), security surveillance, and client project reporting into one connected operational picture.',
    },
    {
      question: 'Who is Varyz built for?',
      answer: 'Varyz is built for four primary user groups: Drone Operators managing flight missions and hardware, Agriculture Analysts conducting crop health and planting suitability research, Security Analysts monitoring perimeter threats and thermal hotspots, and Clients or Project Viewers who need high-level visibility and report downloads.',
    },
    {
      question: 'What can Varyz be used for?',
      answer: 'Varyz supports autonomous mission planning, live flight telemetry monitoring, drone hardware fleet maintenance, raw data ingestion, agricultural NDVI vegetation mapping, crop disease AI model curation, field agronomist observations, security threat tracking, and automated client PDF/GeoTIFF report generation.',
    },
    {
      question: 'Do I need technical drone experience?',
      answer: 'No. While drone pilots benefit from advanced waypoint planning and RTK telemetry controls, analysts and client viewers interact with intuitive, role-tailored dashboards that present insights clearly without requiring technical drone operating expertise.',
    },
    {
      question: 'Is the prototype free to test?',
      answer: 'Yes! Prototype access is free for invited testers, partners, and industry stakeholders. Submitting an access request grants you access to explore all 20+ role-based working prototype screens.',
    },
    {
      question: 'What happens after I request access?',
      answer: 'Once you submit the access request form, our system validates your information, creates a secure access token, and instantly sends a private link to your email address. Clicking that link unlocks full access to the interactive prototype workspace.',
    },
    {
      question: 'Can different teams use Varyz together?',
      answer: 'Absoluty. Varyz is explicitly architected for multi-team coordination. Field operators, remote agricultural scientists, security officers, and client executives all access role-scoped views of the exact same underlying mission data.',
    },
    {
      question: 'How is my information handled?',
      answer: 'Your submission details are stored securely in our database under strict data privacy protocols. We do not sell or share tester information with third parties. You can read our full Privacy Policy for complete details.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-varyz-navy relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/20 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about Varyz and how to access the prototype.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  id={headerId}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-varyz-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-varyz-lime"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-varyz-lime shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-6 pb-6 text-sm text-slate-300 leading-relaxed animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
