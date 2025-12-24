import { makeAutoObservable } from 'mobx';
import type { MedicationItem } from './types';

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visit data */
const MOCK_PREVIOUS_MEDICATIONS: MedicationItem[] = [
  { id: 'prev-med-1', name: 'Folic Acid', dose: '5mg', frequency: 'OD', reason: 'Pre-conception', status: 'active' },
  { id: 'prev-med-2', name: 'Metformin', dose: '500mg', frequency: 'BD', reason: 'Diabetes', status: 'active' },
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
  previousVisitData: MedicationItem[] = [];
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
      this.items = []; // No default medications - each patient is unique
    } else {
      this.previousVisitData = [...MOCK_PREVIOUS_MEDICATIONS];
      this.items = [];
    }
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
    this.previousVisitData = [];
  }

  /** Ignore previous visit */
  ignorePreviousVisit(): void {
    this.previousVisitData = [];
  }

  /** Clear all */
  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
