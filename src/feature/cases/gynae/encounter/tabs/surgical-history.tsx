import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  SurgicalHistoryStore,
  SurgicalHistoryProvider,
  SurgicalHistoryView,
} from '../../../../medical-history/surgical-history';

/** Surgical History Tab Content */
export const SurgicalHistoryContent = observer(() => {
  // Create store instance with initialization
  const store = useMemo(() => {
    const s = new SurgicalHistoryStore();
    s.initialize();
    return s;
  }, []);

  return (
    <SurgicalHistoryProvider store={store}>
      <SurgicalHistoryView isEditMode={true} />
    </SurgicalHistoryProvider>
  );
});
