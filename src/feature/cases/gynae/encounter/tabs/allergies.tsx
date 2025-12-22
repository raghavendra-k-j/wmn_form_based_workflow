import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  AllergiesStore,
  AllergiesProvider,
  AllergiesView,
} from '../../../../medical-history/allergies';

/** Allergies Tab Content */
export const AllergiesContent = observer(() => {
  // Create store instance with default allergies pre-populated
  const store = useMemo(() => {
    const s = new AllergiesStore();
    s.loadDefaultItems();
    return s;
  }, []);

  return (
    <AllergiesProvider store={store}>
      <AllergiesView isEditMode={true} />
    </AllergiesProvider>
  );
});
