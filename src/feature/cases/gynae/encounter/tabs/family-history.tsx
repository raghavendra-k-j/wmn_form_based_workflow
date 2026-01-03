import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  FamilyHistory2Store,
  FamilyHistory2Provider,
  FamilyHistory2View,
} from '../../../../medical-history/family-history2';

/** Family History Tab Content */
export const FamilyHistoryContent = observer(() => {
  const { patientId } = useParams<{ patientId: string }>();

  // Create store instance with patient ID (memoized to maintain state)
  const store = useMemo(() => {
    const newStore = new FamilyHistory2Store(patientId || 'unknown-patient');
    newStore.initialize();
    return newStore;
  }, [patientId]);

  return (
    <FamilyHistory2Provider value={store}>
      <FamilyHistory2View />
    </FamilyHistory2Provider>
  );
});
