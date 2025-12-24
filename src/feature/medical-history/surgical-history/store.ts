import { makeAutoObservable } from 'mobx';
import type { SurgicalHistoryItem } from './types';
import { PREFERRED_SURGERIES } from './master-data';

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_SURGERIES: SurgicalHistoryItem[] = [
  { id: 'prev-1', procedure: 'Appendectomy', date: '2010', notes: 'Laparoscopic', status: 'yes' },
  { id: 'prev-2', procedure: 'CS (Cesarean Section)', date: '2020', notes: 'Emergency due to fetal distress', status: 'yes' },
];

const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

/**
 * MobX Store for Surgical History
 */
export class SurgicalHistoryStore {
  /** List of surgeries */
  items: SurgicalHistoryItem[] = [];

  /** Search query for filtering */
  searchQuery = '';

  /** Whether section is expanded */
  isExpanded = true;

  /** Previous visit data (for simulation) */
  previousVisitData: SurgicalHistoryItem[] = [];
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  /** Current simulation mode */
  simulationMode: VisitSimulationMode = 'first_visit';

  constructor() {
    makeAutoObservable(this);
  }

  /** Initialize the store based on simulation mode */
  initialize(): void {
    this.applySimulationMode(this.simulationMode);
  }

  /** Set simulation mode and refresh data */
  setSimulationMode(mode: VisitSimulationMode): void {
    this.simulationMode = mode;
    this.applySimulationMode(mode);
  }

  /** Apply simulation mode */
  private applySimulationMode(mode: VisitSimulationMode): void {
    if (mode === 'first_visit') {
      this.previousVisitData = [];
      this.loadPreferredDefaults();
    } else {
      this.previousVisitData = [...MOCK_PREVIOUS_SURGERIES];
      this.items = [];
    }
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of surgeries with status 'yes' */
  get count(): number {
    return this.items.filter(i => i.status === 'yes').length;
  }

  /** Check if has any data */
  get hasData(): boolean {
    return this.items.some(i => i.status === 'yes');
  }

  /** Check if previous visit data is available */
  get hasPreviousVisitData(): boolean {
    return this.previousVisitData.length > 0;
  }

  /** Filtered items based on search query */
  getFilteredItems(): SurgicalHistoryItem[] {
    const query = this.searchQuery.toLowerCase();
    return this.items.filter((item) => 
      item.procedure.toLowerCase().includes(query)
    );
  }

  /* ===========================================================================
   * ACTIONS
   * =========================================================================== */

  /** Add a new item with a specific procedure name */
  addItemWithName(procedure: string): void {
    // Check if already exists
    const exists = this.items.some(i => i.procedure.toLowerCase() === procedure.toLowerCase());
    if (exists) return;

    const newItem: SurgicalHistoryItem = {
      id: `sh-${Date.now()}`,
      procedure,
      date: '',
      notes: '',
      status: 'yes',
    };
    this.items.push(newItem);
  }

  /** Remove an item by id */
  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  /** Update an item field */
  updateItem<K extends keyof SurgicalHistoryItem>(
    id: string,
    field: K,
    value: SurgicalHistoryItem[K]
  ): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item[field] = value;
    }
  }

  /** Update item status */
  updateItemStatus(id: string, status: 'yes' | 'no'): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.status = status;
    }
  }

  /** Set search query */
  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  /** Toggle expanded state */
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  /** Copy data from previous visit + merge with preferred */
  copyFromPreviousVisit(): void {
    const copied = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `sh-copy-${Date.now()}-${index}`,
    }));

    // Add preferred surgeries that are not in copied
    const copiedProcedures = new Set(copied.map(i => i.procedure.toLowerCase()));
    PREFERRED_SURGERIES.forEach((procedure, index) => {
      if (!copiedProcedures.has(procedure.toLowerCase())) {
        copied.push({
          id: `sh-pref-${Date.now()}-${index}`,
          procedure,
          date: '',
          notes: '',
          status: 'no',
        });
      }
    });

    this.items = copied;
    this.previousVisitData = [];
  }

  /** Ignore/Dismiss previous visit suggestion and load defaults */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
    this.loadPreferredDefaults();
  }

  /* ===========================================================================
   * INITIALIZATION
   * =========================================================================== */

  /** Load preferred/default surgeries (all 'no' by default) */
  loadPreferredDefaults(): void {
    this.items = PREFERRED_SURGERIES.map((procedure, index) => ({
      id: `sh-pref-${index}`,
      procedure,
      date: '',
      notes: '',
      status: 'no',
    }));
  }

  /** Set items from external data */
  setItems(items: SurgicalHistoryItem[]): void {
    this.items = items;
  }

  /** Clear all items */
  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
