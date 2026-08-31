import Image from 'next/image';
import { Plane, Sprout, ShieldCheck, FolderKanban, Check, ArrowRight } from 'lucide-react';

interface CoreCapabilitiesProps {
  onOpenAccessModal: () => void;
}

export function CoreCapabilities({ onOpenAccessModal }: CoreCapabilitiesProps) {
  const capabilities = [
    {
      id: 'drone-ops',
      icon: Plane,
      category: 'Drone Operations',
      title: 'Mission Planning, Fleet Hardware & Flight Management',
      description: 'Streamline the full lifecycle of drone operations. From configuring automated waypoint flight grids with RTK precision to tracking drone hardware health and payload maintenance.',
      bullets: [
        'Interactive Satellite Waypoint Path & Grid Planning',
        'Real-time Active Flight Telemetry & Emergency Controls',
        'Hardware Fleet Inventory (VTOL-X6, RTK Lock, Battery Health)',
        'Payload Calibration Schedules & Data Ingestion Pipeline'
      ],
      image: '/assets/drone/plan-mission.png',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'agri-intel',
      icon: Sprout,
      category: 'Agricultural Intelligence',
      title: 'NDVI Vegetation Maps & Crop Condition Monitoring',
      description: 'Transform satellite and drone imagery into actionable agronomic insights. Monitor crop vigor, delineate soil moisture zonation, curate AI disease samples, and direct field interventions.',
      bullets: [
        'High-Resolution NDVI & Vegetation Health Overlays',
        'Planting Suitability Zonation (Soil Moisture, Slope Gradient)',
        'Agronomist Field Notes with Photo Inspection Attachments',
        'AI Crop Disease Sample Labeling & Dataset Curation'
      ],
      image: '/assets/agriculture/ndvi-vegetation.png',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'security-mon',
      icon: ShieldCheck,
      category: 'Security Monitoring',
      title: 'Perimeter Surveillance & Threat Detection',
      description: 'Deploy dark-themed tactical command dashboards for security analysts. Monitor patrol routes, analyze thermal hotspots, detect unauthorized movement, and investigate threat zones.',
      bullets: [
        'Live Surveillance Map with Patrol Route Overlays',
        'Thermal Hotspot & Movement Incident Alerts',
        'Threat Zone Classification & Patrol Mission Logs',
        'Instant Security Summary Briefings'
      ],
      image: '/assets/security/overview.png',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'projects-reporting',
      icon: FolderKanban,
      category: 'Projects & Reporting',
      title: 'Client Visibility & Executive GIS Downloads',
      description: 'Empower project managers and external stakeholders with transparent project tracking, interactive map viewers, searchable report repositories, and raw GIS asset downloads.',
      bullets: [
        'Multi-Project Portfolio Views across Agriculture & Environment',
        'Interactive Map Layer Controls (RGB Orthomosaic, NDVI)',
        'Instant GIS Asset Downloads (GeoTIFF, KML, ZIP, CSV)',
        'Searchable Report Archive with One-Click PDF Exports'
      ],
      image: '/assets/client/overview.png',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-varyz-navy-light/20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-purple/10 border border-varyz-purple/30 text-xs font-bold text-varyz-purple-light uppercase tracking-wider">
            Platform Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for the entire operational spectrum.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Engineered with dedicated capability modules designed to meet the exact requirements of pilot operators, remote analysts, and client executives.
          </p>
        </div>

        {/* Feature Sections alternating left / right */}
        {capabilities.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={item.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content Side */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:pr-6' : 'lg:order-2 lg:pl-6'}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-bold ${item.badgeColor}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {item.title}
                </h3>

                <p className="text-base text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-3 pt-2">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-varyz-lime/10 border border-varyz-lime/30 flex items-center justify-center text-varyz-lime shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <button
                    onClick={onOpenAccessModal}
                    className="inline-flex items-center gap-2 text-sm font-bold text-varyz-lime hover:text-varyz-lime-bright transition-colors group"
                  >
                    <span>Request prototype access for {item.category}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Screenshot Preview Side */}
              <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-1'}`}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-varyz-navy via-transparent to-transparent opacity-30 z-10" />
                  <div className="relative aspect-[16/10] w-full bg-slate-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-varyz-navy/90 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
                    Actual Varyz Prototype Interface
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
