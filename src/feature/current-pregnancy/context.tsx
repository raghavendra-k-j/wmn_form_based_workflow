import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type CurrentPregnancyState,
  type CurrentPregnancyRecord,
  type OutcomeType,
  type EDDSource,
  currentPregnancyReducer,
  initialCurrentPregnancyState,
  getEstimatedEDD,
  getEstimatedEDDSource,
  getFinalEDD,
  getFinalEDDSource,
} from './store';

/** Context Value Interface */
interface CurrentPregnancyContextValue {
  state: CurrentPregnancyState;
  pregnancy: CurrentPregnancyRecord | null;
  hasActivePregnancy: boolean;
  
  // Calculated values
  estimatedEDD: string | null;       // EDD from Scan or LMP
  estimatedEDDSource: 'lmp' | 'scan' | null;  // Source of estimated EDD
  finalEDD: string | null;           // Final EDD (corrected if present, else estimated)
  finalEDDSource: EDDSource | null;  // Source of final EDD
  
  // Actions
  setPregnancy: (pregnancy: CurrentPregnancyRecord | null) => void;
  updatePregnancy: (data: Partial<CurrentPregnancyRecord>) => void;
  setEditing: (isEditing: boolean) => void;
  completePregnancy: (outcome: OutcomeType, details: Partial<CurrentPregnancyRecord>) => void;
  addNewPregnancy: (data: {
    lmpDate: string;
    scanEDD?: string;
    hasCorrectedEDD?: boolean;
    correctedEDD?: string;
    createdBy?: string;
  }) => void;
  reset: () => void;
}

/** Create Context */
const CurrentPregnancyContext = createContext<CurrentPregnancyContextValue | null>(null);

/** Provider Props */
interface CurrentPregnancyProviderProps {
  children: ReactNode;
  initialPregnancy?: CurrentPregnancyRecord | null;
}

/** Provider Component */
export function CurrentPregnancyProvider({ children, initialPregnancy = null }: CurrentPregnancyProviderProps) {
  const [state, dispatch] = useReducer(currentPregnancyReducer, {
    ...initialCurrentPregnancyState,
    pregnancy: initialPregnancy,
  });

  const { pregnancy } = state;
  const hasActivePregnancy = pregnancy !== null && pregnancy.outcome === 'Ongoing';
  
  // Calculated values
  const estimatedEDD = pregnancy ? getEstimatedEDD(pregnancy) : null;
  const estimatedEDDSource = pregnancy ? getEstimatedEDDSource(pregnancy) : null;
  const finalEDD = pregnancy ? getFinalEDD(pregnancy) : null;
  const finalEDDSource = pregnancy ? getFinalEDDSource(pregnancy) : null;

  // Actions
  const setPregnancy = (pregnancy: CurrentPregnancyRecord | null) => {
    dispatch({ type: 'SET_PREGNANCY', payload: pregnancy });
  };

  const updatePregnancy = (data: Partial<CurrentPregnancyRecord>) => {
    dispatch({ type: 'UPDATE_PREGNANCY', payload: data });
  };

  const setEditing = (isEditing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: isEditing });
  };

  const completePregnancy = (outcome: OutcomeType, details: Partial<CurrentPregnancyRecord>) => {
    dispatch({ type: 'COMPLETE_PREGNANCY', payload: { outcome, details } });
  };

  const addNewPregnancy = (data: {
    lmpDate: string;
    scanEDD?: string;
    hasCorrectedEDD?: boolean;
    correctedEDD?: string;
    createdBy?: string;
  }) => {
    const newPregnancy: CurrentPregnancyRecord = {
      id: `preg-${Date.now()}`,
      outcome: 'Ongoing',
      lmpDate: data.lmpDate,
      scanEDD: data.scanEDD,
      hasCorrectedEDD: data.hasCorrectedEDD || false,
      correctedEDD: data.correctedEDD,
      deliveryMode: 'NA',
      gender: 'NA',
      babyStatus: 'NA',
      remarks: '',
      createdAt: new Date().toISOString(),
      createdBy: data.createdBy || 'System',
      updatedAt: new Date().toISOString(),
      updatedBy: data.createdBy || 'System',
    };
    dispatch({ type: 'SET_PREGNANCY', payload: newPregnancy });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const value: CurrentPregnancyContextValue = {
    state,
    pregnancy,
    hasActivePregnancy,
    estimatedEDD,
    estimatedEDDSource,
    finalEDD,
    finalEDDSource,
    setPregnancy,
    updatePregnancy,
    setEditing,
    completePregnancy,
    addNewPregnancy,
    reset,
  };

  return (
    <CurrentPregnancyContext.Provider value={value}>
      {children}
    </CurrentPregnancyContext.Provider>
  );
}

/** Hook to use context */
export function useCurrentPregnancy() {
  const context = useContext(CurrentPregnancyContext);
  if (!context) {
    throw new Error('useCurrentPregnancy must be used within CurrentPregnancyProvider');
  }
  return context;
}
