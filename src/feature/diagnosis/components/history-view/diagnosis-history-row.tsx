import { observer } from 'mobx-react-lite';
import { useDiagnosisStore } from '../../context';
import type { PatientDiagnosis } from '../../types';
import { STATUS_OPTIONS } from '../../types';

interface DiagnosisHistoryRowProps {
  diagnosis: PatientDiagnosis;
}

export const DiagnosisHistoryRow = observer(({ diagnosis }: DiagnosisHistoryRowProps) => {
  const store = useDiagnosisStore();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'resolved': return 'bg-gray-100 text-gray-700';
      case 'ruled-out': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium text-gray-900">{diagnosis.icdName}</span>
          <span className="text-[10px] font-mono text-gray-500">{diagnosis.icdCode}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-[12px] text-gray-600">
        {formatDate(diagnosis.capturedDate)}
      </td>
      <td className="px-4 py-3">
        <select
          value={diagnosis.status}
          onChange={(e) => store.updatePreviousDiagnosisStatus(diagnosis.id, e.target.value as any)}
          className={`px-2 py-1 text-[11px] font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusColor(diagnosis.status)}`}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>
    </tr>
  );
});

DiagnosisHistoryRow.displayName = 'DiagnosisHistoryRow';
