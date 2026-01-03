import { observer } from 'mobx-react-lite';
import { Trash2 } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import { PreviousDiagnosesTable } from './previous-diagnoses-table';

export const HistoryView = observer(() => {
  const store = useDiagnosisStore();

  return (
    <div className="space-y-4">
      <PreviousDiagnosesTable />

      {/* Clear All Data - Testing */}
      {store.previousDiagnoses.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => {
              if (confirm('⚠️ This will delete ALL diagnosis records for this patient. Continue?')) {
                store.clearAllData();
              }
            }}
            className="px-4 py-2 text-[12px] font-medium text-red-600 bg-white border border-red-300 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data (Testing)
          </button>
        </div>
      )}
    </div>
  );
});

HistoryView.displayName = 'HistoryView';
