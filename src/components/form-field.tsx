import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export function FormField({ label, children, className = '', required = false }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

