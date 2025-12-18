/* =============================================================================
 * PNC FORM STORE - Types, Interfaces, and Reducer
 * ============================================================================= */

// Delivery Details
export interface DeliveryDetails {
  dateOfDelivery: string;
  modeOfDelivery: string;
  indicationForCS: string;
  sex: string;
  birthWeight: string;
  perinealTear: string;
  otherConcerns: string;
}

// Antenatal Conditions
export interface AntenatalConditions {
  diabetes: string;
  hypertension: string;
  thyroid: string;
  anyOthers: string;
}

// Post Partum Visit
export interface PostPartumVisit {
  date: string;
  antenatalConditions: AntenatalConditions;
  concerns: string;
  moodOkay: boolean;
  bp: string;
  pallor: string;
  breasts: string;
  pa: string;
  perineum: string;
  medications: string;
  advice: string;
  contraceptionLeaflet: boolean;
  sb: string;
  nextCheckup: string;
}

// 6 Week Visit
export interface SixWeekVisit {
  date: string;
  concerns: string;
  bp: string;
  pallor: string;
  breasts: string;
  perineum: string;
  moodOkay: boolean;
  pa: string;
  medication: string;
  contraception: string;
  sb: string;
  nextVisit: string;
}

// Complete PNC Form State
export interface PncFormState {
  deliveryDetails: DeliveryDetails;
  postPartumVisit: PostPartumVisit;
  sixWeekVisit: SixWeekVisit;
}

// Initial State
export const initialPncFormState: PncFormState = {
  deliveryDetails: {
    dateOfDelivery: '',
    modeOfDelivery: '',
    indicationForCS: '',
    sex: '',
    birthWeight: '',
    perinealTear: '',
    otherConcerns: '',
  },
  postPartumVisit: {
    date: '',
    antenatalConditions: {
      diabetes: '',
      hypertension: '',
      thyroid: '',
      anyOthers: '',
    },
    concerns: '',
    moodOkay: true,
    bp: '',
    pallor: '',
    breasts: '',
    pa: '',
    perineum: '',
    medications: '',
    advice: '',
    contraceptionLeaflet: false,
    sb: '',
    nextCheckup: '',
  },
  sixWeekVisit: {
    date: '',
    concerns: '',
    bp: '',
    pallor: '',
    breasts: '',
    perineum: '',
    moodOkay: true,
    pa: '',
    medication: '',
    contraception: '',
    sb: '',
    nextVisit: '',
  },
};

// Action Types
export type PncFormAction =
  | { type: 'UPDATE_DELIVERY_DETAILS'; payload: Partial<DeliveryDetails> }
  | { type: 'UPDATE_POST_PARTUM_VISIT'; payload: Partial<PostPartumVisit> }
  | { type: 'UPDATE_SIX_WEEK_VISIT'; payload: Partial<SixWeekVisit> }
  | { type: 'SET_FORM'; payload: PncFormState }
  | { type: 'RESET' };

// Reducer
export function pncFormReducer(state: PncFormState, action: PncFormAction): PncFormState {
  switch (action.type) {
    case 'UPDATE_DELIVERY_DETAILS':
      return { ...state, deliveryDetails: { ...state.deliveryDetails, ...action.payload } };
    case 'UPDATE_POST_PARTUM_VISIT':
      return { ...state, postPartumVisit: { ...state.postPartumVisit, ...action.payload } };
    case 'UPDATE_SIX_WEEK_VISIT':
      return { ...state, sixWeekVisit: { ...state.sixWeekVisit, ...action.payload } };
    case 'SET_FORM':
      return action.payload;
    case 'RESET':
      return initialPncFormState;
    default:
      return state;
  }
}
