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

function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number' | 'time';
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
 * NEXT VISIT TAB
 * ============================================================================= */

export function NextVisitTab() {
  const { form, updateNextAppointment } = useAncForm();
  const v = form.nextAppointment;

  return (
    <div className="space-y-4">
      <SectionCard title="Schedule Next Appointment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Next Appointment Date">
            <TextInput type="date" value={v.appointmentDate} onChange={val => updateNextAppointment({ appointmentDate: val })} />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Notes">
            <TextAreaInput 
              value={v.notes} 
              onChange={val => updateNextAppointment({ notes: val })} 
              placeholder="Things to review at next visit...&#10;e.g., Review GTT results, Plan for Anomaly scan..." 
              rows={4} 
            />
          </FormField>
        </div>
      </SectionCard>
    </div>
  );
}

export default NextVisitTab;
