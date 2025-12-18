import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import {
  medicalHistoryReducer,
  initialMedicalHistoryState,
  type MedicalHistoryState,
  type MedicalHistoryAction,
  type MedicalHistoryMode,
  type PastHistoryItem,
  type PersonalHistoryItem,
  type FamilyHistoryItem,
} from './store';

/** Context Value Type */
interface MedicalHistoryContextValue {
  state: MedicalHistoryState;
  dispatch: Dispatch<MedicalHistoryAction>;
}

/** React Context */
const MedicalHistoryContext = createContext<MedicalHistoryContextValue | null>(null);

/** Provider Props */
interface MedicalHistoryProviderProps {
  children: ReactNode;
  initialMode?: MedicalHistoryMode;
}

/** Medical History Provider */
export function MedicalHistoryProvider({ children, initialMode = 'view' }: MedicalHistoryProviderProps) {
  const [state, dispatch] = useReducer(medicalHistoryReducer, {
    ...initialMedicalHistoryState,
    mode: initialMode,
  });

  return (
    <MedicalHistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </MedicalHistoryContext.Provider>
  );
}

/** Hook to access raw context */
function useMedicalHistoryContext() {
  const context = useContext(MedicalHistoryContext);
  if (!context) {
    throw new Error('useMedicalHistoryContext must be used within MedicalHistoryProvider');
  }
  return context;
}

/** Main hook for accessing medical history state and actions */
export function useMedicalHistory() {
  const { state, dispatch } = useMedicalHistoryContext();

  return {
    // State
    mode: state.mode,
    isEditMode: state.mode === 'edit',
    isViewMode: state.mode === 'view',
    expandedSections: state.expandedSections,
    data: state.data,

    // Actions
    setMode: (mode: MedicalHistoryMode) => dispatch({ type: 'SET_MODE', payload: mode }),
    toggleSection: (sectionId: string) => dispatch({ type: 'TOGGLE_SECTION', payload: sectionId }),
    expandAll: () => dispatch({ type: 'EXPAND_ALL' }),
    collapseAll: () => dispatch({ type: 'COLLAPSE_ALL' }),
    updatePastHistory: (items: PastHistoryItem[]) => dispatch({ type: 'UPDATE_PAST_HISTORY', payload: items }),
    updatePersonalHistory: (items: PersonalHistoryItem[]) => dispatch({ type: 'UPDATE_PERSONAL_HISTORY', payload: items }),
    updateFamilyHistory: (items: FamilyHistoryItem[]) => dispatch({ type: 'UPDATE_FAMILY_HISTORY', payload: items }),
    updatePresentMedication: (value: string) => dispatch({ type: 'UPDATE_PRESENT_MEDICATION', payload: value }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
