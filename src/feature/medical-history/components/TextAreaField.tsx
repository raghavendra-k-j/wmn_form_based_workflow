import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

interface TextAreaFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  autoResize?: boolean;
}

export const TextAreaField = observer(({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  rows = 2,
  className = '',
  autoResize = false,
}: TextAreaFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`
        px-2 py-1.5 text-[12px] border border-gray-300
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        resize-none
        ${className}
      `}
    />
  );
});

TextAreaField.displayName = 'TextAreaField';
