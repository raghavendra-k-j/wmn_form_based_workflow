import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { surgicalHistoryService } from '../services/surgical-history';
import type {
  SurgicalHistoryMaster,
  PatientSurgicalHistory,
  SurgicalHistoryRecord,
  TabType,
  SaveState,
  LoadingState,
} from './types';

export class SurgicalHistory2Store {
  /* Master Data */
  masterData: SurgicalHistoryMaster[] = [];
  masterDataLoading: LoadingState = 'idle';

  /* Current Form State */
  hasSurgicalHistory: boolean | null = null;
  currentItems: PatientSurgicalHistory[] = [];
  isSaved = false;
  saveState: SaveState = 'idle';
  saveError: string | null = null;

  /* Historical Records */
  records: SurgicalHistoryRecord[] = [];
  recordsLoading: LoadingState = 'idle';
  
  /* Previous Visit Banner */
  showPreviousVisitBanner = false;
  copiedFromPrevious = false;

  /* UI State */
  activeTab: TabType = 'add';
  viewingRecord: SurgicalHistoryRecord | null = null;

  /* Patient Info */
  patientId: string;

  constructor(patientId: string) {
    this.patientId = patientId;
    makeAutoObservable(this);
  }

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
      const data = await surgicalHistoryService.getMasterData();
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
      const records = await surgicalHistoryService.getPatientRecords(this.patientId);
      runInAction(() => {
        this.records = records;
        this.recordsLoading = 'loaded';
        this.showPreviousVisitBanner = records.length > 0;
      });
    } catch (error) {
      runInAction(() => {
        this.recordsLoading = 'error';
        console.error('Failed to load patient records:', error);
      });
    }
  }

  get latestRecord(): SurgicalHistoryRecord | null {
    if (this.records.length === 0) return null;
    return this.records[this.records.length - 1];
  }

  get hasUnsavedChanges(): boolean {
    return this.hasSurgicalHistory !== null && !this.isSaved;
  }

  get defaultMasterItems(): SurgicalHistoryMaster[] {
    return this.masterData.filter(item => item.isDefault);
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  setHasSurgicalHistory(value: boolean): void {
    this.hasSurgicalHistory = value;
    this.isSaved = false;
    this.saveState = 'idle';

    if (value) {
      this.loadDefaultItems();
    } else {
      this.currentItems = [];
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
      year: '',
      notes: '',
      isRisk: false,
      planOfManagement: '',
    }));
  }

  setCopyFromPrevious(value: boolean): void {
    this.copiedFromPrevious = value;

    if (value && this.latestRecord) {
      this.currentItems = this.latestRecord.items.map((item, index) => ({
        ...item,
        id: `copied-${Date.now()}-${index}`,
      }));
      this.hasSurgicalHistory = true;
      this.showPreviousVisitBanner = false;
      this.isSaved = false;
    }
  }

  dismissPreviousVisitBanner(): void {
    this.showPreviousVisitBanner = false;
  }

  updateItem<K extends keyof PatientSurgicalHistory>(
    id: string,
    field: K,
    value: PatientSurgicalHistory[K]
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

    const newItem: PatientSurgicalHistory = {
      id: `item-${Date.now()}`,
      masterId: master.id,
      name: master.name,
      options: master.options,
      selectionType: master.selectionType,
      displayOrder: master.displayOrder,
      isDefault: master.isDefault,
      selectedOption: master.selectionType === 'single' ? master.options[0] || '' : [],
      year: '',
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

  async saveRecord(): Promise<void> {
    if (this.hasSurgicalHistory === null) return;

    this.saveState = 'saving';
    this.saveError = null;

    try {
      const itemsToSave = this.hasSurgicalHistory 
        ? toJS(this.currentItems).filter(item => {
            if (typeof item.selectedOption === 'string') {
              return item.selectedOption !== 'No';
            }
            if (Array.isArray(item.selectedOption)) {
              return item.selectedOption.length > 0;
            }
            return true;
          })
        : [];

      const record: SurgicalHistoryRecord = {
        id: `record-${Date.now()}`,
        patientId: this.patientId,
        hasSurgicalHistory: this.hasSurgicalHistory,
        items: itemsToSave,
        capturedDate: new Date().toISOString(),
      };

      await surgicalHistoryService.saveRecord(this.patientId, record);

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
        alert(`Error saving surgical history: ${errorMessage}`);
      });
    }
  }

  async clearCurrentRecord(): Promise<void> {
    const record = this.latestRecord;
    if (!record) return;

    try {
      await surgicalHistoryService.deleteRecord(this.patientId, record.id);
      
      runInAction(() => {
        this.records = this.records.filter(r => r.id !== record.id);
        this.hasSurgicalHistory = null;
        this.currentItems = [];
        this.isSaved = false;
        this.saveState = 'idle';
        this.saveError = null;
        this.copiedFromPrevious = false;
        this.startNewEntry();
      });
    } catch (error) {
      console.error('Failed to clear record:', error);
    }
  }

  viewRecord(record: SurgicalHistoryRecord): void {
    this.viewingRecord = record;
  }

  closeViewRecord(): void {
    this.viewingRecord = null;
  }

  startNewEntry(): void {
    this.hasSurgicalHistory = null;
    this.currentItems = [];
    this.isSaved = false;
    this.saveState = 'idle';
    this.saveError = null;
    this.copiedFromPrevious = false;
    this.showPreviousVisitBanner = this.records.length > 0;
  }
}
