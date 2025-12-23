import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  TextAreaInput,
  ReadOnlyField,
  SectionDivider,
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
 * VISIT INFO PAGE
 * ============================================================================= */

/** Visit Info Page - Main visit information form */
export const VisitInfoPage = observer(() => {
  // Vitals/Examinations - Writable
  const [weight, setWeight] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [sfh, setSfh] = useState('');
  const [pp, setPp] = useState('');
  const [fh, setFh] = useState('');
  const [edema, setEdema] = useState('');
  const [pallor, setPallor] = useState('');
  const [albumin, setAlbumin] = useState('');

  // Form Fields - Writable
  const [complaints, setComplaints] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [risks, setRisks] = useState('');
  const [planOfMgmt, setPlanOfMgmt] = useState('');
  const [doctorPrivateNotes, setDoctorPrivateNotes] = useState('');
  const [amountToCollect, setAmountToCollect] = useState('');

  // Mock read-only data
  const visitInfo = {
    lmp: '2024-01-15',
    edd: '2024-10-22',
    scanEdd: '2024-10-20',
    lastSeen: '2024-03-11',
    visitNumber: 'ANC-2024-003',
    visitDate: '2024-03-25',
    gestAge: '20w 3d',
    seenBy: 'Dr. Smith',
    branch: 'Main Hospital',
  };

  return (
    <div className="space-y-4">
      {/* =====================================================================
       * SECTION 1: VISIT SECTION INFO (READ-ONLY)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-pink-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Visit Section Info</h3>
          <span className="text-[9px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-medium">READ ONLY</span>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          <FormField label="LMP">
            <ReadOnlyField value={visitInfo.lmp} />
          </FormField>
          <FormField label="EDD">
            <ReadOnlyField value={visitInfo.edd} />
          </FormField>
          <FormField label="Scan EDD">
            <ReadOnlyField value={visitInfo.scanEdd} />
          </FormField>
          <FormField label="Last Seen">
            <ReadOnlyField value={visitInfo.lastSeen} />
          </FormField>
          <FormField label="Visit #">
            <ReadOnlyField value={visitInfo.visitNumber} />
          </FormField>
          <FormField label="Visit Date">
            <ReadOnlyField value={visitInfo.visitDate} />
          </FormField>
          <FormField label="Gest Age">
            <ReadOnlyField value={visitInfo.gestAge} className="font-semibold text-emerald-700" />
          </FormField>
          <FormField label="Seen By">
            <ReadOnlyField value={visitInfo.seenBy} />
          </FormField>
          <FormField label="Branch">
            <ReadOnlyField value={visitInfo.branch} />
          </FormField>
        </div>
      </div>

      {/* =====================================================================
       * SECTION 2: VITALS/EXAMINATIONS (WRITABLE)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-sky-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Vitals / Examinations</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
          <FormField label="FH">
            <TextInput
              value={fh}
              onChange={setFh}
              placeholder="Present/Absent"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
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

      {/* =====================================================================
       * SECTION 3: CLINICAL ASSESSMENT (WRITABLE)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Clinical Assessment</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FormField label="Complaints">
            <TextAreaInput
              value={complaints}
              onChange={setComplaints}
              placeholder="Enter complaints..."
              rows={2}
            />
          </FormField>
          <FormField label="Symptoms">
            <TextAreaInput
              value={symptoms}
              onChange={setSymptoms}
              placeholder="Enter symptoms..."
              rows={2}
            />
          </FormField>
          <FormField label="Diagnosis">
            <TextAreaInput
              value={diagnosis}
              onChange={setDiagnosis}
              placeholder="Enter diagnosis..."
              rows={2}
            />
          </FormField>
          <FormField label="Risks">
            <TextAreaInput
              value={risks}
              onChange={setRisks}
              placeholder="Enter risks..."
              rows={2}
            />
          </FormField>
        </div>

        <SectionDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField label="Plan of Management">
            <TextAreaInput
              value={planOfMgmt}
              onChange={setPlanOfMgmt}
              placeholder="Enter plan of management..."
              rows={3}
            />
          </FormField>
          <FormField label="Doctor Private Notes">
            <TextAreaInput
              value={doctorPrivateNotes}
              onChange={setDoctorPrivateNotes}
              placeholder="Private notes (not visible to patient)..."
              rows={3}
            />
          </FormField>
        </div>

        <div className="mt-3 max-w-xs">
          <FormField label="Amount to be Collected">
            <TextInput
              type="number"
              value={amountToCollect}
              onChange={setAmountToCollect}
              placeholder="₹ 0.00"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});

export { VisitInfoPage as default };
