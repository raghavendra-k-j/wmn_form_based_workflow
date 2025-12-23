import { Trash2 } from 'lucide-react';
import type { PregnancyRecord } from '../types';
import { OutcomeBadge } from './outcome-badge';

interface PregnancyRowProps {
  record: PregnancyRecord;
  index: number;
  onDelete?: () => void;
  showDelete?: boolean;
}

export function PregnancyRow({ record, index, onDelete, showDelete = true }: PregnancyRowProps) {
  const showBabyDetails = record.outcome === 'Live Birth' || record.outcome === 'Stillbirth';
  const genderColor = record.gender === 'Female' ? 'text-pink-600' : record.gender === 'Male' ? 'text-blue-600' : 'text-zinc-400';

  return (
    <tr className="group hover:bg-zinc-50/50 transition-colors border-b border-zinc-100">
      <td className="px-3 py-2 text-[11px] text-zinc-400 font-medium">{index + 1}</td>
      <td className="px-3 py-2 text-[12px] font-bold text-zinc-700">{record.year || '--'}</td>
      <td className="px-3 py-2"><OutcomeBadge outcome={record.outcome} /></td>
      <td className="px-3 py-2 text-[11px] text-zinc-600">
        {record.complications.length > 0 ? record.complications.join(', ') : '--'}
      </td>
      <td className="px-3 py-2 text-[11px] text-zinc-600">
        {record.deliveryMode !== 'NA' ? record.deliveryMode : '--'}
      </td>
      <td className="px-3 py-2 text-[11px] text-zinc-600">
        {showBabyDetails ? (record.birthWeight || '--') : '--'}
      </td>
      <td className="px-3 py-2 text-[11px]">
        <span className={genderColor}>
          {showBabyDetails && record.gender !== 'NA' ? record.gender : '--'}
        </span>
      </td>
      <td className="px-3 py-2 text-[11px] text-zinc-600">{record.remarks || '--'}</td>
      <td className="px-3 py-2 text-right">
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
            className="p-1 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </td>
    </tr>
  );
}
