import { createContext, useContext, type ReactNode } from 'react';
import { FamilyHistoryStore } from './store';

/** Context for Family History Store */
const FamilyHistoryContext = createContext<FamilyHistoryStore | null>(null);

/** Provider Props */
interface FamilyHistoryProviderProps {
  store: FamilyHistoryStore;
  children: ReactNode;
}

/**
 * Provider for Family History Store
 */
export function FamilyHistoryProvider({ store, children }: FamilyHistoryProviderProps) {
  return (
    <FamilyHistoryContext.Provider value={store}>
      {children}
    </FamilyHistoryContext.Provider>
  );
}

/**
 * Hook to access the Family History Store
 */
export function useFamilyHistoryStore(): FamilyHistoryStore {
  const store = useContext(FamilyHistoryContext);
  if (!store) {
    throw new Error('useFamilyHistoryStore must be used within FamilyHistoryProvider');
  }
  return store;
}
