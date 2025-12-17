import { type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* ============================================================================
 * SHARED UI COMPONENTS
 * ============================================================================ */

interface SectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: ReactNode;
}

export function Section({ title, icon, iconColor, isExpanded, onToggle, children, badge }: SectionProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-3">
      <div 
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/50 border-b border-zinc-100 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 ${iconColor}`}>{icon}</span>
          <h3 className="font-semibold text-zinc-900 select-none text-sm">{title}</h3>
          {badge}
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
  small?: boolean;
}

export function Field({ label, value, onChange, placeholder, type = 'text', small = false }: FieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className={`font-medium text-zinc-500 ${small ? 'text-[10px]' : 'text-xs'}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className={`px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300 ${small ? 'text-xs' : 'text-sm'}`}
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

export function TextAreaField({ label, value, onChange, placeholder, rows = 2 }: TextAreaFieldProps) {
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
