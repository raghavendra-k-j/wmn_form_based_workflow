interface DatalistInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  id: string;
  className?: string;
}

export function DatalistInput({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  id,
  className = ''
}: DatalistInputProps) {
  return (
    <>
      <input
        type="text"
        list={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors ${className}`}
      />
      <datalist id={id}>
        {options.map(opt => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </>
  );
}
