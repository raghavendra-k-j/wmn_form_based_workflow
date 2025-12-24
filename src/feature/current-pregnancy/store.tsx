/** Types and Store for Current Pregnancy - Simplified Version */

/** Outcome Type for current pregnancy tracking */
export type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';

/** Delivery Mode */
export type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';

/** Baby Gender */
export type Gender = 'Male' | 'Female' | 'Other' | 'NA';

/** Baby Status */
export type BabyStatus = 'Living' | 'Deceased' | 'NA';

/** EDD Source Type */
export type EDDSource = 'lmp' | 'scan' | 'corrected';

/** Current Pregnancy Record Interface */
export interface CurrentPregnancyRecord {
  id: string;
  outcome: OutcomeType;
  lmpDate: string;
  // Scan-based EDD (optional)
  scanEDD?: string;
  // Corrected EDD (optional) - if present, becomes the final EDD
  hasCorrectedEDD: boolean;
  correctedEDD?: string;
  // Delivery details (for completed pregnancies)
  deliveryMode: DeliveryMode;
  birthWeight?: string;
  gender: Gender;
  babyStatus: BabyStatus;
  remarks: string;
  // Audit info
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
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
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'COMPLETE_PREGNANCY'; payload: { outcome: OutcomeType; details: Partial<CurrentPregnancyRecord> } }
  | { type: 'RESET' };

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

/** Calculate EDD from LMP date (adds 280 days) - returns YYYY-MM-DD format */
export function calculateEDDFromLMP(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toISOString().split('T')[0];
}

/** Format date for display (e.g., "24 Dec 2024") */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

/**
 * Get the Estimated EDD (before corrected EDD is applied):
 * - If scanEDD is present → use scanEDD
 * - Else → calculate from LMP
 */
export function getEstimatedEDD(pregnancy: CurrentPregnancyRecord): string {
  if (pregnancy.scanEDD) {
    return pregnancy.scanEDD;
  }
  return calculateEDDFromLMP(pregnancy.lmpDate);
}

/**
 * Get the source of Estimated EDD
 */
export function getEstimatedEDDSource(pregnancy: CurrentPregnancyRecord): 'lmp' | 'scan' {
  return pregnancy.scanEDD ? 'scan' : 'lmp';
}

/**
 * Get the Final EDD:
 * - If correctedEDD is present → use correctedEDD (final)
 * - Else → use estimated EDD (from scan or LMP)
 */
export function getFinalEDD(pregnancy: CurrentPregnancyRecord): string {
  if (pregnancy.hasCorrectedEDD && pregnancy.correctedEDD) {
    return pregnancy.correctedEDD;
  }
  return getEstimatedEDD(pregnancy);
}

/**
 * Get the source of Final EDD
 */
export function getFinalEDDSource(pregnancy: CurrentPregnancyRecord): EDDSource {
  if (pregnancy.hasCorrectedEDD && pregnancy.correctedEDD) {
    return 'corrected';
  }
  return getEstimatedEDDSource(pregnancy);
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
