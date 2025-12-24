import { createContext, useContext, type ReactNode } from 'react';
import { makeAutoObservable } from 'mobx';

/** Fetus Type Options */
export type FetusType = 'single' | 'twins' | 'triplets' | 'multiple';

/** Shared Fetus Store - Holds fetus count across all investigation modules */
export class FetusStore {
  fetusType: FetusType = 'single';
  customFetusCount: number = 4; // For 'multiple' type (4-10)

  constructor() {
    makeAutoObservable(this);
  }

  setFetusType(type: FetusType) {
    this.fetusType = type;
  }

  setCustomFetusCount(count: number) {
    if (count < 4) count = 4;
    if (count > 10) count = 10;
    this.customFetusCount = count;
  }

  /** Get the actual fetus count based on type */
  get fetusCount(): number {
    switch (this.fetusType) {
      case 'single': return 1;
      case 'twins': return 2;
      case 'triplets': return 3;
      case 'multiple': return this.customFetusCount;
      default: return 1;
    }
  }
}

// Singleton instance
const fetusStoreInstance = new FetusStore();

// Context
const FetusContext = createContext<FetusStore | null>(null);

/** Provider Component */
export function FetusProvider({ children }: { children: ReactNode }) {
  return (
    <FetusContext.Provider value={fetusStoreInstance}>
      {children}
    </FetusContext.Provider>
  );
}

/** Hook to access fetus store */
export function useFetusStore(): FetusStore {
  const store = useContext(FetusContext);
  if (!store) {
    throw new Error('useFetusStore must be used within a FetusProvider');
  }
  return store;
}

/** Export the singleton for direct access if needed */
export { fetusStoreInstance };
