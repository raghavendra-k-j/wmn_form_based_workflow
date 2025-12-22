/* =============================================================================
 * ANC FORM STORE - Types, Interfaces, and Reducer
 * Based on Follow-up visits data table from image
 * ============================================================================= */

// Visit Form Details (based on columns from image)
export interface VisitFormDetails {
  date: string;
  complaints: string;
  wt: string;
  bp: string;
  wksByLMP: string;
  sfh: string;
  pp: string;
  fh: string;
  remarksPlan: string;
  nextVisit: string;
  sOrB: string;
  // Clinical Assessment
  diagnosis: string;
  risks: string;
  planOfManagement: string;
  doctorPrivateNotes: string;
}

// Lab & Scans - Simplified
export interface LabScansDetails {
  labTests: string;
  scansImaging: string;
}

// Single Prescription Item
export interface PrescriptionItem {
  id: string;
  name: string;
  dose: string;
  medicineTime: string;
  frequency: string;
  duration: string;
  route: string;
  instructions: string;
}

// Prescriptions - List of prescription items
export interface PrescriptionDetails {
  items: PrescriptionItem[];
}

// Next Appointment
export interface NextAppointmentDetails {
  appointmentDate: string;
  notes: string;
}

// Complete ANC Form State
export interface AncFormState {
  visitForm: VisitFormDetails;
  labScans: LabScansDetails;
  prescriptions: PrescriptionDetails;
  nextAppointment: NextAppointmentDetails;
}

// Initial State
export const initialAncFormState: AncFormState = {
  visitForm: {
    date: new Date().toISOString().split('T')[0],
    complaints: '',
    wt: '',
    bp: '',
    wksByLMP: '',
    sfh: '',
    pp: '',
    fh: '',
    remarksPlan: '',
    nextVisit: '',
    sOrB: '',
    diagnosis: '',
    risks: '',
    planOfManagement: '',
    doctorPrivateNotes: '',
  },
  labScans: {
    labTests: '',
    scansImaging: '',
  },
  prescriptions: {
    items: [],
  },
  nextAppointment: {
    appointmentDate: '',
    notes: '',
  },
};

// Action Types
export type AncFormAction =
  | { type: 'UPDATE_VISIT_FORM'; payload: Partial<VisitFormDetails> }
  | { type: 'UPDATE_LAB_SCANS'; payload: Partial<LabScansDetails> }
  | { type: 'UPDATE_PRESCRIPTIONS'; payload: Partial<PrescriptionDetails> }
  | { type: 'ADD_PRESCRIPTION'; payload: PrescriptionItem }
  | { type: 'REMOVE_PRESCRIPTION'; payload: string }
  | { type: 'UPDATE_NEXT_APPOINTMENT'; payload: Partial<NextAppointmentDetails> }
  | { type: 'SET_FORM'; payload: AncFormState }
  | { type: 'RESET' };

// Reducer
export function ancFormReducer(state: AncFormState, action: AncFormAction): AncFormState {
  switch (action.type) {
    case 'UPDATE_VISIT_FORM':
      return { ...state, visitForm: { ...state.visitForm, ...action.payload } };
    case 'UPDATE_LAB_SCANS':
      return { ...state, labScans: { ...state.labScans, ...action.payload } };
    case 'UPDATE_PRESCRIPTIONS':
      return { ...state, prescriptions: { ...state.prescriptions, ...action.payload } };
    case 'ADD_PRESCRIPTION':
      return { 
        ...state, 
        prescriptions: { 
          items: [...state.prescriptions.items, action.payload] 
        } 
      };
    case 'REMOVE_PRESCRIPTION':
      return { 
        ...state, 
        prescriptions: { 
          items: state.prescriptions.items.filter(item => item.id !== action.payload) 
        } 
      };
    case 'UPDATE_NEXT_APPOINTMENT':
      return { ...state, nextAppointment: { ...state.nextAppointment, ...action.payload } };
    case 'SET_FORM':
      return action.payload;
    case 'RESET':
      return initialAncFormState;
    default:
      return state;
  }
}

