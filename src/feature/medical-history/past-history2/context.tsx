import { createContext, useContext, type ReactNode } from 'react';
import { PastHistory2Store } from './store';

const PastHistory2Context = createContext<PastHistory2Store | null>(null);

interface PastHistory2ProviderProps {
  store: PastHistory2Store;
  children: ReactNode;
}

export function PastHistory2Provider({ store, children }: PastHistory2ProviderProps) {
  return (
    <PastHistory2Context.Provider value={store}>
      {children}
    </PastHistory2Context.Provider>
  );
}

export function usePastHistory2Store(): PastHistory2Store {
  const store = useContext(PastHistory2Context);
  if (!store) {
    throw new Error('usePastHistory2Store must be used within PastHistory2Provider');
  }
  return store;
}
