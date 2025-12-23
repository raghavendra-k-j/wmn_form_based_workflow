import { createContext, useContext, useState, type ReactNode } from 'react';
import { GrowthScanStore } from './store';

const GrowthScanContext = createContext<GrowthScanStore | null>(null);

export const GrowthScanProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new GrowthScanStore());
  
  return (
    <GrowthScanContext.Provider value={store}>
      {children}
    </GrowthScanContext.Provider>
  );
};

export const useGrowthScanStore = () => {
  const context = useContext(GrowthScanContext);
  if (!context) {
    throw new Error('useGrowthScanStore must be used within a GrowthScanProvider');
  }
  return context;
};
