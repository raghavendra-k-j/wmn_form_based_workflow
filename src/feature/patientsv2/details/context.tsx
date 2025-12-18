import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { PatientDetailsStore } from './store.ts';

/** Patient Details Context Interface */
interface PatientDetailsContextType {
  store: PatientDetailsStore;
}

/** Patient Details Context */
const PatientDetailsContext = createContext<PatientDetailsContextType | null>(null);

/** Patient Details Provider Props */
interface PatientDetailsProviderProps {
  children: ReactNode;
  patientId: string;
}

/** Patient Details Provider */
export function PatientDetailsProvider({ children, patientId }: PatientDetailsProviderProps) {
  const [store] = useState(() => new PatientDetailsStore(patientId));
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Subscribe to store changes to trigger re-renders
    return store.subscribe(() => forceUpdate({}));
  }, [store]);

  return (
    <PatientDetailsContext.Provider key={patientId} value={{ store }}>
      {children}
    </PatientDetailsContext.Provider>
  );
}


/** Hook to access Patient Details Context */
export function usePatientDetails() {
  const context = useContext(PatientDetailsContext);
  if (!context) {
    throw new Error('usePatientDetails must be used within a PatientDetailsProvider');
  }
  return context;
}

export { PatientDetailsContext };
