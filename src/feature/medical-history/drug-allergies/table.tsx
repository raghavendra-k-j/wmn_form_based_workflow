import { observer } from 'mobx-react-lite';
import { useDrugAllergiesStore } from './context';
import { MASTER_ALLERGIES } from './master-data';
import { DRUG_ALLERGY_STATUS_OPTIONS } from './types';
import {
  DataTable,
  TableRow,
  TableCell,
  TableInput,
  DeleteButton,
  AutocompleteInput,
  PreviousVisitBanner,
} from '../shared/components';

const getColumns = () => [
  { key: 'name', label: 'Drug Allergy', width: '40%' },
  { key: 'status', label: 'Status', width: '15%' },
  { key: 'note', label: 'Note', width: '40%' },
  { key: 'actions', label: '', width: '5%' },
];

/** Status Toggle Button */
const StatusToggle = observer(({ 
  status, 
  onChange 
}: { 
  status: 'active' | 'inactive'; 
  onChange: (status: 'active' | 'inactive') => void;
}) => {
  const option = DRUG_ALLERGY_STATUS_OPTIONS.find(o => o.value === status);
  
  return (
    <button
      type="button"
      onClick={() => onChange(status === 'active' ? 'inactive' : 'active')}
      className={`px-2 py-1 text-[11px] font-bold rounded border transition-colors cursor-pointer ${option?.className}`}
    >
      {option?.label}
    </button>
  );
});

/** Previous Visit Summary Display */
const PreviousVisitSummary = observer(() => {
  const store = useDrugAllergiesStore();
  if (!store.hasPreviousVisitData) return null;

  return (
    <PreviousVisitBanner
      date={store.previousVisitDate}
      onIgnore={() => store.ignorePreviousVisit()}
      onCopyAll={() => store.copyFromPreviousVisit()}
    >
      <DataTable columns={getColumns()} isEmpty={false} className="mb-0">
        {store.previousVisitData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-700">{item.name}</span>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                item.status === 'active' 
                  ? 'bg-red-50 text-red-700' 
                  : 'bg-zinc-100 text-zinc-500'
              }`}>
                {item.status === 'active' ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-[11px] text-zinc-500 italic">{item.note || '-'}</span>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

export const DrugAllergiesTable = observer(({ hideAddOption = false }: { hideAddOption?: boolean }) => {
  const store = useDrugAllergiesStore();

  // Filter master allergies to exclude already added items
  const existingItems = store.items.map((i) => i.name.toLowerCase());
  const availableSuggestions = MASTER_ALLERGIES.filter(
    (name) => !existingItems.includes(name.toLowerCase())
  );

  const handleAddItem = (name: string) => {
    store.addItemWithName(name);
  };

  // Show previous visit banner if we have prev data but no current items
  if (store.items.length === 0 && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No drug allergies recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddItem}
            placeholder="Search and add drug allergy..."
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
        emptyMessage="No drug allergies recorded"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="text-[12px] font-medium text-zinc-800">{item.name}</span>
            </TableCell>
            <TableCell>
              <StatusToggle
                status={item.status}
                onChange={(s) => store.updateItemStatus(item.id, s)}
              />
            </TableCell>
            <TableCell>
              <TableInput
                value={item.note || ''}
                onChange={(v) => store.updateItemNote(item.id, v)}
                placeholder="Add note..."
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
          placeholder="Search and add drug allergy..."
          buttonLabel="Add"
          variant="teal"
          hidden={hideAddOption}
        />
      </div>
    </div>
  );
});
