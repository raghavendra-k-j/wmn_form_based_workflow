import { makeAutoObservable } from 'mobx';
import type { MedicationItem } from './types';
import { DEFAULT_MEDICATIONS } from './types';

/** Mock previous visit data */
const MOCK_PREVIOUS_MEDICATIONS: MedicationItem[] = [
  { id: 'prev-med-1', name: 'Folic Acid', dose: '5mg', frequency: 'OD', reason: 'Pre-conception', status: 'active' },
  { id: 'prev-med-2', name: 'Paracetamol', dose: '1g', frequency: 'PRN', reason: 'Headaches', status: 'active' },
];
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

/**
 * MobX Store for Current Medication
 */
export class CurrentMedicationStore {
  /** List of medication items */
  items: MedicationItem[] = [];

  /** Search query */
  searchQuery = '';

  /** Expanded state */
  isExpanded = true;

  /** Previous visit data */
  previousVisitData: MedicationItem[] = MOCK_PREVIOUS_MEDICATIONS;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Count of active medications */
  get activeCount(): number {
    return this.items.filter((i) => i.status === 'active').length;
  }

  /** Check if has data */
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

  /** Add a new empty medication */
  addItem(): void {
    const newItem: MedicationItem = {
      id: `med-${Date.now()}`,
      name: '',
      dose: '',
      frequency: '',
      reason: '',
      status: 'active',
    };
    this.items.push(newItem);
  }

  /** Add medication with name */
  addItemWithName(name: string): void {
    const newItem: MedicationItem = {
      id: `med-${Date.now()}`,
      name,
      dose: '',
      frequency: '',
      reason: '',
      status: 'active',
    };
    this.items.push(newItem);
  }

  /** Remove item */
  removeItem(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  /** Update item field */
  updateItem<K extends keyof MedicationItem>(id: string, field: K, value: MedicationItem[K]): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item[field] = value;
    }
  }

  /** Toggle expansion */
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  /** Copy from previous visit */
  copyFromPreviousVisit(): void {
    this.items = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `med-${Date.now()}-${index}`,
    }));
    this.ignorePreviousVisit();
  }

  /** Ignore previous visit */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
  }

  /** Load default medications (all inactive) */
  loadDefaultItems(): void {
    this.items = DEFAULT_MEDICATIONS.map((name, index) => ({
      id: `med-def-${index}`,
      name,
      dose: '',
      frequency: '',
      reason: '',
      status: 'inactive',
    }));
  }

  /** Clear all */
  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
