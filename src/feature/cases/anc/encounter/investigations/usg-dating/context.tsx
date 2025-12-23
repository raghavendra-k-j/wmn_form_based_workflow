import { createContext, useContext, useState, type ReactNode } from 'react';
import { USGDatingStore } from './store';

const USGDatingContext = createContext<USGDatingStore | null>(null);

export const USGDatingProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new USGDatingStore());
  
  return (
    <USGDatingContext.Provider value={store}>
      {children}
    </USGDatingContext.Provider>
  );
};

export const useUSGDatingStore = () => {
  const context = useContext(USGDatingContext);
  if (!context) {
    throw new Error('useUSGDatingStore must be used within a USGDatingProvider');
  }
  return context;
};
