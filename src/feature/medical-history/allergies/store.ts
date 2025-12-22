import { makeAutoObservable } from 'mobx';
import type { AllergyItem } from './types';
import { DEFAULT_ALLERGIES } from './types';

const MOCK_PREVIOUS_ALLERGIES: AllergyItem[] = [
  { id: 'prev-alg-1', name: 'Penicillin', status: 'active' },
];
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

export class AllergiesStore {
  items: AllergyItem[] = [];
  searchQuery = '';
  isExpanded = true;
  previousVisitData: AllergyItem[] = MOCK_PREVIOUS_ALLERGIES;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
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

  addItemWithName(name: string): void {
    const newItem: AllergyItem = {
      id: `alg-${Date.now()}`,
      name,
      status: 'active',
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

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  copyFromPreviousVisit(): void {
    this.items = this.previousVisitData.map((item, index) => ({
      ...item,
      id: `alg-${Date.now()}-${index}`,
    }));
    this.ignorePreviousVisit();
  }

  ignorePreviousVisit(): void {
    this.previousVisitData = [];
  }

  /** Load default allergies (all inactive) */
  loadDefaultItems(): void {
    this.items = DEFAULT_ALLERGIES.map((name, index) => ({
      id: `alg-def-${index}`,
      name,
      status: 'inactive',
    }));
  }

  clear(): void {
    this.items = [];
    this.searchQuery = '';
  }
}
