import { createContext, useContext, useState, type ReactNode } from 'react';
import { LabTestsStore } from './store';

const LabTestsContext = createContext<LabTestsStore | null>(null);

export const LabTestsProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new LabTestsStore());
  
  return (
    <LabTestsContext.Provider value={store}>
      {children}
    </LabTestsContext.Provider>
  );
};

export const useLabTestsStore = () => {
  const context = useContext(LabTestsContext);
  if (!context) {
    throw new Error('useLabTestsStore must be used within a LabTestsProvider');
  }
  return context;
};
