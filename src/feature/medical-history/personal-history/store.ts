import { makeAutoObservable } from 'mobx';
import type { PersonalHistoryItem } from './types';
import { DEFAULT_PERSONAL_HABITS } from './types';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_PERSONAL_HISTORY: PersonalHistoryItem[] = [
  { id: 'prev-ph-1', habit: 'Smoking', status: 'quit', notes: 'Quit 5 years ago', duration: '10 years' },
  { id: 'prev-ph-2', habit: 'Alcohol', status: 'active', notes: 'Social drinker', duration: '' },
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
  previousVisitData: PersonalHistoryItem[] = MOCK_PREVIOUS_PERSONAL_HISTORY;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of active items */
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
      status: 'active', // Default to active
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

  /** Copy data from previous visit */
  copyFromPreviousVisit(): void {
    this.items = this.previousVisitData.map((item, index) => ({
      ...item,
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
