import { Plus, ChevronRight } from 'lucide-react';
import { CASE_TYPE_CONFIG, type CaseType } from './case-type-config';

/** Props for NewCaseSelector component */
export interface NewCaseSelectorProps {
  onSelect: (type: CaseType) => void;
}

/** New Case Selector - For All Cases page with grid */
export function NewCaseSelector({ onSelect }: NewCaseSelectorProps) {
  const caseTypes = Object.entries(CASE_TYPE_CONFIG) as [CaseType, typeof CASE_TYPE_CONFIG[CaseType]][];

  return (
    <div className="bg-white border-2 border-dashed border-zinc-300 p-5 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-none flex items-center justify-center bg-zinc-600 text-white">
          <Plus className="w-3.5 h-3.5" />
        </div>
        <span className="text-[12px] font-bold text-zinc-600 uppercase tracking-wider">
          Start a New Visit
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {caseTypes.map(([type, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`flex items-center gap-3 p-3 ${config.bgColor} border ${config.borderColor} shadow-sm hover:shadow-md transition-all group cursor-pointer`}
            >
              <div className={`w-7 h-7 rounded-none flex items-center justify-center ${config.textColor.replace('text-', 'bg-')} text-white`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className={`text-[12px] font-bold ${config.textColor} flex-1 text-left`}>
                {config.singularLabel}
              </span>
              <ChevronRight className={`w-3.5 h-3.5 ${config.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NewCaseSelector;

