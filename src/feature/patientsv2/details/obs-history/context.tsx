import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  type ObstetricHistoryState,
  type ObstetricHistoryAction,
  type PregnancyRecord,
  initialObstetricHistoryState,
  obstetricHistoryReducer,
} from './store';

/** Context Value Type */
interface ObstetricHistoryContextValue {
  // State
  mode: ObstetricHistoryState['mode'];
  records: PregnancyRecord[];
  isEditMode: boolean;

  // Actions
  setMode: (mode: 'view' | 'edit') => void;
  addRecord: (record: PregnancyRecord) => void;
  updateRecord: (record: PregnancyRecord) => void;
  deleteRecord: (id: string) => void;
  setRecords: (records: PregnancyRecord[]) => void;
}

/** Create Context */
const ObstetricHistoryContext = createContext<ObstetricHistoryContextValue | null>(null);

/** Provider Props */
interface ObstetricHistoryProviderProps {
  children: ReactNode;
  initialMode?: 'view' | 'edit';
}

/** Provider Component */
export function ObstetricHistoryProvider({ children, initialMode = 'view' }: ObstetricHistoryProviderProps) {
  const [state, dispatch] = useReducer(obstetricHistoryReducer, {
    ...initialObstetricHistoryState,
    mode: initialMode,
  });

  const value: ObstetricHistoryContextValue = {
    // State
    mode: state.mode,
    records: state.records,
    isEditMode: state.mode === 'edit',

    // Actions
    setMode: (mode) => dispatch({ type: 'SET_MODE', payload: mode }),
    addRecord: (record) => dispatch({ type: 'ADD_RECORD', payload: record }),
    updateRecord: (record) => dispatch({ type: 'UPDATE_RECORD', payload: record }),
    deleteRecord: (id) => dispatch({ type: 'DELETE_RECORD', payload: id }),
    setRecords: (records) => dispatch({ type: 'SET_RECORDS', payload: records }),
  };

  return (
    <ObstetricHistoryContext.Provider value={value}>
      {children}
    </ObstetricHistoryContext.Provider>
  );
}

/** Hook to use context */
export function useObstetricHistory() {
  const context = useContext(ObstetricHistoryContext);
  if (!context) {
    throw new Error('useObstetricHistory must be used within an ObstetricHistoryProvider');
  }
  return context;
}
