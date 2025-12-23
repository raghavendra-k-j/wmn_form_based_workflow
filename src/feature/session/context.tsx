import { createContext, useContext, type ReactNode } from 'react';
import { SessionStore, sessionStore } from './store';

/** Session context type */
interface SessionContextType {
  store: SessionStore;
}

/** Session context */
const SessionContext = createContext<SessionContextType | null>(null);

/** Session provider props */
interface SessionProviderProps {
  children: ReactNode;
}

/** 
 * Session Provider - Wraps the app to provide session context
 * Uses singleton store for consistent state across the app
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={{ store: sessionStore }}>
      {children}
    </SessionContext.Provider>
  );
}

/** 
 * Hook to access session store
 * @throws Error if used outside SessionProvider
 */
export function useSession(): SessionStore {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context.store;
}

export { SessionContext };
