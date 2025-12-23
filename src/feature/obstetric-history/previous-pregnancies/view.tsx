import { PreviousPregnanciesProvider } from './context';
import { PreviousPregnanciesTable } from './table';
import type { PreviousPregnanciesStore } from './store';

interface PreviousPregnanciesViewProps {
  store?: PreviousPregnanciesStore;
}

/**
 * Previous Pregnancies View
 * Self-contained view with provider and table
 * Can be embedded in ANC, Gynae, PNC encounters
 */
export function PreviousPregnanciesView({ store }: PreviousPregnanciesViewProps) {
  return (
    <PreviousPregnanciesProvider store={store}>
      <PreviousPregnanciesTable />
    </PreviousPregnanciesProvider>
  );
}
