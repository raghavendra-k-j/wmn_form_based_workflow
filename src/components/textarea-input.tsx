interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function TextAreaInput({ 
  value, 
  onChange, 
  placeholder, 
  rows = 3,
  className = ''
}: TextAreaInputProps) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors resize-none ${className}`}
    />
  );
}
