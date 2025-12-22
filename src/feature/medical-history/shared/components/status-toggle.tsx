/* =============================================================================
 * STATUS TOGGLE - Cyclic Status Button
 * ============================================================================= */

interface StatusOption<T extends string> {
  value: T;
  label: string;
  className: string;
}

interface StatusToggleProps<T extends string> {
  value: T;
  options: StatusOption<T>[];
  onChange: (value: T) => void;
  readOnly?: boolean;
}

export function StatusToggle<T extends string>({
  value,
  options,
  onChange,
  readOnly = false,
}: StatusToggleProps<T>) {
  const currentIndex = options.findIndex((o) => o.value === value);
  const currentOption = options[currentIndex] || options[0];

  const handleClick = () => {
    if (readOnly) return;
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex].value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={readOnly}
      className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold border min-w-[60px] transition-colors ${currentOption.className} ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {currentOption.label}
    </button>
  );
}
