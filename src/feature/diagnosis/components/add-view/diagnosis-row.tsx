import { observer } from 'mobx-react-lite';
import { X } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import type { PatientDiagnosis } from '../../types';
import { STATUS_OPTIONS, SEVERITY_OPTIONS, PATTERN_OPTIONS, LATERALITY_OPTIONS } from '../../types';

interface DiagnosisRowProps {
  diagnosis: PatientDiagnosis;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-50 border-green-300 text-green-700';
    case 'resolved': return 'bg-gray-50 border-gray-300 text-gray-700';
    case 'ruled-out': return 'bg-orange-50 border-orange-300 text-orange-700';
    default: return 'bg-white border-gray-300 text-gray-700';
  }
};

export const DiagnosisRow = observer(({ diagnosis }: DiagnosisRowProps) => {
  const store = useDiagnosisStore();
  const modifiers = diagnosis.modifiers;

  // Helper to get category name
  const getCategoryName = (categoryId: string) => {
    const cat = store.categories.find(c => c.id === categoryId);
    return cat?.name || categoryId;
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      {/* Diagnosis Name & Code */}
      <td className="px-3 py-2.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium text-gray-900 leading-tight">{diagnosis.icdName}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5">{diagnosis.icdCode}</span>
            {diagnosis.category && (
              <span className="text-[9px] text-gray-500">{getCategoryName(diagnosis.category)}</span>
            )}
          </div>
        </div>
      </td>

      {/* Status - Always show */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.status}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'status', e.target.value as any)}
          className={`w-full px-2 py-1.5 text-[11px] font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusStyles(diagnosis.status)}`}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>

      {/* Severity - Conditional */}
      <td className="px-3 py-2">
        {modifiers?.hasSeverity ? (
          <select
            value={diagnosis.severity}
            onChange={(e) => store.updateDiagnosis(diagnosis.id, 'severity', e.target.value as any)}
            className="w-full px-2 py-1.5 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {SEVERITY_OPTIONS.filter(opt => opt.value !== 'NA').map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <span className="text-[11px] text-gray-400 italic">N/A</span>
        )}
      </td>

      {/* Pattern/Duration - Conditional */}
      <td className="px-3 py-2">
        {modifiers?.hasPattern ? (
          <select
            value={diagnosis.pattern}
            onChange={(e) => store.updateDiagnosis(diagnosis.id, 'pattern', e.target.value as any)}
            className="w-full px-2 py-1.5 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PATTERN_OPTIONS.filter(opt => opt.value !== 'NA').map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <span className="text-[11px] text-gray-400 italic">N/A</span>
        )}
      </td>

      {/* Laterality - Conditional */}
      <td className="px-3 py-2">
        {modifiers?.hasLaterality ? (
          <select
            value={diagnosis.laterality}
            onChange={(e) => store.updateDiagnosis(diagnosis.id, 'laterality', e.target.value as any)}
            className="w-full px-2 py-1.5 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {LATERALITY_OPTIONS.filter(opt => opt.value !== 'NA').map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <span className="text-[11px] text-gray-400 italic">N/A</span>
        )}
      </td>

      {/* Treatment Status */}
      <td className="px-3 py-2 text-center">
        <button
          type="button"
          onClick={() => store.updateDiagnosis(diagnosis.id, 'treatmentStatus', !diagnosis.treatmentStatus)}
          className={`px-3 py-1 text-[10px] font-semibold transition-colors ${
            diagnosis.treatmentStatus 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {diagnosis.treatmentStatus ? 'Yes' : 'No'}
        </button>
      </td>

      {/* Notes */}
      <td className="px-3 py-2">
        <textarea
          value={diagnosis.notes}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'notes', e.target.value)}
          placeholder="Add notes..."
          rows={1}
          className="w-full px-2 py-1.5 text-[11px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
      </td>

      {/* Actions */}
      <td className="px-3 py-2 text-center">
        <button
          type="button"
          onClick={() => store.removeDiagnosis(diagnosis.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
});

DiagnosisRow.displayName = 'DiagnosisRow';

