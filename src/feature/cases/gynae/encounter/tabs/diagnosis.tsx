import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  DiagnosisStore,
  DiagnosisProvider,
  DiagnosisView,
} from '../../../../diagnosis';

/** Diagnosis Tab Content */
export const DiagnosisContent = observer(() => {
  const { patientId, encounterId } = useParams<{ patientId: string; encounterId: string }>();

  const store = useMemo(() => {
    const newStore = new DiagnosisStore(
      patientId || 'unknown-patient',
      encounterId || 'unknown-encounter'
    );
    newStore.initialize();
    return newStore;
  }, [patientId, encounterId]);

  return (
    <DiagnosisProvider value={store}>
      <DiagnosisView />
    </DiagnosisProvider>
  );
});
