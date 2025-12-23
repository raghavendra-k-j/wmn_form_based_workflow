import { FileSearch } from 'lucide-react';

/** Other Investigations Page - Placeholder */
export function OtherInvestigationsPage() {
  return (
    <div className="h-full">
      <div className="bg-white border border-zinc-200 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center">
            <FileSearch className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-zinc-800">Other Investigations</h2>
            <p className="text-[11px] text-zinc-500">Additional tests and investigations</p>
          </div>
        </div>
        <div className="text-center py-8 text-zinc-400 text-[12px]">
          Other Investigations content will be implemented here
        </div>
      </div>
    </div>
  );
}
