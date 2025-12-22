import { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../context';

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
      <div className="px-4 py-2.5 border-b border-zinc-200 bg-emerald-50">
        <h3 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">{title}</h3>
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

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const THYROID_OPTIONS = ['Normal', 'Enlarged', 'Nodular', 'Tender'];
const BREAST_OPTIONS = ['Normal', 'Lumps', 'Tenderness', 'Discharge'];
const PALLOR_OPTIONS = ['Absent', 'Present', 'Mild', 'Moderate', 'Severe'];
const CVS_OPTIONS = ['S1S2 Normal', 'Murmur Present', 'Irregular Rhythm'];
const RS_OPTIONS = ['NVBS, Clear', 'Crackles', 'Wheezing', 'Decreased Breath Sounds'];
const PA_OPTIONS = ['Soft, Non-tender', 'Distended', 'Tenderness', 'Organomegaly'];
const VE_OPTIONS = ['Normal', 'Cervix Healthy', 'Discharge Present', 'Bleeding'];

/* =============================================================================
 * BASELINE INFORMATION FORM STATE
 * ============================================================================= */

interface BaselineFormState {
  // Vital Signs
  height: string;
  weight: string;
  bmi: string;
  pulseRate: string;
  bp: string;
  spo2: string;
  
  // Examination
  thyroid: string;
  breast: string;
  cvs: string;
  rs: string;
  pA: string;
  vE: string;
  pallor: string;
}

const initialFormState: BaselineFormState = {
  height: '',
  weight: '',
  bmi: '',
  pulseRate: '',
  bp: '',
  spo2: '',
  thyroid: '',
  breast: '',
  cvs: '',
  rs: '',
  pA: '',
  vE: '',
  pallor: '',
};

/* =============================================================================
 * BASELINE INFORMATION PAGE
 * ============================================================================= */

export function BaselineInfoPage() {
  const navigate = useNavigate();
  const { store } = usePatientDetails();
  const [form, setForm] = useState<BaselineFormState>(initialFormState);

  const updateForm = (data: Partial<BaselineFormState>) => {
    setForm(prev => ({ ...prev, ...data }));
  };

  // Calculate BMI
  const calculateBMI = (height: string, weight: string): string => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    if (!h || !w || h <= 0) return '';
    return (w / (h * h)).toFixed(1);
  };

  // Handle height/weight change - auto-calculate BMI
  const handleHeightChange = (height: string) => {
    updateForm({ 
      height, 
      bmi: calculateBMI(height, form.weight) 
    });
  };

  const handleWeightChange = (weight: string) => {
    updateForm({ 
      weight, 
      bmi: calculateBMI(form.height, weight) 
    });
  };

  const handleBack = () => {
    navigate(`/patientsv2/${store.patientId}/anc`);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-1.5 hover:bg-zinc-100 transition-colors rounded-sm"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
              Baseline Information
            </h2>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors">
          Save
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Vital Signs & Measurements */}
        <SectionCard title="Vital Signs & Measurements">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <FormField label="Height (cm)">
              <TextInput value={form.height} onChange={handleHeightChange} placeholder="e.g., 160" />
            </FormField>
            <FormField label="Weight (kg)">
              <TextInput value={form.weight} onChange={handleWeightChange} placeholder="e.g., 55" />
            </FormField>
            <FormField label="BMI">
              <TextInput value={form.bmi} onChange={() => {}} disabled placeholder="Auto-calculated" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField label="Pulse Rate">
              <TextInput value={form.pulseRate} onChange={v => updateForm({ pulseRate: v })} placeholder="e.g., 72/min" />
            </FormField>
            <FormField label="BP">
              <TextInput value={form.bp} onChange={v => updateForm({ bp: v })} placeholder="e.g., 120/80" />
            </FormField>
            <FormField label="SpO₂">
              <TextInput value={form.spo2} onChange={v => updateForm({ spo2: v })} placeholder="e.g., 98%" />
            </FormField>
          </div>
        </SectionCard>

        {/* General & Systemic Examination */}
        <SectionCard title="General & Systemic Examination">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <FormField label="Thyroid">
              <DatalistInput 
                value={form.thyroid} 
                onChange={v => updateForm({ thyroid: v })} 
                options={THYROID_OPTIONS}
                placeholder="e.g., Normal"
                listId="thyroid-options"
              />
            </FormField>
            <FormField label="Breast">
              <DatalistInput 
                value={form.breast} 
                onChange={v => updateForm({ breast: v })} 
                options={BREAST_OPTIONS}
                placeholder="e.g., Normal"
                listId="breast-options"
              />
            </FormField>
            <FormField label="Pallor">
              <DatalistInput 
                value={form.pallor} 
                onChange={v => updateForm({ pallor: v })} 
                options={PALLOR_OPTIONS}
                placeholder="e.g., Absent"
                listId="pallor-options"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField label="CVS">
              <DatalistInput 
                value={form.cvs} 
                onChange={v => updateForm({ cvs: v })} 
                options={CVS_OPTIONS}
                placeholder="e.g., S1S2 Normal"
                listId="cvs-options"
              />
            </FormField>
            <FormField label="RS">
              <DatalistInput 
                value={form.rs} 
                onChange={v => updateForm({ rs: v })} 
                options={RS_OPTIONS}
                placeholder="e.g., NVBS, Clear"
                listId="rs-options"
              />
            </FormField>
            <FormField label="P/A">
              <DatalistInput 
                value={form.pA} 
                onChange={v => updateForm({ pA: v })} 
                options={PA_OPTIONS}
                placeholder="e.g., Soft, Non-tender"
                listId="pa-options"
              />
            </FormField>
            <FormField label="V/E">
              <DatalistInput 
                value={form.vE} 
                onChange={v => updateForm({ vE: v })} 
                options={VE_OPTIONS}
                placeholder="e.g., Normal"
                listId="ve-options"
              />
            </FormField>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default BaselineInfoPage;
