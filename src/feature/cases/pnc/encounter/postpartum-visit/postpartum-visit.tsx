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
 * POSTPARTUM VISIT FORM
 * ============================================================================= */

/** Postpartum Visit Form Component */
export const PostpartumVisitContent = observer(() => {
  // Visit Info
  const [visitDate, setVisitDate] = useState(getTodayDate);

  // Antenatal Conditions
  const [diabetes, setDiabetes] = useState('');
  const [hypertension, setHypertension] = useState('');
  const [thyroid, setThyroid] = useState('');
  const [anyOthers, setAnyOthers] = useState('');

  // Assessment
  const [concerns, setConcerns] = useState('');
  const [moodOkay, setMoodOkay] = useState('');
  const [medications, setMedications] = useState('');

  // Vitals & Examination
  const [bp, setBp] = useState('');
  const [pallor, setPallor] = useState('');
  const [breasts, setBreasts] = useState('');
  const [pa, setPa] = useState('');
  const [perineum, setPerineum] = useState('');

  // Advice & Follow-up
  const [advice, setAdvice] = useState('');
  const [contraceptionLeaflet, setContraceptionLeaflet] = useState('');
  const [sb, setSb] = useState('');
  const [nextCheckUp, setNextCheckUp] = useState('');

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
      </div>

      <SectionDivider />

      {/* Section 2: Antenatal Conditions */}
      <div className="mb-2">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Antenatal Conditions</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Diabetes">
          <TextInput
            value={diabetes}
            onChange={setDiabetes}
            placeholder="e.g. GDM on OHA"
          />
        </FormField>
        <FormField label="Hypertension">
          <TextInput
            value={hypertension}
            onChange={setHypertension}
            placeholder="e.g. PIH"
          />
        </FormField>
        <FormField label="Thyroid">
          <TextInput
            value={thyroid}
            onChange={setThyroid}
            placeholder="e.g. Hypothyroid"
          />
        </FormField>
        <FormField label="Any Others">
          <TextInput
            value={anyOthers}
            onChange={setAnyOthers}
            placeholder="e.g. H/o Depression"
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 3: Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Concerns, if any">
          <TextAreaInput
            value={concerns}
            onChange={setConcerns}
            placeholder="Enter concerns..."
            rows={2}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Mood Okay">
            <RadioGroup
              value={moodOkay}
              onChange={setMoodOkay}
              options={YES_NO_OPTIONS}
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
      </div>

      <SectionDivider />

      {/* Section 4: Examination */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <FormField label="Perineum">
          <TextInput
            value={perineum}
            onChange={setPerineum}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 5: Medications & Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Medications">
          <TextAreaInput
            value={medications}
            onChange={setMedications}
            placeholder="Current medications..."
            rows={2}
          />
        </FormField>
        <FormField label="Advice">
          <TextAreaInput
            value={advice}
            onChange={setAdvice}
            placeholder="Enter advice..."
            rows={2}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 6: Follow-up */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Contraception Leaflet">
          <RadioGroup
            value={contraceptionLeaflet}
            onChange={setContraceptionLeaflet}
            options={YES_NO_OPTIONS}
          />
        </FormField>
        <FormField label="S/B">
          <TextInput
            value={sb}
            onChange={setSb}
          />
        </FormField>
        <FormField label="Next Check Up">
          <TextInput
            type="date"
            value={nextCheckUp}
            onChange={setNextCheckUp}
          />
        </FormField>
      </div>
    </div>
  );
});
