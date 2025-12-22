import { Copy, Calendar } from 'lucide-react';

interface PreviousVisitBannerProps {
  date: string;
  onIgnore: () => void;
  onCopyAll: () => void;
  children: React.ReactNode;
}

/** Format date for display */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function PreviousVisitBanner({
  date,
  onIgnore,
  onCopyAll,
  children
}: PreviousVisitBannerProps) {
  return (
    <div className="mb-2 bg-slate-50/50 border-2 border-dashed border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50/50 border-b border-dashed border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-200 text-slate-700 px-2 py-1">
            <span className="text-[11px] font-bold">Previous Visit</span>
            <span className="w-px h-3 bg-slate-300"></span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span className="text-[11px] font-medium">{formatDate(date)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onIgnore}
            className="text-[11px] font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors px-3 py-1 cursor-pointer"
          >
            Ignore
          </button>
          <button
            type="button"
            onClick={onCopyAll}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-700 text-white text-[10px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3 h-3" />
            Copy All
          </button>
        </div>
      </div>

      <div className="bg-transparent">
        {children}
      </div>
    </div>
  );
}
