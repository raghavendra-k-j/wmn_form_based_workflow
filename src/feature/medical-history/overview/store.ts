import { makeAutoObservable } from 'mobx';

/** Mock previous visit data for all sections */
const MOCK_PREVIOUS_DATA = {
  pastHistory: ['Diabetes', 'Hypertension'],
  surgicalHistory: ['Appendectomy (2018)', 'C-Section (2020)'],
  familyHistory: ['Diabetes (Mother)', 'Heart Disease (Father)'],
  personalHistory: ['Non-smoker', 'Occasional alcohol'],
  medications: ['Metformin 500mg', 'Amlodipine 5mg'],
  allergies: ['Penicillin'],
};
const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';

export interface OverviewData {
  pastHistory: string[];
  surgicalHistory: string[];
  familyHistory: string[];
  personalHistory: string[];
  medications: string[];
  allergies: string[];
}

/**
 * Medical History Overview Store
 */
export class MedicalHistoryOverviewStore {
  /** Current data (empty by default to show empty state) */
  data: OverviewData = {
    pastHistory: [],
    surgicalHistory: [],
    familyHistory: [],
    personalHistory: [],
    medications: [],
    allergies: [],
  };

  /** Previous visit data */
  previousVisitData: OverviewData = MOCK_PREVIOUS_DATA;
  previousVisitDate: string = MOCK_PREVIOUS_VISIT_DATE;

  constructor() {
    makeAutoObservable(this);
  }

  get hasData(): boolean {
    return (
      this.data.pastHistory.length > 0 ||
      this.data.surgicalHistory.length > 0 ||
      this.data.familyHistory.length > 0 ||
      this.data.personalHistory.length > 0 ||
      this.data.medications.length > 0 ||
      this.data.allergies.length > 0
    );
  }

  get hasPreviousVisitData(): boolean {
    return (
      this.previousVisitData.pastHistory.length > 0 ||
      this.previousVisitData.surgicalHistory.length > 0 ||
      this.previousVisitData.familyHistory.length > 0 ||
      this.previousVisitData.personalHistory.length > 0 ||
      this.previousVisitData.medications.length > 0 ||
      this.previousVisitData.allergies.length > 0
    );
  }

  /** Copy ALL medical history from previous visit */
  copyFromPreviousVisit(): void {
    this.data = {
      pastHistory: [...this.previousVisitData.pastHistory],
      surgicalHistory: [...this.previousVisitData.surgicalHistory],
      familyHistory: [...this.previousVisitData.familyHistory],
      personalHistory: [...this.previousVisitData.personalHistory],
      medications: [...this.previousVisitData.medications],
      allergies: [...this.previousVisitData.allergies],
    };
    this.ignorePreviousVisit(); // Clear previous data to hide banner
  }

  /** Ignore previous visit data */
  ignorePreviousVisit(): void {
    this.previousVisitData = {
      pastHistory: [],
      surgicalHistory: [],
      familyHistory: [],
      personalHistory: [],
      medications: [],
      allergies: [],
    };
  }

  /** Clear all */
  clear(): void {
    this.data = {
      pastHistory: [],
      surgicalHistory: [],
      familyHistory: [],
      personalHistory: [],
      medications: [],
      allergies: [],
    };
  }
}
