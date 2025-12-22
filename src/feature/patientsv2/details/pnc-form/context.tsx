import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type PncFormState,
  type DeliveryDetails,
  type PostPartumVisit,
  type SixWeekVisit,
  initialPncFormState,
  pncFormReducer,
} from './store';

/* =============================================================================
 * CONTEXT DEFINITION
 * ============================================================================= */

interface PncFormContextType {
  form: PncFormState;
  updateDeliveryDetails: (data: Partial<DeliveryDetails>) => void;
  updatePostPartumVisit: (data: Partial<PostPartumVisit>) => void;
  updateSixWeekVisit: (data: Partial<SixWeekVisit>) => void;
  resetForm: () => void;
}

const PncFormContext = createContext<PncFormContextType | null>(null);

/* =============================================================================
 * PROVIDER COMPONENT
 * ============================================================================= */

interface PncFormProviderProps {
  children: ReactNode;
  initialState?: PncFormState;
}

export function PncFormProvider({ children, initialState }: PncFormProviderProps) {
  const [form, dispatch] = useReducer(pncFormReducer, initialState || initialPncFormState);

  const updateDeliveryDetails = (data: Partial<DeliveryDetails>) => {
    dispatch({ type: 'UPDATE_DELIVERY_DETAILS', payload: data });
  };

  const updatePostPartumVisit = (data: Partial<PostPartumVisit>) => {
    dispatch({ type: 'UPDATE_POST_PARTUM_VISIT', payload: data });
  };

  const updateSixWeekVisit = (data: Partial<SixWeekVisit>) => {
    dispatch({ type: 'UPDATE_SIX_WEEK_VISIT', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <PncFormContext.Provider
      value={{
        form,
        updateDeliveryDetails,
        updatePostPartumVisit,
        updateSixWeekVisit,
        resetForm,
      }}
    >
      {children}
    </PncFormContext.Provider>
  );
}

/* =============================================================================
 * CUSTOM HOOK
 * ============================================================================= */

export function usePncForm(): PncFormContextType {
  const context = useContext(PncFormContext);
  if (!context) {
    throw new Error('usePncForm must be used within PncFormProvider');
  }
  return context;
}
