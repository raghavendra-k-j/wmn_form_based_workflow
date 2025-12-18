import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

/** Risk Item Interface */
interface Risk {
  id: string;
  label: string;
}

/** Risks Summary Component - Accordion Style */
export function RisksSummary() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock Risks Data
  const risks: Risk[] = [
    { id: '1', label: 'Gestational Diabetes' },
    { id: '2', label: 'Previous C-Section' },
    { id: '3', label: 'Age > 35' },
  ];

  return (
    <div className="border-b border-red-200/50 bg-red-50/50">
      {/* Accordion Header - Distant Color Separation */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-red-100/40 hover:bg-red-100/60 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-red-600 flex items-center justify-center text-white shadow-sm ring-1 ring-red-700/10">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="text-[12px] font-bold text-red-900 uppercase tracking-tight">
            Risks Summary
          </span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
            {risks.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-red-400 group-hover:text-red-600" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-red-400 group-hover:text-red-600" />
        )}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="p-2 space-y-1 bg-white/40 border-t border-red-100/50 animate-in fade-in slide-in-from-top-1 duration-200">
          {risks.map((risk) => (
            <div 
              key={risk.id}
              className="flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-bold text-red-800 bg-white/80 border border-red-200/50 rounded-sm shadow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span className="truncate">{risk.label}</span>
            </div>
          ))}
          {risks.length === 0 && (
            <div className="text-center py-3 text-[11px] text-zinc-400 italic">
              No risks identified
            </div>
          )}
        </div>
      )}
    </div>
  );
}
