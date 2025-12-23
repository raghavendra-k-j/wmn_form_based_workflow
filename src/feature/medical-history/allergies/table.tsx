import { observer } from 'mobx-react-lite';
import { useAllergiesStore } from './context';
import { DEFAULT_ALLERGIES } from './types';
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
  { key: 'name', label: 'Allergies', width: '95%' },
  { key: 'actions', label: '', width: '5%' },
];

const PreviousVisitSummary = observer(() => {
  const store = useAllergiesStore();
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
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </PreviousVisitBanner>
  );
});

export const AllergiesTable = observer(({ hideAddOption = true }: { hideAddOption?: boolean }) => {
  const store = useAllergiesStore();

  const existingItems = store.items.map((i) => i.name.toLowerCase());
  const availableSuggestions = DEFAULT_ALLERGIES.filter(
    (name) => !existingItems.includes(name.toLowerCase())
  );

  const handleAddItem = (name: string) => {
    store.addItemWithName(name);
  };

  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No known allergies recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddItem}
            placeholder="Add allergy..."
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
        emptyMessage="No allergies recorded"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <TableInput
                value={item.name}
                onChange={(v) => store.updateItem(item.id, v)}
                placeholder="Allergy name"
                isBold
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
          placeholder="Add allergy..."
          buttonLabel="Add"
          variant="teal"
          hidden={hideAddOption}
        />
      </div>
    </div>
  );
});
