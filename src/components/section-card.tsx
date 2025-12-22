import type { ReactNode, ComponentType } from 'react';

interface SectionCardProps {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export function SectionCard({ 
  title, 
  icon: Icon, 
  children, 
  iconBg = 'bg-zinc-100', 
  iconColor = 'text-zinc-600' 
}: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className={`w-6 h-6 ${iconBg} rounded-sm flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>
        <h3 className="text-[11px] font-bold text-zinc-800 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
