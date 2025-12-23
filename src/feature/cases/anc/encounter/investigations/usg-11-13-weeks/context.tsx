import { createContext, useContext, useState, type ReactNode } from 'react';
import { USG1113WeeksStore } from './store';

const USG1113WeeksContext = createContext<USG1113WeeksStore | null>(null);

export const USG1113WeeksProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => new USG1113WeeksStore());
  
  return (
    <USG1113WeeksContext.Provider value={store}>
      {children}
    </USG1113WeeksContext.Provider>
  );
};

export const useUSG1113WeeksStore = () => {
  const context = useContext(USG1113WeeksContext);
  if (!context) {
    throw new Error('useUSG1113WeeksStore must be used within a USG1113WeeksProvider');
  }
  return context;
};
