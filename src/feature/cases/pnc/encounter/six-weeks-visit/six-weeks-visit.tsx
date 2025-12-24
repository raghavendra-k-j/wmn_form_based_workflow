import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  TextAreaInput,
  RadioGroup,
  SectionDivider,
} from '../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const YES_NO_OPTIONS = ['Yes', 'No'];

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/* =============================================================================
 * 6 WEEKS VISIT FORM
 * ============================================================================= */

/** 6 Weeks Postpartum Visit Form Component */
export const SixWeeksVisitContent = observer(() => {
  // Visit Info
  const [visitDate, setVisitDate] = useState(getTodayDate);

  // Assessment
  const [concerns, setConcerns] = useState('');
  const [moodOkay, setMoodOkay] = useState('');

  // Vitals & Examination
  const [bp, setBp] = useState('');
  const [pallor, setPallor] = useState('');
  const [breasts, setBreasts] = useState('');
  const [pa, setPa] = useState('');
  const [perineum, setPerineum] = useState('');

  // Medications & Contraception
  const [medication, setMedication] = useState('');
  const [contraception, setContraception] = useState('');

  // Follow-up
  const [sb, setSb] = useState('');
  const [nextVisit, setNextVisit] = useState('');

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      {/* Section 1: Visit Date */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Visit Date">
          <TextInput
            type="date"
            value={visitDate}
            onChange={setVisitDate}
          />
        </FormField>
        <FormField label="Mood Okay">
          <RadioGroup
            value={moodOkay}
            onChange={setMoodOkay}
            options={YES_NO_OPTIONS}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 2: Concerns */}
      <FormField label="Concerns, if any">
        <TextAreaInput
          value={concerns}
          onChange={setConcerns}
          placeholder="Enter concerns..."
          rows={2}
        />
      </FormField>

      <SectionDivider />

      {/* Section 3: Vitals & Examination */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="BP (mmHg)">
          <TextInput
            value={bp}
            onChange={setBp}
            placeholder="e.g. 120/80"
          />
        </FormField>
        <FormField label="Pallor">
          <TextInput
            value={pallor}
            onChange={setPallor}
          />
        </FormField>
        <FormField label="Breasts">
          <TextInput
            value={breasts}
            onChange={setBreasts}
          />
        </FormField>
        <FormField label="PA (Per Abdomen)">
          <TextInput
            value={pa}
            onChange={setPa}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormField label="Perineum">
          <TextAreaInput
            value={perineum}
            onChange={setPerineum}
            rows={2}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 4: Medications & Contraception */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Medication">
          <TextAreaInput
            value={medication}
            onChange={setMedication}
            placeholder="Current medications..."
            rows={2}
          />
        </FormField>
        <FormField label="Contraception">
          <TextInput
            value={contraception}
            onChange={setContraception}
            placeholder="e.g. OCP, IUD..."
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 5: Follow-up */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="S/B">
          <TextInput
            value={sb}
            onChange={setSb}
          />
        </FormField>
        <FormField label="Next Visit">
          <TextInput
            type="date"
            value={nextVisit}
            onChange={setNextVisit}
          />
        </FormField>
      </div>
    </div>
  );
});
