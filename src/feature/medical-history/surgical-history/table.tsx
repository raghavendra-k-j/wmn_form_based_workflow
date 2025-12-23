import { observer } from 'mobx-react-lite';
import { useSurgicalHistoryStore } from './context';
import { DEFAULT_SURGERY_NAMES } from './types';
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
  { key: 'procedure', label: 'Procedure', width: '30%' },
  { key: 'date', label: 'Year/Date', width: '20%' },
  { key: 'notes', label: 'Notes', width: '45%' },
  { key: 'actions', label: '', width: '5%' },
];



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
          { key: 'procedure', label: 'Procedure', width: '30%' },
          { key: 'date', label: 'Year/Date', width: '20%' },
          { key: 'notes', label: 'Notes', width: '50%' },
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
              <span className="text-[12px] text-zinc-500">{item.date || '-'}</span>
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
 * Surgical History Table Component
 */
export const SurgicalHistoryTable = observer(({ hideAddOption = true }: { hideAddOption?: boolean }) => {
  const store = useSurgicalHistoryStore();

  // Get suggestions
  const existingProcedures = store.items.map((i) => i.procedure.toLowerCase());
  const availableSuggestions = DEFAULT_SURGERY_NAMES.filter(
    (name) => !existingProcedures.includes(name.toLowerCase())
  );

  const handleAddItem = (procedure: string) => {
    store.addItemWithName(procedure);
  };

  // Show empty state with previous visit summary if no data
  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No surgical history recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddItem}
            placeholder="Add surgery..."
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
        emptyMessage="No surgeries added"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            {/* Procedure */}
            <TableCell>
              <TableInput
                value={item.procedure}
                onChange={(v) => store.updateItem(item.id, 'procedure', v)}
                placeholder="Procedure name"
                isBold
              />
            </TableCell>
            {/* Date */}
            <TableCell>
              <TableInput
                value={item.date}
                onChange={(v) => store.updateItem(item.id, 'date', v)}
                placeholder="e.g. 2020"
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
          onSelect={handleAddItem}
          placeholder="Add surgery..."
          buttonLabel="Add"
          variant="teal"
          hidden={hideAddOption}
        />
      </div>
    </div>
  );
});
