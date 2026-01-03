import { observer } from 'mobx-react-lite';
import { ChevronDown, Check, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MultiSelectFieldProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
}

export const MultiSelectField = observer(({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}: MultiSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: string) => {
    if (disabled) return;
    
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(value.filter(v => v !== option));
    }
  };

  const displayText = value.length === 0 
    ? 'Select...' 
    : value.length === 1 
    ? value[0] 
    : `${value.length} selected`;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-2 px-2 py-1.5 text-[12px] border border-gray-300 bg-white
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
        `}
      >
        <span className={value.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
          {displayText}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Selected Items Pills (when multiple selected) */}
      {value.length > 1 && !isOpen && (
        <div className="mt-1 flex flex-wrap gap-1">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {item}
              <button
                type="button"
                onClick={(e) => handleRemove(item, e)}
                className="hover:text-blue-900"
                disabled={disabled}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = value.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleToggle(option)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-[12px] text-left transition-colors
                  ${isSelected 
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span>{option}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-blue-600" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

MultiSelectField.displayName = 'MultiSelectField';
