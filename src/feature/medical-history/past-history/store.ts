import { makeAutoObservable, runInAction } from 'mobx';
import type { PastHistoryCondition, PastHistoryVisit, TabType } from './types';
import { DEFAULT_CONDITION_NAMES } from './types';

/* =============================================================================
 * CONSTANTS
 * ============================================================================= */

/** localStorage keys */
const STORAGE_KEYS = {
  VISIT_HISTORY: 'past_history_2_visits',
};

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visits for simulation */
const MOCK_PREVIOUS_VISITS: PastHistoryVisit[] = [
  {
    id: 'visit-1',
    date: '2024-10-25',
    conditions: [
      { id: 'v1-1', name: 'Diabetes', since: '2018', status: 'yes', notes: 'Type 2' },
      { id: 'v1-2', name: 'Hypertension', since: '2020', status: 'yes', notes: 'On medication' },
    ],
  },
  {
    id: 'visit-2',
    date: '2024-11-15',
    conditions: [
      { id: 'v2-1', name: 'Diabetes', since: '2018', status: 'yes', notes: 'Type 2, controlled' },
      { id: 'v2-2', name: 'Hypertension', since: '2020', status: 'yes', notes: 'BP stable' },
      { id: 'v2-3', name: 'Migraine', since: '2023', status: 'yes', notes: 'Occasional episodes' },
    ],
  },
];

/* =============================================================================
 * STORE
 * ============================================================================= */

/**
 * MobX Store for Past History 2
 * Handles state management for first visit and subsequent visits with proper workflow
 */
export class PastHistory2Store {
  /* ---------------------------------------------------------------------------
   * CURRENT VISIT STATE
   * --------------------------------------------------------------------------- */

  /** User's answer to "Past History?" - null means unanswered */
  hasPastHistory: boolean | null = null;

  /** Current conditions being edited */
  conditions: PastHistoryCondition[] = [];

  /** Whether current visit data has been saved */
  isSaved = false;

  /** Current visit date */
  currentVisitDate: string = new Date().toISOString().split('T')[0];

  /* ---------------------------------------------------------------------------
   * PREVIOUS VISIT STATE
   * --------------------------------------------------------------------------- */

  /** All historical visits */
  visitHistory: PastHistoryVisit[] = [];

  /** Whether to show the "previous visit" banner */
  showPreviousVisitBanner = false;

  /** Whether user copied from previous visit */
  copiedFromPrevious = false;

  /* ---------------------------------------------------------------------------
   * UI STATE
   * --------------------------------------------------------------------------- */

  /** Active tab: 'add' | 'list' */
  activeTab: TabType = 'add';

  /** Modal state for viewing historical visit */
  viewingVisit: PastHistoryVisit | null = null;

  /** Whether section is expanded */
  isExpanded = true;

  /** Simulation mode for testing */
  simulationMode: VisitSimulationMode = 'first_visit';

  /** Save feedback state */
  saveState: 'idle' | 'saving' | 'saved' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * INITIALIZATION
   * =========================================================================== */

  /** Initialize the store - load from localStorage and apply simulation */
  initialize(): void {
    this.loadFromStorage();
    this.applySimulationMode(this.simulationMode);
  }

  /** Set simulation mode and refresh data */
  setSimulationMode(mode: VisitSimulationMode): void {
    this.simulationMode = mode;
    this.applySimulationMode(mode);
  }

  /** Apply simulation mode - resets current session state */
  private applySimulationMode(mode: VisitSimulationMode): void {
    // Reset current session state
    this.hasPastHistory = null;
    this.conditions = [];
    this.isSaved = false;
    this.copiedFromPrevious = false;
    this.saveState = 'idle';
    this.currentVisitDate = new Date().toISOString().split('T')[0];

    if (mode === 'first_visit') {
      // First visit: No previous data
      this.visitHistory = [];
      this.showPreviousVisitBanner = false;
    } else {
      // Subsequent visit: Has previous data
      this.visitHistory = [...MOCK_PREVIOUS_VISITS];
      this.showPreviousVisitBanner = true;
    }
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Get the most recent previous visit */
  get lastPreviousVisit(): PastHistoryVisit | null {
    if (this.visitHistory.length === 0) return null;
    return this.visitHistory[this.visitHistory.length - 1];
  }

  /** Get active conditions from last visit for display */
  get lastVisitActiveConditions(): string[] {
    if (!this.lastPreviousVisit) return [];
    return this.lastPreviousVisit.conditions
      .filter((c) => c.status === 'yes')
      .map((c) => c.name);
  }

  /** Check if we have previous visit data */
  get hasPreviousVisitData(): boolean {
    return this.visitHistory.length > 0;
  }

  /** Count of active conditions (status = yes) */
  get activeCount(): number {
    return this.conditions.filter((c) => c.status === 'yes').length;
  }

  /** Check if there are unsaved changes */
  get hasUnsavedChanges(): boolean {
    if (this.isSaved) return false;
    if (this.hasPastHistory === null) return false;
    return true;
  }

  /** Format date for display */
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
  }

