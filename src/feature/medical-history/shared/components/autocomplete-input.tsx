import { useState, useRef, useEffect } from 'react';

/* =============================================================================
 * AUTOCOMPLETE INPUT - Dropdown with suggestions
 * ============================================================================= */

interface AutocompleteInputProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  variant?: 'amber' | 'blue' | 'purple' | 'teal';
  /** When false, only predefined suggestions can be selected. Custom values are not allowed. */
  allowCustom?: boolean;
  /** When true, the entire input is hidden */
  hidden?: boolean;
}

const buttonVariants = {
  amber: 'bg-amber-600 hover:bg-amber-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white',
};

/** Highlight matching text in a suggestion */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return <>{text}</>;
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <>
      {before}
      <span className="bg-amber-200 text-amber-900 font-semibold">{match}</span>
      {after}
    </>
  );
}

export function AutocompleteInput({
  suggestions,
  onSelect,
  placeholder = 'Type to search...',
  buttonLabel = 'Add',
  variant = 'blue',
  allowCustom = false,
  hidden = false,
}: AutocompleteInputProps) {
  // If hidden, return null immediately
  if (hidden) return null;
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Intelligent filtering: starts-with first, then contains
  const filteredSuggestions = (() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return suggestions;

    const startsWithMatches: string[] = [];
    const containsMatches: string[] = [];

    suggestions.forEach((s) => {
      const lower = s.toLowerCase();
      if (lower.startsWith(query)) {
        startsWithMatches.push(s);
      } else if (lower.includes(query)) {
        containsMatches.push(s);
      }
    });

    return [...startsWithMatches, ...containsMatches];
  })();

  // Check if input exactly matches a suggestion (case-insensitive)
  const isExactMatch = suggestions.some(
    (s) => s.toLowerCase() === inputValue.trim().toLowerCase()
  );

  // Determine if Add button should be enabled
  // If allowCustom is true: enable when there's input
  // If allowCustom is false: enable only when input exactly matches a suggestion
  const isAddButtonEnabled = allowCustom 
    ? inputValue.trim().length > 0 
    : isExactMatch;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleAddCustom = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    
    // If custom not allowed, only add if it matches a suggestion exactly
    if (!allowCustom && !isExactMatch) return;
    
    onSelect(trimmed);
    setInputValue('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          // User explicitly selected an item with arrow keys
          handleSelect(filteredSuggestions[highlightedIndex]);
        } else if (filteredSuggestions.length > 0) {
          // Auto-select first matching suggestion
          handleSelect(filteredSuggestions[0]);
        } else if (isAddButtonEnabled) {
          // No matches, add custom value if allowed
          handleAddCustom();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-3 py-1.5 text-[12px] bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-400 focus:outline-none transition-colors placeholder:text-zinc-400"
          />

          {/* Dropdown - opens upward */}
          {isOpen && inputValue.trim().length > 0 && (
            <div className="absolute z-50 left-0 right-0 bottom-full mb-1 max-h-52 overflow-y-auto bg-white border border-zinc-200 rounded-lg shadow-xl ring-1 ring-black/5">
              {filteredSuggestions.length > 0 ? (
                <div className="py-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSelect(suggestion)}
                      className={`w-full text-left px-3 py-2 text-[12px] transition-all duration-100 cursor-pointer flex items-center gap-2 ${
                        index === highlightedIndex
                          ? 'bg-teal-50 text-teal-800 border-l-2 border-teal-500'
                          : 'hover:bg-zinc-50 text-zinc-700 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="flex-1">
                        <HighlightedText text={suggestion} query={inputValue} />
                      </span>
                      {index === highlightedIndex && (
                        <span className="text-[10px] text-teal-500 font-medium">↵ Enter</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-center">
                  <div className="text-zinc-400 text-[11px] font-medium">No results found</div>
                  <div className="text-zinc-300 text-[10px] mt-0.5">Try a different search term</div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!isAddButtonEnabled}
          className={`px-3 py-1.5 text-[11px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${buttonVariants[variant]}`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

