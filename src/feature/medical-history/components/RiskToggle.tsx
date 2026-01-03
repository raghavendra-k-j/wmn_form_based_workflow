import { observer } from 'mobx-react-lite';

interface RiskToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const RiskToggle = observer(({
  value,
  onChange,
  disabled = false,
  className = '',
}: RiskToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      className={`
        px-3 py-1 text-[12px] font-medium transition-colors
        ${value 
          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {value ? 'Yes' : 'No'}
    </button>
  );
});

RiskToggle.displayName = 'RiskToggle';
