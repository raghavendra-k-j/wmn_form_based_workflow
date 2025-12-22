import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PastHistoryStore,
  PastHistoryProvider,
  PastHistoryView,
} from '../../../../medical-history/past-history';

/** Past History Tab Content */
export const PastHistoryContent = observer(() => {
  // Create store instance with default conditions pre-populated
  const store = useMemo(() => {
    const s = new PastHistoryStore();
    s.loadDefaultConditions();
    return s;
  }, []);

  return (
    <PastHistoryProvider store={store}>
      <PastHistoryView isEditMode={true} />
    </PastHistoryProvider>
  );
});
