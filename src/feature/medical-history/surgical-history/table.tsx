import { observer } from 'mobx-react-lite';
import { useSurgicalHistoryStore } from './context';
import { MASTER_SURGERIES } from './master-data';
import { SURGERY_STATUS_OPTIONS } from './types';
import {
  DataTable,
  TableRow,
  TableCell,
  TableInput,
  DeleteButton,
  AutocompleteInput,
  PreviousVisitBanner,
} from '../shared/components';

/** Table columns configuration */
const getColumns = () => [
  { key: 'procedure', label: 'Surgery', width: '35%' },
  { key: 'status', label: 'Status', width: '12%' },
  { key: 'date', label: 'Year', width: '12%' },
  { key: 'notes', label: 'Notes', width: '36%' },
  { key: 'actions', label: '', width: '5%' },
];

/** Status Toggle Button */
const StatusToggle = observer(({ 
  status, 
  onChange 
}: { 
  status: 'yes' | 'no'; 
  onChange: (status: 'yes' | 'no') => void;
}) => {
  const option = SURGERY_STATUS_OPTIONS.find(o => o.value === status);
  
  return (
    <button
      type="button"
      onClick={() => onChange(status === 'yes' ? 'no' : 'yes')}
      className={`px-2 py-1 text-[11px] font-bold rounded border transition-colors cursor-pointer ${option?.className}`}
    >
      {option?.label}
    </button>
  );
});

/** Previous Visit Summary Component */
const PreviousVisitSummary = observer(() => {
  const store = useSurgicalHistoryStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <PreviousVisitBanner
      date={store.previousVisitDate}
      onIgnore={() => store.ignorePreviousVisit()}
      onCopyAll={() => store.copyFromPreviousVisit()}
    >
      <DataTable
        columns={[
          { key: 'procedure', label: 'Surgery', width: '40%' },
          { key: 'status', label: 'Status', width: '15%' },
          { key: 'date', label: 'Year', width: '15%' },
          { key: 'notes', label: 'Notes', width: '30%' },
        ]}
        isEmpty={false}
        className="mb-0"
      >
        {store.previousVisitData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-700">{item.procedure}</span>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                item.status === 'yes' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-zinc-100 text-zinc-500'
              }`}>
                {item.status === 'yes' ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{item.date || '-'}</span>
            </TableCell>
            <TableCell>
              <span className="text-[11px] text-zinc-400 italic">{item.notes || '-'}</span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

/**
 * Surgical History Table Component
 */
export const SurgicalHistoryTable = observer(({ hideAddOption = false }: { hideAddOption?: boolean }) => {
  const store = useSurgicalHistoryStore();

  // Get suggestions from master data, excluding already added
  const existingProcedures = store.items.map((i) => i.procedure.toLowerCase());
  const availableSuggestions = MASTER_SURGERIES.filter(
    (name) => !existingProcedures.includes(name.toLowerCase())
  );

  const handleAddItem = (procedure: string) => {
    store.addItemWithName(procedure);
  };

  // Show previous visit banner if we have prev data but no current items
  if (store.items.length === 0 && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No surgical history recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddItem}
            placeholder="Search and add surgery..."
            buttonLabel="Add"
            variant="blue"
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
        emptyMessage="No surgeries recorded"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            {/* Procedure - Read only */}
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-800">{item.procedure}</span>
            </TableCell>
            {/* Status Toggle */}
            <TableCell>
              <StatusToggle
                status={item.status}
                onChange={(s) => store.updateItemStatus(item.id, s)}
              />
            </TableCell>
            {/* Date */}
            <TableCell>
              <TableInput
                value={item.date}
                onChange={(v) => store.updateItem(item.id, 'date', v)}
                placeholder="Year"
              />
            </TableCell>
            {/* Notes */}
            <TableCell>
              <TableInput
                value={item.notes}
                onChange={(v) => store.updateItem(item.id, 'notes', v)}
                placeholder="Notes..."
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
          onSelect={handleAddItem}
          placeholder="Search and add surgery..."
          buttonLabel="Add"
          variant="blue"
          hidden={hideAddOption}
        />
      </div>
    </div>
  );
});
