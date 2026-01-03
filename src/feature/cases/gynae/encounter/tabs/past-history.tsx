import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  PastHistory2Store,
  PastHistory2Provider,
  PastHistory2View,
} from '../../../../medical-history/past-history2';

/** Past History Tab Content */
export const PastHistoryContent = observer(() => {
  const { patientId } = useParams<{ patientId: string }>();

  // Create store instance with patient ID (memoized to maintain state)
  const store = useMemo(() => {
    return new PastHistory2Store(patientId || 'unknown-patient');
  }, [patientId]);

  return (
    <PastHistory2Provider store={store}>
      <PastHistory2View />
    </PastHistory2Provider>
  );
});
