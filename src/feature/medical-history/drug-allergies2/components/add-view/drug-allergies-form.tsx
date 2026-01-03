import { observer } from 'mobx-react-lite';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useDrugAllergies2Store } from '../../context';
import { TableHeader } from '../../../components';
import { SaveButton } from '../shared/save-button';
import { AllergyRow } from './allergy-row';
import { AddAllergyInput } from './add-allergy-input';

export const DrugAllergiesForm = observer(() => {
  const store = useDrugAllergies2Store();

  const activeCount = store.currentItems.filter(item => {
    if (typeof item.selectedOption === 'string') {
      return item.selectedOption !== 'No';
    }
    return Array.isArray(item.selectedOption) && item.selectedOption.length > 0;
  }).length;

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      <TableHeader
        title="Drug Allergies"
        icon={<AlertTriangle className="w-4 h-4" />}
        badge={
          activeCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-700">
              {activeCount}
            </span>
          )
        }
        actions={
          <div className="flex items-center gap-2">
            {store.isSaved && (
              <button 
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to clear this saved record?')) {
                    store.clearCurrentRecord();
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                title="Clear saved record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <SaveButton />
          </div>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '16%' }}>
                Allergen
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '22%' }}>
                Status
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '26%' }}>
                Notes
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '10%' }}>
                Risk
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '22%' }}>
                Plan of Management
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left" style={{ width: '4%' }}>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {store.currentItems.map(item => (
              <AllergyRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <AddAllergyInput />
    </div>
  );
});

DrugAllergiesForm.displayName = 'DrugAllergiesForm';
