import { Network, Zap, LayoutGrid, Users2, FileBox, ShieldCheck } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Network,
      title: 'One Connected Operational Platform',
      description: 'Unify drone missions, telemetry feeds, agricultural intelligence, security alerts, and client reports in a single source of truth.',
    },
    {
      icon: Zap,
      title: 'Faster Understanding of Aerial Data',
      description: 'Automated index processing transforms raw orthomosaic imagery into instant NDVI maps, soil moisture zonation, and threat alerts.',
    },
    {
      icon: LayoutGrid,
      title: 'Clear Role-Based Workspaces',
      description: 'Eliminate UI confusion with interfaces engineered specifically for drone operators, agronomists, security teams, and executive clients.',
    },
    {
      icon: Users2,
      title: 'Better Team Coordination',
      description: 'Connect field pilots with remote data analysts and security officers using synced inspection notes, alerts, and task tracking.',
    },
    {
      icon: FileBox,
      title: 'Organised Reports & Downloads',
      description: 'Instant searchable archives for GeoTIFF maps, KML boundaries, ZIP bundles, and one-click executive PDF summaries.',
    },
    {
      icon: ShieldCheck,
      title: 'More Informed Field Decisions',
      description: 'Empower field teams to make immediate interventions backed by verified agronomic indices, thermal anomaly logs, and AI models.',
    },
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-varyz-navy-light/20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/20 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            Why Choose Varyz
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Platform Benefits
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Designed from the ground up to solve real operational friction in aerial intelligence and multi-team field coordination.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-7 rounded-2xl border border-white/10 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-varyz-lime/10 border border-varyz-lime/20 flex items-center justify-center text-varyz-lime group-hover:bg-varyz-lime group-hover:text-varyz-navy transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-varyz-lime transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
