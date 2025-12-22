import { observer } from 'mobx-react-lite';
import { AlertTriangle } from 'lucide-react';
import { useAllergiesStore } from './context';
import { AllergiesTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

interface AllergiesViewProps {
  isEditMode?: boolean;
}

export const AllergiesView = observer(({ isEditMode = false }: AllergiesViewProps) => {
  const store = useAllergiesStore();

  return (
    <SectionCard
      title="Allergies"
      icon={<AlertTriangle className="w-3.5 h-3.5" />}
      iconBg="bg-rose-50"
      iconColor="text-rose-600"
      badge={<SectionBadge count={store.items.length} label="allergies" variant="red" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <AllergiesTable />
      ) : (
        <div className="p-2">
          {store.items.length === 0 ? (
            <EmptyState message="No allergies" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {store.items.map((item) => (
                <SummaryBadge key={item.id} variant="red">
                  <span className="font-semibold">{item.name}</span>
                </SummaryBadge>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
});
