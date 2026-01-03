import { observer } from 'mobx-react-lite';

interface SingleSelectFieldProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SingleSelectField = observer(({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}: SingleSelectFieldProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        w-full px-2 py-1.5 text-[12px] border border-gray-300 bg-white
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${className}
      `}
      style={{ 
        appearance: 'auto',
        WebkitAppearance: 'menulist',
        MozAppearance: 'menulist'
      }}
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-white text-gray-900 py-1">
          {option}
        </option>
      ))}
    </select>
  );
});

SingleSelectField.displayName = 'SingleSelectField';
