import { observer } from 'mobx-react-lite';
import { RotateCcw, Clock, X, Eye, Check, Loader2, Plus, FlaskConical } from 'lucide-react';
import { usePastHistory2Store } from './context';
import { STATUS_OPTIONS, DEFAULT_CONDITION_NAMES } from './types';
import { AutocompleteInput } from '../shared/components';
import styles from './styles.module.css';

/* =============================================================================
 * SIMULATION MODE BANNER
 * ============================================================================= */

const SimulationBanner = observer(() => {
  const store = usePastHistory2Store();

  const modeLabel = store.simulationMode === 'first_visit' 
    ? 'First Visit (No Previous Data)' 
    : 'Subsequent Visit (Has Previous Data)';

  return (
    <div className={styles.simulationBanner}>
      <div className={styles.simulationBannerContent}>
        <FlaskConical className="w-4 h-4" />
        <span className={styles.simulationBannerLabel}>SIMULATION MODE</span>
        <span className={styles.simulationBannerDivider}>|</span>
        <span className={styles.simulationBannerMode}>{modeLabel}</span>
      </div>
      <div className={styles.simulationBannerButtons}>
        <button
          type="button"
          onClick={() => store.setSimulationMode('first_visit')}
          className={`${styles.simulationBtn} ${store.simulationMode === 'first_visit' ? styles.simulationBtnActive : ''}`}
        >
          First Visit
        </button>
        <button
          type="button"
          onClick={() => store.setSimulationMode('has_previous_visit')}
          className={`${styles.simulationBtn} ${store.simulationMode === 'has_previous_visit' ? styles.simulationBtnActive : ''}`}
        >
          Subsequent Visit
        </button>
      </div>
    </div>
  );
});

/* =============================================================================
 * TAB BAR
 * ============================================================================= */

