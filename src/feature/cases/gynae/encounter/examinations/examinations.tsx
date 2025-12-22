import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  TextAreaInput,
  ReadOnlyField,
  SectionDivider,
} from '../../../../../components';

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

function calculateBMI(height: string, weight: string): string {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (!h || !w || h <= 0) return '';
  // Height in cm, weight in kg -> BMI = weight / (height in m)^2
  const heightInM = h / 100;
  const bmi = w / (heightInM * heightInM);
  return bmi.toFixed(1);
}

/* =============================================================================
 * EXAMINATIONS CONTENT
 * ============================================================================= */

/** Examinations Tab Content */
export const ExaminationsContent = observer(() => {
  // Vitals
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [pulse, setPulse] = useState('');
  const [bp, setBp] = useState('');

  // General Examination
  const [pallor, setPallor] = useState('');
  const [goiter, setGoiter] = useState('');

  // System Examination
  const [cvs, setCvs] = useState('');
  const [rs, setRs] = useState('');
  const [breasts, setBreasts] = useState('');

  // Abdominal & Pelvic
  const [pa, setPa] = useState('');
  const [veVv, setVeVv] = useState('');
  const [cervix, setCervix] = useState('');
  const [uterus, setUterus] = useState('');
  const [adnexa, setAdnexa] = useState('');

  const bmi = calculateBMI(height, weight);

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      {/* Section 1: Vitals */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <FormField label="Height (cm)">
          <TextInput
            value={height}
            onChange={setHeight}
            placeholder="e.g. 165"
          />
        </FormField>
        <FormField label="Weight (kg)">
          <TextInput
            value={weight}
            onChange={setWeight}
            placeholder="e.g. 60"
          />
        </FormField>
        <FormField label="BMI">
          <ReadOnlyField value={bmi || '—'} />
        </FormField>
        <FormField label="Pulse (/min)">
          <TextInput
            value={pulse}
            onChange={setPulse}
            placeholder="e.g. 72"
          />
        </FormField>
        <FormField label="BP (mmHg)">
          <TextInput
            value={bp}
            onChange={setBp}
            placeholder="e.g. 120/80"
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 2: General Examination */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Pallor">
          <TextInput
            value={pallor}
            onChange={setPallor}
          />
        </FormField>
        <FormField label="Goiter">
          <TextInput
            value={goiter}
            onChange={setGoiter}
          />
        </FormField>
        <FormField label="CVS">
          <TextInput
            value={cvs}
            onChange={setCvs}
          />
        </FormField>
        <FormField label="Breasts">
          <TextInput
            value={breasts}
            onChange={setBreasts}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 3: RS & P/A */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="RS (Respiratory System)">
          <TextInput
            value={rs}
            onChange={setRs}
          />
        </FormField>
        <FormField label="P/A (Per Abdomen)">
          <TextAreaInput
            value={pa}
            onChange={setPa}
            placeholder="Abdominal findings..."
            rows={2}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 4: Pelvic Examination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="VE: V&V (Vagina & Vulva)">
          <TextAreaInput
            value={veVv}
            onChange={setVeVv}
            rows={2}
          />
        </FormField>
        <FormField label="Cervix">
          <TextAreaInput
            value={cervix}
            onChange={setCervix}
            rows={2}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField label="Uterus">
          <TextAreaInput
            value={uterus}
            onChange={setUterus}
            rows={2}
          />
        </FormField>
        <FormField label="Adnexa">
          <TextAreaInput
            value={adnexa}
            onChange={setAdnexa}
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
});
