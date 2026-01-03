export type SelectionType = 'single' | 'multi';
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
export type TabType = 'add' | 'list';

export interface DrugAllergyMaster {
  id: string;
  name: string;
  options: string[];
  selectionType: SelectionType;
  displayOrder: number;
  isDefault: boolean;
}

export interface PatientDrugAllergy extends DrugAllergyMaster {
  id: string;
  masterId: string;
  selectedOption: string | string[];
  notes?: string;
  isRisk: boolean;
  planOfManagement?: string;
}

export interface DrugAllergyRecord {
  id: string;
  patientId: string;
  hasDrugAllergies: boolean;
  items: PatientDrugAllergy[];
  capturedDate: string;
}
