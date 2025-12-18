import { useEffect } from 'react';
import { Calendar, Stethoscope, Heart, ClipboardList, FileText } from 'lucide-react';
import { GynaeFormProvider, useGynaeForm } from './context';
import { calculateBMI } from './store';

/* =============================================================================
 * OPTION LISTS - For Select and Datalist
 * ============================================================================= */

const CONTRACEPTION_OPTIONS = ['None', 'OCP', 'IUD/Cu-T', 'Barrier', 'Injectables', 'Implant', 'Natural', 'Sterilization'];
const SMEAR_OPTIONS = ['Not Done', 'Normal', 'NILM', 'ASCUS', 'LSIL', 'HSIL', 'AGC'];
const PALLOR_OPTIONS = ['-', '+', '++', '+++'];
const GOITER_OPTIONS = ['-', '+', '++', '+++'];
const CVS_OPTIONS = ['S1S2 Normal', 'S1S2 +', 'Murmur Present', 'NAD'];
const RS_OPTIONS = ['NVBS', 'Clear', 'Wheeze', 'Crepitations', 'NAD'];
const BREASTS_OPTIONS = ['NAD', 'Lumps', 'Tenderness', 'Discharge'];
const PA_OPTIONS = ['Soft, Non-tender', 'Tender', 'Distended', 'Mass Palpable', 'NAD'];
const VV_OPTIONS = ['Healthy', 'Discharge Present', 'Inflammation', 'Ulcer', 'NAD'];
const CERVIX_OPTIONS = ['Long, Closed', 'Short', 'Soft', 'Firm', 'Erosion', 'NAD'];
const MICTURITION_OPTIONS = ['Normal', 'Burning', 'Frequency', 'Urgency', 'Incontinence'];
const BOWELS_OPTIONS = ['Regular', 'Constipation', 'Diarrhea', 'Irregular'];

const CHIEF_COMPLAINTS_SUGGESTIONS = [
  'Irregular menstrual cycles',
  'Heavy menstrual bleeding',
  'Post-menopausal bleeding',
  'White discharge PV',
  'Lower abdominal pain',
  'Dysmenorrhea',
  'Amenorrhea',
  'Infertility',
  'Routine checkup',
  'Pap smear screening',
  'Contraception counseling',
];

const IMPRESSION_SUGGESTIONS = [
  'AUB - DUB',
  'AUB - Fibroid',
  'PCOS',
  'Ovarian Cyst',
  'PID',
  'Vaginitis',
  'Cervicitis',
  'Endometriosis',
  'Menopause',
  'Normal Gynae Exam',
];

/* =============================================================================
 * SHARED COMPONENTS - Carbon Design System
 * ============================================================================= */

interface SectionCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

