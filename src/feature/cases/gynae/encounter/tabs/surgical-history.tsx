import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  SurgicalHistoryStore,
  SurgicalHistoryProvider,
  SurgicalHistoryView,
} from '../../../../medical-history/surgical-history';

/** Surgical History Tab Content */
export const SurgicalHistoryContent = observer(() => {
  // Create store instance - starts empty
  const store = useMemo(() => new SurgicalHistoryStore(), []);

  return (
    <SurgicalHistoryProvider store={store}>
      <SurgicalHistoryView isEditMode={true} />
    </SurgicalHistoryProvider>
  );
});
