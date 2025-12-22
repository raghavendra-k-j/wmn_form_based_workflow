import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PersonalHistoryStore,
  PersonalHistoryProvider,
  PersonalHistoryView,
} from '../../../../medical-history/personal-history';

/** Personal History Tab Content */
export const PersonalHistoryContent = observer(() => {
  // Create store instance with default habits pre-populated
  const store = useMemo(() => {
    const s = new PersonalHistoryStore();
    s.loadDefaultItems();
    return s;
  }, []);

  return (
    <PersonalHistoryProvider store={store}>
      <PersonalHistoryView isEditMode={true} />
    </PersonalHistoryProvider>
  );
});
