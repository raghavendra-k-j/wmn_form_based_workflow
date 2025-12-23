import { makeAutoObservable } from 'mobx';
import type { PregnancyRecord, GTPALScore } from '../shared/types';
import { calculateGTPAL } from '../shared/utils';
import { MOCK_PREVIOUS_VISIT_DATA, MOCK_PREVIOUS_VISIT_DATE } from './types';

/**
 * MobX Store for Previous Pregnancies
 * Manages only past pregnancy records (no current/ongoing pregnancy)
 * Designed to be embedded in ANC, Gynae, PNC encounters
 */
export class PreviousPregnanciesStore {
  /** List of previous pregnancy records */
  records: PregnancyRecord[] = [];

  /** Search query for filtering */
  searchQuery = '';

  /** Whether section is expanded */
  isExpanded = true;

  /** Previous visit data (for copy-from functionality) */
  previousVisitData: PregnancyRecord[] = MOCK_PREVIOUS_VISIT_DATA;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  /** Manual GTPAL override */
  manualGTPAL: GTPALScore | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* ===========================================================================
   * COMPUTED VALUES
   * =========================================================================== */

  /** Auto-calculated GTPAL score */
  get autoGTPAL(): GTPALScore {
    return calculateGTPAL(this.records);
  }

  /** Effective GTPAL score (manual if set, otherwise auto) */
  get effectiveGTPAL(): GTPALScore {
    return this.manualGTPAL ?? this.autoGTPAL;
  }

  /** Check if using manual GTPAL */
  get isManualGTPAL(): boolean {
    return this.manualGTPAL !== null;
  }

  /** Count of pregnancy records */
  get recordCount(): number {
    return this.records.length;
  }

  /** Check if has any data */
  get hasData(): boolean {
    return this.records.length > 0;
  }

  /** Check if previous visit data is available for copying */
  get hasPreviousVisitData(): boolean {
    return this.previousVisitData.length > 0;
  }

  /** Filtered records based on search query */
  get filteredRecords(): PregnancyRecord[] {
    const query = this.searchQuery.toLowerCase();
    if (!query) return this.records;
    return this.records.filter(r => 
      r.year?.includes(query) || 
      r.outcome.toLowerCase().includes(query) ||
      r.remarks.toLowerCase().includes(query)
    );
  }

  /* ===========================================================================
   * ACTIONS
   * =========================================================================== */

  /** Add a new pregnancy record */
  addRecord(record: PregnancyRecord): void {
    // Ensure no 'Ongoing' records - this module is for previous pregnancies only
    if (record.outcome === 'Ongoing') {
      console.warn('PreviousPregnanciesStore: Cannot add ongoing pregnancy');
      return;
    }
    this.records.push(record);
    // Sort by year descending
    this.records.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));
  }

  /** Update a pregnancy record */
  updateRecord(record: PregnancyRecord): void {
    const index = this.records.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.records[index] = record;
    }
  }

  /** Remove a pregnancy record */
  removeRecord(id: string): void {
    this.records = this.records.filter(r => r.id !== id);
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

  /** Set manual GTPAL override */
  setManualGTPAL(score: GTPALScore | null): void {
    this.manualGTPAL = score;
  }

  /** Copy data from previous visit */
  copyFromPreviousVisit(): void {
    this.records = this.previousVisitData
      .filter(r => r.outcome !== 'Ongoing') // Only past records
      .map((r, index) => ({
        ...r,
        id: `preg-${Date.now()}-${index}`,
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

  /** Set records from external data */
  setRecords(records: PregnancyRecord[]): void {
    // Filter out any 'Ongoing' records
    this.records = records.filter(r => r.outcome !== 'Ongoing');
  }

  /** Set previous visit data for copy-from functionality */
  setPreviousVisitData(records: PregnancyRecord[], date: string): void {
    this.previousVisitData = records.filter(r => r.outcome !== 'Ongoing');
    this.previousVisitDate = date;
  }

  /** Clear all records */
  clear(): void {
    this.records = [];
    this.searchQuery = '';
    this.manualGTPAL = null;
  }
}
