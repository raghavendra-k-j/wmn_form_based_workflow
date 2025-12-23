import { Baby } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

export function EmptyState({ message = 'No pregnancy records', subMessage }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 mx-auto mb-3 bg-zinc-100 rounded-none flex items-center justify-center">
        <Baby className="w-6 h-6 text-zinc-300" />
      </div>
      <p className="text-[12px] font-medium text-zinc-500 mb-1">{message}</p>
      {subMessage && <p className="text-[11px] text-zinc-400">{subMessage}</p>}
    </div>
  );
}
