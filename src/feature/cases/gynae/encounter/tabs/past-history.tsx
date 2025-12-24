import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PastHistoryStore,
  PastHistoryProvider,
  PastHistoryView,
} from '../../../../medical-history/past-history';

/** Past History Tab Content */
export const PastHistoryContent = observer(() => {
  // Create store instance with initialization
  const store = useMemo(() => {
    const s = new PastHistoryStore();
    s.initialize();
    return s;
  }, []);

  return (
    <PastHistoryProvider store={store}>
      <PastHistoryView isEditMode={true} />
    </PastHistoryProvider>
  );
});
