import { makeAutoObservable } from 'mobx';
import type { SurgicalHistoryItem } from './types';

/** Mock previous visit data for simulation */
const MOCK_PREVIOUS_SURGERIES: SurgicalHistoryItem[] = [
  { id: 'prev-1', procedure: 'Appendectomy', date: '2010', notes: 'Laparoscopic' },
  { id: 'prev-2', procedure: 'CS', date: '2020', notes: 'Emergency due to fetal distress' },
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
  previousVisitData: SurgicalHistoryItem[] = MOCK_PREVIOUS_SURGERIES;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of items */
  get count(): number {
    return this.items.length;
  }

  /** Check if has any data */
  get hasData(): boolean {
    return this.items.length > 0;
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

  /** Add a new empty item */
  addItem(): void {
    const newItem: SurgicalHistoryItem = {
      id: `sh-${Date.now()}`,
      procedure: '',
      date: '',
      notes: '',
    };
    this.items.push(newItem);
  }

  /** Add a new item with a specific procedure name */
  addItemWithName(procedure: string): void {
    const newItem: SurgicalHistoryItem = {
      id: `sh-${Date.now()}`,
      procedure,
      date: '',
      notes: '',
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
    this.items = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `sh-${Date.now()}-${index}`,
    }));
  }

  /** Ignore/Dismiss previous visit suggestion */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
  }

  /* ===========================================================================
   * INITIALIZATION
   * =========================================================================== */

  /** Load default items (demo purpose or template) */
  loadDefaultItems(): void {
    // Typically blank for surgery, but could load common ones if needed
    // For now we start empty
    this.items = [];
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
