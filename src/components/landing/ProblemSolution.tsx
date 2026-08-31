import { XCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ProblemSolutionProps {
  onOpenAccessModal: () => void;
}

export function ProblemSolution({ onOpenAccessModal }: ProblemSolutionProps) {
  const items = [
    {
      problem: 'Scattered mission information across disconnected chat logs and SD cards.',
      solution: 'Centralized mission hub linking flight logs, raw GeoTIFFs, telemetry, and hardware records in one place.',
    },
    {
      problem: 'Difficult-to-interpret raw aerial imagery requiring complex GIS software.',
      solution: 'Automated index processing (NDVI, soil moisture, elevation maps) with clear color-coded legends.',
    },
    {
      problem: 'Disconnected field operators and remote agricultural/security analysts.',
      solution: 'Real-time collaborative workspaces with synced field observation notes and sample curation.',
    },
    {
      problem: 'Poor client visibility into mission progress and project deliverables.',
      solution: 'Dedicated client portal with interactive map layer viewers, project status, and asset libraries.',
    },
    {
      problem: 'Slow reporting and delayed decision-making resulting in crop loss or security gaps.',
      solution: 'Instant automated report generation with one-click PDF summaries and high-priority alert triggers.',
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-28 bg-varyz-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-wider">
            Operational Challenges & Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging the gap between <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-varyz-lime">
              raw drone data and field execution.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Drones capture massive volumes of aerial imagery, but legacy workflows leave teams drowning in unorganized files. Here is how Varyz transforms chaos into clarity.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center hover:border-varyz-lime/30 transition-colors"
            >
              {/* Problem Column */}
              <div className="flex items-start space-x-3 bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    Traditional Bottleneck
                  </span>
                  <p className="text-sm font-medium text-slate-200">
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* Solution Column */}
              <div className="flex items-start space-x-3 bg-varyz-lime/5 p-4 rounded-xl border border-varyz-lime/20">
                <CheckCircle2 className="w-5 h-5 text-varyz-lime shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-varyz-lime block mb-1">
                    The Varyz Solution
                  </span>
                  <p className="text-sm font-medium text-slate-100">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA push */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAccessModal}
            className="inline-flex items-center gap-2 text-sm font-bold text-varyz-lime hover:text-varyz-lime-bright transition-colors"
          >
            <span>Explore how Varyz streamlines your specific operations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
