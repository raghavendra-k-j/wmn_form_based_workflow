import { observer } from 'mobx-react-lite';
import { History } from 'lucide-react';
import { usePastHistoryStore } from './context';
import { PastHistoryTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

/** Props for the view component */
interface PastHistoryViewProps {
  isEditMode?: boolean;
}

/**
 * Past History View Component (with section header)
 * Full component with collapsible section card
 */
export const PastHistoryView = observer(({ isEditMode = false }: PastHistoryViewProps) => {
  const store = usePastHistoryStore();
  const activeConditions = store.conditions.filter((c) => c.status === 'active');

  return (
    <SectionCard
      title="Past History"
      icon={<History className="w-3.5 h-3.5" />}
      iconBg="bg-amber-50"
      iconColor="text-amber-600"
      badge={<SectionBadge count={store.activeCount} label="active" variant="amber" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <PastHistoryTable />
      ) : (
        /* View Mode - Summary Badges */
        <div className="p-2">
          {activeConditions.length === 0 ? (
            <EmptyState message="No active conditions" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {activeConditions.map((item) => (
                <SummaryBadge key={item.id} variant="amber">
                  <span>{item.name}</span>
                  {item.since && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">Since {item.since}</span>
                    </>
                  )}
                </SummaryBadge>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
});
