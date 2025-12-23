import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {
  FormField,
  TextInput,
  TextAreaInput,
  SelectInput,
} from '../../../../../../../components';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const SEEN_BY_OPTIONS = ['Dr. Smith', 'Dr. Johnson', 'Dr. Patel', 'Dr. Williams'];
const BRANCH_OPTIONS = ['Main Branch', 'Downtown', 'Eastside Clinic', 'West Medical Center'];

/* =============================================================================
 * VISIT INFO PAGE
 * ============================================================================= */

/** Visit Info Page - Visit details and clinical assessment */
export const VisitInfoPage = observer(() => {
  const { visitId } = useParams<{ encounterId: string; visitId?: string }>();
  
  // Visit Details - Format visit number
  const visitNumber = visitId ? parseInt(visitId.replace(/\D/g, ''), 10) || 1 : 1;
  const formattedVisitId = `V${String(visitNumber).padStart(3, '0')}`;
  
  // Visit Details - Editable fields
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('');
  const [seenBy, setSeenBy] = useState('');
  const [branch, setBranch] = useState('');

  // Clinical Assessment - Writable
  const [complaints, setComplaints] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [risks, setRisks] = useState('');
  const [planOfMgmt, setPlanOfMgmt] = useState('');
  const [doctorPrivateNotes, setDoctorPrivateNotes] = useState('');
  const [amountToCollect, setAmountToCollect] = useState('');

  return (
    <div className="space-y-4">
      {/* =====================================================================
       * SECTION 1: VISIT DETAILS (EDITABLE)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-sky-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Visit Details</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <FormField label="Visit ID">
            <div className="h-[32px] px-3 flex items-center bg-zinc-100 border border-zinc-200 text-[12px] font-bold text-zinc-600">
              {formattedVisitId}
            </div>
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
          <FormField label="Seen By">
            <SelectInput
              value={seenBy}
              onChange={setSeenBy}
              options={SEEN_BY_OPTIONS}
              placeholder="Select Doctor"
            />
          </FormField>
          <FormField label="Branch">
            <SelectInput
              value={branch}
              onChange={setBranch}
              options={BRANCH_OPTIONS}
              placeholder="Select Branch"
            />
          </FormField>
        </div>
      </div>

      {/* =====================================================================
       * SECTION 2: CLINICAL ASSESSMENT (WRITABLE)
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
      </div>

      {/* =====================================================================
       * SECTION 3: PLAN OF MANAGEMENT (WRITABLE)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Plan of Management</h3>
        </div>
        
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
              placeholder="Enter private notes..."
              rows={3}
            />
          </FormField>
        </div>
      </div>

      {/* =====================================================================
       * SECTION 4: BILLING (WRITABLE)
       * ===================================================================== */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
          <h3 className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">Billing</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FormField label="Amount to Collect">
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
