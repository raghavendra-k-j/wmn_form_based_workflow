import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PersonalHistoryStore,
  PersonalHistoryProvider,
  PersonalHistoryView,
} from '../../../../medical-history/personal-history';

/** Personal History Tab Content */
export const PersonalHistoryContent = observer(() => {
  // Create store instance with initialization
  const store = useMemo(() => {
    const s = new PersonalHistoryStore();
    s.initialize();
    return s;
  }, []);

  return (
    <PersonalHistoryProvider store={store}>
      <PersonalHistoryView isEditMode={true} />
    </PersonalHistoryProvider>
  );
});
