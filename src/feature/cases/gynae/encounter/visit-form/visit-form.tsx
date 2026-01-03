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

const CERVICAL_CANCER_SCREENING_TYPE_OPTIONS = ['Pap smear', 'HPV'];

const SCREENING_RESULT_OPTIONS = ['Normal', 'Abnormal'];

const PAIN_DURATION_OPTIONS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

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

  // Cervical Cancer Screening
  const [cervicalScreeningDone, setCervicalScreeningDone] = useState('');
  const [cervicalScreeningType, setCervicalScreeningType] = useState('');
  const [lastScreeningDate, setLastScreeningDate] = useState('');
  const [screeningResult, setScreeningResult] = useState('');

  // Menstrual History
  const [menstrualPattern, setMenstrualPattern] = useState('');
  const [menarche, setMenarche] = useState('13'); // Pre-filled from previous visit
  const [flow, setFlow] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [bleedingDuration, setBleedingDuration] = useState('');
  const [dysmenorrhea, setDysmenorrhea] = useState('');
  const [painDuration, setPainDuration] = useState('');
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Screening Done">
            <SelectInput
              value={cervicalScreeningDone}
              onChange={(val) => {
                setCervicalScreeningDone(val);
                if (val !== 'Yes') {
                  setCervicalScreeningType('');
                  setLastScreeningDate('');
                  setScreeningResult('');
                }
              }}
              options={YES_NO_OPTIONS}
              placeholder="Select..."
            />
          </FormField>
          
          {cervicalScreeningDone === 'Yes' && (
            <>
              <FormField label="Type">
                <SelectInput
                  value={cervicalScreeningType}
                  onChange={(val) => {
                    setCervicalScreeningType(val);
                    // Reset result when type changes
                    setScreeningResult('');
                  }}
                  options={CERVICAL_CANCER_SCREENING_TYPE_OPTIONS}
                  placeholder="Select type..."
                />
              </FormField>
              
              {cervicalScreeningType && (
                <>
                  <FormField label="Last Test Date">
                    <TextInput
                      type="date"
                      value={lastScreeningDate}
                      onChange={setLastScreeningDate}
                    />
                  </FormField>
                  
                  <FormField label="Result">
                    <SelectInput
                      value={screeningResult}
                      onChange={setScreeningResult}
                      options={SCREENING_RESULT_OPTIONS}
                      placeholder="Select result..."
                    />
                  </FormField>
                </>
              )}
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
            onChange={(val) => {
              setDysmenorrhea(val);
              if (val !== 'Yes') {
                setPainDuration('');
              }
            }}
            options={YES_NO_OPTIONS}
            placeholder="Select..."
          />
        </FormField>
        {dysmenorrhea === 'Yes' && (
          <FormField label="Duration of Pain">
            <SelectInput
              value={painDuration}
              onChange={setPainDuration}
              options={PAIN_DURATION_OPTIONS}
              placeholder="Select day..."
            />
          </FormField>
        )}
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


