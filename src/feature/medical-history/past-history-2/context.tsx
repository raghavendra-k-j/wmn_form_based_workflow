import { createContext, useContext, type ReactNode } from 'react';
import { PastHistory2Store } from './store';

/** Context for Past History 2 Store */
const PastHistory2Context = createContext<PastHistory2Store | null>(null);

/** Provider Props */
interface PastHistory2ProviderProps {
  store: PastHistory2Store;
  children: ReactNode;
}

/**
 * Provider for Past History 2 Store
 * Allows embedding the component anywhere with its own store instance
 */
export function PastHistory2Provider({ store, children }: PastHistory2ProviderProps) {
  return (
    <PastHistory2Context.Provider value={store}>
      {children}
    </PastHistory2Context.Provider>
  );
}

/**
 * Hook to access the Past History 2 Store
 * Must be used within PastHistory2Provider
 */
export function usePastHistory2Store(): PastHistory2Store {
  const store = useContext(PastHistory2Context);
  if (!store) {
    throw new Error('usePastHistory2Store must be used within PastHistory2Provider');
  }
  return store;
}
