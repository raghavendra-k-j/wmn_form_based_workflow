import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { 
  MedicalHistoryOverviewStore, 
  MedicalHistoryOverviewProvider, 
  MedicalHistoryOverview 
} from '../../../../medical-history/overview';

/** Medical History Overview Tab Content */
export const MedicalHistoryOverviewContent = observer(() => {
  const store = useMemo(() => new MedicalHistoryOverviewStore(), []);

  return (
    <MedicalHistoryOverviewProvider store={store}>
      <MedicalHistoryOverview />
    </MedicalHistoryOverviewProvider>
  );
});
