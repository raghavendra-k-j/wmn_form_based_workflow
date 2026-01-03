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
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-72 overflow-y-auto">
          {store.searchResults.map((icd) => {
            const categoryName = store.categories.find(c => c.id === icd.category)?.name;
            return (
              <button
                key={icd.code}
                type="button"
                onClick={() => store.addDiagnosis(icd)}
                className="w-full flex flex-col gap-1 px-3 py-2.5 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-blue-100 text-blue-700">
                    {icd.code}
                  </span>
                  <span className="text-[12px] font-medium text-gray-900">{icd.name}</span>
                </div>
                <div className="flex items-center gap-2 ml-0.5">
                  {categoryName && (
                    <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5">{categoryName}</span>
                  )}
                  {icd.modifiers && (
                    <div className="flex items-center gap-1">
                      {icd.modifiers.hasSeverity && (
                        <span className="text-[8px] text-orange-600 bg-orange-50 px-1 py-0.5">Severity</span>
                      )}
                      {icd.modifiers.hasPattern && (
                        <span className="text-[8px] text-purple-600 bg-purple-50 px-1 py-0.5">Pattern</span>
                      )}
                      {icd.modifiers.hasLaterality && (
                        <span className="text-[8px] text-teal-600 bg-teal-50 px-1 py-0.5">Laterality</span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
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
