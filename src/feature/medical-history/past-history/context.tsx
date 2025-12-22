import { createContext, useContext, type ReactNode } from 'react';
import { PastHistoryStore } from './store';

/** Context for Past History Store */
const PastHistoryContext = createContext<PastHistoryStore | null>(null);

/** Provider Props */
interface PastHistoryProviderProps {
  store: PastHistoryStore;
  children: ReactNode;
}

/**
 * Provider for Past History Store
 * Allows embedding the component anywhere with its own store instance
 */
export function PastHistoryProvider({ store, children }: PastHistoryProviderProps) {
  return (
    <PastHistoryContext.Provider value={store}>
      {children}
    </PastHistoryContext.Provider>
  );
}

/**
 * Hook to access the Past History Store
 * Must be used within PastHistoryProvider
 */
export function usePastHistoryStore(): PastHistoryStore {
  const store = useContext(PastHistoryContext);
  if (!store) {
    throw new Error('usePastHistoryStore must be used within PastHistoryProvider');
  }
  return store;
}
