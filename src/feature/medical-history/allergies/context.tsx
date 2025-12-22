import { createContext, useContext, type ReactNode } from 'react';
import { AllergiesStore } from './store';

const AllergiesContext = createContext<AllergiesStore | null>(null);

export function AllergiesProvider({ store, children }: { store: AllergiesStore; children: ReactNode }) {
  return (
    <AllergiesContext.Provider value={store}>
      {children}
    </AllergiesContext.Provider>
  );
}

export function useAllergiesStore(): AllergiesStore {
  const store = useContext(AllergiesContext);
  if (!store) {
    throw new Error('useAllergiesStore must be used within AllergiesProvider');
  }
  return store;
}
