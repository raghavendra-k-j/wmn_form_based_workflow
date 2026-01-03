import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { drugAllergyService } from '../services/drug-allergies';
import type {
  DrugAllergyMaster,
  PatientDrugAllergy,
  DrugAllergyRecord,
  TabType,
  SaveState,
  LoadingState,
} from './types';

export class DrugAllergies2Store {
  masterData: DrugAllergyMaster[] = [];
  masterDataLoading: LoadingState = 'idle';

  hasDrugAllergies: boolean | null = null;
  currentItems: PatientDrugAllergy[] = [];
  isSaved = false;
  saveState: SaveState = 'idle';
  saveError: string | null = null;

  records: DrugAllergyRecord[] = [];
  recordsLoading: LoadingState = 'idle';
  
  showPreviousVisitBanner = false;
  copiedFromPrevious = false;

  activeTab: TabType = 'add';
  viewingRecord: DrugAllergyRecord | null = null;

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
      const data = await drugAllergyService.getMasterData();
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
      const records = await drugAllergyService.getPatientRecords(this.patientId);
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

  get latestRecord(): DrugAllergyRecord | null {
    if (this.records.length === 0) return null;
    return this.records[this.records.length - 1];
  }

  get defaultMasterItems(): DrugAllergyMaster[] {
    return this.masterData.filter(item => item.isDefault);
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  setHasDrugAllergies(value: boolean): void {
    this.hasDrugAllergies = value;
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
      this.hasDrugAllergies = true;
      this.showPreviousVisitBanner = false;
      this.isSaved = false;
    }
  }

  dismissPreviousVisitBanner(): void {
    this.showPreviousVisitBanner = false;
  }

  updateItem<K extends keyof PatientDrugAllergy>(
    id: string,
    field: K,
    value: PatientDrugAllergy[K]
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

    const newItem: PatientDrugAllergy = {
      id: `item-${Date.now()}`,
      masterId: master.id,
      name: master.name,
      options: master.options,
      selectionType: master.selectionType,
      displayOrder: master.displayOrder,
      isDefault: master.isDefault,
      selectedOption: master.selectionType === 'single' ? master.options[0] || '' : [],
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
    if (this.hasDrugAllergies === null) return;

    this.saveState = 'saving';
    this.saveError = null;

    try {
      const itemsToSave = this.hasDrugAllergies 
        ? toJS(this.currentItems).filter(item => {
            if (typeof item.selectedOption === 'string') {
              return item.selectedOption !== 'No';
            }
            return Array.isArray(item.selectedOption) && item.selectedOption.length > 0;
          })
        : [];

      const record: DrugAllergyRecord = {
        id: `record-${Date.now()}`,
        patientId: this.patientId,
        hasDrugAllergies: this.hasDrugAllergies,
        items: itemsToSave,
        capturedDate: new Date().toISOString(),
      };

      await drugAllergyService.saveRecord(this.patientId, record);

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
        alert(`Error saving drug allergies: ${errorMessage}`);
      });
    }
  }

  async clearCurrentRecord(): Promise<void> {
    const record = this.latestRecord;
    if (!record) return;

    try {
      await drugAllergyService.deleteRecord(this.patientId, record.id);
      
      runInAction(() => {
        this.records = this.records.filter(r => r.id !== record.id);
        this.hasDrugAllergies = null;
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

  viewRecord(record: DrugAllergyRecord): void {
    this.viewingRecord = record;
  }

  closeViewRecord(): void {
    this.viewingRecord = null;
  }

  startNewEntry(): void {
    this.hasDrugAllergies = null;
    this.currentItems = [];
    this.isSaved = false;
    this.saveState = 'idle';
    this.saveError = null;
    this.copiedFromPrevious = false;
    this.showPreviousVisitBanner = this.records.length > 0;
  }
}
