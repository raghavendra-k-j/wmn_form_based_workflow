import { useState } from 'react';
import { Baby, Calendar, Heart, Stethoscope, Check, ClipboardList } from 'lucide-react';
import { PncFormProvider, usePncForm } from './context';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const MODE_OF_DELIVERY = ['NVD', 'LSCS', 'Forceps', 'Vacuum'];
const SEX_OPTIONS = ['Male', 'Female'];
const PERINEAL_TEAR_OPTIONS = ['None', 'I', 'II', 'III a', 'III b', 'III c', 'IV'];
const PALLOR_OPTIONS = ['-', '+', '++', '+++'];
const BREASTS_OPTIONS = ['Normal', 'Engorged', 'Mastitis', 'Abscess', 'NAD'];
const PERINEUM_OPTIONS = ['Healthy', 'Healing', 'Infected', 'Episiotomy OK', 'NAD'];
const CONTRACEPTION_OPTIONS = ['None', 'Barrier', 'OCP', 'POP', 'IUD', 'LAM', 'Sterilization'];

/* =============================================================================
 * SHARED COMPONENTS
 * ============================================================================= */

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

function TabButton({ label, active, onClick, icon: Icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors border-b-2 ${
        active
          ? 'text-rose-600 border-rose-600 bg-rose-50/50'
          : 'text-zinc-500 border-transparent hover:text-zinc-700 hover:bg-zinc-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

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

function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number';
}) {
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

function SelectInput({ value, onChange, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
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

function CheckboxInput({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
        checked ? 'bg-rose-600 border-rose-600' : 'bg-white border-zinc-300 group-hover:border-zinc-400'
      }`}>
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className="text-[12px] text-zinc-700">{label}</span>
    </label>
  );
}

/* =============================================================================
 * TAB 1: DELIVERY DETAILS
 * ============================================================================= */

function DeliveryDetailsTab() {
  const { form, updateDeliveryDetails } = usePncForm();
  const d = form.deliveryDetails;

  return (
    <div className="space-y-4">
      <SectionCard title="Delivery Information">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Date of Delivery">
            <TextInput type="date" value={d.dateOfDelivery} onChange={v => updateDeliveryDetails({ dateOfDelivery: v })} />
          </FormField>
          <FormField label="Mode of Delivery">
            <SelectInput value={d.modeOfDelivery} onChange={v => updateDeliveryDetails({ modeOfDelivery: v })} options={MODE_OF_DELIVERY} />
          </FormField>
          <FormField label="Sex">
            <SelectInput value={d.sex} onChange={v => updateDeliveryDetails({ sex: v })} options={SEX_OPTIONS} />
          </FormField>
          <FormField label="Birth Weight (kg)">
            <TextInput value={d.birthWeight} onChange={v => updateDeliveryDetails({ birthWeight: v })} placeholder="e.g., 3.2" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Complications">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Indication for CS (if applicable)">
            <TextInput value={d.indicationForCS} onChange={v => updateDeliveryDetails({ indicationForCS: v })} placeholder="e.g., Failure to progress" />
          </FormField>
          <FormField label="Perineal Tear">
            <SelectInput value={d.perinealTear} onChange={v => updateDeliveryDetails({ perinealTear: v })} options={PERINEAL_TEAR_OPTIONS} />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Other Concerns (PPH, Shoulder Dystocia, etc.)">
            <TextAreaInput value={d.otherConcerns} onChange={v => updateDeliveryDetails({ otherConcerns: v })} placeholder="Any intrapartum / postpartum concerns..." />
          </FormField>
        </div>
      </SectionCard>
    </div>
  );
}

/* =============================================================================
 * TAB 2: POST PARTUM VISIT
 * ============================================================================= */

function PostPartumVisitTab() {
  const { form, updatePostPartumVisit } = usePncForm();
  const v = form.postPartumVisit;

  const updateAntenatal = (key: keyof typeof v.antenatalConditions, value: string) => {
    updatePostPartumVisit({
      antenatalConditions: { ...v.antenatalConditions, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Visit Date & Antenatal Conditions">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <FormField label="Visit Date">
            <TextInput type="date" value={v.date} onChange={val => updatePostPartumVisit({ date: val })} />
          </FormField>
          <FormField label="Diabetes">
            <TextInput value={v.antenatalConditions.diabetes} onChange={val => updateAntenatal('diabetes', val)} placeholder="e.g., GDM on OHA" />
          </FormField>
          <FormField label="Hypertension">
            <TextInput value={v.antenatalConditions.hypertension} onChange={val => updateAntenatal('hypertension', val)} placeholder="e.g., PIH" />
          </FormField>
          <FormField label="Thyroid">
            <TextInput value={v.antenatalConditions.thyroid} onChange={val => updateAntenatal('thyroid', val)} placeholder="e.g., Hypothyroid" />
          </FormField>
          <FormField label="Any Others">
            <TextInput value={v.antenatalConditions.anyOthers} onChange={val => updateAntenatal('anyOthers', val)} placeholder="e.g., H/o Depression" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Examination">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="BP">
            <TextInput value={v.bp} onChange={val => updatePostPartumVisit({ bp: val })} placeholder="120/80" />
          </FormField>
          <FormField label="Pallor">
            <SelectInput value={v.pallor} onChange={val => updatePostPartumVisit({ pallor: val })} options={PALLOR_OPTIONS} />
          </FormField>
          <FormField label="Breasts">
            <SelectInput value={v.breasts} onChange={val => updatePostPartumVisit({ breasts: val })} options={BREASTS_OPTIONS} />
          </FormField>
          <FormField label="P/A">
            <TextInput value={v.pa} onChange={val => updatePostPartumVisit({ pa: val })} placeholder="Soft, Involuting" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Perineum">
            <SelectInput value={v.perineum} onChange={val => updatePostPartumVisit({ perineum: val })} options={PERINEUM_OPTIONS} />
          </FormField>
          <FormField label="S/B (Symphysio-fundal)">
            <TextInput value={v.sb} onChange={val => updatePostPartumVisit({ sb: val })} placeholder="e.g., At umbilicus" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Notes & Follow-up">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Concerns, if any">
            <TextAreaInput value={v.concerns} onChange={val => updatePostPartumVisit({ concerns: val })} placeholder="Any concerns from mother..." />
          </FormField>
          <FormField label="Medications">
            <TextAreaInput value={v.medications} onChange={val => updatePostPartumVisit({ medications: val })} placeholder="Current medications..." />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Advice">
            <TextAreaInput value={v.advice} onChange={val => updatePostPartumVisit({ advice: val })} placeholder="Breastfeeding, wound care, warning signs..." rows={3} />
          </FormField>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-zinc-100">
          <div className="flex items-end">
            <CheckboxInput label="Mood Okay" checked={v.moodOkay} onChange={val => updatePostPartumVisit({ moodOkay: val })} />
          </div>
          <div className="flex items-end">
            <CheckboxInput label="Contraception Leaflet Given" checked={v.contraceptionLeaflet} onChange={val => updatePostPartumVisit({ contraceptionLeaflet: val })} />
          </div>
          <FormField label="Next Check-up">
            <TextInput type="date" value={v.nextCheckup} onChange={val => updatePostPartumVisit({ nextCheckup: val })} />
          </FormField>
        </div>
      </SectionCard>
    </div>
  );
}

/* =============================================================================
 * TAB 3: 6 WEEK VISIT
 * ============================================================================= */

function SixWeekVisitTab() {
  const { form, updateSixWeekVisit } = usePncForm();
  const v = form.sixWeekVisit;

  return (
    <div className="space-y-4">
      <SectionCard title="6 Weeks Post Partum Visit">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Visit Date">
            <TextInput type="date" value={v.date} onChange={val => updateSixWeekVisit({ date: val })} />
          </FormField>
          <FormField label="BP">
            <TextInput value={v.bp} onChange={val => updateSixWeekVisit({ bp: val })} placeholder="120/80" />
          </FormField>
          <FormField label="Pallor">
            <SelectInput value={v.pallor} onChange={val => updateSixWeekVisit({ pallor: val })} options={PALLOR_OPTIONS} />
          </FormField>
          <FormField label="Breasts">
            <SelectInput value={v.breasts} onChange={val => updateSixWeekVisit({ breasts: val })} options={BREASTS_OPTIONS} />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Examination">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Perineum">
            <SelectInput value={v.perineum} onChange={val => updateSixWeekVisit({ perineum: val })} options={PERINEUM_OPTIONS} />
          </FormField>
          <FormField label="P/A">
            <TextInput value={v.pa} onChange={val => updateSixWeekVisit({ pa: val })} placeholder="Soft, Uterus involuted" />
          </FormField>
          <FormField label="S/B">
            <TextInput value={v.sb} onChange={val => updateSixWeekVisit({ sb: val })} placeholder="Not palpable" />
          </FormField>
          <FormField label="Contraception">
            <SelectInput value={v.contraception} onChange={val => updateSixWeekVisit({ contraception: val })} options={CONTRACEPTION_OPTIONS} />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Notes & Follow-up">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Concerns, if any">
            <TextAreaInput value={v.concerns} onChange={val => updateSixWeekVisit({ concerns: val })} placeholder="Any concerns from mother..." />
          </FormField>
          <FormField label="Medication">
            <TextAreaInput value={v.medication} onChange={val => updateSixWeekVisit({ medication: val })} placeholder="Current medications if any..." />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-100">
          <div className="flex items-end">
            <CheckboxInput label="Mood Okay" checked={v.moodOkay} onChange={val => updateSixWeekVisit({ moodOkay: val })} />
          </div>
          <FormField label="Next Visit">
            <TextInput type="date" value={v.nextVisit} onChange={val => updateSixWeekVisit({ nextVisit: val })} />
          </FormField>
        </div>
      </SectionCard>
    </div>
  );
}

/* =============================================================================
 * MAIN FORM CONTENT - With Tabs
 * ============================================================================= */

type TabId = 'delivery' | 'postpartum' | '6week';

function PncFormContent() {
  const [activeTab, setActiveTab] = useState<TabId>('delivery');

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'delivery', label: 'Delivery Details', icon: Baby },
    { id: 'postpartum', label: 'Post Partum Visit', icon: Heart },
    { id: '6week', label: '6 Week Visit', icon: Calendar },
  ];

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200">
        <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
          PNC Form
        </h2>
        <button className="px-3 py-1.5 bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors">
          Save
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-zinc-200 px-2">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'delivery' && <DeliveryDetailsTab />}
        {activeTab === 'postpartum' && <PostPartumVisitTab />}
        {activeTab === '6week' && <SixWeekVisitTab />}
      </div>
    </div>
  );
}

/* =============================================================================
 * MAIN EXPORT
 * ============================================================================= */

export function PncFormPage() {
  return (
    <PncFormProvider>
      <PncFormContent />
    </PncFormProvider>
  );
}

export default PncFormPage;
