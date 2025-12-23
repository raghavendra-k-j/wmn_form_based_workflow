import { Plus, Trash2 } from 'lucide-react';

/* =============================================================================
 * ADD BUTTON - Carbon Style Primary Action
 * ============================================================================= */

interface AddButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'amber' | 'blue' | 'purple' | 'teal';
}

const addButtonVariants = {
  amber: 'bg-amber-600 hover:bg-amber-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white',
};

export function AddButton({ onClick, label, variant = 'blue' }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold transition-colors ${addButtonVariants[variant]}`}
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* =============================================================================
 * DELETE BUTTON - Trash Icon Button
 * ============================================================================= */

interface DeleteButtonProps {
  onClick: () => void;
  /** When true, the button is hidden */
  hidden?: boolean;
}

export function DeleteButton({ onClick, hidden = false }: DeleteButtonProps) {
  if (hidden) return null;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
