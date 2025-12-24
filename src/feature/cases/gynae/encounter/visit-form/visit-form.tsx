import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  SelectInput,
  TextAreaInput,
  ReadOnlyField,
  SectionDivider,
  RadioGroup,
} from '../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const CONTRACEPTION_OPTIONS = [
  'Barrier',
  'Cu-T',
  'Implant',
  'Injectables',
  'IUD (Mirena)',
  'Natural',
  'None',
  'OCP',
  'Sterilization',
].sort();

const MENSTRUAL_PATTERN_OPTIONS = ['Regular', 'Irregular'];

const FLOW_OPTIONS = ['Light', 'Moderate', 'Heavy'];

const YES_NO_OPTIONS = ['Yes', 'No'];

const PAP_SMEAR_RESULT_OPTIONS = [
  'Normal',
  'Abnormal',
  'ASCUS',
  'LSIL',
  'HSIL',
  'Inadequate Sample',
];

const HPV_RESULT_OPTIONS = [
  'Negative',
  'Positive (Low Risk)',
  'Positive (High Risk)',
  'Unknown',
];

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
  const [lmp, setLmp] = useState('');
  const [contraception, setContraception] = useState('');

  // Cervical Cancer Screening - Pap Smear
  const [papSmearDone, setPapSmearDone] = useState('');
  const [lastPapSmearDate, setLastPapSmearDate] = useState('');
  const [papSmearResult, setPapSmearResult] = useState('');

  // Cervical Cancer Screening - HPV
  const [hpvTestDone, setHpvTestDone] = useState('');
  const [lastHpvTestDate, setLastHpvTestDate] = useState('');
  const [hpvResult, setHpvResult] = useState('');

  // Menstrual History
  const [menstrualPattern, setMenstrualPattern] = useState('');
  const [menarche, setMenarche] = useState('13'); // Pre-filled from previous visit
  const [flow, setFlow] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [bleedingDuration, setBleedingDuration] = useState('');
  const [dysmenorrhea, setDysmenorrhea] = useState('');
  const [interMenstrualBleeding, setInterMenstrualBleeding] = useState('');

  // Systems Review
  const [micturition, setMicturition] = useState('');
  const [micturitionComments, setMicturitionComments] = useState('');
  const [bowels, setBowels] = useState('');
  const [bowelsComments, setBowelsComments] = useState('');

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
      </div>

      <SectionDivider />

      {/* Section 3: Cervical Cancer Screening */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Cervical Cancer Screening</h4>
        
        {/* Pap Smear Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField label="Pap Smear Done">
            <SelectInput
              value={papSmearDone}
              onChange={(val) => {
                setPapSmearDone(val);
                if (val !== 'Yes') {
                  setLastPapSmearDate('');
                  setPapSmearResult('');
                }
              }}
              options={YES_NO_OPTIONS}
              placeholder="Select..."
            />
          </FormField>
          {papSmearDone === 'Yes' && (
            <>
              <FormField label="Last Pap Smear Date">
                <TextInput
                  type="date"
                  value={lastPapSmearDate}
                  onChange={setLastPapSmearDate}
                />
              </FormField>
              <FormField label="Pap Smear Result">
                <SelectInput
                  value={papSmearResult}
                  onChange={setPapSmearResult}
                  options={PAP_SMEAR_RESULT_OPTIONS}
                  placeholder="Select result..."
                />
              </FormField>
            </>
          )}
        </div>

        {/* HPV Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField label="HPV Test Done">
            <SelectInput
              value={hpvTestDone}
              onChange={(val) => {
                setHpvTestDone(val);
                if (val !== 'Yes') {
                  setLastHpvTestDate('');
                  setHpvResult('');
                }
              }}
              options={YES_NO_OPTIONS}
              placeholder="Select..."
            />
          </FormField>
          {hpvTestDone === 'Yes' && (
            <>
              <FormField label="Last HPV Test Date">
                <TextInput
                  type="date"
                  value={lastHpvTestDate}
                  onChange={setLastHpvTestDate}
                />
              </FormField>
              <FormField label="HPV Result">
                <SelectInput
                  value={hpvResult}
                  onChange={setHpvResult}
                  options={HPV_RESULT_OPTIONS}
                  placeholder="Select result..."
                />
              </FormField>
            </>
          )}
        </div>
      </div>

      <SectionDivider />

      {/* Section 4: Menstrual History */}
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
            options={YES_NO_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Inter-menstrual spotting/bleeding">
          <RadioGroup
            value={interMenstrualBleeding}
            onChange={setInterMenstrualBleeding}
            options={YES_NO_OPTIONS}
          />
        </FormField>
      </div>

      <SectionDivider />

      {/* Section 5: Systems Review */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <FormField label="Micturition">
            <SelectInput
              value={micturition}
              onChange={setMicturition}
              options={MICTURITION_OPTIONS}
              placeholder="Select..."
            />
          </FormField>
          <FormField label="Micturition Comments">
            <TextAreaInput
              value={micturitionComments}
              onChange={setMicturitionComments}
              placeholder="Additional comments..."
              rows={2}
            />
          </FormField>
        </div>
        <div className="space-y-3">
          <FormField label="Bowels">
            <SelectInput
              value={bowels}
              onChange={setBowels}
              options={BOWELS_OPTIONS}
              placeholder="Select..."
            />
          </FormField>
          <FormField label="Bowels Comments">
            <TextAreaInput
              value={bowelsComments}
              onChange={setBowelsComments}
              placeholder="Additional comments..."
              rows={2}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});


