import { observer } from 'mobx-react-lite';
import { Pill } from 'lucide-react';
import { useCurrentMedicationStore } from './context';
import { CurrentMedicationTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

/** Props for the view component */
interface CurrentMedicationViewProps {
  isEditMode?: boolean;
}

/**
 * Current Medication View Component
 */
export const CurrentMedicationView = observer(({ isEditMode = false }: CurrentMedicationViewProps) => {
  const store = useCurrentMedicationStore();
  
  return (
    <SectionCard
      title="Current Medication"
      icon={<Pill className="w-3.5 h-3.5" />}
      iconBg="bg-teal-50"
      iconColor="text-teal-600"
      badge={<SectionBadge count={store.items.length} label="meds" variant="teal" />}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <CurrentMedicationTable />
      ) : (
        /* View Mode */
        <div className="p-2">
          {store.items.length === 0 ? (
            <EmptyState message="No current medications" />
          ) : (
             <div className="flex flex-wrap gap-1.5">
              {store.items.map((item) => (
                <SummaryBadge key={item.id} variant="teal">
                  <span className="font-semibold">{item.name}</span>
                  {item.dose && <span className="opacity-70">{item.dose}</span>}
                  {item.frequency && <span className="opacity-70 text-[10px] uppercase bg-teal-100 px-1 rounded text-teal-800">{item.frequency.split(' ')[0]}</span>}
                </SummaryBadge>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
});
