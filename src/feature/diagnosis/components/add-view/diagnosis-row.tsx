import { observer } from 'mobx-react-lite';
import { X } from 'lucide-react';
import { useDiagnosisStore } from '../../context';
import type { PatientDiagnosis } from '../../types';
import { STATUS_OPTIONS, SEVERITY_OPTIONS, PATTERN_OPTIONS, LATERALITY_OPTIONS } from '../../types';

interface DiagnosisRowProps {
  diagnosis: PatientDiagnosis;
}

export const DiagnosisRow = observer(({ diagnosis }: DiagnosisRowProps) => {
  const store = useDiagnosisStore();

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Diagnosis Name & Code */}
      <td className="px-3 py-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium text-gray-900">{diagnosis.icdName}</span>
          <span className="text-[10px] font-mono text-gray-500">{diagnosis.icdCode}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.status}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'status', e.target.value as any)}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>

      {/* Category */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.category}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'category', e.target.value)}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          {store.categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </td>

      {/* Severity */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.severity}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'severity', e.target.value as any)}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {SEVERITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>

      {/* Pattern/Duration */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.pattern}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'pattern', e.target.value as any)}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {PATTERN_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>

      {/* Laterality */}
      <td className="px-3 py-2">
        <select
          value={diagnosis.laterality}
          onChange={(e) => store.updateDiagnosis(diagnosis.id, 'laterality', e.target.value as any)}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {LATERALITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>

      {/* Treatment Status */}
      <td className="px-3 py-2 text-center">
        <button
          type="button"
          onClick={() => store.updateDiagnosis(diagnosis.id, 'treatmentStatus', !diagnosis.treatmentStatus)}
          className={`px-2 py-0.5 text-[10px] font-medium ${
            diagnosis.treatmentStatus 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
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
          placeholder="Notes..."
          rows={1}
          className="w-full px-2 py-1 text-[11px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
      </td>

      {/* Actions */}
      <td className="px-3 py-2 text-center">
        <button
          type="button"
          onClick={() => store.removeDiagnosis(diagnosis.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
});

DiagnosisRow.displayName = 'DiagnosisRow';
