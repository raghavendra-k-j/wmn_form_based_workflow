import { observer } from 'mobx-react-lite';
import { X } from 'lucide-react';
import { useFamilyHistory2Store } from '../../context';
import { SingleSelectField, MultiSelectField, TextAreaField, RiskToggle } from '../../../components';
import type { PatientFamilyHistory } from '../../types';

interface ConditionRowProps {
  item: PatientFamilyHistory;
}

export const ConditionRow = observer(({ item }: ConditionRowProps) => {
  const store = useFamilyHistory2Store();

  const handleOptionChange = (value: string | string[]) => {
    store.updateItem(item.id, 'selectedOption', value);
  };

  // Check if condition is "active" (not "No" for single select, has selections for multi-select)
  const isActive = (() => {
    if (typeof item.selectedOption === 'string') {
      return item.selectedOption !== 'No';
    }
    if (Array.isArray(item.selectedOption)) {
      const filtered = item.selectedOption.filter(opt => opt !== 'No');
      return filtered.length > 0;
    }
    return false;
  })();

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Name */}
      <td className="px-3 py-2 text-[12px] font-medium text-gray-800">
        {item.name}
      </td>

      {/* Options */}
      <td className="px-3 py-2">
        {item.selectionType === 'single' ? (
          <SingleSelectField
            options={item.options}
            value={typeof item.selectedOption === 'string' ? item.selectedOption : ''}
            onChange={handleOptionChange}
            className="w-full"
          />
        ) : (
          <MultiSelectField
            options={item.options}
            value={Array.isArray(item.selectedOption) ? item.selectedOption : []}
            onChange={handleOptionChange}
          />
        )}
      </td>

      {/* Notes */}
      <td className="px-3 py-2">
        <TextAreaField
          value={item.notes || ''}
          onChange={(value) => store.updateItem(item.id, 'notes', value)}
          placeholder="Add notes..."
          rows={1}
          autoResize={true}
          disabled={!isActive}
          className="w-full"
        />
      </td>

      {/* Mark as Risk */}
      <td className="px-3 py-2">
        <RiskToggle
          value={item.isRisk}
          onChange={(value) => store.updateItem(item.id, 'isRisk', value)}
          disabled={!isActive}
        />
      </td>

      {/* Plan of Management */}
      <td className="px-3 py-2">
        <TextAreaField
          value={item.planOfManagement || ''}
          onChange={(value) => store.updateItem(item.id, 'planOfManagement', value)}
          placeholder="Plan..."
          rows={1}
          autoResize={true}
          disabled={!isActive || !item.isRisk}
          className="w-full"
        />
      </td>

      {/* Actions */}
      <td className="px-3 py-2 text-center">
        {!item.isDefault && (
          <button
            type="button"
            onClick={() => store.removeItem(item.id)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </td>
    </tr>
  );
});

ConditionRow.displayName = 'ConditionRow';
