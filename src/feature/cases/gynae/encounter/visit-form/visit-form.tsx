import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  SelectInput,
  DatalistInput,
  TextAreaInput,
  ReadOnlyField,
  SectionDivider,
} from '../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const CONTRACEPTION_OPTIONS = ['None', 'OCP', 'IUD/Cu-T', 'Barrier', 'Injectables', 'Implant', 'Natural', 'Sterilization'];

const MENSTRUAL_PATTERN_OPTIONS = ['Regular', 'Irregular'];

const FLOW_OPTIONS = ['Light', 'Moderate', 'Heavy'];

const DYSMENORRHEA_OPTIONS = ['Yes', 'No'];

const MICTURITION_OPTIONS = ['Normal', 'Burning', 'Frequency', 'Urgency', 'Incontinence', 'Dysuria', 'Nocturia'];

const BOWELS_OPTIONS = ['Regular', 'Constipation', 'Diarrhea', 'Irregular'];

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function getCurrentTime(): string {
  return new Date().toTimeString().slice(0, 5);
}

function generateVisitNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VIS-${year}-${random}`;
}

/* =============================================================================
 * VISIT FORM CONTENT
 * ============================================================================= */

/** Visit Form Component */
export const VisitForm = observer(() => {
  // Form state
  const [visitNumber] = useState(generateVisitNumber);
  const [visitDate, setVisitDate] = useState(getTodayDate);
  const [visitTime, setVisitTime] = useState(getCurrentTime);
  const [presentComplaint, setPresentComplaint] = useState('');

  // Obstetric History
  const [para, setPara] = useState('');
  const [lmp, setLmp] = useState(getTodayDate);
  const [contraception, setContraception] = useState('');
  const [previousSmear, setPreviousSmear] = useState('');

  // Menstrual History
  const [menstrualPattern, setMenstrualPattern] = useState('');
  const [menarche, setMenarche] = useState('');
  const [flow, setFlow] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [bleedingDuration, setBleedingDuration] = useState('');
  const [dysmenorrhea, setDysmenorrhea] = useState('');

  // Systems Review
  const [micturition, setMicturition] = useState('');
  const [bowels, setBowels] = useState('');

  // Clinical Notes
  const [impression, setImpression] = useState('');
  const [medications, setMedications] = useState('');
  const [advice, setAdvice] = useState('');

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      {/* Section 1: Present Complaint & Visit Info */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <FormField label="Visit Number">
          <ReadOnlyField value={visitNumber} />
        </FormField>
        <FormField label="Visit Date">
          <TextInput
            type="date"
            value={visitDate}
            onChange={setVisitDate}
          />
        </FormField>
        <FormField label="Visit Time">
          <TextInput
            type="time"
            value={visitTime}
            onChange={setVisitTime}
          />
        </FormField>
        <FormField label="Seen By" className="md:col-span-2">
          <ReadOnlyField value="Dr. Example Doctor" />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField label="Present Complaint">
          <TextAreaInput
            value={presentComplaint}
            onChange={setPresentComplaint}
            placeholder="Enter complaints..."
            rows={2}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 2: Gynae History */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="LMP">
          <TextInput
            type="date"
            value={lmp}
            onChange={setLmp}
          />
        </FormField>
        <FormField label="Para">
          <TextInput
            value={para}
            onChange={setPara}
            placeholder="e.g. 2"
          />
        </FormField>
        <FormField label="Contraception">
          <SelectInput
            value={contraception}
            onChange={setContraception}
            options={CONTRACEPTION_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Previous Smear">
          <TextInput
            value={previousSmear}
            onChange={setPreviousSmear}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 3: Menstrual History */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField label="Menstrual Pattern">
          <SelectInput
            value={menstrualPattern}
            onChange={setMenstrualPattern}
            options={MENSTRUAL_PATTERN_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Menarche (Age)">
          <TextInput
            type="number"
            value={menarche}
            onChange={setMenarche}
            placeholder="Age at first period"
          />
        </FormField>
        <FormField label="Flow">
          <SelectInput
            value={flow}
            onChange={setFlow}
            options={FLOW_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Cycle Length (Days)">
          <TextInput
            type="text"
            value={cycleLength}
            onChange={setCycleLength}
            placeholder="Days between cycles"
          />
        </FormField>
        <FormField label="Bleeding Duration (Days)">
          <TextInput
            type="text"
            value={bleedingDuration}
            onChange={setBleedingDuration}
            placeholder="Days of bleeding"
          />
        </FormField>
        <FormField label="Pain with periods">
          <SelectInput
            value={dysmenorrhea}
            onChange={setDysmenorrhea}
            options={DYSMENORRHEA_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 4: Systems Review */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Micturition">
          <DatalistInput
            id="micturition-list"
            value={micturition}
            onChange={setMicturition}
            options={MICTURITION_OPTIONS}
            placeholder="Select or type..."
          />
        </FormField>
        <FormField label="Bowels">
          <DatalistInput
            id="bowels-list"
            value={bowels}
            onChange={setBowels}
            options={BOWELS_OPTIONS}
            placeholder="Select or type..."
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 5: Clinical Notes */}
      <div className="space-y-4">
        <FormField label="Impression">
          <TextAreaInput
            value={impression}
            onChange={setImpression}
            placeholder="Type diagnosis or impression..."
            rows={2}
          />
        </FormField>
        <FormField label="Medications">
          <TextAreaInput
            value={medications}
            onChange={setMedications}
            placeholder="Prescribe medications..."
            rows={2}
          />
        </FormField>
        <FormField label="Advice">
          <TextAreaInput
            value={advice}
            onChange={setAdvice}
            placeholder="Investigations, Treatment plan, Follow-up..."
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
});
