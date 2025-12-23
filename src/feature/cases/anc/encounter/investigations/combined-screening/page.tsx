import { Activity } from 'lucide-react';

/** Combined Screening Page - Placeholder */
export function CombinedScreeningPage() {
  return (
    <div className="h-full">
      <div className="bg-white border border-zinc-200 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-50 rounded flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-zinc-800">Combined Screening</h2>
            <p className="text-[11px] text-zinc-500">First trimester combined screening test</p>
          </div>
        </div>
        <div className="text-center py-8 text-zinc-400 text-[12px]">
          Combined Screening content will be implemented here
        </div>
      </div>
    </div>
  );
}
