import { observer } from 'mobx-react-lite';
import { Users } from 'lucide-react';
import { useFamilyHistoryStore } from './context';
import { FamilyHistoryTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

/** Props for the view component */
interface FamilyHistoryViewProps {
  isEditMode?: boolean;
}

/**
 * Family History View Component
 */
export const FamilyHistoryView = observer(({ isEditMode = false }: FamilyHistoryViewProps) => {
  const store = useFamilyHistoryStore();
  const activeItems = store.items.filter((i) => i.status === 'active');
  
  return (
    <SectionCard
      title="Family History"
      icon={<Users className="w-3.5 h-3.5" />}
      iconBg="bg-emerald-50"
      iconColor="text-emerald-600"
      badge={<SectionBadge count={store.activeCount} label="active" variant="green" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <FamilyHistoryTable />
      ) : (
        /* View Mode - Summary Badges */
        <div className="p-2">
          {activeItems.length === 0 ? (
            <EmptyState message="No significant family history" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {activeItems.map((item) => (
                <SummaryBadge key={item.id} variant="green">
                  <span>{item.condition}</span>
                  {item.relation && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">{item.relation}</span>
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
