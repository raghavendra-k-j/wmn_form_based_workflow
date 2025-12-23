import { createContext, useContext, useState, type ReactNode } from 'react';
import { AncEncounterStore } from './store';

/** ANC Encounter Context Interface */
interface AncEncounterContextType {
  store: AncEncounterStore;
}

/** ANC Encounter Context */
const AncEncounterContext = createContext<AncEncounterContextType | null>(null);

/** ANC Encounter Provider Props */
interface AncEncounterProviderProps {
  children: ReactNode;
}

/** ANC Encounter Provider - Provides AncEncounterStore to component tree */
export function AncEncounterProvider({ children }: AncEncounterProviderProps) {
  const [store] = useState(() => new AncEncounterStore());

  return (
    <AncEncounterContext.Provider value={{ store }}>
      {children}
    </AncEncounterContext.Provider>
  );
}

/** Hook to access ANC Encounter Store */
export function useAncEncounterStore() {
  const context = useContext(AncEncounterContext);
  if (!context) {
    throw new Error('useAncEncounterStore must be used within an AncEncounterProvider');
  }
  return context.store;
}

export { AncEncounterContext };
