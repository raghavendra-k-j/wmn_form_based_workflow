import { observer } from 'mobx-react-lite';

interface CheckboxGroupProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    inline?: boolean;
}

export const CheckboxGroup = observer(
    ({ options, value, onChange, inline = false }: CheckboxGroupProps) => {
        const handleChange = (option: string, checked: boolean) => {
            if (checked) {
                onChange([...value, option]);
            } else {
                onChange(value.filter((v) => v !== option));
            }
        };

        return (
            <div className={`flex ${inline ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'}`}>
                {options.map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer text-sm text-zinc-700 hover:text-zinc-900"
                    >
                        <input
                            type="checkbox"
                            checked={value.includes(option)}
                            onChange={(e) => handleChange(option, e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        );
    }
);
