import { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ChevronDown } from 'lucide-react';

interface MultiSelectDropdownProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export const MultiSelectDropdown = observer(
    ({ options, value, onChange, placeholder = 'Select...' }: MultiSelectDropdownProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleToggleOption = (option: string) => {
            if (value.includes(option)) {
                onChange(value.filter((v) => v !== option));
            } else {
                onChange([...value, option]);
            }
        };



        return (
            <div ref={dropdownRef} className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 border border-zinc-300 bg-white text-sm text-left hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                    <div className="flex-1 truncate">
                        {value.length === 0 ? (
                            <span className="text-zinc-400">{placeholder}</span>
                        ) : (
                            <span className="text-zinc-700">{value.length} selected</span>
                        )}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>



                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 shadow-lg max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                        {options.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-50 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(option)}
                                    onChange={() => handleToggleOption(option)}
                                    className="w-4 h-4 rounded border-zinc-300 text-pink-600 focus:ring-pink-500"
                                />
                                <span className="text-zinc-700">{option}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);
