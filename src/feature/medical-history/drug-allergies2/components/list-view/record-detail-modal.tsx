import { observer } from 'mobx-react-lite';
import { X } from 'lucide-react';
import { useDrugAllergies2Store } from '../../context';

export const RecordDetailModal = observer(() => {
  const store = useDrugAllergies2Store();

  if (!store.viewingRecord) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-[16px] font-semibold text-gray-900">Drug Allergy Record</h2>
            <p className="text-[12px] text-gray-600 mt-0.5">{formatDate(store.viewingRecord.capturedDate)}</p>
          </div>
          <button type="button" onClick={() => store.closeViewRecord()} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {store.viewingRecord.hasDrugAllergies ? (
            store.viewingRecord.items.length > 0 ? (
              <div className="space-y-4">
                {store.viewingRecord.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[14px] font-semibold text-gray-900">{item.name}</h3>
                      {item.isRisk && <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700">RISK</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[12px]">
                      <div>
                        <span className="text-gray-600 font-medium">Status:</span>
                        <p className="text-gray-900 mt-1">{item.selectedOption}</p>
                      </div>
                      {item.notes && (
                        <div className="col-span-2">
                          <span className="text-gray-600 font-medium">Notes:</span>
                          <p className="text-gray-900 mt-1">{item.notes}</p>
                        </div>
                      )}
                      {item.planOfManagement && (
                        <div className="col-span-2">
                          <span className="text-gray-600 font-medium">Plan of Management:</span>
                          <p className="text-gray-900 mt-1">{item.planOfManagement}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-600 text-center py-8">No allergies recorded</p>
            )
          ) : (
            <p className="text-[13px] text-gray-600 text-center py-8">No drug allergies recorded</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button type="button" onClick={() => store.closeViewRecord()} className="px-4 py-2 text-[12px] font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

RecordDetailModal.displayName = 'RecordDetailModal';
