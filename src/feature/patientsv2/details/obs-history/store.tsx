/** Types for Obstetric History */

/** Outcome Type */
export type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';

/** Delivery Mode */
export type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';

/** Baby Gender */
export type Gender = 'Male' | 'Female' | 'Other' | 'NA';

/** Baby Status */
export type BabyStatus = 'Living' | 'Deceased' | 'NA';

/** Pregnancy Record Interface */
export interface PregnancyRecord {
  id: string;
  outcome: OutcomeType;
  year?: string;
  lmpDate?: string;
  gestationWeeks?: number;
  deliveryMode: DeliveryMode;
  birthWeight?: string;
  gender: Gender;
  babyStatus: BabyStatus;
  complications: string[];
  remarks: string;
}

/** GTPAL Score */
export interface GTPALScore {
  g: number;
  t: number;
  p: number;
  a: number;
  l: number;
}

/** Obstetric History State */
export interface ObstetricHistoryState {
  mode: 'view' | 'edit';
  records: PregnancyRecord[];
}

/** Action Types */
export type ObstetricHistoryAction =
  | { type: 'SET_MODE'; payload: 'view' | 'edit' }
  | { type: 'ADD_RECORD'; payload: PregnancyRecord }
  | { type: 'UPDATE_RECORD'; payload: PregnancyRecord }
  | { type: 'DELETE_RECORD'; payload: string }
  | { type: 'SET_RECORDS'; payload: PregnancyRecord[] }
  | { type: 'RESET' };

/** Common Complications */
export const COMMON_COMPLICATIONS = [
  'Pre-eclampsia',
  'Gestational Diabetes',
  'PPH',
  'Preterm Labor',
  'IUGR',
  'Placenta Previa',
  'Anemia',
  'PIH',
];

/** Mock Pregnancy Data for Demo */
export const MOCK_PREGNANCY_DATA: PregnancyRecord[] = [
  {
    id: 'preg-1',
    outcome: 'Live Birth',
    year: '2019',
    gestationWeeks: 39,
    deliveryMode: 'NVD',
    birthWeight: '3.1 kg',
    gender: 'Female',
    babyStatus: 'Living',
    complications: [],
    remarks: 'Uncomplicated delivery',
  },
  {
    id: 'preg-2',
    outcome: 'Miscarriage',
    year: '2021',
    gestationWeeks: 8,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: 'Spontaneous',
  },
  {
    id: 'preg-3',
    outcome: 'Live Birth',
    year: '2023',
    gestationWeeks: 38,
    deliveryMode: 'LSCS',
    birthWeight: '2.9 kg',
    gender: 'Male',
    babyStatus: 'Living',
    complications: ['Gestational Diabetes'],
    remarks: 'Elective LSCS due to previous history',
  },
];

/** Default Initial State */
export const initialObstetricHistoryState: ObstetricHistoryState = {
  mode: 'view',
  records: MOCK_PREGNANCY_DATA,
};

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

/** Calculate Gestational Age from LMP date */
export function calculateGA(lmpDate: string): { weeks: number; days: number } {
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
}

/** Calculate EDD from LMP date */
export function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Calculate GTPAL Score from pregnancy records */
export function calculateGTPAL(records: PregnancyRecord[]): GTPALScore {
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');
  const gravida = records.length;
  const term = pastRecords.filter(r => (r.gestationWeeks || 0) >= 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth')).length;
  const preterm = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks >= 20 && weeks < 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth');
  }).length;
  const abortions = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks < 20 || r.outcome === 'Miscarriage' || r.outcome === 'Abortion' || r.outcome === 'Ectopic';
  }).length;
  const living = pastRecords.filter(r => r.babyStatus === 'Living').length;

  return { g: gravida, t: term, p: preterm, a: abortions, l: living };
}

/** Reducer Function */
export function obstetricHistoryReducer(
  state: ObstetricHistoryState,
  action: ObstetricHistoryAction
): ObstetricHistoryState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };

    case 'ADD_RECORD':
      return {
        ...state,
        records: [...state.records, action.payload].sort((a, b) => {
          if (a.outcome === 'Ongoing') return -1;
          if (b.outcome === 'Ongoing') return 1;
          return parseInt(b.year || '0') - parseInt(a.year || '0');
        }),
      };

    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map(r => (r.id === action.payload.id ? action.payload : r)),
      };

    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter(r => r.id !== action.payload),
      };

    case 'SET_RECORDS':
      return { ...state, records: action.payload };

    case 'RESET':
      return initialObstetricHistoryState;

    default:
      return state;
  }
}
