import { useState, type ReactNode } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Baby,
  Activity,
  Stethoscope,
  FileText,
  Calendar,
  Heart,
  Scale,
  Clock,
  CheckSquare,
  Square,
  ClipboardList,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmbeddableMedicalHistory } from '../../medical-history/EmbeddableMedicalHistory';

/* ============================================================================
 * TYPES & INTERFACES
 * ============================================================================ */

interface PncFormData {
  // Delivery Information
  deliveryDate: string;
  modeOfDelivery: 'normal' | 'forceps' | 'vacuum' | 'cs' | '';
  indicationForCS: string;
  babySex: 'male' | 'female' | '';
  birthWeight: string;
  perinealTear: string;
  otherConcerns: string; // PPH, Shoulder Dystocia, etc.
  
  // Antenatal Conditions
  diabetes: string;
  hypertension: string;
  thyroid: string;
  anyOthers: string;
  
  // Post Partum Visit
  ppVisitDate: string;
  ppConcerns: string;
  ppMoodOkay: boolean;
  ppBp: string;
  ppPallor: string;
  ppBreasts: string;
  ppPA: string;
  ppPerineum: string;
  ppMedications: string;
  ppAdvice: string;
  ppContraceptionLeaflet: boolean;
  ppSB: string;
  ppNextCheckup: string;
  
  // 6 Weeks Post Partum Visit
  sixWeekDate: string;
  sixWeekConcerns: string;
  sixWeekBp: string;
  sixWeekPallor: string;
  sixWeekBreasts: string;
  sixWeekPerineum: string;
  sixWeekMoodOkay: boolean;
  sixWeekPA: string;
  sixWeekMedication: string;
  sixWeekContraception: string;
  sixWeekSB: string;
  sixWeekNextVisit: string;
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

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-medium text-zinc-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-50 transition-colors"
    >
      {checked ? (
        <CheckSquare className="w-4 h-4 text-green-600" />
      ) : (
        <Square className="w-4 h-4 text-zinc-400" />
      )}
      <span className={`text-sm font-medium ${checked ? 'text-zinc-800' : 'text-zinc-500'}`}>{label}</span>
    </button>
  );
}

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */

