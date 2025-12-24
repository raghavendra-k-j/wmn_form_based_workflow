import { createContext, useContext, type ReactNode } from 'react';
import { DrugAllergiesStore } from './store';

const DrugAllergiesContext = createContext<DrugAllergiesStore | null>(null);

export function DrugAllergiesProvider({ store, children }: { store: DrugAllergiesStore; children: ReactNode }) {
  return (
    <DrugAllergiesContext.Provider value={store}>
      {children}
    </DrugAllergiesContext.Provider>
  );
}

export function useDrugAllergiesStore(): DrugAllergiesStore {
  const store = useContext(DrugAllergiesContext);
  if (!store) {
    throw new Error('useDrugAllergiesStore must be used within DrugAllergiesProvider');
  }
  return store;
}