const TabBar = observer(() => {
  const store = usePastHistory2Store();

  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tab} ${store.activeTab === 'add' ? styles.tabActive : styles.tabInactive}`}
        onClick={() => store.setActiveTab('add')}
      >
        ADD
      </button>
      <button
        type="button"
        className={`${styles.tab} ${store.activeTab === 'list' ? styles.tabActive : styles.tabInactive}`}
        onClick={() => store.setActiveTab('list')}
      >
        List
      </button>
    </div>
  );
});

/* =============================================================================
 * HEADER CONTROLS - Past History Yes/No & Previous Visit Banner
 * ============================================================================= */

const HeaderControls = observer(() => {
  const store = usePastHistory2Store();

  return (
    <div>
      {/* Past History Yes/No Selection */}
      <div className={styles.headerControls}>
        <div className={styles.pastHistoryQuestion}>
          <span className={styles.questionLabel}>Past History?</span>
          <div className={styles.optionButtons}>
            <button
              type="button"
              className={`${styles.optionBtn} ${styles.optionBtnYes} ${store.hasPastHistory === true ? styles.optionBtnYesActive : ''}`}
              onClick={() => store.setHasPastHistory(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`${styles.optionBtn} ${styles.optionBtnNo} ${store.hasPastHistory === false ? styles.optionBtnNoActive : ''}`}
              onClick={() => store.setHasPastHistory(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Show saved indicator */}
        {store.isSaved && (
          <div className="flex items-center gap-1 ml-4 text-green-600">
            <Check className="w-4 h-4" />
            <span className="text-[11px] font-semibold">Saved</span>
          </div>
        )}
      </div>

      {/* Previous Visit Info Banner - only show when applicable */}
      {store.showPreviousVisitBanner && store.lastPreviousVisit && (
        <div className={styles.previousVisitInfo}>
          <span className={styles.previousVisitLabel}>Past History</span>
          <span className={styles.previousVisitDate}>
            {store.formatDate(store.lastPreviousVisit.date)}
          </span>
          <span className={styles.previousVisitConditions}>
            {store.lastVisitActiveConditions.join(', ') || 'No conditions'}
          </span>
          <label className={styles.copyCheckbox}>
            <input
              type="checkbox"
              checked={store.copiedFromPrevious}
              onChange={(e) => store.setCopyFromPreviousVisit(e.target.checked)}
            />
            Copy from Previous Visit
          </label>
        </div>
      )}
    </div>
  );
});

/* =============================================================================
 * SAVE BUTTON - With loading and success states
 * ============================================================================= */

const SaveButton = observer(() => {
  const store = usePastHistory2Store();

  const isDisabled = store.hasPastHistory === null || store.saveState === 'saving' || store.isSaved;

  const getButtonContent = () => {
    switch (store.saveState) {
      case 'saving':
        return (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Saving...
          </>
        );
      case 'saved':
        return (
          <>
            <Check className="w-3.5 h-3.5" />
            Saved
          </>
        );
      default:
        return 'Save';
    }
  };

  const getButtonClass = () => {
    if (store.saveState === 'saved') {
      return `${styles.saveBtn} ${styles.saveBtnSuccess}`;
    }
    return styles.saveBtn;
  };

  return (
    <button
      type="button"
      className={getButtonClass()}
      onClick={() => store.saveVisit()}
      disabled={isDisabled}
    >
      {getButtonContent()}
    </button>
  );
});

/* =============================================================================
 * NO PAST HISTORY MESSAGE
 * ============================================================================= */

const NoPastHistoryMessage = observer(() => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            <div className={styles.tableIcon}>
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
            <span className={styles.tableTitleText}>Past History</span>
          </div>
          <SaveButton />
        </div>
        <div className={styles.noHistoryMessage}>
          <p className={styles.noHistoryText}>No past medical history</p>
          <p className={styles.noHistorySubtext}>Click Save to confirm this record</p>
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
 * CONDITIONS TABLE
 * ============================================================================= */

const ConditionsTable = observer(() => {
  const store = usePastHistory2Store();

  // Get suggestions that are not already added
  const existingNames = store.conditions.map((c) => c.name.toLowerCase());
  const availableSuggestions = DEFAULT_CONDITION_NAMES.filter(
    (name) => !existingNames.includes(name.toLowerCase())
  );

  const handleAddCondition = (name: string) => {
    store.addConditionWithName(name);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableCard}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            <div className={styles.tableIcon}>
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
            <span className={styles.tableTitleText}>Past History</span>
            {store.activeCount > 0 && (
              <span className={styles.activeCountBadge}>{store.activeCount} active</span>
            )}
          </div>
          <SaveButton />
        </div>

        {/* Table */}
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeadCell} style={{ width: '25%' }}>Disease</th>
              <th className={styles.tableHeadCell} style={{ width: '10%' }}>Status</th>
              <th className={styles.tableHeadCell} style={{ width: '20%' }}>Since</th>
              <th className={styles.tableHeadCell} style={{ width: '45%' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {store.conditions.map((condition) => (
              <tr key={condition.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <span className={styles.diseaseName}>{condition.name}</span>
                </td>
                <td className={styles.tableCell}>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${condition.status === 'yes' ? styles.statusYes : styles.statusNo}`}
                    onClick={() => store.toggleStatus(condition.id)}
                  >
                    {STATUS_OPTIONS.find((o) => o.value === condition.status)?.label || 'No'}
                  </button>
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={condition.since}
                    onChange={(e) => store.updateCondition(condition.id, 'since', e.target.value)}
                    placeholder="e.g. 2020"
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    className={`${styles.inputField} ${styles.notesInput}`}
                    value={condition.notes}
                    onChange={(e) => store.updateCondition(condition.id, 'notes', e.target.value)}
                    placeholder="Notes..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Condition Row */}
        <div className={styles.addRow}>
          <AutocompleteInput
            suggestions={[...availableSuggestions]}
            onSelect={handleAddCondition}
            placeholder="Add disease..."
            buttonLabel="Add"
            variant="amber"
            allowCustom
          />
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
 * ADD TAB CONTENT
 * ============================================================================= */

const AddTabContent = observer(() => {
  const store = usePastHistory2Store();

  return (
    <div>
      <HeaderControls />

      {/* Show appropriate content based on state */}
      {store.hasPastHistory === true && <ConditionsTable />}
      {store.hasPastHistory === false && <NoPastHistoryMessage />}

      {/* Show "Add New Entry" button after save */}
      {store.isSaved && (
        <div className={styles.newEntryContainer}>
          <button
            type="button"
            className={styles.newEntryBtn}
            onClick={() => store.startNewEntry()}
          >
            <Plus className="w-4 h-4" />
            Add Another Entry
          </button>
        </div>
      )}
    </div>
  );
});

