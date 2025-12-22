import { createContext, useContext, type ReactNode } from 'react';
import { CurrentMedicationStore } from './store';

const CurrentMedicationContext = createContext<CurrentMedicationStore | null>(null);

interface CurrentMedicationProviderProps {
  store: CurrentMedicationStore;
  children: ReactNode;
}

export function CurrentMedicationProvider({ store, children }: CurrentMedicationProviderProps) {
  return (
    <CurrentMedicationContext.Provider value={store}>
      {children}
    </CurrentMedicationContext.Provider>
  );
}

export function useCurrentMedicationStore(): CurrentMedicationStore {
  const store = useContext(CurrentMedicationContext);
  if (!store) {
    throw new Error('useCurrentMedicationStore must be used within CurrentMedicationProvider');
  }
  return store;
}
