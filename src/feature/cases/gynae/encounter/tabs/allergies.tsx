import { useMemo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  DrugAllergiesStore,
  DrugAllergiesProvider,
  DrugAllergiesView,
} from '../../../../medical-history/drug-allergies';

/** Drug Allergies Tab Content */
export const AllergiesContent = observer(() => {
  // Create store instance
  const store = useMemo(() => new DrugAllergiesStore(), []);

  // Initialize on mount
  useEffect(() => {
    store.initialize();
  }, [store]);

  return (
    <DrugAllergiesProvider store={store}>
      <DrugAllergiesView isEditMode={true} />
    </DrugAllergiesProvider>
  );
});
