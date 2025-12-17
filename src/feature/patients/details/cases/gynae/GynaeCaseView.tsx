import { useState, type ReactNode } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Activity,
  Stethoscope,
  FileText,
  Pill,
  ClipboardList,
  Heart,
  Scale,
  Ruler
} from 'lucide-react';
import { EmbeddableMedicalHistory } from '../../medical-history/EmbeddableMedicalHistory';

/* ============================================================================
 * TYPES & INTERFACES
 * ============================================================================ */

interface GynaeFormData {
  // Basic Info
  lmp: string;
  para: string;
  contraception: string;
  previousSmear: string;
  menstrualCycles: string;
  presentingComplaints: string;
  micturition: string;
  bowels: string;
  
  // Medications
  medications: string;
  
  // Physical Examination - Vitals
  height: string;
  weight: string;
  bmi: string;
  pulse: string;
  bp: string;
  
  // Physical Examination - General
  pallor: string;
  goiter: string;
  cvs: string;
  rs: string;
  breasts: string;
  
  // Physical Examination - Per Abdomen & Vaginal
  perAbdomen: string;
  veVandV: string;
  cervix: string;
  uterus: string;
  adnexa: string;
  
  // Assessment
  impression: string;
  advice: string;
}

/* ============================================================================
 * FORM COMPONENTS - Compact & Reusable
 * ============================================================================ */

