import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* =============================================================================
 * SECTION CARD - Carbon Design Collapsible Container
 * ============================================================================= */

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function SectionCard({
  title,
  icon,
  iconBg,
  iconColor,
  badge,
  isExpanded,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden mb-2 transition-all duration-200">
      {/* Header - Carbon Compact Style */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 bg-zinc-50/80 hover:bg-zinc-100/80 border-b border-zinc-100 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 ${iconBg} ${iconColor} border border-current/10`}>
            {icon}
          </div>
          <span className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight">
            {title}
          </span>
          {badge}
        </div>
        <div className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
