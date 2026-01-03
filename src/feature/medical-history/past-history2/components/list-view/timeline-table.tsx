import { observer } from 'mobx-react-lite';
import { Eye, Clock } from 'lucide-react';
import { usePastHistory2Store } from '../../context';
import { TableHeader, EmptyState } from '../../../components';
import type { PastHistoryRecord } from '../../types';

export const TimelineTable = observer(() => {
  const store = usePastHistory2Store();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getRecordSummary = (record: PastHistoryRecord): string => {
    if (!record.hasPastHistory || record.items.length === 0) {
      return 'No past history';
    }

    const activeItems = record.items.filter(item => {
      if (Array.isArray(item.selectedOption)) {
        return item.selectedOption.length > 0;
      }
      return item.selectedOption && item.selectedOption !== item.options[0];
    });

    return activeItems.length > 0
      ? activeItems.map(item => item.name).join(', ')
      : 'No active conditions';
  };

  if (store.records.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white">
        <TableHeader
          title="Past History Timeline"
          icon={<Clock className="w-4 h-4" />}
        />
        <EmptyState
          message="No past history records"
          submessage="Records will appear here after you save"
        />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <TableHeader
        title="Past History Timeline"
        icon={<Clock className="w-4 h-4" />}
        badge={
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-600 rounded-full">
            {store.records.length} records
          </span>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '20%' }}>
                Date
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '65%' }}>
                Past History Complications
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '15%' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[...store.records].reverse().map((record) => (
              <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 text-[12px] font-medium text-gray-700">
                  {formatDate(record.capturedDate)}
                </td>
                <td className="px-3 py-2.5 text-[12px] text-gray-600">
                  {getRecordSummary(record)}
                </td>
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => store.viewRecord(record)}
                    className="text-blue-600 hover:text-blue-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TimelineTable.displayName = 'TimelineTable';
