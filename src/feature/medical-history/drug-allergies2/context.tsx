import { createContext, useContext } from 'react';
import type { DrugAllergies2Store } from './store';

const DrugAllergies2Context = createContext<DrugAllergies2Store | null>(null);

export const DrugAllergies2Provider = DrugAllergies2Context.Provider;

export const useDrugAllergies2Store = (): DrugAllergies2Store => {
  const store = useContext(DrugAllergies2Context);
  if (!store) {
    throw new Error('useDrugAllergies2Store must be used within DrugAllergies2Provider');
  }
  return store;
};
