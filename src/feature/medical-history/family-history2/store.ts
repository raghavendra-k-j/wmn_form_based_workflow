import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { familyHistoryService } from '../services/family-history';
import type {
  FamilyHistoryMaster,
  PatientFamilyHistory,
  FamilyHistoryRecord,
  TabType,
  SaveState,
  LoadingState,
} from './types';

export class FamilyHistory2Store {
  /* Master Data */
  masterData: FamilyHistoryMaster[] = [];
  masterDataLoading: LoadingState = 'idle';

  /* Current Form State */
  hasFamilyHistory: boolean | null = null;
  currentItems: PatientFamilyHistory[] = [];
  isSaved = false;
  saveState: SaveState = 'idle';
  saveError: string | null = null;

  /* Historical Records */
  records: FamilyHistoryRecord[] = [];
  recordsLoading: LoadingState = 'idle';
  
  /* Previous Visit Banner */
  showPreviousVisitBanner = false;
  copiedFromPrevious = false;

  /* UI State */
  activeTab: TabType = 'add';
  viewingRecord: FamilyHistoryRecord | null = null;

  /* Patient Info */
  patientId: string;

  constructor(patientId: string) {
    this.patientId = patientId;
    makeAutoObservable(this);
  }

  /* ========================================================================
   * INITIALIZATION
   * ======================================================================== */

  async initialize(): Promise<void> {
    await Promise.all([
      this.loadMasterData(),
      this.loadPatientRecords(),
    ]);
  }

  async loadMasterData(): Promise<void> {
    if (this.masterDataLoading === 'loading') return;
    
    this.masterDataLoading = 'loading';
    try {
      const data = await familyHistoryService.getMasterData();
      runInAction(() => {
        this.masterData = data;
        this.masterDataLoading = 'loaded';
      });
    } catch (error) {
      runInAction(() => {
        this.masterDataLoading = 'error';
        console.error('Failed to load master data:', error);
      });
    }
  }

  async loadPatientRecords(): Promise<void> {
    this.recordsLoading = 'loading';
    try {
      const records = await familyHistoryService.getPatientRecords(this.patientId);
      runInAction(() => {
        this.records = records;
        this.recordsLoading = 'loaded';
        
        // Show banner if there are any previous records
        this.showPreviousVisitBanner = records.length > 0;
      });
    } catch (error) {
      runInAction(() => {
        this.recordsLoading = 'error';
        console.error('Failed to load patient records:', error);
      });
    }
  }

  /* ========================================================================
   * COMPUTED
   * ======================================================================== */

  get latestRecord(): FamilyHistoryRecord | null {
    if (this.records.length === 0) return null;
    return this.records[this.records.length - 1];
  }

  get hasUnsavedChanges(): boolean {
    return this.hasFamilyHistory !== null && !this.isSaved;
  }

  get defaultMasterItems(): FamilyHistoryMaster[] {
    return this.masterData.filter(item => item.isDefault);
  }

  /* ========================================================================
   * TAB ACTIONS
   * ======================================================================== */

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  /* ========================================================================
   * FAMILY HISTORY SELECTION
   * ======================================================================== */

  setHasFamilyHistory(value: boolean): void {
    this.hasFamilyHistory = value;
    this.isSaved = false;
    this.saveState = 'idle';

    if (value) {
      this.loadDefaultItems();
    } else {
      this.currentItems = [];
      // Auto-save when "No" is selected
      this.saveRecord();
    }
  }

  loadDefaultItems(): void {
    this.currentItems = this.defaultMasterItems.map((master, index) => ({
      id: `item-${Date.now()}-${index}`,
      masterId: master.id,
      name: master.name,
      options: master.options,
      selectionType: master.selectionType,
      displayOrder: master.displayOrder,
      isDefault: master.isDefault,
      selectedOption: master.selectionType === 'single' ? master.options[0] || '' : [],
      since: '',
      notes: '',
      isRisk: false,
      planOfManagement: '',
    }));
  }

  /* ========================================================================
   * COPY FROM PREVIOUS
   * ======================================================================== */

  setCopyFromPrevious(value: boolean): void {
    this.copiedFromPrevious = value;

    if (value && this.latestRecord) {
      this.currentItems = this.latestRecord.items.map((item, index) => ({
        ...item,
        id: `copied-${Date.now()}-${index}`,
      }));
      this.hasFamilyHistory = true;
      this.showPreviousVisitBanner = false;
      this.isSaved = false;
    }
  }

