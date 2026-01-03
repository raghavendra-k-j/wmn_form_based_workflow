export type DiagnosisStatus = 'active' | 'resolved' | 'ruled-out';
export type Severity = 'NA' | 'mild' | 'moderate' | 'severe';
export type Pattern = 'NA' | 'acute' | 'chronic';
export type Laterality = 'NA' | 'right' | 'left' | 'bilateral';
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
export type TabType = 'add' | 'history';

export interface ICDCode {
  code: string;
  name: string;
}

export interface DiagnosisCategory {
  id: string;
  name: string;
}

export interface PatientDiagnosis {
  id: string;
  icdCode: string;
  icdName: string;
  status: DiagnosisStatus;
  category: string;
  severity: Severity;
  pattern: Pattern;
  laterality: Laterality;
  treatmentStatus: boolean;
  notes: string;
  capturedDate: string;
  encounterId?: string;
}

export interface DiagnosisRecord {
  id: string;
  patientId: string;
  encounterId: string;
  diagnoses: PatientDiagnosis[];
  capturedDate: string;
}

export const STATUS_OPTIONS: { value: DiagnosisStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'ruled-out', label: 'Ruled-out' },
];

export const SEVERITY_OPTIONS: { value: Severity; label: string }[] = [
  { value: 'NA', label: 'NA' },
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
];

export const PATTERN_OPTIONS: { value: Pattern; label: string }[] = [
  { value: 'NA', label: 'NA' },
  { value: 'acute', label: 'Acute' },
  { value: 'chronic', label: 'Chronic' },
];

export const LATERALITY_OPTIONS: { value: Laterality; label: string }[] = [
  { value: 'NA', label: 'NA' },
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'bilateral', label: 'Bilateral' },
];
