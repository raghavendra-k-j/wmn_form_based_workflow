import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  SelectInput,
} from '../../../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const EDEMA_OPTIONS = ['None', 'Mild (+)', 'Moderate (++)', 'Severe (+++)'];
const PALLOR_OPTIONS = ['None', 'Mild', 'Moderate', 'Severe'];
const ALBUMIN_OPTIONS = ['Nil', 'Trace', '+', '++', '+++'];
const PP_OPTIONS = ['Cephalic', 'Breech', 'Transverse', 'Oblique', 'Not Engaged'];

/* =============================================================================
 * EXAMINATIONS PAGE
 * ============================================================================= */

/** Examinations Page - Vitals and physical examination (nurse-updatable) */
export const ExaminationsPage = observer(() => {
  // Vitals
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [sfh, setSfh] = useState('');
  
  // Obstetric Examination
  const [pp, setPp] = useState('');
  const [fh, setFh] = useState('');
  const [edema, setEdema] = useState('');
  const [pallor, setPallor] = useState('');
  const [albumin, setAlbumin] = useState('');

  return (
    <div className="bg-white border border-zinc-200 p-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <FormField label="Height (cm)">
          <TextInput
            type="number"
            value={height}
            onChange={setHeight}
            placeholder="cm"
          />
        </FormField>
        <FormField label="Weight (kg)">
          <TextInput
            type="number"
            value={weight}
            onChange={setWeight}
            placeholder="kg"
          />
        </FormField>
        <FormField label="BP (mmHg)">
          <TextInput
            value={bp}
            onChange={setBp}
            placeholder="120/80"
          />
        </FormField>
        <FormField label="Pulse (bpm)">
          <TextInput
            type="number"
            value={pulse}
            onChange={setPulse}
            placeholder="bpm"
          />
        </FormField>
        <FormField label="SFH (cm)">
          <TextInput
            type="number"
            value={sfh}
            onChange={setSfh}
            placeholder="cm"
          />
        </FormField>
        <FormField label="PP">
          <SelectInput
            value={pp}
            onChange={setPp}
            options={PP_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <FormField label="Fetal Heart (FH)">
          <TextInput
            value={fh}
            onChange={setFh}
            placeholder="Present/Absent"
          />
        </FormField>
        <FormField label="Edema">
          <SelectInput
            value={edema}
            onChange={setEdema}
            options={EDEMA_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Pallor">
          <SelectInput
            value={pallor}
            onChange={setPallor}
            options={PALLOR_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Albumin">
          <SelectInput
            value={albumin}
            onChange={setAlbumin}
            options={ALBUMIN_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
      </div>
    </div>
  );
});
