import { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

/** Allergy Item Interface */
interface Allergy {
  id: string;
  label: string;
}

/** Allergies Summary Component - Accordion Style */
export function AllergiesSummary() {
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock Allergies Data
  const allergies: Allergy[] = [
    { id: '1', label: 'Penicillin' },
    { id: '2', label: 'Sulfa Drugs' },
    { id: '3', label: 'Peanuts' },
  ];

  return (
    <div className="border-b border-orange-100 bg-orange-50/30">
      {/* Accordion Header - Clickable */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-orange-100/40 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-orange-100 flex items-center justify-center text-orange-600">
            <ShieldAlert className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-bold text-orange-800 uppercase tracking-tight">
            Drug Allergies
          </span>
          <span className="bg-orange-100 text-orange-700 px-1.5 rounded text-[10px] font-bold">
            {allergies.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-600" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-600" />
        )}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-4 pb-3 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          {allergies.map((allergy) => (
            <div 
              key={allergy.id}
              className="flex items-center gap-2 text-[11px] font-medium text-orange-900/80 pl-1"
            >
              <div className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
              <span className="truncate">{allergy.label}</span>
            </div>
          ))}
          
          {allergies.length === 0 && (
            <div className="text-[11px] text-zinc-400 italic pl-3">
              No known allergies
            </div>
          )}
        </div>
      )}
    </div>
  );
}
