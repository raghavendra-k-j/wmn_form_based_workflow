import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  FormField,
  TextInput,
  TextAreaInput,
  SelectInput,
  SmartTextArea, // Added
} from '../../../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const SEEN_BY_OPTIONS = ['Dr. Smith', 'Dr. Johnson', 'Dr. Patel', 'Dr. Williams'];
const BRANCH_OPTIONS = ['Main Branch', 'Downtown', 'Eastside Clinic', 'West Medical Center'];
const EDEMA_OPTIONS = ['None', 'Mild (+)', 'Moderate (++)', 'Severe (+++)'];
const PALLOR_OPTIONS = ['None', 'Mild', 'Moderate', 'Severe'];
const ALBUMIN_OPTIONS = ['Nil', 'Trace', '+', '++', '+++'];
const PP_OPTIONS = ['Cephalic', 'Breech', 'Transverse', 'Oblique', 'Not Engaged'];

const DIAGNOSIS_OPTIONS = [
  { id: '1', value: 'Iron Deficiency Anemia', code: 'D50' },
  { id: '2', value: 'Gestational Diabetes Mellitus', code: 'O24.4' },
  { id: '3', value: 'Preeclampsia', code: 'O14.9' },
  { id: '4', value: 'Essential Hypertension', code: 'I10' },
  { id: '5', value: 'Urinary Tract Infection', code: 'N39.0' },
  { id: '6', value: 'Placenta Previa', code: 'O44' },
  { id: '7', value: 'Hypothyroidism', code: 'E03.9' },
  { id: '8', value: 'Hyperemesis Gravidarum', code: 'O21.0' },
];

/* =============================================================================
 * VISIT DETAILS COMPONENT
 * Combined: Visit Info + Complaints + Examinations + Clinical Notes
 * ============================================================================= */

export const VisitDetails = observer(() => {
  const { visitId } = useParams<{ encounterId: string; visitId?: string }>();
  
  // Visit Details
  // Extract number from V001 format or just use 1
  const visitNumber = visitId ? parseInt(visitId.replace(/\D/g, ''), 10) || 1 : 1;
  const displayVisitNumber = String(visitNumber);
  
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('');
  const [seenBy, setSeenBy] = useState('');
  const [branch, setBranch] = useState('');
  const [complaints, setComplaints] = useState('');

  // Examinations
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [sfh, setSfh] = useState('');
  const [pp, setPp] = useState('');
  const [fh, setFh] = useState('');
  const [edema, setEdema] = useState('');
  const [pallor, setPallor] = useState('');
  const [albumin, setAlbumin] = useState('');

  // Clinical Notes
  const [diagnosisQuery, setDiagnosisQuery] = useState(''); // Text input buffer
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<any[]>([]); // Selected items
  const [planOfMgmt, setPlanOfMgmt] = useState('');
  const [risks, setRisks] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');

  return (
    <div className="space-y-4">
      {/* =====================================================================
       * SECTION 1: VISIT INFO + COMPLAINTS
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        {/* Visit Details Row (No Header) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          <FormField label="Visit Number">
            <div className="h-[32px] px-3 flex items-center bg-zinc-100 border border-zinc-200 text-[12px] font-bold text-zinc-600">
              {displayVisitNumber}
            </div>
          </FormField>
          <FormField label="Visit Date">
            <TextInput type="date" value={visitDate} onChange={setVisitDate} />
          </FormField>
          <FormField label="Visit Time">
            <TextInput type="time" value={visitTime} onChange={setVisitTime} />
          </FormField>
          <FormField label="Seen By">
            <SelectInput value={seenBy} onChange={setSeenBy} options={SEEN_BY_OPTIONS} placeholder="Select Doctor" />
          </FormField>
          <FormField label="Branch">
            <SelectInput value={branch} onChange={setBranch} options={BRANCH_OPTIONS} placeholder="Select Branch" />
          </FormField>
        </div>

        {/* Complaints (same section) */}
        <FormField label="Complaints">
          <TextAreaInput
            value={complaints}
            onChange={setComplaints}
            placeholder="Enter patient complaints..."
            rows={2}
          />
        </FormField>
      </div>

      {/* =====================================================================
       * SECTION 2: EXAMINATIONS
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide mb-3">
          Examinations
        </h3>
        
        {/* Vitals Row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3">
          <FormField label="Height (cm)">
            <TextInput type="number" value={height} onChange={setHeight} placeholder="cm" />
          </FormField>
          <FormField label="Weight (kg)">
            <TextInput type="number" value={weight} onChange={setWeight} placeholder="kg" />
          </FormField>
          <FormField label="BP (mmHg)">
            <TextInput value={bp} onChange={setBp} placeholder="120/80" />
          </FormField>
          <FormField label="Pulse (bpm)">
            <TextInput type="number" value={pulse} onChange={setPulse} placeholder="bpm" />
          </FormField>
          <FormField label="SFH (cm)">
            <TextInput type="number" value={sfh} onChange={setSfh} placeholder="cm" />
          </FormField>
          <FormField label="PP">
            <SelectInput value={pp} onChange={setPp} options={PP_OPTIONS} placeholder="Select..." />
          </FormField>
        </div>

        {/* Obstetric Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FormField label="Fetal Heart (FH)">
            <TextInput value={fh} onChange={setFh} placeholder="Present/Absent" />
          </FormField>
          <FormField label="Edema">
            <SelectInput value={edema} onChange={setEdema} options={EDEMA_OPTIONS} placeholder="Select..." />
          </FormField>
          <FormField label="Pallor">
            <SelectInput value={pallor} onChange={setPallor} options={PALLOR_OPTIONS} placeholder="Select..." />
          </FormField>
          <FormField label="Albumin">
            <SelectInput value={albumin} onChange={setAlbumin} options={ALBUMIN_OPTIONS} placeholder="Select..." />
          </FormField>
        </div>
      </div>

      {/* =====================================================================
       * SECTION 3: CLINICAL NOTES (No Header, 2 columns x 2 rows)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        {/* No Header here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 1 */}
          <FormField label="Diagnosis">
            <SmartTextArea
              value={diagnosisQuery}
              onChange={setDiagnosisQuery}
              options={DIAGNOSIS_OPTIONS}
              selections={selectedDiagnoses}
              onJsChange={setSelectedDiagnoses}
              triggerChar="@"
              placeholder="Type '@' to search ICD codes..."
              rows={2}
            />
          </FormField>
          <FormField label="Plan of Management">
            <TextAreaInput
              value={planOfMgmt}
              onChange={setPlanOfMgmt}
              placeholder="Enter plan..."
              rows={2}
            />
          </FormField>
          
          {/* Row 2 */}
          <FormField label="Risks">
            <TextAreaInput
              value={risks}
              onChange={setRisks}
              placeholder="Enter risks..."
              rows={2}
            />
          </FormField>
          <FormField label="Private Notes">
            <TextAreaInput
              value={privateNotes}
              onChange={setPrivateNotes}
              placeholder="Doctor's private notes..."
              rows={2}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});

export default VisitDetails;
