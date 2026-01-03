import { observer } from 'mobx-react-lite';
import { Users, Trash2 } from 'lucide-react';
import { useFamilyHistory2Store } from '../../context';
import { TableHeader } from '../../../components';
import { SaveButton } from '../shared/save-button';
import { ConditionRow } from './condition-row';
import { AddConditionInput } from './add-condition-input';

export const FamilyHistoryForm = observer(() => {
  const store = useFamilyHistory2Store();

  const activeCount = store.currentItems.filter(item => {
    if (Array.isArray(item.selectedOption)) {
      const filtered = item.selectedOption.filter(opt => opt !== 'No');
      return filtered.length > 0;
    }
    return item.selectedOption && item.selectedOption !== item.options[0];
  }).length;

  return (
    <div className="border border-gray-200 bg-white shadow-sm">
      <TableHeader
        title="Family History"
        icon={<Users className="w-4 h-4" />}
        badge={
          activeCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-700">
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
                Condition
              </th>
              <th className="px-3 py-2.5 text-[11px] font-semibold text-gray-700 text-left uppercase tracking-wide" style={{ width: '22%' }}>
                Options
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
              <ConditionRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <AddConditionInput />
    </div>
  );
});

FamilyHistoryForm.displayName = 'FamilyHistoryForm';
