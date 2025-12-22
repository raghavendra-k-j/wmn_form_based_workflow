import { createContext, useContext, type ReactNode } from 'react';
import { PersonalHistoryStore } from './store';

/** Context for Personal History Store */
const PersonalHistoryContext = createContext<PersonalHistoryStore | null>(null);

/** Provider Props */
interface PersonalHistoryProviderProps {
  store: PersonalHistoryStore;
  children: ReactNode;
}

/**
 * Provider for Personal History Store
 */
export function PersonalHistoryProvider({ store, children }: PersonalHistoryProviderProps) {
  return (
    <PersonalHistoryContext.Provider value={store}>
      {children}
    </PersonalHistoryContext.Provider>
  );
}

/**
 * Hook to access the Personal History Store
 */
export function usePersonalHistoryStore(): PersonalHistoryStore {
  const store = useContext(PersonalHistoryContext);
  if (!store) {
    throw new Error('usePersonalHistoryStore must be used within PersonalHistoryProvider');
  }
  return store;
}
