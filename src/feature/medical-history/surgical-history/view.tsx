import { observer } from 'mobx-react-lite';
import { Activity } from 'lucide-react';
import { useSurgicalHistoryStore } from './context';
import { SurgicalHistoryTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

/** Props for the view component */
interface SurgicalHistoryViewProps {
  isEditMode?: boolean;
}

/**
 * Surgical History View Component
 */
export const SurgicalHistoryView = observer(({ isEditMode = false }: SurgicalHistoryViewProps) => {
  const store = useSurgicalHistoryStore();
  
  return (
    <SectionCard
      title="Surgical History"
      icon={<Activity className="w-3.5 h-3.5" />}
      iconBg="bg-blue-50"
      iconColor="text-blue-600"
      badge={<SectionBadge count={store.count} label="surgeries" variant="blue" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <SurgicalHistoryTable />
      ) : (
        /* View Mode - Summary Badges */
        <div className="p-2">
          {store.items.length === 0 ? (
            <EmptyState message="No surgeries recorded" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {store.items.map((item) => (
                <SummaryBadge key={item.id} variant="blue">
                  <span>{item.procedure}</span>
                  {item.date && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">{item.date}</span>
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
