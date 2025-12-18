/** Mode for medical history view */
export type MedicalHistoryMode = 'view' | 'edit';

/** Past History Item */
export interface PastHistoryItem {
  id: string;
  name: string;
  since: string;
  status: 'active' | 'inactive';
  notes: string;
}

/** Personal History Item */
export interface PersonalHistoryItem {
  id: string;
  name: string;
  status: 'yes' | 'no' | 'occasional' | 'unknown';
  details: string;
  notes: string;
}

/** Family History Item */
export interface FamilyHistoryItem {
  id: string;
  condition: string;
  relationship: 'Parent' | 'Sibling' | 'Grandparent' | 'Other';
  status: 'positive' | 'negative' | 'unknown';
  notes: string;
}

/** Complete Medical History Data */
export interface MedicalHistoryData {
  pastHistory: PastHistoryItem[];
  personalHistory: PersonalHistoryItem[];
  familyHistory: FamilyHistoryItem[];
  presentMedication: string;
}

/** Medical History State */
export interface MedicalHistoryState {
  mode: MedicalHistoryMode;
  expandedSections: Record<string, boolean>;
  data: MedicalHistoryData;
}

/** Action Types */
export type MedicalHistoryAction =
  | { type: 'SET_MODE'; payload: MedicalHistoryMode }
  | { type: 'TOGGLE_SECTION'; payload: string }
  | { type: 'EXPAND_ALL' }
  | { type: 'COLLAPSE_ALL' }
  | { type: 'UPDATE_PAST_HISTORY'; payload: PastHistoryItem[] }
  | { type: 'UPDATE_PERSONAL_HISTORY'; payload: PersonalHistoryItem[] }
  | { type: 'UPDATE_FAMILY_HISTORY'; payload: FamilyHistoryItem[] }
  | { type: 'UPDATE_PRESENT_MEDICATION'; payload: string }
  | { type: 'RESET' };

/** Default Past History Items - With sample data */
export const DEFAULT_PAST_HISTORY: PastHistoryItem[] = [
  { id: 'ph-1', name: 'Diabetes', since: '2018', status: 'active', notes: 'Type 2, controlled with medication' },
  { id: 'ph-2', name: 'Hypertension', since: '2020', status: 'active', notes: 'On Amlodipine 5mg' },
  { id: 'ph-3', name: 'Thyroid', since: '', status: 'inactive', notes: '' },
  { id: 'ph-4', name: 'Cardiac', since: '', status: 'inactive', notes: '' },
  { id: 'ph-5', name: 'Epilepsy', since: '', status: 'inactive', notes: '' },
  { id: 'ph-6', name: 'Asthma', since: '2015', status: 'active', notes: 'Mild, uses inhaler occasionally' },
  { id: 'ph-7', name: 'TB', since: '', status: 'inactive', notes: '' },
  { id: 'ph-8', name: 'Blood Transfusion', since: '', status: 'inactive', notes: '' },
  { id: 'ph-9', name: 'Surgery', since: '2019', status: 'active', notes: 'Appendectomy' },
  { id: 'ph-10', name: 'Thromboembolism', since: '', status: 'inactive', notes: '' },
];

/** Default Personal History Items - With sample data */
export const DEFAULT_PERSONAL_HISTORY: PersonalHistoryItem[] = [
  { id: 'peh-1', name: 'Smoking', status: 'no', details: '', notes: '' },
  { id: 'peh-2', name: 'Alcohol', status: 'occasional', details: 'Social drinker', notes: '' },
  { id: 'peh-3', name: 'Consanguinity', status: 'no', details: '', notes: '' },
  { id: 'peh-4', name: 'Psych. Stress', status: 'yes', details: 'Work-related', notes: 'Referred to counselor' },
  { id: 'peh-5', name: 'Tobacco Chewing', status: 'no', details: '', notes: '' },
  { id: 'peh-6', name: 'Drug Abuse', status: 'no', details: '', notes: '' },
];

/** Default Family History Items - With sample data */
export const DEFAULT_FAMILY_HISTORY: FamilyHistoryItem[] = [
  { id: 'fh-1', condition: 'Diabetes', relationship: 'Parent', status: 'positive', notes: 'Mother - Type 2' },
  { id: 'fh-2', condition: 'Hypertension', relationship: 'Parent', status: 'positive', notes: 'Father' },
  { id: 'fh-3', condition: 'Heart Disease', relationship: 'Grandparent', status: 'positive', notes: 'Paternal grandfather - MI at 65' },
  { id: 'fh-4', condition: 'Cancer', relationship: 'Parent', status: 'negative', notes: '' },
  { id: 'fh-5', condition: 'Mental Illness', relationship: 'Parent', status: 'negative', notes: '' },
];

/** Initial State */
export const initialMedicalHistoryState: MedicalHistoryState = {
  mode: 'view',
  expandedSections: {
    pastHistory: true,
    personalHistory: true,
    familyHistory: true,
    presentMedication: true,
  },
  data: {
    pastHistory: DEFAULT_PAST_HISTORY,
    personalHistory: DEFAULT_PERSONAL_HISTORY,
    familyHistory: DEFAULT_FAMILY_HISTORY,
    presentMedication: 'Tab. Metformin 500mg BD\nTab. Amlodipine 5mg OD\nInhaler Salbutamol PRN\nTab. Folic Acid 5mg OD',
  },
};

/** Reducer Function */
export function medicalHistoryReducer(
  state: MedicalHistoryState,
  action: MedicalHistoryAction
): MedicalHistoryState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };

    case 'TOGGLE_SECTION':
      return {
        ...state,
        expandedSections: {
          ...state.expandedSections,
          [action.payload]: !state.expandedSections[action.payload],
        },
      };

    case 'EXPAND_ALL':
      return {
        ...state,
        expandedSections: {
          pastHistory: true,
          personalHistory: true,
          familyHistory: true,
          presentMedication: true,
        },
      };

    case 'COLLAPSE_ALL':
      return {
        ...state,
        expandedSections: {
          pastHistory: false,
          personalHistory: false,
          familyHistory: false,
          presentMedication: false,
        },
      };

    case 'UPDATE_PAST_HISTORY':
      return { ...state, data: { ...state.data, pastHistory: action.payload } };

    case 'UPDATE_PERSONAL_HISTORY':
      return { ...state, data: { ...state.data, personalHistory: action.payload } };

    case 'UPDATE_FAMILY_HISTORY':
      return { ...state, data: { ...state.data, familyHistory: action.payload } };

    case 'UPDATE_PRESENT_MEDICATION':
      return { ...state, data: { ...state.data, presentMedication: action.payload } };

    case 'RESET':
      return initialMedicalHistoryState;

    default:
      return state;
  }
}