  dismissPreviousVisitBanner(): void {
    this.showPreviousVisitBanner = false;
  }

  /* ========================================================================
   * ITEM ACTIONS
   * ======================================================================== */

  updateItem<K extends keyof PatientFamilyHistory>(
    id: string,
    field: K,
    value: PatientFamilyHistory[K]
  ): void {
    const item = this.currentItems.find(i => i.id === id);
    if (item) {
      item[field] = value;
      this.isSaved = false;
      this.saveState = 'idle';
    }
  }

  addItem(masterId: string): void {
    const master = this.masterData.find(m => m.id === masterId);
    if (!master) return;

    const newItem: PatientFamilyHistory = {
      id: `item-${Date.now()}`,
      masterId: master.id,
      name: master.name,
      options: master.options,
      selectionType: master.selectionType,
      displayOrder: master.displayOrder,
      isDefault: master.isDefault,
      selectedOption: master.selectionType === 'single' ? master.options[0] || '' : [],
      since: '',
      notes: '',
      isRisk: false,
      planOfManagement: '',
    };

    this.currentItems.push(newItem);
    this.isSaved = false;
  }

  removeItem(id: string): void {
    this.currentItems = this.currentItems.filter(i => i.id !== id);
    this.isSaved = false;
  }

  /* ========================================================================
   * SAVE
   * ======================================================================== */

  async saveRecord(): Promise<void> {
    if (this.hasFamilyHistory === null) return;

    this.saveState = 'saving';
    this.saveError = null;

    try {
      // Filter out items where the selected option is "No" or empty
      const itemsToSave = this.hasFamilyHistory 
        ? toJS(this.currentItems).filter(item => {
            // For single select: exclude if selected option is "No"
            if (typeof item.selectedOption === 'string') {
              return item.selectedOption !== 'No';
            }
            // For multi-select: exclude if empty array or only contains "No"
            if (Array.isArray(item.selectedOption)) {
              const filtered = item.selectedOption.filter(opt => opt !== 'No');
              return filtered.length > 0;
            }
            return true;
          })
        : [];

      const record: FamilyHistoryRecord = {
        id: `record-${Date.now()}`,
        patientId: this.patientId,
        hasFamilyHistory: this.hasFamilyHistory,
        items: itemsToSave,
        capturedDate: new Date().toISOString(),
      };

      console.log('Saving family history record:', record);
      
      await familyHistoryService.saveRecord(this.patientId, record);

      runInAction(() => {
        this.records.push(record);
        this.isSaved = true;
        this.saveState = 'saved';
        this.showPreviousVisitBanner = false;

        setTimeout(() => {
          runInAction(() => {
            this.saveState = 'idle';
          });
        }, 2000);
      });
    } catch (error) {
      console.error('Save error:', error);
      runInAction(() => {
        this.saveState = 'error';
        const errorMessage = error instanceof Error ? error.message : 'Failed to save';
        this.saveError = errorMessage;
        console.error('Failed to save family history:', errorMessage, error);
        alert(`Error saving family history: ${errorMessage}`);
      });
    }
  }

  async clearCurrentRecord(): Promise<void> {
    const record = this.latestRecord;
    if (!record) return;

    try {
      await familyHistoryService.deleteRecord(this.patientId, record.id);
      
      runInAction(() => {
        // Remove from local records
        this.records = this.records.filter(r => r.id !== record.id);
        
        // Reset state
        this.hasFamilyHistory = null;
        this.currentItems = [];
        this.isSaved = false;
        this.saveState = 'idle';
        this.saveError = null;
        this.copiedFromPrevious = false;
        
        // Re-evaluate banner
        this.startNewEntry();
      });
    } catch (error) {
      console.error('Failed to clear record:', error);
    }
  }

  /* ========================================================================
   * VIEW RECORD
   * ======================================================================== */

  viewRecord(record: FamilyHistoryRecord): void {
    this.viewingRecord = record;
  }

  closeViewRecord(): void {
    this.viewingRecord = null;
  }

  /* ========================================================================
   * RESET
   * ======================================================================== */

  startNewEntry(): void {
    this.hasFamilyHistory = null;
    this.currentItems = [];
    this.isSaved = false;
    this.saveState = 'idle';
    this.saveError = null;
    this.copiedFromPrevious = false;
    
    // Show banner if there are any previous records
    this.showPreviousVisitBanner = this.records.length > 0;
  }
}
