import { createContext, useContext, type ReactNode, useMemo } from 'react';
import { PreviousPregnanciesStore } from './store';

/** Context for Previous Pregnancies Store */
const PreviousPregnanciesContext = createContext<PreviousPregnanciesStore | null>(null);

/** Provider Props */
interface PreviousPregnanciesProviderProps {
  children: ReactNode;
  store?: PreviousPregnanciesStore;
}

/**
 * Provider Component for Previous Pregnancies
 * Can accept an external store or create a new one
 */
export function PreviousPregnanciesProvider({ children, store }: PreviousPregnanciesProviderProps) {
  // Create or use provided store
  const storeInstance = useMemo(() => store ?? new PreviousPregnanciesStore(), [store]);

  return (
    <PreviousPregnanciesContext.Provider value={storeInstance}>
      {children}
    </PreviousPregnanciesContext.Provider>
  );
}

/** Hook to use the Previous Pregnancies Store */
export function usePreviousPregnanciesStore(): PreviousPregnanciesStore {
  const context = useContext(PreviousPregnanciesContext);
  if (!context) {
    throw new Error('usePreviousPregnanciesStore must be used within a PreviousPregnanciesProvider');
  }
  return context;
}