function SectionCard({ title, icon: Icon, children, iconBg = 'bg-zinc-100', iconColor = 'text-zinc-600' }: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
        <div className={`w-7 h-7 ${iconBg} rounded-sm flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <h3 className="text-[12px] font-bold text-zinc-800 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
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

// Standard Text Input
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number';
}

function TextInput({ value, onChange, placeholder, type = 'text' }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
    />
  );
}

// Select Input
interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

function SelectInput({ value, onChange, options, placeholder }: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] text-zinc-800 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
    >
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

// Datalist Input - Autocomplete with custom typing
interface DatalistInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  id: string;
}

function DatalistInput({ value, onChange, options, placeholder, id }: DatalistInputProps) {
  return (
    <>
      <input
        type="text"
        list={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
      />
      <datalist id={id}>
        {options.map(opt => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </>
  );
}

// Textarea
interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

function TextAreaInput({ value, onChange, placeholder, rows = 3 }: TextAreaInputProps) {
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
 * HELPER - Get today's date in YYYY-MM-DD format
 * ============================================================================= */

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/* =============================================================================
 * FORM CONTENT - Main Form Layout (Always Edit Mode)
 * ============================================================================= */

function GynaeFormContent() {
  const {
    form,
    updateMenstrualHistory,
    updatePresentingComplaints,
    updateVitals,
    updateSystemsExamination,
    updateVaginalExamination,
    updateClinicalNotes,
  } = useGynaeForm();

  // Pre-populate LMP with current date if empty
  useEffect(() => {
    if (!form.menstrualHistory.lmp) {
      updateMenstrualHistory({ lmp: getTodayDate() });
    }
  }, []);

  // Auto-calculate BMI when height/weight changes
  useEffect(() => {
    const bmi = calculateBMI(form.vitals.height, form.vitals.weight);
    if (bmi !== form.vitals.bmi) {
      updateVitals({ bmi });
    }
  }, [form.vitals.height, form.vitals.weight, form.vitals.bmi, updateVitals]);

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200 sticky top-0 z-10">
        <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
          Gynaecology Form
        </h2>
        <button className="px-3 py-1.5 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors">
          Save
        </button>
      </div>

      {/* Form Content - Scrollable */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        
        {/* Section 1: Menstrual History */}
        <SectionCard title="Menstrual History" icon={Calendar} iconBg="bg-pink-50" iconColor="text-pink-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField label="LMP">
              <TextInput
                type="date"
                value={form.menstrualHistory.lmp}
                onChange={v => updateMenstrualHistory({ lmp: v })}
              />
            </FormField>
            <FormField label="Para">
              <TextInput
                value={form.menstrualHistory.para}
                onChange={v => updateMenstrualHistory({ para: v })}
                placeholder="e.g., G2P1L1"
              />
            </FormField>
            <FormField label="Contraception">
              <SelectInput
                value={form.menstrualHistory.contraception}
                onChange={v => updateMenstrualHistory({ contraception: v })}
                options={CONTRACEPTION_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
            <FormField label="Previous Smear">
              <SelectInput
                value={form.menstrualHistory.previousSmear}
                onChange={v => updateMenstrualHistory({ previousSmear: v })}
                options={SMEAR_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
          </div>
          <div className="mt-4">
            <FormField label="Menstrual Cycles">
              <TextInput
                value={form.menstrualHistory.menstrualCycles}
                onChange={v => updateMenstrualHistory({ menstrualCycles: v })}
                placeholder="e.g., Regular 28-30 days, 4-5 days flow"
              />
            </FormField>
          </div>
        </SectionCard>

        {/* Section 2: Presenting Complaints */}
        <SectionCard title="Presenting Complaints" icon={ClipboardList} iconBg="bg-amber-50" iconColor="text-amber-600">
          <div className="space-y-4">
            <FormField label="Chief Complaints">
              <DatalistInput
                id="chief-complaints-list"
                value={form.presentingComplaints.chiefComplaints}
                onChange={v => updatePresentingComplaints({ chiefComplaints: v })}
                options={CHIEF_COMPLAINTS_SUGGESTIONS}
                placeholder="Type or select complaint..."
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Micturition">
                <SelectInput
                  value={form.presentingComplaints.micturition}
                  onChange={v => updatePresentingComplaints({ micturition: v })}
                  options={MICTURITION_OPTIONS}
                  placeholder="Select..."
                />
              </FormField>
              <FormField label="Bowels">
                <SelectInput
                  value={form.presentingComplaints.bowels}
                  onChange={v => updatePresentingComplaints({ bowels: v })}
                  options={BOWELS_OPTIONS}
                  placeholder="Select..."
                />
              </FormField>
            </div>
          </div>
        </SectionCard>

        {/* Section 3: Physical Examination - Vitals */}
        <SectionCard title="Physical Examination" icon={Stethoscope} iconBg="bg-blue-50" iconColor="text-blue-600">
          {/* Vitals Row */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3 pb-4 border-b border-zinc-100">
            <FormField label="Height (cm)">
              <TextInput
                type="number"
                value={form.vitals.height}
                onChange={v => updateVitals({ height: v })}
                placeholder="165"
              />
            </FormField>
            <FormField label="Weight (kg)">
              <TextInput
                type="number"
                value={form.vitals.weight}
                onChange={v => updateVitals({ weight: v })}
                placeholder="60"
              />
            </FormField>
            <FormField label="BMI">
              <div className="px-3 py-2 bg-zinc-100 border border-zinc-200 text-[12px] text-zinc-700 font-bold">
                {form.vitals.bmi || '--'}
              </div>
            </FormField>
            <FormField label="Pulse">
              <TextInput
                value={form.vitals.pulse}
                onChange={v => updateVitals({ pulse: v })}
                placeholder="72/min"
              />
            </FormField>
            <FormField label="BP">
              <TextInput
                value={form.vitals.bp}
                onChange={v => updateVitals({ bp: v })}
                placeholder="120/80"
              />
            </FormField>
            <FormField label="Pallor">
              <SelectInput
                value={form.vitals.pallor}
                onChange={v => updateVitals({ pallor: v })}
                options={PALLOR_OPTIONS}
                placeholder="-"
              />
            </FormField>
            <FormField label="Goiter">
              <SelectInput
                value={form.vitals.goiter}
                onChange={v => updateVitals({ goiter: v })}
                options={GOITER_OPTIONS}
                placeholder="-"
              />
            </FormField>
          </div>

          {/* Systems Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <FormField label="CVS">
              <SelectInput
                value={form.systemsExamination.cvs}
                onChange={v => updateSystemsExamination({ cvs: v })}
                options={CVS_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
            <FormField label="RS">
              <SelectInput
                value={form.systemsExamination.rs}
                onChange={v => updateSystemsExamination({ rs: v })}
                options={RS_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
            <FormField label="Breasts">
              <SelectInput
                value={form.systemsExamination.breasts}
                onChange={v => updateSystemsExamination({ breasts: v })}
                options={BREASTS_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
            <FormField label="P/A (Per Abdomen)">
              <SelectInput
                value={form.systemsExamination.perAbdomen}
                onChange={v => updateSystemsExamination({ perAbdomen: v })}
                options={PA_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
          </div>
        </SectionCard>

        {/* Section 4: Vaginal Examination */}
        <SectionCard title="Vaginal Examination" icon={Heart} iconBg="bg-rose-50" iconColor="text-rose-600">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="VE: V&V (Vulva & Vagina)">
              <SelectInput
                value={form.vaginalExamination.vulvaVagina}
                onChange={v => updateVaginalExamination({ vulvaVagina: v })}
                options={VV_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
            <FormField label="Cervix">
              <SelectInput
                value={form.vaginalExamination.cervix}
                onChange={v => updateVaginalExamination({ cervix: v })}
                options={CERVIX_OPTIONS}
                placeholder="Select..."
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Uterus">
              <TextAreaInput
                value={form.vaginalExamination.uterus}
                onChange={v => updateVaginalExamination({ uterus: v })}
                placeholder="Size, Position, Mobility..."
                rows={2}
              />
            </FormField>
            <FormField label="Adnexa">
              <TextAreaInput
                value={form.vaginalExamination.adnexa}
                onChange={v => updateVaginalExamination({ adnexa: v })}
                placeholder="Free / Mass felt..."
                rows={2}
              />
            </FormField>
          </div>
        </SectionCard>

        {/* Section 5: Clinical Notes */}
        <SectionCard title="Clinical Notes" icon={FileText} iconBg="bg-emerald-50" iconColor="text-emerald-600">
          <div className="space-y-4">
            <FormField label="Impression">
              <DatalistInput
                id="impression-list"
                value={form.clinicalNotes.impression}
                onChange={v => updateClinicalNotes({ impression: v })}
                options={IMPRESSION_SUGGESTIONS}
                placeholder="Type or select diagnosis..."
              />
            </FormField>
            <FormField label="Advice">
              <TextAreaInput
                value={form.clinicalNotes.advice}
                onChange={v => updateClinicalNotes({ advice: v })}
                placeholder="Investigations, Treatment plan, Follow-up..."
                rows={4}
              />
            </FormField>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

/* =============================================================================
 * MAIN EXPORT - With Provider
 * ============================================================================= */

export function GynaeFormPage() {
  return (
    <GynaeFormProvider>
      <GynaeFormContent />
    </GynaeFormProvider>
  );
}

export default GynaeFormPage;
