import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FormField, TextAreaInput } from '../../../../../components';

/** Lab Tests & Scans Form Component */
export const LabTestsScans = observer(() => {
  const [labTests, setLabTests] = useState('');
  const [scans, setScans] = useState('');

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      <div className="space-y-4">
        <FormField label="Lab Tests">
          <TextAreaInput
            value={labTests}
            onChange={setLabTests}
            placeholder="CBC, LFT, RFT, Thyroid profile..."
            rows={2}
          />
        </FormField>
        <FormField label="Scans">
          <TextAreaInput
            value={scans}
            onChange={setScans}
            placeholder="USG Pelvis, MRI, CT Scan..."
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
});
