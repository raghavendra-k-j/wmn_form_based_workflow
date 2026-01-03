import { observer } from 'mobx-react-lite';
import { Trash2 } from 'lucide-react';
import { useDrugAllergies2Store } from '../../context';
import { TimelineTable } from './timeline-table';
import { RecordDetailModal } from './record-detail-modal';
import { drugAllergyService } from '../../../services/drug-allergies';

export const ListView = observer(() => {
  const store = useDrugAllergies2Store();

  const handleClearAllData = async () => {
    if (confirm('⚠️ This will delete ALL drug allergy records for this patient. This action cannot be undone. Continue?')) {
      try {
        await drugAllergyService.clearAllRecords(store.patientId);
        await store.loadPatientRecords();
        alert('All data cleared successfully');
      } catch (error) {
        console.error('Failed to clear data:', error);
        alert('Failed to clear data');
      }
    }
  };

  return (
    <div>
      <TimelineTable />
      <RecordDetailModal />
      
      {store.records.length > 0 && (
        <div className="mt-4 p-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleClearAllData}
            className="px-4 py-2 text-[12px] font-medium text-red-600 bg-white border border-red-300 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data (Testing)
          </button>
        </div>
      )}
    </div>
  );
});

ListView.displayName = 'ListView';
