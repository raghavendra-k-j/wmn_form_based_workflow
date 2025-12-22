import { observer } from 'mobx-react-lite';
import { useCurrentMedicationStore } from './context';
import { DEFAULT_MEDICATIONS, COMMON_FREQUENCIES } from './types';
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
  { key: 'name', label: 'Medication', width: '30%' },
  { key: 'dose', label: 'Dose', width: '15%' },
  { key: 'frequency', label: 'Frequency', width: '20%' },
  { key: 'reason', label: 'Reason (Notes)', width: '30%' },
  { key: 'actions', label: '', width: '5%' },
];

/** Previous Visit Summary Component */
const PreviousVisitSummary = observer(() => {
  const store = useCurrentMedicationStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <PreviousVisitBanner
      date={store.previousVisitDate}
      onIgnore={() => store.ignorePreviousVisit()}
      onCopyAll={() => store.copyFromPreviousVisit()}
    >
      <DataTable
        columns={getColumns()}
        isEmpty={false}
        className="mb-0"
      >
        {store.previousVisitData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-700">{item.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{item.dose || '-'}</span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{item.frequency || '-'}</span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-400 italic truncate block max-w-[200px]">
                {item.reason || '-'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

/**
 * Current Medication Table Component
 */
export const CurrentMedicationTable = observer(() => {
  const store = useCurrentMedicationStore();

  const existingItems = store.items.map((i) => i.name.toLowerCase());
  const availableSuggestions = DEFAULT_MEDICATIONS.filter(
    (name) => !existingItems.includes(name.toLowerCase())
  );

  const handleAddItem = (name: string) => {
    store.addItemWithName(name);
  };

  // Show empty state with previous visit summary if no data
  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No medications recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddItem}
            placeholder="Add medication..."
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
        isEmpty={store.items.length === 0}
        emptyMessage="No medications added"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            {/* Name */}
            <TableCell>
              <TableInput
                value={item.name}
                onChange={(v) => store.updateItem(item.id, 'name', v)}
                placeholder="Medication name"
                isBold
              />
            </TableCell>
            {/* Dose */}
            <TableCell>
               <TableInput
                value={item.dose}
                onChange={(v) => store.updateItem(item.id, 'dose', v)}
                placeholder="e.g. 500mg"
              />
            </TableCell>
            {/* Frequency - Datalist */}
            <TableCell>
               <div className="relative">
                 <input
                   list={`freq-list-${item.id}`}
                   value={item.frequency}
                   onChange={(e) => store.updateItem(item.id, 'frequency', e.target.value)}
                   placeholder="e.g. OD"
                   className="w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] text-zinc-900 placeholder:text-zinc-300 focus:outline-none"
                 />
                 <datalist id={`freq-list-${item.id}`}>
                    {COMMON_FREQUENCIES.map((f) => (
                      <option key={f} value={f} />
                    ))}
                 </datalist>
               </div>
            </TableCell>
            {/* Reason/Notes */}
            <TableCell>
              <textarea
                value={item.reason}
                onChange={(e) => store.updateItem(item.id, 'reason', e.target.value)}
                placeholder="Reason..."
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] text-zinc-600 placeholder:text-zinc-300 focus:outline-none resize-none"
              />
            </TableCell>
            <TableCell>
              <DeleteButton onClick={() => store.removeItem(item.id)} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <div className="px-3 py-2 border-t border-zinc-100">
        <AutocompleteInput
          suggestions={[...availableSuggestions]}
          onSelect={handleAddItem}
          placeholder="Add medication..."
          buttonLabel="Add"
          variant="teal"
        />
      </div>
    </div>
  );
});
