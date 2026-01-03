export type SelectionType = 'single' | 'multi';
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
export type TabType = 'add' | 'list';

export interface FamilyHistoryMaster {
  id: string;
  name: string;
  options: string[];
  selectionType: SelectionType;
  displayOrder: number;
  isDefault: boolean;
}

export interface PatientFamilyHistory extends FamilyHistoryMaster {
  id: string;
  masterId: string;
  selectedOption: string | string[];
  since?: string;
  notes?: string;
  isRisk: boolean;
  planOfManagement?: string;
}

export interface FamilyHistoryRecord {
  id: string;
  patientId: string;
  hasFamilyHistory: boolean;
  items: PatientFamilyHistory[];
  capturedDate: string;
}
