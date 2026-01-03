export type SelectionType = 'single' | 'multi';
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
export type TabType = 'add' | 'list';

export interface SurgicalHistoryMaster {
  id: string;
  name: string;
  options: string[];
  selectionType: SelectionType;
  displayOrder: number;
  isDefault: boolean;
}

export interface PatientSurgicalHistory extends SurgicalHistoryMaster {
  id: string;
  masterId: string;
  selectedOption: string | string[];
  year?: string;
  notes?: string;
  isRisk: boolean;
  planOfManagement?: string;
}

export interface SurgicalHistoryRecord {
  id: string;
  patientId: string;
  hasSurgicalHistory: boolean;
  items: PatientSurgicalHistory[];
  capturedDate: string;
}
