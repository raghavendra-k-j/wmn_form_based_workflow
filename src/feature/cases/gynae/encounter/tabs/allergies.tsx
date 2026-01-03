import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  DrugAllergies2Store,
  DrugAllergies2Provider,
  DrugAllergies2View,
} from '../../../../medical-history/drug-allergies2';

/** Drug Allergies Tab Content */
export const AllergiesContent = observer(() => {
  const { patientId } = useParams<{ patientId: string }>();

  const store = useMemo(() => {
    const newStore = new DrugAllergies2Store(patientId || 'unknown-patient');
    newStore.initialize();
    return newStore;
  }, [patientId]);

  return (
    <DrugAllergies2Provider value={store}>
      <DrugAllergies2View />
    </DrugAllergies2Provider>
  );
});
