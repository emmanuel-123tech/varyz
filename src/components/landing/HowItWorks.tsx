import { Camera, BrainCircuit, CheckCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenAccessModal: () => void;
}

export function HowItWorks({ onOpenAccessModal }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Capture',
      tagline: 'Plan & Collect',
      description: 'Plan the mission and collect reliable aerial information using autonomous waypoints, RTK GPS telemetry, and calibrated multi-spectral payload sensors.',
      icon: Camera,
      badgeColor: 'from-blue-500 to-cyan-400',
    },
    {
      number: '02',
      title: 'Understand',
      tagline: 'Analyze & Extract',
      description: 'Transform imagery and operational data into useful maps, alerts, insights and reports. Process automated NDVI indices, thermal anomaly logs, and planting suitability zonation.',
      icon: BrainCircuit,
      badgeColor: 'from-varyz-lime to-emerald-400',
    },
    {
      number: '03',
      title: 'Act',
      tagline: 'Share & Execute',
      description: 'Share findings, make decisions and keep stakeholders updated. Export GeoTIFF datasets, issue agronomist irrigation plans, deploy security patrols, and deliver client briefs.',
      icon: CheckCheck,
      badgeColor: 'from-varyz-purple to-purple-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-varyz-navy-light/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/20 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            Operational Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Varyz Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A three-step workflow designed to transform complex aerial data collection into decisive, real-world execution.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-varyz-lime/30 to-varyz-purple/20 -translate-y-6 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 relative z-10 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.badgeColor} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-varyz-navy rounded-[14px] flex items-center justify-center text-white">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <span className="text-3xl font-black font-mono text-white/20">
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-varyz-lime">
                      {step.tagline}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-xs font-mono text-slate-400">
                    Step {idx + 1} of 3 in Varyz Loop
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Push */}
        <div className="text-center pt-6">
          <button
            onClick={onOpenAccessModal}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold bg-varyz-lime text-varyz-navy hover:bg-varyz-lime-bright transition-all shadow-glow-lime hover:scale-105"
          >
            <span>Test the Complete Prototype Workflow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
