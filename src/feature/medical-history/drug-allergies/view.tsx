import { observer } from 'mobx-react-lite';
import { AlertTriangle } from 'lucide-react';
import { useDrugAllergiesStore } from './context';
import { DrugAllergiesTable } from './table';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
} from '../shared/components';

interface DrugAllergiesViewProps {
  isEditMode?: boolean;
}

/** Simulation Mode Selector - Tiny inline version for header */
const SimulationSelector = observer(() => {
  const store = useDrugAllergiesStore();

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

export const DrugAllergiesView = observer(({ isEditMode = false }: DrugAllergiesViewProps) => {
  const store = useDrugAllergiesStore();

  return (
    <SectionCard
      title="Drug Allergies"
      icon={<AlertTriangle className="w-3.5 h-3.5" />}
      iconBg="bg-rose-50"
      iconColor="text-rose-600"
      badge={<SectionBadge count={store.activeCount} label="allergies" variant="red" />}
      headerExtra={isEditMode ? <SimulationSelector /> : undefined}
      isExpanded={store.isExpanded}
      onToggle={() => store.toggleExpanded()}
    >
      {isEditMode ? (
        <DrugAllergiesTable />
      ) : (
        <div className="p-2">
          {store.activeCount === 0 ? (
            <EmptyState message="No known drug allergies" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {store.items
                .filter(item => item.status === 'active')
                .map((item) => (
                  <SummaryBadge key={item.id} variant="red">
                    <span className="font-semibold">{item.name}</span>
                    {item.note && <span className="text-rose-500 ml-1">({item.note})</span>}
                  </SummaryBadge>
                ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
});
