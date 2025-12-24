import { Plus, HeartPulse } from 'lucide-react';
import { Button } from '../../../components';

/* =============================================================================
 * EMPTY STATE PROPS
 * ============================================================================= */

interface EmptyStateProps {
  onAdd: () => void;
}

/* =============================================================================
 * EMPTY STATE COMPONENT
 * ============================================================================= */

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-100">
          <HeartPulse className="w-8 h-8 text-pink-400" />
        </div>
        <h3 className="text-[16px] font-bold text-zinc-700 mb-1">No Current Pregnancy</h3>
        <p className="text-[14px] text-zinc-500 mb-5">Add a pregnancy to track EDD</p>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<Plus />}
          onClick={onAdd}
        >
          Add Pregnancy
        </Button>
      </div>
    </div>
  );
}
