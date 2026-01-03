import { observer } from 'mobx-react-lite';
import { DiagnosisForm } from './diagnosis-form';

export const AddView = observer(() => {
  return (
    <div className="space-y-4">
      <DiagnosisForm />
    </div>
  );
});

AddView.displayName = 'AddView';
