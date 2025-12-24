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

/** Simulation Mode Selector - Tiny inline version for header */
const SimulationSelector = observer(() => {
  const store = useSurgicalHistoryStore();

  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] text-zinc-400 uppercase">Sim:</span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); store.setSimulationMode('first_visit'); }}
        className={`px-1.5 py-0.5 text-[9px] font-medium rounded transition-colors cursor-pointer ${
          store.simulationMode === 'first_visit'
            ? 'bg-zinc-700 text-white'
            : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        1st
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); store.setSimulationMode('has_previous_visit'); }}
        className={`px-1.5 py-0.5 text-[9px] font-medium rounded transition-colors cursor-pointer ${
          store.simulationMode === 'has_previous_visit'
            ? 'bg-zinc-700 text-white'
            : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        Prev
      </button>
    </div>
  );
});

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
      headerExtra={isEditMode ? <SimulationSelector /> : undefined}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <SurgicalHistoryTable />
      ) : (
        /* View Mode - Summary Badges (only show items with status 'yes') */
        <div className="p-2">
          {store.count === 0 ? (
            <EmptyState message="No surgeries recorded" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {store.items
                .filter(item => item.status === 'yes')
                .map((item) => (
                  <SummaryBadge key={item.id} variant="blue">
                    <span className="font-semibold">{item.procedure}</span>
                    {item.date && (
                      <>
                        <span className="opacity-40">•</span>
                        <span className="opacity-70">{item.date}</span>
                      </>
                    )}
                    {item.notes && <span className="text-blue-500 ml-1">({item.notes})</span>}
                  </SummaryBadge>
                ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
});
