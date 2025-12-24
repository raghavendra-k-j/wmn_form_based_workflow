import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  SelectInput,
  TextAreaInput,
  SectionDivider,
} from '../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const MODE_OF_DELIVERY_OPTIONS = ['Normal', 'Forceps', 'Vacuum', 'CS'];

const SEX_OPTIONS = ['Male', 'Female'];

const PERINEAL_TEAR_OPTIONS = ['None', 'I', 'II', 'IIa', 'IIb', 'IIc', 'III', 'IV'];

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/* =============================================================================
 * DELIVERY INFO FORM
 * ============================================================================= */

/** Delivery Info Form Component */
export const DeliveryInfoContent = observer(() => {
  // Delivery Details
  const [dateOfDelivery, setDateOfDelivery] = useState(getTodayDate);
  const [modeOfDelivery, setModeOfDelivery] = useState('');
  const [sex, setSex] = useState('');
  const [birthWeight, setBirthWeight] = useState('');
  const [indicationForCS, setIndicationForCS] = useState('');
  const [perinealTear, setPerinealTear] = useState('');
  const [otherConcerns, setOtherConcerns] = useState('');

  const showCSIndication = modeOfDelivery === 'CS';

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      {/* Section 1: Basic Delivery Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Date of Delivery">
          <TextInput
            type="date"
            value={dateOfDelivery}
            onChange={setDateOfDelivery}
          />
        </FormField>
        <FormField label="Mode of Delivery">
          <SelectInput
            value={modeOfDelivery}
            onChange={setModeOfDelivery}
            options={MODE_OF_DELIVERY_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Sex">
          <SelectInput
            value={sex}
            onChange={setSex}
            options={SEX_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Birth Weight (kg)">
          <TextInput
            value={birthWeight}
            onChange={setBirthWeight}
            placeholder="e.g. 3.2"
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 2: CS & Perineal Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField label="Perineal Tear">
          <SelectInput
            value={perinealTear}
            onChange={setPerinealTear}
            options={PERINEAL_TEAR_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        {showCSIndication && (
          <FormField label="Indication for CS" className="md:col-span-2">
            <TextInput
              value={indicationForCS}
              onChange={setIndicationForCS}
              placeholder="e.g. Failure to progress, Fetal distress..."
            />
          </FormField>
        )}
      </div>

      <SectionDivider />

      {/* Section 3: Other Concerns */}
      <FormField label="Other Intrapartum/Postpartum Concerns">
        <TextAreaInput
          value={otherConcerns}
          onChange={setOtherConcerns}
          placeholder="PPH, Shoulder Dystocia, etc..."
          rows={2}
        />
      </FormField>
    </div>
  );
});
