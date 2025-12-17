import { 
  Calendar, 
  Clock, 
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';

export interface Case {
  id: string;
  type: 'ANC' | 'Gynaecology' | 'PNC';
  title?: string;
  startDate: string;
  lastVisit: string;
  nextFollowUp: string;
  status: 'Active' | 'Closed' | 'On Hold';
  visitCount?: number;
}

interface CaseListProps {
  cases: Case[];
  onCaseClick: (caseId: string) => void;
}

export function CaseList({ cases, onCaseClick }: CaseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cases.map((caseItem) => (
        <div 
          key={caseItem.id}
          onClick={() => onCaseClick(caseItem.id)}
          className="group bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-50 flex items-start justify-between bg-zinc-50/50">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                    ${caseItem.type === 'ANC' 
                      ? 'bg-pink-100 text-pink-700' 
                      : caseItem.type === 'PNC'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-violet-100 text-violet-700'
                    }
                 `}>
                   {caseItem.type}
                 </span>
                 <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border
                    ${caseItem.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-100 text-zinc-600 border-zinc-200'}
                 `}>
                   {caseItem.status}
                 </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 leading-tight">
                {caseItem.title || caseItem.type}
              </h3>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md hover:bg-zinc-200">
               <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 flex-1 flex flex-col justify-center">
             {/* Visit Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Last Visit</span>
                   </div>
                   <p className="text-sm font-medium text-zinc-900">{caseItem.lastVisit}</p>
                </div>
                <div>
                   <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next Visit</span>
                   </div>
                   <p className="text-sm font-medium text-zinc-900">{caseItem.nextFollowUp}</p>
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
             <span className="text-xs text-zinc-500 font-medium">
               Case #{caseItem.id} • {caseItem.visitCount} Visits
             </span>
             <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                Open Case <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
