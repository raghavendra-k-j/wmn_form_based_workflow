import { createContext, useContext, useState, type ReactNode } from 'react';
import { PncEncounterStore } from './store';

/** PNC Encounter Context Interface */
interface PncEncounterContextType {
  store: PncEncounterStore;
}

/** PNC Encounter Context */
const PncEncounterContext = createContext<PncEncounterContextType | null>(null);

/** PNC Encounter Provider Props */
interface PncEncounterProviderProps {
  children: ReactNode;
}

/** PNC Encounter Provider - Provides PncEncounterStore to component tree */
export function PncEncounterProvider({ children }: PncEncounterProviderProps) {
  const [store] = useState(() => new PncEncounterStore());

  return (
    <PncEncounterContext.Provider value={{ store }}>
      {children}
    </PncEncounterContext.Provider>
  );
}

/** Hook to access PNC Encounter Context */
export function usePncEncounterStore() {
  const context = useContext(PncEncounterContext);
  if (!context) {
    throw new Error('usePncEncounterStore must be used within a PncEncounterProvider');
  }
  return context.store;
}

export { PncEncounterContext };
