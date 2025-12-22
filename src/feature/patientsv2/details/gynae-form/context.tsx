import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type GynaeFormState,
  type MenstrualHistory,
  type PresentingComplaints,
  type Vitals,
  type SystemsExamination,
  type VaginalExamination,
  type ClinicalNotes,
  initialGynaeFormState,
  gynaeFormReducer,
} from './store';

/* =============================================================================
 * CONTEXT DEFINITION
 * ============================================================================= */

interface GynaeFormContextType {
  form: GynaeFormState;
  updateMenstrualHistory: (data: Partial<MenstrualHistory>) => void;
  updatePresentingComplaints: (data: Partial<PresentingComplaints>) => void;
  updateVitals: (data: Partial<Vitals>) => void;
  updateSystemsExamination: (data: Partial<SystemsExamination>) => void;
  updateVaginalExamination: (data: Partial<VaginalExamination>) => void;
  updateClinicalNotes: (data: Partial<ClinicalNotes>) => void;
  resetForm: () => void;
}

const GynaeFormContext = createContext<GynaeFormContextType | null>(null);

/* =============================================================================
 * PROVIDER COMPONENT
 * ============================================================================= */

interface GynaeFormProviderProps {
  children: ReactNode;
  initialState?: GynaeFormState;
}

export function GynaeFormProvider({ children, initialState }: GynaeFormProviderProps) {
  const [form, dispatch] = useReducer(gynaeFormReducer, initialState || initialGynaeFormState);

  const updateMenstrualHistory = (data: Partial<MenstrualHistory>) => {
    dispatch({ type: 'UPDATE_MENSTRUAL_HISTORY', payload: data });
  };

  const updatePresentingComplaints = (data: Partial<PresentingComplaints>) => {
    dispatch({ type: 'UPDATE_PRESENTING_COMPLAINTS', payload: data });
  };

  const updateVitals = (data: Partial<Vitals>) => {
    dispatch({ type: 'UPDATE_VITALS', payload: data });
  };

  const updateSystemsExamination = (data: Partial<SystemsExamination>) => {
    dispatch({ type: 'UPDATE_SYSTEMS_EXAMINATION', payload: data });
  };

  const updateVaginalExamination = (data: Partial<VaginalExamination>) => {
    dispatch({ type: 'UPDATE_VAGINAL_EXAMINATION', payload: data });
  };

  const updateClinicalNotes = (data: Partial<ClinicalNotes>) => {
    dispatch({ type: 'UPDATE_CLINICAL_NOTES', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <GynaeFormContext.Provider
      value={{
        form,
        updateMenstrualHistory,
        updatePresentingComplaints,
        updateVitals,
        updateSystemsExamination,
        updateVaginalExamination,
        updateClinicalNotes,
        resetForm,
      }}
    >
      {children}
    </GynaeFormContext.Provider>
  );
}

/* =============================================================================
 * CUSTOM HOOK
 * ============================================================================= */

export function useGynaeForm(): GynaeFormContextType {
  const context = useContext(GynaeFormContext);
  if (!context) {
    throw new Error('useGynaeForm must be used within GynaeFormProvider');
  }
  return context;
}
