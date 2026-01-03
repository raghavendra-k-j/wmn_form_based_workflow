import { observer } from 'mobx-react-lite';
import { X } from 'lucide-react';
import { usePastHistory2Store } from '../../context';

export const RecordDetailModal = observer(() => {
  const store = usePastHistory2Store();

  if (!store.viewingRecord) return null;

  const record = store.viewingRecord;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatOptions = (selectedOption: string | string[]): string => {
    if (Array.isArray(selectedOption)) {
      return selectedOption.join(', ') || '-';
    }
    return selectedOption || '-';
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => store.closeViewRecord()}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-[14px] font-semibold text-gray-800">
            Past History - {formatDate(record.capturedDate)}
          </h3>
          <button
            type="button"
            onClick={() => store.closeViewRecord()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {!record.hasPastHistory || record.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-[12px]">
              No past medical history recorded for this visit
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '15%' }}>
                      Past History
                    </th>
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '20%' }}>
                      Options
                    </th>
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '12%' }}>
                      Since
                    </th>
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '18%' }}>
                      Notes
                    </th>
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '10%' }}>
                      Risk
                    </th>
                    <th className="px-3 py-2 text-[11px] font-semibold text-gray-600 text-left" style={{ width: '25%' }}>
                      POM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {record.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-3 py-2.5 text-[12px] font-medium text-gray-700">
                        {item.name}
                      </td>
                      <td className="px-3 py-2.5 text-[12px] text-gray-600">
                        {formatOptions(item.selectedOption)}
                      </td>
                      <td className="px-3 py-2.5 text-[12px] text-gray-600">
                        {item.since || '-'}
                      </td>
                      <td className="px-3 py-2.5 text-[12px] text-gray-600">
                        {item.notes || '-'}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                            item.isRisk
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {item.isRisk ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[12px] text-gray-600">
                        {item.planOfManagement || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

RecordDetailModal.displayName = 'RecordDetailModal';
