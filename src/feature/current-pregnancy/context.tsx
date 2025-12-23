import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type CurrentPregnancyState,
  type CurrentPregnancyRecord,
  type OutcomeType,
  currentPregnancyReducer,
  initialCurrentPregnancyState,
  calculateGA,
  calculateGAFromEDD,
  calculateEDD,
  getTrimester,
  getDaysUntilEDD,
  getDaysUntilScanEDD,
} from './store';

/** Context Value Interface */
interface CurrentPregnancyContextValue {
  state: CurrentPregnancyState;
  pregnancy: CurrentPregnancyRecord | null;
  hasActivePregnancy: boolean;
  // LMP-based calculations
  ga: { weeks: number; days: number } | null;
  edd: string | null;
  trimester: { trimester: 1 | 2 | 3; label: string } | null;
  daysUntilEDD: number | null;
  // Scan-based calculations (if scan EDD exists)
  scanGA: { weeks: number; days: number } | null;
  scanDaysUntilEDD: number | null;
  
  // Actions
  setPregnancy: (pregnancy: CurrentPregnancyRecord | null) => void;
  updatePregnancy: (data: Partial<CurrentPregnancyRecord>) => void;
  updateScanEDD: (scanDate: string, scanEDD: string, updatedBy: string) => void;
  setEditing: (isEditing: boolean) => void;
  completePregnancy: (outcome: OutcomeType, details: Partial<CurrentPregnancyRecord>) => void;
  addNewPregnancy: (lmpDate: string, createdBy?: string) => void;
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
  
  // LMP-based calculations
  const ga = pregnancy?.lmpDate ? calculateGA(pregnancy.lmpDate) : null;
  const edd = pregnancy?.lmpDate ? calculateEDD(pregnancy.lmpDate) : null;
  const trimester = ga ? getTrimester(ga.weeks) : null;
  const daysUntilEDD = pregnancy?.lmpDate ? getDaysUntilEDD(pregnancy.lmpDate) : null;

  // Scan-based calculations
  const scanGA = pregnancy?.scanEDD ? calculateGAFromEDD(pregnancy.scanEDD) : null;
  const scanDaysUntilEDD = pregnancy?.scanEDD ? getDaysUntilScanEDD(pregnancy.scanEDD) : null;

  // Actions
  const setPregnancy = (pregnancy: CurrentPregnancyRecord | null) => {
    dispatch({ type: 'SET_PREGNANCY', payload: pregnancy });
  };

  const updatePregnancy = (data: Partial<CurrentPregnancyRecord>) => {
    dispatch({ type: 'UPDATE_PREGNANCY', payload: data });
  };

  const updateScanEDD = (scanDate: string, scanEDD: string, updatedBy: string) => {
    dispatch({ type: 'UPDATE_SCAN_EDD', payload: { scanDate, scanEDD, updatedBy } });
  };

  const setEditing = (isEditing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: isEditing });
  };

  const completePregnancy = (outcome: OutcomeType, details: Partial<CurrentPregnancyRecord>) => {
    dispatch({ type: 'COMPLETE_PREGNANCY', payload: { outcome, details } });
  };

  const addNewPregnancy = (lmpDate: string, createdBy?: string) => {
    const newPregnancy: CurrentPregnancyRecord = {
      id: `preg-${Date.now()}`,
      outcome: 'Ongoing',
      lmpDate,
      eddDate: calculateEDD(lmpDate),
      deliveryMode: 'NA',
      gender: 'NA',
      babyStatus: 'NA',
      complications: [],
      remarks: '',
      createdAt: new Date().toISOString(),
      createdBy: createdBy || 'System',
      updatedAt: new Date().toISOString(),
      updatedBy: createdBy || 'System',
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
    ga,
    edd,
    trimester,
    daysUntilEDD,
    scanGA,
    scanDaysUntilEDD,
    setPregnancy,
    updatePregnancy,
    updateScanEDD,
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
