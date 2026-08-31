import Image from 'next/image';
import { Plane, Sprout, ShieldAlert, Users, ArrowUpRight } from 'lucide-react';

interface RoleWorkspacesProps {
  onOpenAccessModal: () => void;
}

export function RoleWorkspaces({ onOpenAccessModal }: RoleWorkspacesProps) {
  const roles = [
    {
      id: 'drone-operator',
      title: 'Drone Operator',
      subtitle: 'Flight Operations & Hardware Control',
      description: 'Plan flight grids, monitor live drone telemetry, check RTK signal stability, manage payload hardware, and upload raw aerial logs.',
      icon: Plane,
      image: '/assets/drone/overview.png',
      screensCount: '8 Specialized Screens',
      tags: ['Waypoint Flight Planner', 'Live Video Feed', 'Fleet Maintenance', 'Data Ingestion'],
    },
    {
      id: 'agriculture-analyst',
      title: 'Agriculture Analyst',
      subtitle: 'Crop Health & Agronomic Intelligence',
      description: 'Analyze high-res NDVI vegetation indices, track soil moisture zonation, evaluate planting suitability, and curate AI crop disease datasets.',
      icon: Sprout,
      image: '/assets/agriculture/overview.png',
      screensCount: '8 Analytics Screens',
      tags: ['NDVI Overlays', 'Planting Suitability', 'Field Notes', 'AI Crop Disease Data'],
    },
    {
      id: 'security-analyst',
      title: 'Security Analyst',
      subtitle: 'Surveillance & Incident Response',
      description: 'Monitor dark-themed tactical patrol maps, review thermal hotspot incidents, track movement anomalies, and log security threat briefings.',
      icon: ShieldAlert,
      image: '/assets/security/overview.png',
      screensCount: 'Tactical Surveillance Suite',
      tags: ['Patrol Route Map', 'Thermal Anomaly Alerts', 'Threat Zone Logs', 'Incident Portal'],
    },
    {
      id: 'client-viewer',
      title: 'Client & Project Viewer',
      subtitle: 'Executive Visibility & GIS Downloads',
      description: 'Track multi-project portfolios, interact with RGB orthomosaics, search report repositories, and download high-resolution GeoTIFF & PDF assets.',
      icon: Users,
      image: '/assets/client/overview.png',
      screensCount: '7 Client Workspace Screens',
      tags: ['Interactive Map Viewer', 'Mission Reports Library', 'GeoTIFF Downloads', 'Project Updates'],
    },
  ];

  return (
    <section id="workspaces" className="py-20 md:py-28 bg-varyz-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-varyz-lime/10 border border-varyz-lime/20 text-xs font-bold text-varyz-lime uppercase tracking-wider">
            Tailored Role Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Role-Based Workspaces. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-varyz-lime via-emerald-300 to-teal-200">
              Designed for how teams actually work.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Varyz eliminates interface clutter by presenting role-optimized dashboards tailored to pilot operators, agronomic analysts, security officers, and executive clients.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={onOpenAccessModal}
                className="glass-panel glass-panel-hover rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* Card Screenshot Preview */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 border-b border-white/10 overflow-hidden">
                  <Image
                    src={role.image}
                    alt={`${role.title} Prototype Dashboard`}
                    fill
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-varyz-navy via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-varyz-navy/90 border border-white/20 text-xs font-semibold text-varyz-lime backdrop-blur-md">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.screensCount}</span>
                  </div>

                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-varyz-lime group-hover:text-varyz-navy transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-varyz-lime transition-colors">
                        {role.title}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-varyz-lime uppercase tracking-wider">
                      {role.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {role.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {role.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
