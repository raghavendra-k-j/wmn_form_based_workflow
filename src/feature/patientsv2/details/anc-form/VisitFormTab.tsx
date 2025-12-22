import { useAncForm } from './context';

/* =============================================================================
 * SHARED COMPONENTS
 * ============================================================================= */

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200 mb-4">
      <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
        <h3 className="text-[11px] font-bold text-zinc-700 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function FormField({ label, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', disabled = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number' | 'time';
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-zinc-200 text-[12px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors ${
        disabled ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' : 'bg-zinc-50 focus:bg-white'
      }`}
    />
  );
}

function DatalistInput({ value, onChange, options, placeholder, listId }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  listId: string;
}) {
  return (
    <>
      <input
        type="text"
        list={listId}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
      />
      <datalist id={listId}>
        {options.map(opt => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </>
  );
}

function TextAreaInput({ value, onChange, placeholder, rows = 2 }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors resize-none"
    />
  );
}

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const PRESENTATION_OPTIONS = ['Cephalic', 'Breech', 'Transverse', 'Oblique'];
const FH_OPTIONS = ['FHS+', 'FHS-', 'Not Assessed'];
const SB_OPTIONS = ['Single', 'Twins', 'Triplets'];

/* =============================================================================
 * VISIT FORM TAB
 * ============================================================================= */

export function VisitFormTab() {
  const { form, updateVisitForm } = useAncForm();
  const v = form.visitForm;

  // Auto-generated values (in real app, these would come from context/API)
  const visitNumber = "ANC-V001";
  const seenByDoctor = "Dr. Priya Sharma";
  
  // Mock LMP date (in real app, this would come from patient's obstetric history)
  const lmpDate = "2024-06-15";

  // Calculate weeks by LMP based on visit date
  const calculateWeeksByLMP = (): string => {
    if (!v.date || !lmpDate) return '';
    
    const visitDate = new Date(v.date);
    const lmp = new Date(lmpDate);
    const diffTime = visitDate.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    if (weeks < 0) return '';
    return `${weeks}+${days}`;
  };

  const wksByLMP = calculateWeeksByLMP();

  return (
    <div className="space-y-4">
      {/* Visit Info Header */}
      <SectionCard title="Visit Information">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <FormField label="Visit Number">
            <TextInput value={visitNumber} onChange={() => {}} disabled placeholder="Auto-generated" />
          </FormField>
          <FormField label="Visit Date">
            <TextInput type="date" value={v.date} onChange={val => updateVisitForm({ date: val })} />
          </FormField>
          <FormField label="Wks. By LMP">
            <TextInput value={wksByLMP} onChange={() => {}} disabled placeholder="Auto-calculated" />
          </FormField>
          <FormField label="Seen By Doctor">
            <TextInput value={seenByDoctor} onChange={() => {}} disabled placeholder="Auto-filled" />
          </FormField>
        </div>
        <div className="text-[10px] text-zinc-400">
          LMP: {new Date(lmpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </SectionCard>

      {/* Follow-up Visit Data - Based on the table columns from image */}
      <SectionCard title="Follow-up Visit Data">
        {/* Complaints - Full Width */}
        <div className="mb-4">
          <FormField label="Complaints">
            <TextAreaInput 
              value={v.complaints} 
              onChange={val => updateVisitForm({ complaints: val })} 
              placeholder="e.g., No vomiting, tiredness, well, H/o bleed PLV, burning micturition..." 
              rows={2} 
            />
          </FormField>
        </div>

        {/* Clinical Measurements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <FormField label="Weight (Wt)">
            <TextInput value={v.wt} onChange={val => updateVisitForm({ wt: val })} placeholder="e.g., 65 kg" />
          </FormField>
          <FormField label="Blood Pressure (BP)">
            <TextInput value={v.bp} onChange={val => updateVisitForm({ bp: val })} placeholder="e.g., 120/80" />
          </FormField>
          <FormField label="SFH (cm)">
            <TextInput value={v.sfh} onChange={val => updateVisitForm({ sfh: val })} placeholder="e.g., 24" />
          </FormField>
        </div>

        {/* Obstetric Examination */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Presentation (PP)">
            <DatalistInput 
              value={v.pp} 
              onChange={val => updateVisitForm({ pp: val })} 
              options={PRESENTATION_OPTIONS} 
              placeholder="e.g., Cephalic"
              listId="pp-options"
            />
          </FormField>
          <FormField label="Fetal Heart (FH)">
            <DatalistInput 
              value={v.fh} 
              onChange={val => updateVisitForm({ fh: val })} 
              options={FH_OPTIONS} 
              placeholder="e.g., FHS+"
              listId="fh-options"
            />
          </FormField>
          <FormField label="S/B">
            <DatalistInput 
              value={v.sOrB} 
              onChange={val => updateVisitForm({ sOrB: val })} 
              options={SB_OPTIONS} 
              placeholder="e.g., Single"
              listId="sb-options"
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Clinical Assessment */}
      <SectionCard title="Clinical Assessment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField label="Diagnosis">
            <TextAreaInput 
              value={v.diagnosis} 
              onChange={val => updateVisitForm({ diagnosis: val })} 
              placeholder="Enter diagnosis" 
              rows={3} 
            />
          </FormField>
          <FormField label="Risks">
            <TextAreaInput 
              value={v.risks} 
              onChange={val => updateVisitForm({ risks: val })} 
              placeholder="Enter risks" 
              rows={3} 
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Plan of Management">
            <TextAreaInput 
              value={v.planOfManagement} 
              onChange={val => updateVisitForm({ planOfManagement: val })} 
              placeholder="Enter plan of management" 
              rows={3} 
            />
          </FormField>
          <div>
            <FormField label="Doctor Private Notes">
              <TextAreaInput 
                value={v.doctorPrivateNotes} 
                onChange={val => updateVisitForm({ doctorPrivateNotes: val })} 
                placeholder="Enter additional observations" 
                rows={3} 
              />
            </FormField>
            <p className="text-[10px] text-amber-600 mt-1.5">
              These will not be visible to the patient or printed
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default VisitFormTab;

