import { observer } from 'mobx-react-lite';
import { User } from 'lucide-react';
import { usePersonalHistoryStore } from './context';
import { PersonalHistoryTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

/** Props for the view component */
interface PersonalHistoryViewProps {
  isEditMode?: boolean;
}

/**
 * Personal History View Component
 */
export const PersonalHistoryView = observer(({ isEditMode = false }: PersonalHistoryViewProps) => {
  const store = usePersonalHistoryStore();
  // Filter active or quit, inactive usually means doesn't apply
  const relevantItems = store.items.filter((i) => i.status === 'active' || i.status === 'quit');
  
  return (
    <SectionCard
      title="Personal History"
      icon={<User className="w-3.5 h-3.5" />}
      iconBg="bg-violet-50"
      iconColor="text-violet-600"
      badge={<SectionBadge count={relevantItems.length} label="items" variant="purple" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <PersonalHistoryTable />
      ) : (
        /* View Mode - Summary Badges */
        <div className="p-2">
          {relevantItems.length === 0 ? (
            <EmptyState message="No personal history" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {relevantItems.map((item) => (
                <SummaryBadge key={item.id} variant="purple">
                  <span>{item.habit}</span>
                  <span className={`text-[10px] uppercase font-bold px-1 rounded ${item.status==='active' ? 'bg-violet-200 text-violet-800' : 'bg-amber-100 text-amber-800'}`}>
                    {item.status}
                  </span>
                  {item.notes && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">{item.notes}</span>
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
