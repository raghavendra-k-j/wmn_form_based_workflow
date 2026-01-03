import { observer } from 'mobx-react-lite';
import { FileText, Copy, X } from 'lucide-react';
import { useSurgicalHistory2Store } from '../../context';

export const PreviousVisitBanner = observer(() => {
  const store = useSurgicalHistory2Store();

  if (!store.showPreviousVisitBanner || !store.latestRecord) return null;

  const activeItems = store.latestRecord.items.filter(item => {
    if (typeof item.selectedOption === 'string') {
      return item.selectedOption !== 'No';
    }
    return Array.isArray(item.selectedOption) && item.selectedOption.length > 0;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="mb-4 border border-blue-200 bg-blue-50">
      <div className="px-3 py-2 bg-blue-100 border-b border-blue-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-700" />
          <span className="text-[12px] font-semibold text-blue-900">Previous Visit</span>
          <span className="text-[11px] text-blue-600">
            {formatDate(store.latestRecord.capturedDate)}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => store.setCopyFromPrevious(!store.copiedFromPrevious)}
            className={`
              px-3 py-1 text-[11px] font-medium transition-colors flex items-center gap-1.5
              ${store.copiedFromPrevious
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'
              }
            `}
          >
            <Copy className="w-3 h-3" />
            {store.copiedFromPrevious ? 'Copied' : 'Copy All'}
          </button>
          
          <button
            type="button"
            onClick={() => store.dismissPreviousVisitBanner()}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-black/5 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-3">
        {activeItems.length > 0 ? (
          <p className="text-[12px] text-blue-900 leading-relaxed font-medium">
            {activeItems.map(item => item.name).join(', ')}
          </p>
        ) : store.latestRecord?.hasSurgicalHistory === false ? (
          <p className="text-[12px] text-blue-700 italic">
            Previous visit: No surgical history recorded
          </p>
        ) : (
          <p className="text-[12px] text-blue-700 italic">
            Previous visit: No procedures recorded
          </p>
        )}
      </div>
    </div>
  );
});

PreviousVisitBanner.displayName = 'PreviousVisitBanner';
