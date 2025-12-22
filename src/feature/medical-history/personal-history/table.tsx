import { observer } from 'mobx-react-lite';
import { usePersonalHistoryStore } from './context';
import { DEFAULT_PERSONAL_HABITS, PERSONAL_STATUS_OPTIONS } from './types';
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
  { key: 'habit', label: 'Habit / Factor', width: '25%' },
  { key: 'status', label: 'Status', width: '15%' },
  { key: 'duration', label: 'Duration', width: '20%' },
  { key: 'notes', label: 'Notes', width: '35%' },
  { key: 'actions', label: '', width: '5%' },
];

/** Previous Visit Summary Component */
const PreviousVisitSummary = observer(() => {
  const store = usePersonalHistoryStore();

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
              <span className="text-[12px] font-medium text-zinc-700">{item.habit}</span>
            </TableCell>
            <TableCell>
               <span
                className={`text-[11px] px-2 py-0.5 border ${
                  item.status === 'active'
                    ? 'bg-violet-100 text-violet-700 border-violet-200'
                    : item.status === 'quit'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                }`}
              >
                {item.status === 'active' ? 'Yes' : item.status === 'quit' ? 'Quit' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-[12px] text-zinc-500">{item.duration || '-'}</span>
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
 * Personal History Table Component
 */
export const PersonalHistoryTable = observer(() => {
  const store = usePersonalHistoryStore();

  const existingHabits = store.items.map((i) => i.habit.toLowerCase());
  const availableSuggestions = DEFAULT_PERSONAL_HABITS.filter(
    (name) => !existingHabits.includes(name.toLowerCase())
  );

  const handleAddHabit = (habit: string) => {
    store.addItemWithHabit(habit);
  };

  // Show empty state with previous visit summary if no data
  if (!store.hasData && store.hasPreviousVisitData) {
    return (
      <div>
        <div className="py-4 text-center">
          <p className="text-sm text-zinc-400 italic mb-2">No personal history recorded for this visit</p>
        </div>

        <div className="px-3 py-2 border-t border-zinc-100">
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddHabit}
            placeholder="Add habit or factor..."
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
        emptyMessage="No personal history items"
      >
        {store.items.map((item) => (
          <TableRow key={item.id}>
            {/* Habit */}
            <TableCell>
              <TableInput
                value={item.habit}
                onChange={(v) => store.updateItem(item.id, 'habit', v)}
                placeholder="Condition/Factor"
                isBold
              />
            </TableCell>
            {/* Status (Yes/No/Quit/Occasional) */}
            <TableCell>
              <div className="relative">
                <select
                  value={item.status}
                  onChange={(e) => store.updateItem(item.id, 'status', e.target.value as any)}
                  className={`w-full appearance-none bg-transparent border-none focus:ring-0 p-0 text-[12px] font-medium focus:outline-none cursor-pointer ${
                    item.status === 'active' ? 'text-violet-600' :
                    item.status === 'occasional' ? 'text-blue-600' :
                    item.status === 'quit' ? 'text-amber-600' :
                    'text-zinc-400'
                  }`}
                >
                  {PERSONAL_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </TableCell>
            {/* Duration */}
             <TableCell>
              <TableInput
                value={item.duration || ''}
                onChange={(v) => store.updateItem(item.id, 'duration', v)}
                placeholder="e.g. 5 years"
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
              <DeleteButton onClick={() => store.removeItem(item.id)} />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <div className="px-3 py-2 border-t border-zinc-100">
        <AutocompleteInput
          suggestions={[...availableSuggestions]}
          onSelect={handleAddHabit}
          placeholder="Add habit or factor..."
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
