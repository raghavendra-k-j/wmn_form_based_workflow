import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  SurgicalHistory2Store,
  SurgicalHistory2Provider,
  SurgicalHistory2View,
} from '../../../../medical-history/surgical-history2';

/** Surgical History Tab Content */
export const SurgicalHistoryContent = observer(() => {
  const { patientId } = useParams<{ patientId: string }>();

  // Create store instance with patient ID (memoized to maintain state)
  const store = useMemo(() => {
    const newStore = new SurgicalHistory2Store(patientId || 'unknown-patient');
    newStore.initialize();
    return newStore;
  }, [patientId]);

  return (
    <SurgicalHistory2Provider value={store}>
      <SurgicalHistory2View />
    </SurgicalHistory2Provider>
  );
});
