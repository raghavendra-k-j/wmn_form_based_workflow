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
    <div className="border-b border-red-100 bg-red-50/30">
      {/* Accordion Header - Clickable */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-red-100/40 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-bold text-red-800 uppercase tracking-tight">
            Risks Summary
          </span>
          <span className="bg-red-100 text-red-700 px-1.5 rounded text-[10px] font-bold">
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
        <div className="px-4 pb-3 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          {risks.map((risk) => (
            <div 
              key={risk.id}
              className="flex items-center gap-2 text-[11px] font-medium text-red-900/80 pl-1"
            >
              <div className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
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
