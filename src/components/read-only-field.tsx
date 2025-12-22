interface ReadOnlyFieldProps {
  value: string;
  className?: string;
}

export function ReadOnlyField({ value, className = '' }: ReadOnlyFieldProps) {
  return (
    <div className={`px-3 py-2 bg-zinc-100 border border-zinc-200 text-[12px] text-zinc-700 font-bold ${className}`}>
      {value || '--'}
    </div>
  );
}
