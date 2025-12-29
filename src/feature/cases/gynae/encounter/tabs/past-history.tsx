import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PastHistory2Store,
  PastHistory2Provider,
  PastHistory2View,
} from '../../../../medical-history/past-history';

/** Past History Tab Content */
export const PastHistoryContent = observer(() => {
  // Create store instance with initialization
  const store = useMemo(() => {
    const s = new PastHistory2Store();
    s.initialize();
    return s;
  }, []);

  return (
    <PastHistory2Provider store={store}>
      <PastHistory2View />
    </PastHistory2Provider>
  );
});
