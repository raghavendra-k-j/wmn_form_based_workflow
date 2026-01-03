import { createContext, useContext } from 'react';
import type { SurgicalHistory2Store } from './store';

const SurgicalHistory2Context = createContext<SurgicalHistory2Store | null>(null);

export const SurgicalHistory2Provider = SurgicalHistory2Context.Provider;

export const useSurgicalHistory2Store = (): SurgicalHistory2Store => {
  const store = useContext(SurgicalHistory2Context);
  if (!store) {
    throw new Error('useSurgicalHistory2Store must be used within SurgicalHistory2Provider');
  }
  return store;
};