  /* ===========================================================================
   * TAB ACTIONS
   * =========================================================================== */

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
    this.viewingVisit = null;
  }

  /* ===========================================================================
   * PAST HISTORY SELECTION
   * =========================================================================== */

  setHasPastHistory(value: boolean): void {
    this.hasPastHistory = value;
    this.isSaved = false;
    this.saveState = 'idle';

    if (value) {
      // User said "Yes" - load default conditions
      this.loadDefaultConditions();
    } else {
      // User said "No" - clear conditions
      this.conditions = [];
    }
  }

  /* ===========================================================================
   * COPY FROM PREVIOUS VISIT
   * =========================================================================== */

  /** Handle copy from previous visit toggle */
  setCopyFromPreviousVisit(value: boolean): void {
    this.copiedFromPrevious = value;

    if (value && this.lastPreviousVisit) {
      // Copy conditions from previous visit
      this.conditions = this.lastPreviousVisit.conditions.map((c, index) => ({
        ...c,
        id: `ph2-copy-${Date.now()}-${index}`,
      }));

      // Auto-set to "Yes" since we're copying conditions
      this.hasPastHistory = true;

      // Hide the previous visit banner (data has been copied)
      this.showPreviousVisitBanner = false;

      // Mark as not saved (user copied but hasn't saved yet)
      this.isSaved = false;
      this.saveState = 'idle';
    }
  }

  /* ===========================================================================
   * CONDITION ACTIONS
   * =========================================================================== */

  /** Update a condition field */
  updateCondition<K extends keyof PastHistoryCondition>(
    id: string,
    field: K,
    value: PastHistoryCondition[K]
  ): void {
    const condition = this.conditions.find((c) => c.id === id);
    if (condition) {
      condition[field] = value;
      this.isSaved = false;
      this.saveState = 'idle';
    }
  }

  /** Toggle condition status */
  toggleStatus(id: string): void {
    const condition = this.conditions.find((c) => c.id === id);
    if (condition) {
      condition.status = condition.status === 'yes' ? 'no' : 'yes';
      this.isSaved = false;
      this.saveState = 'idle';
    }
  }

  /** Add a new condition with a specific name */
  addConditionWithName(name: string): void {
    const newCondition: PastHistoryCondition = {
      id: `ph2-${Date.now()}`,
      name,
      since: '',
      status: 'yes',
      notes: '',
    };
    this.conditions.push(newCondition);
    this.isSaved = false;
    this.saveState = 'idle';
  }

  /** Remove a condition by id */
  removeCondition(id: string): void {
    this.conditions = this.conditions.filter((c) => c.id !== id);
    this.isSaved = false;
    this.saveState = 'idle';
  }

  /* ===========================================================================
   * VIEW ACTIONS (List Tab)
   * =========================================================================== */

  viewVisit(visit: PastHistoryVisit): void {
    this.viewingVisit = visit;
  }

  closeViewVisit(): void {
    this.viewingVisit = null;
  }

  /* ===========================================================================
   * SECTION ACTIONS
   * =========================================================================== */

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  setExpanded(expanded: boolean): void {
    this.isExpanded = expanded;
  }

  /* ===========================================================================
   * SAVE & PERSISTENCE
   * =========================================================================== */

  /** Save current visit to history */
  saveVisit(): void {
    if (this.hasPastHistory === null) return;

    this.saveState = 'saving';

    // Simulate a short delay for UX
    setTimeout(() => {
      runInAction(() => {
        // Create new visit record
        const newVisit: PastHistoryVisit = {
          id: `visit-${Date.now()}`,
          date: this.currentVisitDate,
          conditions: this.hasPastHistory
            ? this.conditions.map((c) => ({ ...c }))
            : [], // Empty if "No" was selected
        };

        // Add to history
        this.visitHistory.push(newVisit);

        // Persist to localStorage
        this.saveToStorage();

        // Update state
        this.isSaved = true;
        this.saveState = 'saved';
        this.showPreviousVisitBanner = false; // Hide banner after save

        // Reset save state after 2 seconds
        setTimeout(() => {
          runInAction(() => {
            this.saveState = 'idle';
          });
        }, 2000);
      });
    }, 300);
  }

  /** Load default condition names (all 'no' initially) */
  loadDefaultConditions(): void {
    this.conditions = DEFAULT_CONDITION_NAMES.map((name, index) => ({
      id: `ph2-default-${index + 1}`,
      name,
      since: '',
      status: 'no',
      notes: '',
    }));
  }

  /* ===========================================================================
   * LOCALSTORAGE PERSISTENCE
   * =========================================================================== */

  /** Save visit history to localStorage */
  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VISIT_HISTORY, JSON.stringify(this.visitHistory));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  /** Load visit history from localStorage */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VISIT_HISTORY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.visitHistory = parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }

  /** Clear all stored data (for testing) */
  clearStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.VISIT_HISTORY);
    this.visitHistory = [];
  }

  /* ===========================================================================
   * RESET
   * =========================================================================== */

  /** Start a new entry (after save or for fresh start) */
  startNewEntry(): void {
    this.hasPastHistory = null;
    this.conditions = [];
    this.isSaved = false;
    this.copiedFromPrevious = false;
    this.saveState = 'idle';
    this.currentVisitDate = new Date().toISOString().split('T')[0];

    // Show banner again if we have previous visits
    if (this.visitHistory.length > 0) {
      this.showPreviousVisitBanner = true;
    }
  }

  /** Clear all state */
  clear(): void {
    this.hasPastHistory = null;
    this.conditions = [];
    this.isSaved = false;
    this.copiedFromPrevious = false;
    this.saveState = 'idle';
    this.showPreviousVisitBanner = false;
  }
}
