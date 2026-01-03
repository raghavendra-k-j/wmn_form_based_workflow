import { observer } from 'mobx-react-lite';

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const TextField = observer(({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
}: TextFieldProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        px-2 py-1.5 text-[12px] border border-gray-300
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
});

TextField.displayName = 'TextField';
