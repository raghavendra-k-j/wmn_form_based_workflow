import { Clock, ArrowRight } from 'lucide-react';
import { CASE_TYPE_CONFIG, type Case } from './case-type-config';

/** Props for CaseRow component */
export interface CaseRowProps {
  caseItem: Case;
  onClick: () => void;
  showTypeBadge?: boolean;
}

/** Case Row Component - Full Width List Item */
export function CaseRow({ caseItem, onClick, showTypeBadge = true }: CaseRowProps) {
  const config = CASE_TYPE_CONFIG[caseItem.type];
  
  // Parse Date: "12 Aug 2024"
  const [day, month, year] = caseItem.startDate.split(' ');

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer flex items-center gap-4 px-4 py-3"
    >
      {/* Calendar Avatar - Replacing Icon */}
      <div className={`w-12 h-12 rounded-none p-1 flex flex-col items-center justify-center shrink-0 ${config.bgColor} ${config.textColor} border border-zinc-200/60 overflow-hidden`}>
        <span className="text-[10px] font-bold uppercase tracking-wider leading-none opacity-80">{month}</span>
        <span className="text-[18px] font-black leading-none mt-0.5">{day}</span>
        <span className="text-[9px] font-medium leading-none opacity-60 mt-0.5">{year}</span>
      </div>

      {/* Main Info - Complaints as Focus */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Complaints / Title */}
        <h3 className="text-[13px] font-bold text-zinc-900 leading-snug line-clamp-2 pr-4" title={caseItem.complaints || caseItem.startDate}>
          {caseItem.complaints || 'Routine Checkup'}
        </h3>
        
        {/* Metadata */}
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold uppercase tracking-wide ${config.textColor}`}>
            {caseItem.id}
          </span>
          {showTypeBadge && (
            <>
              <span className="text-[10px] text-zinc-300">•</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
                 {config.label}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Next Follow Up */}
      <div className="hidden md:flex items-center gap-3 px-6">
        <div className="text-right">
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Next Follow Up
          </div>
          <div className="flex items-center justify-end gap-1.5 text-[12px] font-bold text-zinc-700 bg-zinc-50 px-2.5 py-1 rounded-sm border border-zinc-100">
            <Clock className="w-3 h-3 text-zinc-400" />
            {caseItem.nextFollowUp}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-zinc-100">
        <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors uppercase tracking-wide">
          Open
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}

export default CaseRow;
