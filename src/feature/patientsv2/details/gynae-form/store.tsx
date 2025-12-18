/* =============================================================================
 * GYNAE FORM STORE - Types, Interfaces, and Reducer
 * ============================================================================= */

// Menstrual History
export interface MenstrualHistory {
  lmp: string;
  para: string;
  contraception: string;
  previousSmear: string;
  menstrualCycles: string;
}

// Presenting Complaints
export interface PresentingComplaints {
  chiefComplaints: string;
  micturition: string;
  bowels: string;
}

// Physical Examination - Vitals
export interface Vitals {
  height: string;
  weight: string;
  bmi: string;
  pallor: string;
  goiter: string;
  pulse: string;
  bp: string;
}

// Physical Examination - Systems
export interface SystemsExamination {
  cvs: string;
  rs: string;
  breasts: string;
  perAbdomen: string;
}

// Vaginal Examination
export interface VaginalExamination {
  vulvaVagina: string;
  cervix: string;
  uterus: string;
  adnexa: string;
}

// Clinical Notes
export interface ClinicalNotes {
  impression: string;
  advice: string;
}

// Complete Gynae Form State
export interface GynaeFormState {
  menstrualHistory: MenstrualHistory;
  presentingComplaints: PresentingComplaints;
  vitals: Vitals;
  systemsExamination: SystemsExamination;
  vaginalExamination: VaginalExamination;
  clinicalNotes: ClinicalNotes;
}

// Initial State
export const initialGynaeFormState: GynaeFormState = {
  menstrualHistory: {
    lmp: '',
    para: '',
    contraception: '',
    previousSmear: '',
    menstrualCycles: '',
  },
  presentingComplaints: {
    chiefComplaints: '',
    micturition: '',
    bowels: '',
  },
  vitals: {
    height: '',
    weight: '',
    bmi: '',
    pallor: '',
    goiter: '',
    pulse: '',
    bp: '',
  },
  systemsExamination: {
    cvs: '',
    rs: '',
    breasts: '',
    perAbdomen: '',
  },
  vaginalExamination: {
    vulvaVagina: '',
    cervix: '',
    uterus: '',
    adnexa: '',
  },
  clinicalNotes: {
    impression: '',
    advice: '',
  },
};

// Action Types
export type GynaeFormAction =
  | { type: 'UPDATE_MENSTRUAL_HISTORY'; payload: Partial<MenstrualHistory> }
  | { type: 'UPDATE_PRESENTING_COMPLAINTS'; payload: Partial<PresentingComplaints> }
  | { type: 'UPDATE_VITALS'; payload: Partial<Vitals> }
  | { type: 'UPDATE_SYSTEMS_EXAMINATION'; payload: Partial<SystemsExamination> }
  | { type: 'UPDATE_VAGINAL_EXAMINATION'; payload: Partial<VaginalExamination> }
  | { type: 'UPDATE_CLINICAL_NOTES'; payload: Partial<ClinicalNotes> }
  | { type: 'SET_FORM'; payload: GynaeFormState }
  | { type: 'RESET' };

// Reducer
export function gynaeFormReducer(state: GynaeFormState, action: GynaeFormAction): GynaeFormState {
  switch (action.type) {
    case 'UPDATE_MENSTRUAL_HISTORY':
      return { ...state, menstrualHistory: { ...state.menstrualHistory, ...action.payload } };
    case 'UPDATE_PRESENTING_COMPLAINTS':
      return { ...state, presentingComplaints: { ...state.presentingComplaints, ...action.payload } };
    case 'UPDATE_VITALS':
      return { ...state, vitals: { ...state.vitals, ...action.payload } };
    case 'UPDATE_SYSTEMS_EXAMINATION':
      return { ...state, systemsExamination: { ...state.systemsExamination, ...action.payload } };
    case 'UPDATE_VAGINAL_EXAMINATION':
      return { ...state, vaginalExamination: { ...state.vaginalExamination, ...action.payload } };
    case 'UPDATE_CLINICAL_NOTES':
      return { ...state, clinicalNotes: { ...state.clinicalNotes, ...action.payload } };
    case 'SET_FORM':
      return action.payload;
    case 'RESET':
      return initialGynaeFormState;
    default:
      return state;
  }
}

// BMI Calculator Helper
export function calculateBMI(heightCm: string, weightKg: string): string {
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  if (!h || !w || h <= 0 || w <= 0) return '';
  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  return bmi.toFixed(1);
}
