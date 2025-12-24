import { useId } from "react";

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  name?: string;
  className?: string;
}

export function RadioGroup({ 
  value, 
  onChange, 
  options, 
  name,
  className = ''
}: RadioGroupProps) {
  const uniqueName = useId();
  const groupName = name || uniqueName;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {options.map((option) => (
        <label 
          key={option} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-4 h-4">
            <input
              type="radio"
              name={groupName}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="peer appearance-none w-4 h-4 border border-zinc-300 bg-white checked:border-emerald-500 checked:border-[5px] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>
          <span className={`text-[12px] select-none transition-colors ${
            value === option ? 'text-zinc-900 font-medium' : 'text-zinc-600 group-hover:text-zinc-900'
          }`}>
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
