import { createContext, useContext, useState, type ReactNode } from 'react';
import { GuyiniEncounterStore } from './store';

/** Guyini Encounter Context Interface */
interface GuyiniEncounterContextType {
  store: GuyiniEncounterStore;
}

/** Guyini Encounter Context */
const GuyiniEncounterContext = createContext<GuyiniEncounterContextType | null>(null);

/** Guyini Encounter Provider Props */
interface GuyiniEncounterProviderProps {
  children: ReactNode;
}

/** Guyini Encounter Provider - Provides GuyiniEncounterStore to component tree */
export function GuyiniEncounterProvider({ children }: GuyiniEncounterProviderProps) {
  const [store] = useState(() => new GuyiniEncounterStore());

  return (
    <GuyiniEncounterContext.Provider value={{ store }}>
      {children}
    </GuyiniEncounterContext.Provider>
  );
}

/** Hook to access Guyini Encounter Context */
export function useGuyiniEncounterStore() {
  const context = useContext(GuyiniEncounterContext);
  if (!context) {
    throw new Error('useGuyiniEncounterStore must be used within a GuyiniEncounterProvider');
  }
  return context.store;
}

export { GuyiniEncounterContext };
