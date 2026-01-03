import { createContext, useContext } from 'react';
import type { FamilyHistory2Store } from './store';

const FamilyHistory2Context = createContext<FamilyHistory2Store | null>(null);

export const FamilyHistory2Provider = FamilyHistory2Context.Provider;

export const useFamilyHistory2Store = (): FamilyHistory2Store => {
  const store = useContext(FamilyHistory2Context);
  if (!store) {
    throw new Error('useFamilyHistory2Store must be used within FamilyHistory2Provider');
  }
  return store;
};