interface SectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Section({ title, icon, iconColor, isExpanded, onToggle, children }: SectionProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-3">
      <div 
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/50 border-b border-zinc-100 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 ${iconColor}`}>{icon}</span>
          <h3 className="font-semibold text-zinc-900 select-none text-sm">{title}</h3>
        </div>
        <button className="p-1 text-zinc-400 hover:text-zinc-600 rounded hover:bg-zinc-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
      {isExpanded && (
        <div className="p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date';
}

function Field({ label, value, onChange, placeholder, type = 'text' }: FieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-medium text-zinc-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

function TextAreaField({ label, value, onChange, placeholder, rows = 2 }: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-medium text-zinc-500">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        rows={rows}
        className="px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300 resize-none"
      />
    </div>
  );
}

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */

export function GynaeCaseView() {
  // Section expansion state
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    medications: true,
    physicalExam: true,
    assessment: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form data state
  const [formData, setFormData] = useState<GynaeFormData>({
    lmp: '',
    para: '',
    contraception: '',
    previousSmear: '',
    menstrualCycles: '',
    presentingComplaints: '',
    micturition: '',
    bowels: '',
    medications: '',
    height: '',
    weight: '',
    bmi: '',
    pulse: '',
    bp: '',
    pallor: '',
    goiter: '',
    cvs: '',
    rs: '',
    breasts: '',
    perAbdomen: '',
    veVandV: '',
    cervix: '',
    uterus: '',
    adnexa: '',
    impression: '',
    advice: ''
  });

  const updateField = (field: keyof GynaeFormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate BMI when height and weight are provided
      if (field === 'height' || field === 'weight') {
        const heightCm = parseFloat(updated.height);
        const weightKg = parseFloat(updated.weight);
        if (heightCm > 0 && weightKg > 0) {
          const heightM = heightCm / 100;
          const bmiValue = (weightKg / (heightM * heightM)).toFixed(1);
          updated.bmi = bmiValue;
        }
      }
      
      return updated;
    });
  };

  return (
    <div className="h-full w-full bg-zinc-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-zinc-200 px-4 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-pink-600" />
          </div>
          <h2 className="text-sm font-bold text-zinc-900">Gynaecology Case</h2>
        </div>
        <button className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors">
          Save
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        
        {/* ============================================================
         * SECTION 1: Basic Information
         * ============================================================ */}
        <Section
          title="History & Complaints"
          icon={<ClipboardList className="w-4 h-4" />}
          iconColor="text-blue-500"
          isExpanded={expandedSections.basicInfo}
          onToggle={() => toggleSection('basicInfo')}
        >
          {/* Row 1: LMP, Para, Contraception, Previous Smear */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">LMP</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="date"
                  value={formData.lmp}
                  onChange={(e) => updateField('lmp', e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            <Field label="Para" value={formData.para} onChange={(v) => updateField('para', v)} placeholder="e.g. G2P1L1" />
            <Field label="Contraception" value={formData.contraception} onChange={(v) => updateField('contraception', v)} placeholder="Type..." />
            <Field label="Previous Smear" value={formData.previousSmear} onChange={(v) => updateField('previousSmear', v)} placeholder="Result/Date" />
          </div>

          {/* Row 2: Menstrual Cycles */}
          <div className="mb-3">
            <Field label="Menstrual Cycles" value={formData.menstrualCycles} onChange={(v) => updateField('menstrualCycles', v)} placeholder="e.g. Regular, 28 days, 5 days flow" />
          </div>

          {/* Row 3: Presenting Complaints */}
          <div className="mb-3">
            <TextAreaField 
              label="Presenting Complaints" 
              value={formData.presentingComplaints} 
              onChange={(v) => updateField('presentingComplaints', v)} 
              placeholder="Chief complaints and duration..."
              rows={2}
            />
          </div>

          {/* Row 4: Micturition & Bowels */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Micturition" value={formData.micturition} onChange={(v) => updateField('micturition', v)} placeholder="Normal / Abnormal" />
            <Field label="Bowels" value={formData.bowels} onChange={(v) => updateField('bowels', v)} placeholder="Normal / Abnormal" />
          </div>
        </Section>

        {/* ============================================================
         * SECTION 2: Medical History (Embedded)
         * ============================================================ */}
        <EmbeddableMedicalHistory 
          mode="summary"
          defaultCollapsed={true}
        />

        {/* ============================================================
         * SECTION 3: Medications
         * ============================================================ */}
        <Section
          title="Medications"
          icon={<Pill className="w-4 h-4" />}
          iconColor="text-amber-500"
          isExpanded={expandedSections.medications}
          onToggle={() => toggleSection('medications')}
        >
          <TextAreaField 
            label="Current Medications" 
            value={formData.medications} 
            onChange={(v) => updateField('medications', v)} 
            placeholder="List current medications..."
            rows={3}
          />
        </Section>

        {/* ============================================================
         * SECTION 3: Physical Examination
         * ============================================================ */}
        <Section
          title="Physical Examination"
          icon={<Stethoscope className="w-4 h-4" />}
          iconColor="text-teal-500"
          isExpanded={expandedSections.physicalExam}
          onToggle={() => toggleSection('physicalExam')}
        >
          {/* Vitals Row */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Vitals</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    placeholder="cm"
                    className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                  <Scale className="w-3 h-3" /> Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  placeholder="kg"
                  className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500">BMI</label>
                <input
                  type="text"
                  value={formData.bmi}
                  readOnly
                  placeholder="Auto"
                  className="w-full px-2 py-1.5 text-sm bg-zinc-100 border border-zinc-200 rounded-md text-zinc-600 placeholder:text-zinc-300"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500">Pulse</label>
                <input
                  type="text"
                  value={formData.pulse}
                  onChange={(e) => updateField('pulse', e.target.value)}
                  placeholder="bpm"
                  className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500">BP</label>
                <input
                  type="text"
                  value={formData.bp}
                  onChange={(e) => updateField('bp', e.target.value)}
                  placeholder="mm Hg"
                  className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>
          </div>

          {/* General Examination Row */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">General Examination</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <Field label="Pallor" value={formData.pallor} onChange={(v) => updateField('pallor', v)} placeholder="+/-" />
              <Field label="Goiter" value={formData.goiter} onChange={(v) => updateField('goiter', v)} placeholder="+/-" />
              <Field label="CVS" value={formData.cvs} onChange={(v) => updateField('cvs', v)} placeholder="S1S2+" />
              <Field label="RS" value={formData.rs} onChange={(v) => updateField('rs', v)} placeholder="Clear" />
              <Field label="Breasts" value={formData.breasts} onChange={(v) => updateField('breasts', v)} placeholder="NAD" />
            </div>
          </div>

          {/* Abdominal & Vaginal Examination */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Abdominal & Vaginal Examination</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Field label="P/A (Per Abdomen)" value={formData.perAbdomen} onChange={(v) => updateField('perAbdomen', v)} placeholder="Soft, non-tender..." />
              <div className="grid grid-cols-2 gap-2">
                <Field label="VE: V&V" value={formData.veVandV} onChange={(v) => updateField('veVandV', v)} placeholder="Healthy" />
                <Field label="Cervix" value={formData.cervix} onChange={(v) => updateField('cervix', v)} placeholder="NAD" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Uterus" value={formData.uterus} onChange={(v) => updateField('uterus', v)} placeholder="Normal size, anteverted..." />
              <Field label="Adnexa" value={formData.adnexa} onChange={(v) => updateField('adnexa', v)} placeholder="Free, non-tender" />
            </div>
          </div>
        </Section>

        {/* ============================================================
         * SECTION 4: Impression & Advice
         * ============================================================ */}
        <Section
          title="Assessment & Plan"
          icon={<FileText className="w-4 h-4" />}
          iconColor="text-purple-500"
          isExpanded={expandedSections.assessment}
          onToggle={() => toggleSection('assessment')}
        >
          <div className="space-y-3">
            <TextAreaField 
              label="Impression / Diagnosis"
              value={formData.impression} 
              onChange={(v) => updateField('impression', v)} 
              placeholder="Working diagnosis..."
              rows={2}
            />
            <TextAreaField 
              label="Advice / Management Plan"
              value={formData.advice} 
              onChange={(v) => updateField('advice', v)} 
              placeholder="Treatment plan, investigations, follow-up..."
              rows={3}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
