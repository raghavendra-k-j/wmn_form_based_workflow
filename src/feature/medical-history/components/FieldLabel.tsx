import { observer } from 'mobx-react-lite';
import type { ReactNode } from 'react';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}

export const FieldLabel = observer(({
  label,
  required = false,
  hint,
  icon,
  className = '',
}: FieldLabelProps) => {
  return (
    <div className={`mb-1.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-[12px] font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      </div>
      {hint && (
        <p className="text-[11px] text-gray-500 mt-0.5">{hint}</p>
      )}
    </div>
  );
});

FieldLabel.displayName = 'FieldLabel';
