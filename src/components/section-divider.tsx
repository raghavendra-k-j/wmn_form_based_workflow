interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`border-t-2 border-zinc-100 w-[calc(100%+2rem)] -mx-4 my-4 ${className}`} role="separator" />
  );
}
