interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectInput({ 
  value, 
  onChange, 
  options, 
  placeholder,
  disabled = false,
  className = ''
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors ${
        !value ? 'text-zinc-400' : 'text-zinc-900'
      } ${disabled ? 'cursor-not-allowed !bg-zinc-100 !text-zinc-500' : ''} ${className}`}
    >
      <option value="" className="text-zinc-400">{placeholder || 'Select...'}</option>
      {options.map(opt => (
        <option key={opt} value={opt} className="text-zinc-900">{opt}</option>
      ))}
    </select>
  );
}
