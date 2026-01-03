import { observer } from 'mobx-react-lite';
import { Eye } from 'lucide-react';
import { useSurgicalHistory2Store } from '../../context';
import { EmptyState } from '../../../components';

export const TimelineTable = observer(() => {
  const store = useSurgicalHistory2Store();

  if (store.recordsLoading === 'loading') {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-[12px] text-gray-600">Loading records...</p>
      </div>
    );
  }

  if (store.records.length === 0) {
    return (
      <EmptyState
        message="No surgical history records"
        submessage="Add your first record in the 'Add' tab"
      />
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide">
                Date
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide">
                Procedures
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-gray-700 text-center uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {store.records.slice().reverse().map((record) => {
              const activeCount = record.items.filter(item => {
                if (typeof item.selectedOption === 'string') {
                  return item.selectedOption !== 'No';
                }
                return Array.isArray(item.selectedOption) && item.selectedOption.length > 0;
              }).length;

              return (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-gray-700">
                    {formatDate(record.capturedDate)}
                  </td>
                  <td className="px-4 py-3">
                    {record.hasSurgicalHistory ? (
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-green-100 text-green-700">
                        Has History
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-700">
                        No History
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-600">
                    {activeCount > 0 ? (
                      <span>{activeCount} procedure{activeCount !== 1 ? 's' : ''}</span>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => store.viewRecord(record)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

TimelineTable.displayName = 'TimelineTable';
