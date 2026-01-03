import { observer } from 'mobx-react-lite';
import { useState, useRef, useEffect } from 'react';

interface AutocompleteInputProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  allowCustom?: boolean;
  className?: string;
}

export const AutocompleteInput = observer(({
  suggestions,
  onSelect,
  placeholder = 'Type to search...',
  allowCustom = true,
  className = '',
}: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      onSelect(inputValue.trim());
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        handleSelect(filteredSuggestions[0]);
      } else if (allowCustom && inputValue.trim()) {
        handleAdd();
      }
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setShowSuggestions(filteredSuggestions.length > 0)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-[12px] border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        />
        
        {/* Search Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 w-full bottom-full mb-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(suggestion)}
                className="w-full px-3 py-2 text-left text-[12px] text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

AutocompleteInput.displayName = 'AutocompleteInput';
