import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export interface SmartTextAreaOption {
  id: string;
  value: string;
  code?: string;
  label?: string;
}

interface SmartTextAreaProps {
  value: string; // Current text input (search query)
  onChange: (value: string) => void;
  options: SmartTextAreaOption[];
  selections?: SmartTextAreaOption[];
  onJsChange?: (selections: SmartTextAreaOption[]) => void;
  placeholder?: string;
  className?: string;
  triggerChar?: string;
  minChars?: number;
}

// Helper for highlighting text
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 font-bold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};


export function SmartTextArea({ 
  value, 
  onChange, 
  options,
  selections = [],
  onJsChange,
  placeholder, 
  className = '',
  triggerChar = '',
  minChars = 1
}: SmartTextAreaProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SmartTextAreaOption[]>([]);
  const [activeQuery, setActiveQuery] = useState(''); // Store the query used for filtering to pass to highlighter
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    onChange(newVal);

    if (triggerChar) {
       const lastIndex = newVal.lastIndexOf(triggerChar);
       if (lastIndex !== -1) {
          const query = newVal.slice(lastIndex + 1);
          if (query.length >= minChars) {
             filterOptions(query);
             return;
          }
       }
    } else {
         if (newVal.length >= minChars) {
             filterOptions(newVal);
             return;
         }
    }
    setShowSuggestions(false);
  };

  const filterOptions = (query: string) => {
    setActiveQuery(query);
    const lower = query.toLowerCase();
    const filtered = options.filter(opt => 
       opt.value.toLowerCase().includes(lower) || 
       (opt.code && opt.code.toLowerCase().includes(lower))
    ).slice(0, 10);
    setFilteredOptions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const handleSelect = (option: SmartTextAreaOption) => {
    if (onJsChange) {
      if (!selections.find(s => s.id === option.id)) {
        onJsChange([...selections, option]);
      }
    }
    onChange(''); 
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleRemove = (id: string) => {
    if (onJsChange) {
      onJsChange(selections.filter(s => s.id !== id));
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && value === '' && selections.length > 0) {
          const newSel = [...selections];
          newSel.pop();
          if (onJsChange) onJsChange(newSel);
      }
  };

  return (
    <div 
      ref={wrapperRef}
      className={`relative w-full min-h-[50px] px-2 py-2 bg-white border border-zinc-300 rounded focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-colors flex flex-wrap content-start gap-2 cursor-text ${className}`}
      onClick={() => textareaRef.current?.focus()}
    >
       {/* Badges */}
       {selections.map(opt => (
         <span key={opt.id} className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-medium rounded-full select-none">
            {opt.label || `${opt.value}${opt.code ? ` (${opt.code})` : ''}`}
            <button 
              onClick={(e) => { e.stopPropagation(); handleRemove(opt.id); }}
              className="ml-1.5 p-0.5 hover:bg-emerald-200 rounded-full text-emerald-600 outline-none"
            >
              <X className="w-3 h-3" />
            </button>
         </span>
       ))}
       
       {/* Input */}
       <textarea
         ref={textareaRef}
         value={value}
         onChange={handleInputChange}
         onKeyDown={handleKeyDown}
         placeholder={selections.length === 0 ? placeholder : ''}
         rows={1}
         className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-[12px] text-zinc-900 placeholder-zinc-400 resize-none overflow-hidden h-6 py-1"
       />
       
       {/* Dropdown */}
       {showSuggestions && filteredOptions.length > 0 && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-zinc-200 shadow-lg rounded-md z-50 max-h-48 overflow-y-auto">
            <ul className="py-1">
                {filteredOptions.map((opt) => (
                <li 
                    key={opt.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(opt)}
                    className="px-3 py-2 text-[12px] text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer border-b border-zinc-50 last:border-0"
                >
                    <div className="font-medium text-zinc-900">
                        <HighlightedText text={opt.value} highlight={activeQuery} />
                    </div>
                    {opt.code && (
                        <div className="text-[10px] text-zinc-400">
                            <HighlightedText text={opt.code} highlight={activeQuery} />
                        </div>
                    )}
                </li>
                ))}
            </ul>
        </div>
       )}
    </div>
  );
}
