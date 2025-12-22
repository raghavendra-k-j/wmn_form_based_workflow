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
 * LAB SCANS TAB - Simplified with 2 fields
 * ============================================================================= */

export function LabScansTab() {
  const { form, updateLabScans } = useAncForm();
  const v = form.labScans;

  return (
    <div className="space-y-4">
      <SectionCard title="Lab Tests">
        <FormField label="Lab Tests Prescribed">
          <TextAreaInput 
            value={v.labTests} 
            onChange={val => updateLabScans({ labTests: val })} 
            placeholder="e.g., CBC, Blood Group, HIV, HBsAg, VDRL, TSH, Blood Sugar, Urine R/E, GTT..." 
            rows={5} 
          />
        </FormField>
      </SectionCard>

      <SectionCard title="Scans & Imaging">
        <FormField label="Scans and Imaging Prescribed">
          <TextAreaInput 
            value={v.scansImaging} 
            onChange={val => updateLabScans({ scansImaging: val })} 
            placeholder="e.g., NT Scan (11-14 wks), Anomaly Scan (18-22 wks), Growth Scan (32-34 wks), Doppler..." 
            rows={5} 
          />
        </FormField>
      </SectionCard>
    </div>
  );
}

export default LabScansTab;
