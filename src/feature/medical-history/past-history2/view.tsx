import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { usePastHistory2Store } from './context';
import { Tabs } from '../components';
import { AddView } from './components/add-view';
import { ListView } from './components/list-view';

export const PastHistory2View = observer(() => {
  const store = usePastHistory2Store();

  useEffect(() => {
    store.initialize();
  }, [store]);

  const tabs = [
    { id: 'add', label: 'ADD' },
    { id: 'list', label: 'List' },
  ];

  if (store.masterDataLoading === 'loading' || store.recordsLoading === 'loading') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[13px] text-gray-500">Loading...</div>
      </div>
    );
  }

  if (store.masterDataLoading === 'error') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[13px] text-red-600">Failed to load past history data</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs
        tabs={tabs}
        activeTab={store.activeTab}
        onTabChange={(tabId) => store.setActiveTab(tabId as any)}
      />

      <div className="pb-4">
        {store.activeTab === 'add' ? <AddView /> : <ListView />}
      </div>
    </div>
  );
});

PastHistory2View.displayName = 'PastHistory2View';