export function PncCaseView() {
  const navigate = useNavigate();
  
  // Mock linked ANC case
  const linkedCaseId = 'CS-101';

  // Section expansion state
  const [expandedSections, setExpandedSections] = useState({
    deliveryInfo: true,
    antenatal: true,
    postPartumVisit: true,
    sixWeekVisit: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form data state
  const [formData, setFormData] = useState<PncFormData>({
    // Delivery Information
    deliveryDate: '',
    modeOfDelivery: '',
    indicationForCS: '',
    babySex: '',
    birthWeight: '',
    perinealTear: '',
    otherConcerns: '',
    
    // Antenatal Conditions
    diabetes: '',
    hypertension: '',
    thyroid: '',
    anyOthers: '',
    
    // Post Partum Visit
    ppVisitDate: '',
    ppConcerns: '',
    ppMoodOkay: false,
    ppBp: '',
    ppPallor: '',
    ppBreasts: '',
    ppPA: '',
    ppPerineum: '',
    ppMedications: '',
    ppAdvice: '',
    ppContraceptionLeaflet: false,
    ppSB: '',
    ppNextCheckup: '',
    
    // 6 Weeks Visit
    sixWeekDate: '',
    sixWeekConcerns: '',
    sixWeekBp: '',
    sixWeekPallor: '',
    sixWeekBreasts: '',
    sixWeekPerineum: '',
    sixWeekMoodOkay: false,
    sixWeekPA: '',
    sixWeekMedication: '',
    sixWeekContraception: '',
    sixWeekSB: '',
    sixWeekNextVisit: ''
  });

  const updateField = <K extends keyof PncFormData>(field: K, value: PncFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const modeOfDeliveryOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'forceps', label: 'Forceps' },
    { value: 'vacuum', label: 'Vacuum' },
    { value: 'cs', label: 'Caesarean Section' }
  ];

  const babySexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const perinealTearOptions = [
    { value: 'none', label: 'None' },
    { value: 'I', label: 'Grade I' },
    { value: 'IIa', label: 'Grade II a' },
    { value: 'IIb', label: 'Grade II b' },
    { value: 'IIc', label: 'Grade II c' },
    { value: 'III', label: 'Grade III' },
    { value: 'IV', label: 'Grade IV' }
  ];

  return (
    <div className="h-full w-full bg-zinc-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-zinc-200 px-4 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center">
            <Baby className="w-4 h-4 text-sky-600" />
          </div>
          <h2 className="text-sm font-bold text-zinc-900">PNC Case - Postnatal Care</h2>
        </div>
        <button className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors">
          Save
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        
        {/* Linked ANC Case */}
        <div className="mb-3">
          <div 
            onClick={() => navigate(`../${linkedCaseId}`)}
            className="group bg-white border border-zinc-200 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-zinc-50 hover:border-pink-200 transition-all duration-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Linked ANC Case</p>
                <p className="text-sm font-bold text-zinc-900 group-hover:text-pink-700 transition-colors">High Risk Pregnancy <span className="font-mono text-zinc-400">#{linkedCaseId}</span></p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-pink-600" />
          </div>
        </div>

        {/* ============================================================
         * SECTION 1: Delivery Information
         * ============================================================ */}
        <Section
          title="Delivery Information"
          icon={<Baby className="w-4 h-4" />}
          iconColor="text-sky-500"
          isExpanded={expandedSections.deliveryInfo}
          onToggle={() => toggleSection('deliveryInfo')}
        >
          {/* Row 1: Date, Mode of Delivery, Baby Sex, Birth Weight */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">Delivery Date</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => updateField('deliveryDate', e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            <SelectField 
              label="Mode of Delivery" 
              value={formData.modeOfDelivery} 
              onChange={(v) => updateField('modeOfDelivery', v as PncFormData['modeOfDelivery'])} 
              options={modeOfDeliveryOptions} 
            />
            <SelectField 
              label="Baby Sex" 
              value={formData.babySex} 
              onChange={(v) => updateField('babySex', v as PncFormData['babySex'])} 
              options={babySexOptions} 
            />
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">Birth Weight</label>
              <div className="relative">
                <Scale className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={formData.birthWeight}
                  onChange={(e) => updateField('birthWeight', e.target.value)}
                  placeholder="e.g. 3.2 kg"
                  className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Indication for CS, Perineal Tear */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field 
              label="Indication for CS (if applicable)" 
              value={formData.indicationForCS} 
              onChange={(v) => updateField('indicationForCS', v)} 
              placeholder="e.g. Failure to progress, Fetal distress" 
            />
            <SelectField 
              label="Perineal Tear" 
              value={formData.perinealTear} 
              onChange={(v) => updateField('perinealTear', v)} 
              options={perinealTearOptions} 
            />
          </div>

          {/* Row 3: Other Concerns */}
          <Field 
            label="Other Intrapartum/Postpartum Concerns" 
            value={formData.otherConcerns} 
            onChange={(v) => updateField('otherConcerns', v)} 
            placeholder="e.g. PPH, Shoulder Dystocia..." 
          />
        </Section>

        {/* ============================================================
         * SECTION 2: Antenatal Conditions
         * ============================================================ */}
        <Section
          title="Antenatal Conditions"
          icon={<ClipboardList className="w-4 h-4" />}
          iconColor="text-amber-500"
          isExpanded={expandedSections.antenatal}
          onToggle={() => toggleSection('antenatal')}
        >
          <div className="grid grid-cols-4 gap-3">
            <Field label="Diabetes" value={formData.diabetes} onChange={(v) => updateField('diabetes', v)} placeholder="Status / Details" />
            <Field label="Hypertension" value={formData.hypertension} onChange={(v) => updateField('hypertension', v)} placeholder="Status / Details" />
            <Field label="Thyroid" value={formData.thyroid} onChange={(v) => updateField('thyroid', v)} placeholder="Status / Details" />
            <Field label="Any Others" value={formData.anyOthers} onChange={(v) => updateField('anyOthers', v)} placeholder="Other conditions" />
          </div>
        </Section>

        {/* ============================================================
         * SECTION 3: Medical History (Embedded)
         * ============================================================ */}
        <EmbeddableMedicalHistory 
          mode="summary"
          defaultCollapsed={true}
        />

        {/* ============================================================
         * SECTION 4: Post Partum Visit
         * ============================================================ */}
        <Section
          title="Post Partum Visit"
          icon={<Stethoscope className="w-4 h-4" />}
          iconColor="text-teal-500"
          isExpanded={expandedSections.postPartumVisit}
          onToggle={() => toggleSection('postPartumVisit')}
        >
          {/* Date & Concerns Row */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">Visit Date</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="date"
                  value={formData.ppVisitDate}
                  onChange={(e) => updateField('ppVisitDate', e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            <Field label="Concerns, if any" value={formData.ppConcerns} onChange={(v) => updateField('ppConcerns', v)} placeholder="Any concerns..." />
            <div className="flex items-end">
              <CheckboxField label="Mood Okay" checked={formData.ppMoodOkay} onChange={(v) => updateField('ppMoodOkay', v)} />
            </div>
          </div>

          {/* Physical Examination */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Physical Examination</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <Field label="BP" value={formData.ppBp} onChange={(v) => updateField('ppBp', v)} placeholder="mm Hg" />
              <Field label="Pallor" value={formData.ppPallor} onChange={(v) => updateField('ppPallor', v)} placeholder="+/-" />
              <Field label="Breasts" value={formData.ppBreasts} onChange={(v) => updateField('ppBreasts', v)} placeholder="Findings..." />
              <Field label="P/A" value={formData.ppPA} onChange={(v) => updateField('ppPA', v)} placeholder="Findings..." />
              <Field label="Perineum" value={formData.ppPerineum} onChange={(v) => updateField('ppPerineum', v)} placeholder="Healing status" />
            </div>
          </div>

          {/* Medications & Advice */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <TextAreaField label="Medications" value={formData.ppMedications} onChange={(v) => updateField('ppMedications', v)} placeholder="Current medications..." rows={2} />
            <TextAreaField label="Advice" value={formData.ppAdvice} onChange={(v) => updateField('ppAdvice', v)} placeholder="Advice given..." rows={2} />
          </div>

          {/* Contraception & Follow-up */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-end">
              <CheckboxField label="Contraception Leaflet Given" checked={formData.ppContraceptionLeaflet} onChange={(v) => updateField('ppContraceptionLeaflet', v)} />
            </div>
            <Field label="S/B" value={formData.ppSB} onChange={(v) => updateField('ppSB', v)} placeholder="..." />
            <div className="col-span-2">
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-medium text-zinc-500">Next Check-up</label>
                <div className="relative">
                  <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="date"
                    value={formData.ppNextCheckup}
                    onChange={(e) => updateField('ppNextCheckup', e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================
         * SECTION 5: 6 Weeks Post Partum Visit
         * ============================================================ */}
        <Section
          title="6 Weeks Post Partum Visit"
          icon={<FileText className="w-4 h-4" />}
          iconColor="text-purple-500"
          isExpanded={expandedSections.sixWeekVisit}
          onToggle={() => toggleSection('sixWeekVisit')}
        >
          {/* Date & Concerns Row */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">Visit Date</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="date"
                  value={formData.sixWeekDate}
                  onChange={(e) => updateField('sixWeekDate', e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            <Field label="Concerns, if any" value={formData.sixWeekConcerns} onChange={(v) => updateField('sixWeekConcerns', v)} placeholder="Any concerns..." />
            <div className="flex items-end">
              <CheckboxField label="Mood Okay" checked={formData.sixWeekMoodOkay} onChange={(v) => updateField('sixWeekMoodOkay', v)} />
            </div>
          </div>

          {/* Physical Examination */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Physical Examination</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <Field label="BP" value={formData.sixWeekBp} onChange={(v) => updateField('sixWeekBp', v)} placeholder="mm Hg" />
              <Field label="Pallor" value={formData.sixWeekPallor} onChange={(v) => updateField('sixWeekPallor', v)} placeholder="+/-" />
              <Field label="Breasts" value={formData.sixWeekBreasts} onChange={(v) => updateField('sixWeekBreasts', v)} placeholder="Findings..." />
              <Field label="P/A" value={formData.sixWeekPA} onChange={(v) => updateField('sixWeekPA', v)} placeholder="Findings..." />
              <Field label="Perineum" value={formData.sixWeekPerineum} onChange={(v) => updateField('sixWeekPerineum', v)} placeholder="Healing status" />
            </div>
          </div>

          {/* Medication & Contraception */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Field label="Medication" value={formData.sixWeekMedication} onChange={(v) => updateField('sixWeekMedication', v)} placeholder="Current medications..." />
            <Field label="Contraception" value={formData.sixWeekContraception} onChange={(v) => updateField('sixWeekContraception', v)} placeholder="Method chosen..." />
            <Field label="S/B" value={formData.sixWeekSB} onChange={(v) => updateField('sixWeekSB', v)} placeholder="..." />
          </div>

          {/* Next Visit */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium text-zinc-500">Next Visit</label>
            <div className="relative max-w-xs">
              <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="date"
                value={formData.sixWeekNextVisit}
                onChange={(e) => updateField('sixWeekNextVisit', e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
