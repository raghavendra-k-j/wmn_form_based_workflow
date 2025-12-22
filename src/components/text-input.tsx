interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number' | 'time';
  readOnly?: boolean;
  className?: string;
}

export function TextInput({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  readOnly = false,
  className = ''
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors ${readOnly ? 'cursor-not-allowed !bg-zinc-100 !text-zinc-500' : ''} ${className}`}
    />
  );
}
