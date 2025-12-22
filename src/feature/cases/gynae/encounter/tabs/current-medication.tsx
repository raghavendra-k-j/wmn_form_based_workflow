import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  CurrentMedicationStore,
  CurrentMedicationProvider,
  CurrentMedicationView,
} from '../../../../medical-history/current-medication';

/** Current Medication Tab Content */
export const CurrentMedicationContent = observer(() => {
  // Create store instance with default medications pre-populated
  const store = useMemo(() => {
    const s = new CurrentMedicationStore();
    s.loadDefaultItems();
    return s;
  }, []);

  return (
    <CurrentMedicationProvider store={store}>
      <CurrentMedicationView isEditMode={true} />
    </CurrentMedicationProvider>
  );
});
