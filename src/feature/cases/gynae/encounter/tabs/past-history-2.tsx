import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  PastHistory2Store,
  PastHistory2Provider,
  PastHistory2View,
} from '../../../../medical-history/past-history-2';

/** Past History 2 Tab Content (Demo with ADD/List tabs) */
export const PastHistory2Content = observer(() => {
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
