import { makeAutoObservable } from 'mobx';
import type { PersonalHistoryItem } from './types';
import { DEFAULT_PERSONAL_HABITS } from './types';

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_PERSONAL_HISTORY: PersonalHistoryItem[] = [
  { id: 'prev-ph-1', habit: 'Smoking', status: 'quit', notes: 'Quit 5 years ago', duration: '10 years' },
  { id: 'prev-ph-2', habit: 'Alcohol', status: 'occasional', notes: 'Social drinker', duration: '' },
];
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

/**
 * MobX Store for Personal History
 */
export class PersonalHistoryStore {
  /** List of items */
  items: PersonalHistoryItem[] = [];

  /** Search query for filtering */
  searchQuery = '';

  /** Whether section is expanded */
  isExpanded = true;

  /** Previous visit data */
  previousVisitData: PersonalHistoryItem[] = [];
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
      this.previousVisitData = [...MOCK_PREVIOUS_PERSONAL_HISTORY];
      this.items = [];
    }
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of active items */
  get activeCount(): number {
    return this.items.filter((i) => i.status !== 'inactive').length;
  }

  /** Check if has any active data */
  get hasData(): boolean {
    return this.items.some((i) => i.status !== 'inactive');
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
    const newItem: PersonalHistoryItem = {
      id: `ph-${Date.now()}`,
      habit: '',
      status: 'inactive',
      notes: '',
      duration: '',
    };
    this.items.push(newItem);
  }

  /** Add a new item with specific habit name */
  addItemWithHabit(habit: string): void {
    const newItem: PersonalHistoryItem = {
      id: `ph-${Date.now()}`,
      habit,
      status: 'active',
      notes: '',
      duration: '',
    };
    this.items.push(newItem);
  }

  /** Remove an item by id */
  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  /** Update an item field */
  updateItem<K extends keyof PersonalHistoryItem>(
    id: string,
    field: K,
    value: PersonalHistoryItem[K]
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

  /** Copy data from previous visit + merge with defaults */
  copyFromPreviousVisit(): void {
    const copied = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `ph-${Date.now()}-${index}`,
    }));

    // Add defaults not in copied
    const copiedHabits = new Set(copied.map(i => i.habit.toLowerCase()));
    DEFAULT_PERSONAL_HABITS.forEach((habit, index) => {
      if (!copiedHabits.has(habit.toLowerCase())) {
        copied.push({
          id: `ph-def-${Date.now()}-${index}`,
          habit,
          status: 'inactive',
          notes: '',
          duration: '',
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

  /** Load default items */
  loadDefaultItems(): void {
    this.items = DEFAULT_PERSONAL_HABITS.map((habit, index) => ({
      id: `ph-def-${index}`,
      habit,
      status: 'inactive',
      notes: '',
      duration: '',
    }));
  }

  /** Set items from external data */
  setItems(items: PersonalHistoryItem[]): void {
    this.items = items;
  }

  /** Clear all items */
  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
