import { makeAutoObservable } from 'mobx';
import type { PastHistoryCondition } from './types';
import { DEFAULT_CONDITION_NAMES } from './types';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_VISIT: PastHistoryCondition[] = [
  { id: 'prev-1', name: 'Diabetes', since: '2018', status: 'active', notes: 'Type 2, on Metformin 500mg BD' },
  { id: 'prev-2', name: 'Hypertension', since: '2020', status: 'active', notes: 'On Amlodipine 5mg OD' },
  { id: 'prev-3', name: 'Asthma', since: '2015', status: 'active', notes: 'Mild, uses inhaler PRN' },
  { id: 'prev-4', name: 'Thyroid Dysfunction', since: '', status: 'inactive', notes: '' },
  { id: 'prev-5', name: 'Surgery', since: '2019', status: 'active', notes: 'Appendectomy' },
];

const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

/**
 * MobX Store for Past History
 * Can be used standalone or composed in a parent store
 */
export class PastHistoryStore {
  /** List of conditions */
  conditions: PastHistoryCondition[] = [];

  /** Search query for filtering */
  searchQuery = '';

  /** Whether section is expanded */
  isExpanded = true;

  /** Previous visit data (for simulation) */
  previousVisitData: PastHistoryCondition[] = MOCK_PREVIOUS_VISIT;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of active conditions */
  get activeCount(): number {
    return this.conditions.filter((c) => c.status === 'active').length;
  }

  /** Count of active conditions in previous visit */
  get previousVisitActiveCount(): number {
    return this.previousVisitData.filter((c) => c.status === 'active').length;
  }

  /** Check if current visit has any active data */
  get hasData(): boolean {
    return this.conditions.some((c) => c.status === 'active');
  }

  /** Check if previous visit data is available */
  get hasPreviousVisitData(): boolean {
    return this.previousVisitData.length > 0;
  }

  /** Filtered conditions based on search query and edit mode */
  getFilteredConditions(isEditMode: boolean): PastHistoryCondition[] {
    const query = this.searchQuery.toLowerCase();
    return this.conditions.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(query);
      if (isEditMode) return matchesSearch;
      return matchesSearch && c.status === 'active';
    });
  }

  /* ===========================================================================
   * ACTIONS
   * =========================================================================== */

  /** Add a new empty condition */
  addCondition(): void {
    const newCondition: PastHistoryCondition = {
      id: `ph-${Date.now()}`,
      name: '',
      since: '',
      status: 'inactive',
      notes: '',
    };
    this.conditions.push(newCondition);
  }

  /** Add a new condition with a specific name */
  addConditionWithName(name: string): void {
    const newCondition: PastHistoryCondition = {
      id: `ph-${Date.now()}`,
      name,
      since: '',
      status: 'active',
      notes: '',
    };
    this.conditions.push(newCondition);
  }

  /** Remove a condition by id */
  removeCondition(id: string): void {
    this.conditions = this.conditions.filter((c) => c.id !== id);
  }

  /** Update a condition field */
  updateCondition<K extends keyof PastHistoryCondition>(
    id: string,
    field: K,
    value: PastHistoryCondition[K]
  ): void {
    const condition = this.conditions.find((c) => c.id === id);
    if (condition) {
      condition[field] = value;
    }
  }

  /** Toggle condition status */
  toggleStatus(id: string): void {
    const condition = this.conditions.find((c) => c.id === id);
    if (condition) {
      condition.status = condition.status === 'active' ? 'inactive' : 'active';
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

  /** Set expanded state */
  setExpanded(expanded: boolean): void {
    this.isExpanded = expanded;
  }

  /** Copy data from previous visit */
  copyFromPreviousVisit(): void {
    this.conditions = this.previousVisitData.map((c, index) => ({
      ...c,
      id: `ph-${Date.now()}-${index}`,
    }));
    this.ignorePreviousVisit(); // Clear to hide banner
  }

  /** Ignore/Dismiss previous visit suggestion */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
  }

  /* ===========================================================================
   * INITIALIZATION
   * =========================================================================== */

  /** Load default condition names (all inactive initially) */
  loadDefaultConditions(): void {
    this.conditions = DEFAULT_CONDITION_NAMES.map((name, index) => ({
      id: `ph-${index + 1}`,
      name,
      since: '',
      status: 'inactive',
      notes: '',
    }));
  }

  /** Set conditions from external data */
  setConditions(conditions: PastHistoryCondition[]): void {
    this.conditions = conditions;
  }

  /** Clear all conditions */
  clear(): void {
    this.conditions = [];
    this.searchQuery = '';
  }
}

