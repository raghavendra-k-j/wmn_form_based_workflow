import { createContext, useContext, type ReactNode } from 'react';
import { SurgicalHistoryStore } from './store';

/** Context for Surgical History Store */
const SurgicalHistoryContext = createContext<SurgicalHistoryStore | null>(null);

/** Provider Props */
interface SurgicalHistoryProviderProps {
  store: SurgicalHistoryStore;
  children: ReactNode;
}

/**
 * Provider for Surgical History Store
 */
export function SurgicalHistoryProvider({ store, children }: SurgicalHistoryProviderProps) {
  return (
    <SurgicalHistoryContext.Provider value={store}>
      {children}
    </SurgicalHistoryContext.Provider>
  );
}

/**
 * Hook to access the Surgical History Store
 */
export function useSurgicalHistoryStore(): SurgicalHistoryStore {
  const store = useContext(SurgicalHistoryContext);
  if (!store) {
    throw new Error('useSurgicalHistoryStore must be used within SurgicalHistoryProvider');
  }
  return store;
}
