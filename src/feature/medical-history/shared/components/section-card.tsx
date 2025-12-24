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
  /** Extra content to show in header (before chevron) */
  headerExtra?: ReactNode;
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
  headerExtra,
  isExpanded,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden mb-2 transition-all duration-200">
      {/* Header - Carbon Compact Style */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-50/80 border-b border-zinc-100">
        <button
          onClick={onToggle}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 ${iconBg} ${iconColor} border border-current/10`}>
            {icon}
          </div>
          <span className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight">
            {title}
          </span>
          {badge}
        </button>
        <div className="flex items-center gap-2">
          {headerExtra}
          <button onClick={onToggle} className="text-zinc-400 hover:text-zinc-600 transition-colors p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
