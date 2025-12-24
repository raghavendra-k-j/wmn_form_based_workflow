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

/** Simulation Mode Selector - Tiny inline version for header */
const SimulationSelector = observer(() => {
  const store = usePastHistoryStore();

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
      headerExtra={isEditMode ? <SimulationSelector /> : undefined}
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