/* =============================================================================
 * TIMELINE LIST (List Tab)
 * ============================================================================= */

const TimelineList = observer(() => {
  const store = usePastHistory2Store();

  if (store.visitHistory.length === 0) {
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No past history records</p>
          <p className={styles.emptySubtext}>Records will appear here after you save</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineCard}>
        {/* Header */}
        <div className={styles.timelineHeader}>
          <Clock className={styles.timelineIcon} />
          <span className={styles.timelineTitle}>Past History Timeline</span>
          <span className={styles.timelineCount}>{store.visitHistory.length} records</span>
        </div>

        {/* Timeline Table */}
        <table className={styles.timelineTable}>
          <thead>
            <tr>
              <th className={styles.timelineHeadCell} style={{ width: '20%' }}>Date</th>
              <th className={styles.timelineHeadCell} style={{ width: '65%' }}>Past History Complications</th>
              <th className={styles.timelineHeadCell} style={{ width: '15%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...store.visitHistory].reverse().map((visit) => {
              const activeConditions = visit.conditions.filter((c) => c.status === 'yes');
              return (
                <tr key={visit.id} className={styles.timelineRow}>
                  <td className={`${styles.timelineCell} ${styles.timelineDate}`}>
                    {store.formatDate(visit.date)}
                  </td>
                  <td className={`${styles.timelineCell} ${styles.timelineConditions}`}>
                    {activeConditions.length > 0
                      ? activeConditions.map((c) => c.name).join(', ')
                      : <span className="text-zinc-400 italic">No conditions</span>
                    }
                  </td>
                  <td className={styles.timelineCell}>
                    <button
                      type="button"
                      className={styles.viewLink}
                      onClick={() => store.viewVisit(visit)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

/* =============================================================================
 * VIEW VISIT MODAL
 * ============================================================================= */

const ViewVisitModal = observer(() => {
  const store = usePastHistory2Store();

  if (!store.viewingVisit) return null;

  const visit = store.viewingVisit;
  const activeConditions = visit.conditions.filter((c) => c.status === 'yes');

  return (
    <div className={styles.modalOverlay} onClick={() => store.closeViewVisit()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>
            Past History - {store.formatDate(visit.date)}
          </span>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={() => store.closeViewVisit()}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={styles.modalBody}>
          {visit.conditions.length === 0 ? (
            <div className={styles.modalEmptyState}>
              <p>No past medical history recorded for this visit</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeadCell} style={{ width: '30%' }}>Disease</th>
                  <th className={styles.tableHeadCell} style={{ width: '15%' }}>Status</th>
                  <th className={styles.tableHeadCell} style={{ width: '20%' }}>Since</th>
                  <th className={styles.tableHeadCell} style={{ width: '35%' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {visit.conditions.map((condition) => (
                  <tr key={condition.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={styles.diseaseName}>{condition.name}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.statusBtn} ${condition.status === 'yes' ? styles.statusYes : styles.statusNo}`}
                        style={{ cursor: 'default' }}
                      >
                        {condition.status === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className="text-[12px] text-zinc-500">{condition.since || '-'}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className="text-[12px] text-zinc-400 italic">{condition.notes || '-'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Summary */}
          {activeConditions.length > 0 && (
            <div className={styles.modalSummary}>
              <span className={styles.modalSummaryLabel}>Active Conditions:</span>
              <span className={styles.modalSummaryValue}>{activeConditions.map((c) => c.name).join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
 * LIST TAB CONTENT
 * ============================================================================= */

const ListTabContent = observer(() => {
  return (
    <div>
      <TimelineList />
      <ViewVisitModal />
    </div>
  );
});

/* =============================================================================
 * MAIN VIEW COMPONENT
 * ============================================================================= */

/**
 * Past History 2 View Component
 * Full component with tabs, Yes/No selector, and history timeline
 */
export const PastHistory2View = observer(() => {
  const store = usePastHistory2Store();

  return (
    <div className={styles.container}>
      <SimulationBanner />
      <TabBar />
      {store.activeTab === 'add' ? <AddTabContent /> : <ListTabContent />}
    </div>
  );
});
