import { createContext, useContext } from 'react';
import type { DiagnosisStore } from './store';

const DiagnosisContext = createContext<DiagnosisStore | null>(null);

export const DiagnosisProvider = DiagnosisContext.Provider;

export const useDiagnosisStore = (): DiagnosisStore => {
  const store = useContext(DiagnosisContext);
  if (!store) {
    throw new Error('useDiagnosisStore must be used within DiagnosisProvider');
  }
  return store;
};
