import { observer } from 'mobx-react-lite';
import { useFamilyHistory2Store } from './context';
import { Tabs } from '../components';
import { AddView } from './components/add-view';
import { ListView } from './components/list-view';

export const FamilyHistory2View = observer(() => {
  const store = useFamilyHistory2Store();

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

FamilyHistory2View.displayName = 'FamilyHistory2View';
