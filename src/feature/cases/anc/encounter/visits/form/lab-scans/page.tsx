import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextAreaInput,
} from '../../../../../../../components';

/* =============================================================================
 * LAB/SCANS PAGE
 * ============================================================================= */

/** Lab/Scans Page - Lab tests and Scans for this visit */
export const LabScansPage = observer(() => {
  const [labTests, setLabTests] = useState('');
  const [scans, setScans] = useState('');

  return (
    <div className="bg-white border border-zinc-200 p-4">
      <div className="space-y-4">
        <FormField label="Lab Tests">
          <TextAreaInput
            value={labTests}
            onChange={setLabTests}
            placeholder="Enter lab tests ordered for this visit..."
            rows={2}
          />
        </FormField>

        <FormField label="Scans">
          <TextAreaInput
            value={scans}
            onChange={setScans}
            placeholder="Enter scans ordered for this visit..."
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
});

export { LabScansPage as default };
