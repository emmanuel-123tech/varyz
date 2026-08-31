import { Compass, Cpu, FileCheck2, ShieldAlert } from 'lucide-react';

export function ProductIntro() {
  const highlights = [
    {
      icon: Compass,
      title: 'Mission Planning',
      description: 'Structured waypoint flight grids, altitude controls, and real-time RTK signal verification.',
    },
    {
      icon: Cpu,
      title: 'Aerial Analytics',
      description: 'Automated NDVI index generation, soil moisture zonation, and crop health scoring.',
    },
    {
      icon: ShieldAlert,
      title: 'Security Surveillance',
      description: 'Thermal detection overlays, movement tracking, and automated perimeter threat alerts.',
    },
    {
      icon: FileCheck2,
      title: 'Actionable Reporting',
      description: 'Instant GIS asset downloads, PDF executive summaries, and stakeholder updates.',
    },
  ];

  return (
    <section id="product" className="py-20 md:py-28 bg-varyz-navy-light/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/20 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            Product Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One operational picture. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              From above to action.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Collecting aerial data is only the beginning. Varyz helps teams organise missions, understand what the data reveals and turn findings into clear actions, reports and updates.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-varyz-lime/10 border border-varyz-lime/20 flex items-center justify-center text-varyz-lime group-hover:bg-varyz-lime group-hover:text-varyz-navy transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-varyz-lime transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
