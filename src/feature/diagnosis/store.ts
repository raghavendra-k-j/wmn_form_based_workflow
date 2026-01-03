import { makeAutoObservable, runInAction } from 'mobx';
import { diagnosisService } from './services/diagnosis-service';
import type {
  ICDCode,
  DiagnosisCategory,
  PatientDiagnosis,
  DiagnosisRecord,
  DiagnosisStatus,
  TabType,
  SaveState,
  LoadingState,
} from './types';

export class DiagnosisStore {
  // Categories
  categories: DiagnosisCategory[] = [];
  categoriesLoading: LoadingState = 'idle';

  // Current diagnoses being added
  currentDiagnoses: PatientDiagnosis[] = [];
  
  // Previous diagnoses from past visits
  previousDiagnoses: PatientDiagnosis[] = [];
  previousDiagnosesLoading: LoadingState = 'idle';
  
  // ICD search
  searchQuery = '';
  searchResults: ICDCode[] = [];
  isSearching = false;
  showSearchResults = false;

  // Save state
  isSaved = false;
  saveState: SaveState = 'idle';
  saveError: string | null = null;

  // UI
  activeTab: TabType = 'add';

  // Context
  patientId: string;
  encounterId: string;

  constructor(patientId: string, encounterId: string) {
    this.patientId = patientId;
    this.encounterId = encounterId;
    makeAutoObservable(this);
  }

  async initialize(): Promise<void> {
    await Promise.all([
      this.loadCategories(),
      this.loadPreviousDiagnoses(),
    ]);
  }

  async loadCategories(): Promise<void> {
    this.categoriesLoading = 'loading';
    try {
      const categories = await diagnosisService.getCategories();
      runInAction(() => {
        this.categories = categories;
        this.categoriesLoading = 'loaded';
      });
    } catch (error) {
      runInAction(() => {
        this.categoriesLoading = 'error';
      });
    }
  }

  async loadPreviousDiagnoses(): Promise<void> {
    this.previousDiagnosesLoading = 'loading';
    try {
      const diagnoses = await diagnosisService.getPreviousDiagnoses(this.patientId);
      runInAction(() => {
        this.previousDiagnoses = diagnoses;
        this.previousDiagnosesLoading = 'loaded';
      });
    } catch (error) {
      runInAction(() => {
        this.previousDiagnosesLoading = 'error';
      });
    }
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  // Search
  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.showSearchResults = true;
    this.debouncedSearch();
  }

  private searchTimeout: ReturnType<typeof setTimeout> | null = null;
  
  debouncedSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  }

  async performSearch(): Promise<void> {
    this.isSearching = true;
    try {
      const results = await diagnosisService.searchICDCodes(this.searchQuery);
      runInAction(() => {
        this.searchResults = results;
        this.isSearching = false;
      });
    } catch (error) {
      runInAction(() => {
        this.searchResults = [];
        this.isSearching = false;
      });
    }
  }

  hideSearchResults(): void {
    this.showSearchResults = false;
  }

  // Add diagnosis from search
  addDiagnosis(icdCode: ICDCode): void {
    // Check if already added
    if (this.currentDiagnoses.find(d => d.icdCode === icdCode.code)) {
      return;
    }

    const newDiagnosis: PatientDiagnosis = {
      id: `diag-${Date.now()}`,
      icdCode: icdCode.code,
      icdName: icdCode.name,
      status: 'active',
      category: '',
      severity: 'NA',
      pattern: 'NA',
      laterality: 'NA',
      treatmentStatus: false,
      notes: '',
      capturedDate: new Date().toISOString(),
    };

    this.currentDiagnoses.push(newDiagnosis);
    this.searchQuery = '';
    this.showSearchResults = false;
    this.isSaved = false;
    this.saveState = 'idle';
  }

  removeDiagnosis(id: string): void {
    this.currentDiagnoses = this.currentDiagnoses.filter(d => d.id !== id);
    this.isSaved = false;
    this.saveState = 'idle';
  }

  updateDiagnosis<K extends keyof PatientDiagnosis>(
    id: string,
    field: K,
    value: PatientDiagnosis[K]
  ): void {
    const diagnosis = this.currentDiagnoses.find(d => d.id === id);
    if (diagnosis) {
      diagnosis[field] = value;
      this.isSaved = false;
      this.saveState = 'idle';
    }
  }

  // Update previous diagnosis status
  async updatePreviousDiagnosisStatus(id: string, status: DiagnosisStatus): Promise<void> {
    try {
      await diagnosisService.updatePreviousDiagnosisStatus(this.patientId, id, status);
      runInAction(() => {
        const diagnosis = this.previousDiagnoses.find(d => d.id === id);
        if (diagnosis) {
          diagnosis.status = status;
        }
      });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }

  // Save
  async saveRecord(): Promise<void> {
    if (this.currentDiagnoses.length === 0) return;

    this.saveState = 'saving';
    this.saveError = null;

    try {
      const record: DiagnosisRecord = {
        id: `record-${Date.now()}`,
        patientId: this.patientId,
        encounterId: this.encounterId,
        diagnoses: this.currentDiagnoses.map(d => ({ ...d })),
        capturedDate: new Date().toISOString(),
      };

      await diagnosisService.saveRecord(this.patientId, record);
      
      // Reload previous diagnoses to reflect changes immediately
      await this.loadPreviousDiagnoses();

      runInAction(() => {
        this.isSaved = true;
        this.saveState = 'saved';

        setTimeout(() => {
          runInAction(() => {
            this.saveState = 'idle';
          });
        }, 2000);
      });
    } catch (error) {
      runInAction(() => {
        this.saveState = 'error';
        this.saveError = error instanceof Error ? error.message : 'Failed to save';
      });
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await diagnosisService.clearAllRecords(this.patientId);
      runInAction(() => {
        this.currentDiagnoses = [];
        this.previousDiagnoses = [];
        this.isSaved = false;
        this.saveState = 'idle';
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }
}
