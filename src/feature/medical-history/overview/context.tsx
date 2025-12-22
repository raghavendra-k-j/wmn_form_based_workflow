import { createContext, useContext, type ReactNode } from 'react';
import { MedicalHistoryOverviewStore } from './store';

const OverviewContext = createContext<MedicalHistoryOverviewStore | null>(null);

export function MedicalHistoryOverviewProvider({ store, children }: { store: MedicalHistoryOverviewStore; children: ReactNode }) {
  return (
    <OverviewContext.Provider value={store}>
      {children}
    </OverviewContext.Provider>
  );
}

export function useMedicalHistoryOverviewStore(): MedicalHistoryOverviewStore {
  const store = useContext(OverviewContext);
  if (!store) {
    throw new Error('useMedicalHistoryOverviewStore must be used within MedicalHistoryOverviewProvider');
  }
  return store;
}
