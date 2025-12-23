import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { PatientV3Store } from './store';

/** Patient V3 Context Interface */
interface PatientV3ContextType {
  store: PatientV3Store;
}

/** Patient V3 Context */
const PatientV3Context = createContext<PatientV3ContextType | null>(null);

/** Patient V3 Provider Props */
interface PatientV3ProviderProps {
  children: ReactNode;
  patientId: string;
}

/** Patient V3 Provider */
export function PatientV3Provider({ children, patientId }: PatientV3ProviderProps) {
  const [store] = useState(() => new PatientV3Store(patientId));
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Subscribe to store changes to trigger re-renders
    return store.subscribe(() => forceUpdate({}));
  }, [store]);

  return (
    <PatientV3Context.Provider key={patientId} value={{ store }}>
      {children}
    </PatientV3Context.Provider>
  );
}

/** Hook to access Patient V3 Context */
export function usePatientV3() {
  const context = useContext(PatientV3Context);
  if (!context) {
    throw new Error('usePatientV3 must be used within a PatientV3Provider');
  }
  return context;
}

export { PatientV3Context };
