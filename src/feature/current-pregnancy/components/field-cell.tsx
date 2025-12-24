/** Field Cell Component - Simple display cell for pregnancy data */

interface FieldCellProps {
  label: string;
  value: string;
  muted?: boolean;
}

export function FieldCell({ label, value, muted = false }: FieldCellProps) {
  return (
    <div className="px-4 py-4 text-center">
      <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">
        {label}
      </span>
      <p className={`text-[13px] font-semibold ${muted ? 'text-zinc-400' : 'text-zinc-700'}`}>
        {value}
      </p>
    </div>
  );
}
