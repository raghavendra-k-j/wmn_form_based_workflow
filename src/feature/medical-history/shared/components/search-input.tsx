import { Search } from 'lucide-react';

/* =============================================================================
 * SEARCH INPUT - Carbon Style Search
 * ============================================================================= */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative mb-3">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-400 focus:outline-none transition-colors placeholder:text-zinc-400"
      />
    </div>
  );
}
