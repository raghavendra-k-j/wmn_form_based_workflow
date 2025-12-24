import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FamilyHistoryStore,
  FamilyHistoryProvider,
  FamilyHistoryView,
} from '../../../../medical-history/family-history';

/** Family History Tab Content */
export const FamilyHistoryContent = observer(() => {
  // Create store instance with initialization
  const store = useMemo(() => {
    const s = new FamilyHistoryStore();
    s.initialize();
    return s;
  }, []);

  return (
    <FamilyHistoryProvider store={store}>
      <FamilyHistoryView isEditMode={true} />
    </FamilyHistoryProvider>
  );
});
