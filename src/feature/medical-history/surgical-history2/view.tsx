import { observer } from 'mobx-react-lite';
import { useSurgicalHistory2Store } from './context';
import { Tabs } from '../components';
import { AddView } from './components/add-view';
import { ListView } from './components/list-view';

export const SurgicalHistory2View = observer(() => {
  const store = useSurgicalHistory2Store();

  const tabs = [
    { id: 'add' as const, label: 'Add' },
    { id: 'list' as const, label: 'List' },
  ];

  return (
    <div className="space-y-4">
      <Tabs
        tabs={tabs}
        activeTab={store.activeTab}
        onTabChange={(tab) => store.setActiveTab(tab as 'add' | 'list')}
      />

      {store.activeTab === 'add' && <AddView />}
      {store.activeTab === 'list' && <ListView />}
    </div>
  );
});

SurgicalHistory2View.displayName = 'SurgicalHistory2View';
