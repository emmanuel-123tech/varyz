import { RoleWorkspaceType } from '@/types';
import { Layers, Plane, Sprout, ShieldAlert, Users } from 'lucide-react';

interface RoleFilterTabsProps {
  selectedRole: RoleWorkspaceType;
  onSelectRole: (role: RoleWorkspaceType) => void;
  counts: Record<RoleWorkspaceType, number>;
}

export function RoleFilterTabs({ selectedRole, onSelectRole, counts }: RoleFilterTabsProps) {
  const tabs = [
    { id: 'all' as RoleWorkspaceType, label: 'All Workspaces', icon: Layers },
    { id: 'drone-operator' as RoleWorkspaceType, label: 'Drone Operator', icon: Plane },
    { id: 'agriculture-analyst' as RoleWorkspaceType, label: 'Agriculture Analyst', icon: Sprout },
    { id: 'security-analyst' as RoleWorkspaceType, label: 'Security Analyst', icon: ShieldAlert },
    { id: 'client-viewer' as RoleWorkspaceType, label: 'Client & Viewer', icon: Users },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-4xl mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = selectedRole === tab.id;
        const count = counts[tab.id] || 0;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectRole(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-varyz-lime text-varyz-navy shadow-glow-lime scale-105'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-varyz-navy/20 text-varyz-navy' : 'bg-white/10 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
