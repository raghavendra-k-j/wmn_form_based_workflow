import { observer } from 'mobx-react-lite';
import { useDrugAllergies2Store } from './context';
import { Tabs } from '../components';
import { AddView } from './components/add-view';
import { ListView } from './components/list-view';

export const DrugAllergies2View = observer(() => {
  const store = useDrugAllergies2Store();

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

DrugAllergies2View.displayName = 'DrugAllergies2View';
