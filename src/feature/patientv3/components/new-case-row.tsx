import { Plus, ArrowRight } from 'lucide-react';
import { type CaseTypeConfigItem } from './case-type-config';

/** Props for NewCaseRow component */
export interface NewCaseRowProps {
  config: CaseTypeConfigItem;
  onStart: () => void;
}

/** New Case Row - For specific case type pages */
export function NewCaseRow({ config, onStart }: NewCaseRowProps) {
  return (
    <button
      onClick={onStart}
      className={`w-full flex items-center gap-4 px-4 py-3 ${config.bgColor} border-2 border-dashed ${config.borderColor} shadow-sm hover:shadow-md transition-all group cursor-pointer`}
    >
      <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 ${config.textColor.replace('text-', 'bg-')} text-white`}>
        <Plus className="w-4 h-4" />
      </div>

      <div className="flex-1 text-left">
        <h3 className={`text-[13px] font-bold ${config.textColor}`}>
          Start New {config.singularLabel}
        </h3>
        <p className="text-[11px] text-zinc-500">
          Click to add a new visit for this patient
        </p>
      </div>

      <div className={`w-7 h-7 rounded-none flex items-center justify-center shrink-0 bg-white/50 ${config.textColor} border border-current/10 group-hover:bg-white transition-colors`}>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}

export default NewCaseRow;

