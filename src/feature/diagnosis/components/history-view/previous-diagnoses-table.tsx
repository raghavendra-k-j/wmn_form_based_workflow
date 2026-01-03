import { observer } from 'mobx-react-lite';
import { History } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import { DiagnosisHistoryRow } from './diagnosis-history-row';

export const PreviousDiagnosesTable = observer(() => {
  const store = useDiagnosisStore();

  if (store.previousDiagnosesLoading === 'loading') {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-[12px] text-gray-600">Loading previous diagnoses...</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200 flex items-center gap-2">
        <History className="w-4 h-4 text-amber-600" />
        <span className="text-[14px] font-semibold text-gray-900">Previous Diagnoses</span>
        {store.previousDiagnoses.length > 0 && (
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-700">
            {store.previousDiagnoses.length}
          </span>
        )}
      </div>

      {store.previousDiagnoses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '50%' }}>
                  Diagnosis
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '25%' }}>
                  Date
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '25%' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {store.previousDiagnoses.map(diagnosis => (
                <DiagnosisHistoryRow key={diagnosis.id} diagnosis={diagnosis} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-4 py-8 text-center">
          <p className="text-[13px] text-gray-500">No previous diagnoses found</p>
        </div>
      )}
    </div>
  );
});

PreviousDiagnosesTable.displayName = 'PreviousDiagnosesTable';
