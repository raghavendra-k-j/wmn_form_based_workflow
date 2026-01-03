import { observer } from 'mobx-react-lite';
import { FileSearch, Trash2 } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import { DiagnosisSearch } from '../shared/diagnosis-search';
import { SaveButton } from '../shared/save-button';
import { DiagnosisRow } from './diagnosis-row';

export const DiagnosisForm = observer(() => {
  const store = useDiagnosisStore();

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-blue-600" />
          <span className="text-[14px] font-semibold text-gray-900">Current Diagnosis</span>
          {store.currentDiagnoses.length > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-700">
              {store.currentDiagnoses.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {store.isSaved && (
            <button 
              type="button"
              onClick={() => {
                if (confirm('Clear all current diagnoses?')) {
                  store.currentDiagnoses.forEach(d => store.removeDiagnosis(d.id));
                }
              }}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <SaveButton />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <DiagnosisSearch />
      </div>

      {/* Table */}
      {store.currentDiagnoses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '18%' }}>
                  Diagnosis
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '10%' }}>
                  Status
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '12%' }}>
                  Category
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '10%' }}>
                  Severity
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '10%' }}>
                  Pattern
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '10%' }}>
                  Laterality
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-center uppercase tracking-wide" style={{ width: '8%' }}>
                  Treatment
                </th>
                <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '18%' }}>
                  Notes
                </th>
                <th className="px-3 py-2.5" style={{ width: '4%' }}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {store.currentDiagnoses.map(diagnosis => (
                <DiagnosisRow key={diagnosis.id} diagnosis={diagnosis} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-4 py-8 text-center">
          <p className="text-[13px] text-gray-500">Search and add diagnoses above</p>
        </div>
      )}
    </div>
  );
});

DiagnosisForm.displayName = 'DiagnosisForm';
