import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type AncFormState,
  type VisitFormDetails,
  type LabScansDetails,
  type PrescriptionDetails,
  type PrescriptionItem,
  type NextAppointmentDetails,
  initialAncFormState,
  ancFormReducer,
} from './store';

/* =============================================================================
 * CONTEXT DEFINITION
 * ============================================================================= */

interface AncFormContextType {
  form: AncFormState;
  updateVisitForm: (data: Partial<VisitFormDetails>) => void;
  updateLabScans: (data: Partial<LabScansDetails>) => void;
  updatePrescriptions: (data: Partial<PrescriptionDetails>) => void;
  addPrescription: (item: PrescriptionItem) => void;
  removePrescription: (id: string) => void;
  updateNextAppointment: (data: Partial<NextAppointmentDetails>) => void;
  resetForm: () => void;
}

const AncFormContext = createContext<AncFormContextType | null>(null);

/* =============================================================================
 * PROVIDER COMPONENT
 * ============================================================================= */

interface AncFormProviderProps {
  children: ReactNode;
  initialState?: AncFormState;
}

export function AncFormProvider({ children, initialState }: AncFormProviderProps) {
  const [form, dispatch] = useReducer(ancFormReducer, initialState || initialAncFormState);

  const updateVisitForm = (data: Partial<VisitFormDetails>) => {
    dispatch({ type: 'UPDATE_VISIT_FORM', payload: data });
  };

  const updateLabScans = (data: Partial<LabScansDetails>) => {
    dispatch({ type: 'UPDATE_LAB_SCANS', payload: data });
  };

  const updatePrescriptions = (data: Partial<PrescriptionDetails>) => {
    dispatch({ type: 'UPDATE_PRESCRIPTIONS', payload: data });
  };

  const addPrescription = (item: PrescriptionItem) => {
    dispatch({ type: 'ADD_PRESCRIPTION', payload: item });
  };

  const removePrescription = (id: string) => {
    dispatch({ type: 'REMOVE_PRESCRIPTION', payload: id });
  };

  const updateNextAppointment = (data: Partial<NextAppointmentDetails>) => {
    dispatch({ type: 'UPDATE_NEXT_APPOINTMENT', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <AncFormContext.Provider
      value={{
        form,
        updateVisitForm,
        updateLabScans,
        updatePrescriptions,
        addPrescription,
        removePrescription,
        updateNextAppointment,
        resetForm,
      }}
    >
      {children}
    </AncFormContext.Provider>
  );
}

/* =============================================================================
 * CUSTOM HOOK
 * ============================================================================= */

export function useAncForm(): AncFormContextType {
  const context = useContext(AncFormContext);
  if (!context) {
    throw new Error('useAncForm must be used within AncFormProvider');
  }
  return context;
}
