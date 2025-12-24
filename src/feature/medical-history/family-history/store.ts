import { makeAutoObservable } from 'mobx';
import type { FamilyHistoryItem } from './types';
import { DEFAULT_FAMILY_CONDITIONS } from './types';

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_FAMILY_HISTORY: FamilyHistoryItem[] = [
  { id: 'prev-fh-1', condition: 'Diabetes', relation: 'Mother', status: 'active', notes: 'Type 2' },
  { id: 'prev-fh-2', condition: 'Hypertension', relation: 'Father', status: 'active', notes: '' },
];
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

/**
 * MobX Store for Family History
 */
export class FamilyHistoryStore {
  /** List of items */
  items: FamilyHistoryItem[] = [];

  /** Search query for filtering */
  searchQuery = '';

  /** Whether section is expanded */
  isExpanded = true;

  /** Previous visit data */
  previousVisitData: FamilyHistoryItem[] = [];
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
      this.loadDefaultItems();
    } else {
      this.previousVisitData = [...MOCK_PREVIOUS_FAMILY_HISTORY];
      this.items = [];
    }
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of positive (active) findings */
  get activeCount(): number {
    return this.items.filter((i) => i.status === 'active').length;
  }

  /** Check if has any active data */
  get hasData(): boolean {
    return this.items.some((i) => i.status === 'active');
  }

  /** Check if previous visit data is available */
  get hasPreviousVisitData(): boolean {
    return this.previousVisitData.length > 0;
  }

  /* ===========================================================================
   * ACTIONS
   * =========================================================================== */

  /** Add a new empty item */
  addItem(): void {
    const newItem: FamilyHistoryItem = {
      id: `fh-${Date.now()}`,
      condition: '',
      relation: '',
      status: 'inactive',
      notes: '',
    };
    this.items.push(newItem);
  }

  /** Add a new item with specific condition */
  addItemWithCondition(condition: string): void {
    const newItem: FamilyHistoryItem = {
      id: `fh-${Date.now()}`,
      condition,
      relation: '',
      status: 'active',
      notes: '',
    };
    this.items.push(newItem);
  }

  /** Remove an item by id */
  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  /** Update an item field */
  updateItem<K extends keyof FamilyHistoryItem>(
    id: string,
    field: K,
    value: FamilyHistoryItem[K]
  ): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item[field] = value;
    }
  }

  /** Toggle expanded state */
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  /** Copy data from previous visit */
  copyFromPreviousVisit(): void {
    // Copy previous data
    const copied = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `fh-${Date.now()}-${index}`,
    }));
    
    // Add defaults that are not in copied
    const copiedConditions = new Set(copied.map(i => i.condition.toLowerCase()));
    DEFAULT_FAMILY_CONDITIONS.forEach((condition, index) => {
      if (!copiedConditions.has(condition.toLowerCase())) {
        copied.push({
          id: `fh-def-${Date.now()}-${index}`,
          condition,
          relation: '',
          status: 'inactive',
          notes: '',
        });
      }
    });

    this.items = copied;
    this.previousVisitData = [];
  }

  /** Ignore/Dismiss previous visit suggestion and load defaults */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
    this.loadDefaultItems();
  }

  /* ===========================================================================
   * INITIALIZATION
   * =========================================================================== */

  /** Load default conditions */
  loadDefaultItems(): void {
    this.items = DEFAULT_FAMILY_CONDITIONS.map((condition, index) => ({
      id: `fh-def-${index}`,
      condition,
      relation: '',
      status: 'inactive',
      notes: '',
    }));
  }

  /** Set items from external data */
  setItems(items: FamilyHistoryItem[]): void {
    this.items = items;
  }

  /** Clear all items */
  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
