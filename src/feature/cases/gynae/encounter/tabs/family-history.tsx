import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FamilyHistoryStore,
  FamilyHistoryProvider,
  FamilyHistoryView,
} from '../../../../medical-history/family-history';

/** Family History Tab Content */
export const FamilyHistoryContent = observer(() => {
  // Create store instance with default conditions pre-populated
  const store = useMemo(() => {
    const s = new FamilyHistoryStore();
    s.loadDefaultItems();
    return s;
  }, []);

  return (
    <FamilyHistoryProvider store={store}>
      <FamilyHistoryView isEditMode={true} />
    </FamilyHistoryProvider>
  );
});
