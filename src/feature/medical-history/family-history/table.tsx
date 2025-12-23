import { observer } from 'mobx-react-lite';
import { useFamilyHistoryStore } from './context';
import { DEFAULT_FAMILY_CONDITIONS, STATUS_OPTIONS, COMMON_RELATIONS } from './types';
import {
  DataTable,
  TableRow,
  TableCell,
  TableInput,
  StatusToggle,
  DeleteButton,
  AutocompleteInput,
  PreviousVisitBanner,
} from '../shared/components';

/** Table columns configuration */
const getColumns = () => [
  { key: 'condition', label: 'Condition', width: '25%' },
  { key: 'relation', label: 'Relation', width: '20%' },
  { key: 'status', label: 'Status', width: '10%' },
  { key: 'notes', label: 'Notes', width: '40%' },
  { key: 'actions', label: '', width: '5%' },
];



/** Previous Visit Summary Component */
const PreviousVisitSummary = observer(() => {
  const store = useFamilyHistoryStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <PreviousVisitBanner
      date={store.previousVisitDate}
      onIgnore={() => store.ignorePreviousVisit()}
      onCopyAll={() => store.copyFromPreviousVisit()}
    >
      <DataTable
        columns={[
          { key: 'condition', label: 'Condition', width: '25%' },
          { key: 'relation', label: 'Relation', width: '20%' },
          { key: 'status', label: 'Status', width: '10%' },
          { key: 'notes', label: 'Notes', width: '45%' },
        ]}
        isEmpty={false}
        className="mb-0"
      >
        {store.previousVisitData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-700">{item.condition}</span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{item.relation || '-'}</span>
            </TableCell>
            <TableCell>
                <span
                className={`text-[11px] px-2 py-0.5 border ${
                  item.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                }`}
              >
                {item.status === 'active' ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-400 italic truncate block max-w-[200px]">
                {item.notes || '-'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

/**
 * Family History Table Component
 */
export const FamilyHistoryTable = observer(({ hideAddOption = true }: { hideAddOption?: boolean }) => {
  const store = useFamilyHistoryStore();

  // Suggest default conditions that are not yet in the list (if we want uniqueness, but here duplicate conditions might be valid for different relations)
  // But generally sticking to unique list for autocomplete is good UI
  const existingConditions = store.items.map((i) => i.condition.toLowerCase());
  const availableSuggestions = DEFAULT_FAMILY_CONDITIONS.filter(
    (name) => !existingConditions.includes(name.toLowerCase())
  );

  const handleAddCondition = (condition: string) => {
    store.addItemWithCondition(condition);
  };

  // Show empty state with previous visit summary if no data
  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No family history recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
           {/* Allow adding any condition, even if previously existing, but logic above filters. 
               For family history, maybe we want to allow repeats (e.g. aunt has diabetes, uncle has diabetes).
               For now sticking to simple UX.
           */}
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddCondition}
            placeholder="Add condition..."
            buttonLabel="Add"
            variant="teal"
            hidden={hideAddOption}
          />
        </div>

          <div className="px-2 pt-4 mt-2 border-t border-dashed border-zinc-200">
          <PreviousVisitSummary />
        </div>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={getColumns()}
        isEmpty={store.items.length === 0}
        emptyMessage="No family history items"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            {/* Condition */}
            <TableCell>
              <TableInput
                value={item.condition}
                onChange={(v) => store.updateItem(item.id, 'condition', v)}
                placeholder="Condition"
                isBold
              />
            </TableCell>
            {/* Relation */}
            <TableCell>
              <select
                value={item.relation}
                onChange={(e) => store.updateItem(item.id, 'relation', e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] text-zinc-900 focus:outline-none"
              >
                <option value="" disabled className="text-zinc-400">Select...</option>
                {COMMON_RELATIONS.map((rel) => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </TableCell>
            {/* Status (Yes/No) */}
            <TableCell>
              <StatusToggle
                value={item.status}
                options={STATUS_OPTIONS}
                onChange={(val) => store.updateItem(item.id, 'status', val)}
              />
            </TableCell>
            {/* Notes */}
            <TableCell>
              <textarea
                value={item.notes}
                onChange={(e) => store.updateItem(item.id, 'notes', e.target.value)}
                placeholder="Notes..."
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] text-zinc-600 placeholder:text-zinc-300 focus:outline-none resize-none"
              />
            </TableCell>
            <TableCell>
              <DeleteButton onClick={() => store.removeItem(item.id)} hidden={hideAddOption} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <div className="px-3 py-2 border-t border-zinc-100">
        <AutocompleteInput
          suggestions={[...availableSuggestions]}
          onSelect={handleAddCondition}
          placeholder="Add condition..."
          buttonLabel="Add"
          variant="teal"
          hidden={hideAddOption}
        />
      </div>

      {/* Show previous visit banner if available */}
      {store.hasPreviousVisitData && (
        <div className="px-2 pt-4 mt-2 border-t border-dashed border-zinc-200">
          <PreviousVisitSummary />
        </div>
      )}
    </div>
  );
});
