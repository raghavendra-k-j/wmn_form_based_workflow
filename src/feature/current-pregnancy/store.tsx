/** Types and Store for Current Pregnancy */

/** Outcome Type for current pregnancy tracking */
export type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';

/** Delivery Mode */
export type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';

/** Baby Gender */
export type Gender = 'Male' | 'Female' | 'Other' | 'NA';

/** Baby Status */
export type BabyStatus = 'Living' | 'Deceased' | 'NA';

/** Scan Record for EDD from ultrasound */
export interface ScanRecord {
  scanDate: string;
  scanEDD: string;
  gestationByScana: { weeks: number; days: number };
  remarks?: string;
  updatedBy: string;
  updatedAt: string;
}

/** Current Pregnancy Record Interface */
export interface CurrentPregnancyRecord {
  id: string;
  outcome: OutcomeType;
  lmpDate: string;
  eddDate: string;
  // Scan-based EDD (optional)
  scanEDD?: string;
  scanDate?: string;
  // Derived values
  gestationWeeks?: number;
  gestationDays?: number;
  deliveryMode: DeliveryMode;
  birthWeight?: string;
  gender: Gender;
  babyStatus: BabyStatus;
  complications: string[];
  remarks: string;
  // Audit info
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
}

/** GTPAL Score */
export interface GTPALScore {
  g: number;
  t: number;
  p: number;
  a: number;
  l: number;
}

/** Current Pregnancy State */
export interface CurrentPregnancyState {
  pregnancy: CurrentPregnancyRecord | null;
  isEditing: boolean;
}

/** Action Types */
export type CurrentPregnancyAction =
  | { type: 'SET_PREGNANCY'; payload: CurrentPregnancyRecord | null }
  | { type: 'UPDATE_PREGNANCY'; payload: Partial<CurrentPregnancyRecord> }
  | { type: 'UPDATE_SCAN_EDD'; payload: { scanDate: string; scanEDD: string; updatedBy: string } }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'COMPLETE_PREGNANCY'; payload: { outcome: OutcomeType; details: Partial<CurrentPregnancyRecord> } }
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

/** Calculate Gestational Age from EDD (reverse calculation) */
export function calculateGAFromEDD(eddDate: string): { weeks: number; days: number } {
  const edd = new Date(eddDate);
  const today = new Date();
  const diffTime = edd.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalDays = 280 - daysRemaining; // 280 days = 40 weeks
  if (totalDays < 0) return { weeks: 0, days: 0 };
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

/** Calculate EDD from LMP date */
export function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Calculate EDD as Date object */
export function calculateEDDDate(lmpDate: string): Date {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp;
}

/** Get trimester from weeks */
export function getTrimester(weeks: number): { trimester: 1 | 2 | 3; label: string } {
  if (weeks < 13) return { trimester: 1, label: 'First Trimester' };
  if (weeks < 27) return { trimester: 2, label: 'Second Trimester' };
  return { trimester: 3, label: 'Third Trimester' };
}

/** Days remaining until EDD */
export function getDaysUntilEDD(lmpDate: string): number {
  const edd = calculateEDDDate(lmpDate);
  const today = new Date();
  const diffTime = edd.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/** Days remaining until Scan EDD */
export function getDaysUntilScanEDD(scanEDD: string): number {
  const edd = new Date(scanEDD);
  const today = new Date();
  const diffTime = edd.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/** Format date for display */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

/** Format datetime for display */
export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/** Default Initial State */
export const initialCurrentPregnancyState: CurrentPregnancyState = {
  pregnancy: null,
  isEditing: false,
};

/** Reducer Function */
export function currentPregnancyReducer(
  state: CurrentPregnancyState,
  action: CurrentPregnancyAction
): CurrentPregnancyState {
  switch (action.type) {
    case 'SET_PREGNANCY':
      return { ...state, pregnancy: action.payload };

    case 'UPDATE_PREGNANCY':
      if (!state.pregnancy) return state;
      return {
        ...state,
        pregnancy: {
          ...state.pregnancy,
          ...action.payload,
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_SCAN_EDD':
      if (!state.pregnancy) return state;
      return {
        ...state,
        pregnancy: {
          ...state.pregnancy,
          scanDate: action.payload.scanDate,
          scanEDD: action.payload.scanEDD,
          updatedAt: new Date().toISOString(),
          updatedBy: action.payload.updatedBy,
        },
      };

    case 'SET_EDITING':
      return { ...state, isEditing: action.payload };

    case 'COMPLETE_PREGNANCY':
      if (!state.pregnancy) return state;
      return {
        ...state,
        pregnancy: {
          ...state.pregnancy,
          outcome: action.payload.outcome,
          ...action.payload.details,
          updatedAt: new Date().toISOString(),
        },
        isEditing: false,
      };

    case 'RESET':
      return initialCurrentPregnancyState;

    default:
      return state;
  }
}
