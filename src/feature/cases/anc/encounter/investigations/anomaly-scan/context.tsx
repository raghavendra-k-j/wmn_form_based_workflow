import { createContext, useContext, useState, type ReactNode } from 'react';
import { AnomalyScanStore } from './store';

const AnomalyScanContext = createContext<AnomalyScanStore | null>(null);

export const AnomalyScanProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new AnomalyScanStore());
  
  return (
    <AnomalyScanContext.Provider value={store}>
      {children}
    </AnomalyScanContext.Provider>
  );
};

export const useAnomalyScanStore = () => {
  const context = useContext(AnomalyScanContext);
  if (!context) {
    throw new Error('useAnomalyScanStore must be used within a AnomalyScanProvider');
  }
  return context;
};
