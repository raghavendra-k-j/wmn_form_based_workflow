import { makeAutoObservable } from 'mobx';
import type { DrugAllergyItem } from './types';
import { PREFERRED_ALLERGIES } from './master-data';

/** Simulation mode for testing */
export type VisitSimulationMode = 'first_visit' | 'has_previous_visit';

/** Mock previous visit data - used when simulating "has_previous_visit" */
const MOCK_PREVIOUS_ALLERGIES: DrugAllergyItem[] = [
  { id: 'prev-1', name: 'Penicillin', status: 'active', note: 'Causes hives' },
  { id: 'prev-2', name: 'Codeine', status: 'active', note: 'Nausea' },
  { id: 'prev-3', name: 'Latex', status: 'active', note: '' },
];
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

export class DrugAllergiesStore {
  items: DrugAllergyItem[] = [];
  searchQuery = '';
  isExpanded = true;
  previousVisitData: DrugAllergyItem[] = [];
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
      // First visit: No previous data, load preferred defaults
      this.previousVisitData = [];
      this.loadPreferredDefaults();
    } else {
      // Has previous visit: Set previous data, clear current items (user will copy/ignore)
      this.previousVisitData = [...MOCK_PREVIOUS_ALLERGIES];
      this.items = [];
    }
  }

  /** Count of active allergies */
  get activeCount(): number {
    return this.items.filter((i) => i.status === 'active').length;
  }

  get hasData(): boolean {
    return this.items.some((i) => i.status === 'active');
  }

  get hasPreviousVisitData(): boolean {
    return this.previousVisitData.length > 0;
  }

  /** Add a new allergy with given name */
  addItemWithName(name: string): void {
    // Check if already exists
    const exists = this.items.some(i => i.name.toLowerCase() === name.toLowerCase());
    if (exists) return;

    const newItem: DrugAllergyItem = {
      id: `alg-${Date.now()}`,
      name,
      status: 'active',
      note: '',
    };
    this.items.push(newItem);
  }

  removeItem(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  updateItem(id: string, name: string): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.name = name;
    }
  }

  /** Update item status */
  updateItemStatus(id: string, status: 'active' | 'inactive'): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.status = status;
    }
  }

  /** Update item note */
  updateItemNote(id: string, note: string): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.note = note;
    }
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  /** Copy all data from previous visit + merge with preferred defaults */
  copyFromPreviousVisit(): void {
    // Start with previous visit data
    const copiedItems: DrugAllergyItem[] = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `alg-copy-${Date.now()}-${index}`,
    }));

    // Add preferred defaults that are not in previous data
    const copiedNames = new Set(copiedItems.map(i => i.name.toLowerCase()));
    PREFERRED_ALLERGIES.forEach((name, index) => {
      if (!copiedNames.has(name.toLowerCase())) {
        copiedItems.push({
          id: `alg-pref-${Date.now()}-${index}`,
          name,
          status: 'inactive',
          note: '',
        });
      }
    });

    this.items = copiedItems;
    this.clearPreviousVisitData();
  }

  /** Ignore previous visit and load preferred defaults */
  ignorePreviousVisit(): void {
    this.clearPreviousVisitData();
    this.loadPreferredDefaults();
  }

  /** Clear previous visit data */
  private clearPreviousVisitData(): void {
    this.previousVisitData = [];
  }

  /** Load preferred/default allergies (all inactive) */
  loadPreferredDefaults(): void {
    this.items = PREFERRED_ALLERGIES.map((name, index) => ({
      id: `alg-pref-${index}`,
      name,
      status: 'inactive',
      note: '',
    }));
  }

  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
