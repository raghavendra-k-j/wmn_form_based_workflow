import { observer } from 'mobx-react-lite';
import { Search } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import { useRef, useEffect } from 'react';

export const DiagnosisSearch = observer(() => {
  const store = useDiagnosisStore();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        store.hideSearchResults();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [store]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-2">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={store.searchQuery}
          onChange={(e) => store.setSearchQuery(e.target.value)}
          onFocus={() => store.setSearchQuery(store.searchQuery)}
          placeholder="Search ICD-10 codes or diagnosis name..."
          className="flex-1 text-[12px] focus:outline-none"
        />
        {store.isSearching && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {store.showSearchResults && store.searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-64 overflow-y-auto">
          {store.searchResults.map((icd) => (
            <button
              key={icd.code}
              type="button"
              onClick={() => store.addDiagnosis(icd)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-gray-100 text-gray-700">
                {icd.code}
              </span>
              <span className="text-[12px] text-gray-900">{icd.name}</span>
            </button>
          ))}
        </div>
      )}

      {store.showSearchResults && store.searchQuery && store.searchResults.length === 0 && !store.isSearching && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg px-3 py-4 text-center">
          <p className="text-[12px] text-gray-500">No results found</p>
        </div>
      )}
    </div>
  );
});

DiagnosisSearch.displayName = 'DiagnosisSearch';
