import { observer } from 'mobx-react-lite';
import { usePastHistoryStore } from './context';
import { STATUS_OPTIONS, DEFAULT_CONDITION_NAMES } from './types';
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
  { key: 'name', label: 'Disease', width: '25%' },
  { key: 'status', label: 'Status', width: '10%' },
  { key: 'since', label: 'Since', width: '15%' },
  { key: 'notes', label: 'Notes', width: '45%' },
  { key: 'actions', label: '', width: '5%' },
];



/** Previous Visit Summary Component */
const PreviousVisitSummary = observer(() => {
  const store = usePastHistoryStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <PreviousVisitBanner
      date={store.previousVisitDate}
      onIgnore={() => store.ignorePreviousVisit()}
      onCopyAll={() => store.copyFromPreviousVisit()}
    >
      <DataTable
        columns={[
          { key: 'name', label: 'Disease', width: '25%' },
          { key: 'status', label: 'Status', width: '10%' },
          { key: 'since', label: 'Since', width: '15%' },
          { key: 'notes', label: 'Notes', width: '50%' },
        ]}
        isEmpty={false}
        className="mb-0"
      >
        {store.previousVisitData.map((condition) => (
          <TableRow key={condition.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-700">{condition.name}</span>
            </TableCell>
            <TableCell>
              <span
                className={`text-[11px] px-2 py-0.5 border ${
                  condition.status === 'active'
                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                }`}
              >
                {condition.status === 'active' ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{condition.since || '-'}</span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-400 italic truncate block max-w-[200px]">
                {condition.notes || '-'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

/**
 * Past History Table Component (without section header)
 * For embedding in other layouts where the header is managed externally
 */
export const PastHistoryTable = observer(() => {
  const store = usePastHistoryStore();

  // Get suggestions that are not already added
  const existingNames = store.conditions.map((c) => c.name.toLowerCase());
  const availableSuggestions = DEFAULT_CONDITION_NAMES.filter(
    (name) => !existingNames.includes(name.toLowerCase())
  );

  const handleAddCondition = (name: string) => {
    store.addConditionWithName(name);
  };

  // Show empty state with previous visit summary if no data
  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No past history recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddCondition}
            placeholder="Add disease..."
            buttonLabel="Add"
            variant="teal"
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
        isEmpty={store.conditions.length === 0}
        emptyMessage="No conditions added"
      >
        {store.conditions.map((item) => (
          <TableRow key={item.id}>
            {/* Disease */}
            <TableCell>
              <TableInput
                value={item.name}
                onChange={(v) => store.updateCondition(item.id, 'name', v)}
                placeholder="Condition name"
                isBold
              />
            </TableCell>
            {/* Status (Yes/No) */}
            <TableCell>
              <StatusToggle
                value={item.status}
                options={STATUS_OPTIONS}
                onChange={(val) => store.updateCondition(item.id, 'status', val)}
              />
            </TableCell>
            {/* Since */}
            <TableCell>
              <TableInput
                value={item.since}
                onChange={(v) => store.updateCondition(item.id, 'since', v)}
                placeholder="e.g. 2020"
              />
            </TableCell>
            {/* Notes - Textarea */}
            <TableCell>
              <textarea
                value={item.notes}
                onChange={(e) => store.updateCondition(item.id, 'notes', e.target.value)}
                placeholder="Notes..."
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] text-zinc-600 placeholder:text-zinc-300 focus:outline-none resize-none"
              />
            </TableCell>
            <TableCell>
              <DeleteButton onClick={() => store.removeCondition(item.id)} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <div className="px-3 py-2 border-t border-zinc-100">
        <AutocompleteInput
          suggestions={[...availableSuggestions]}
          onSelect={handleAddCondition}
          placeholder="Add disease..."
          buttonLabel="Add"
          variant="teal"
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

