import { observer } from 'mobx-react-lite';
import { useDiagnosisStore } from './context';
import { AddView } from './components/add-view';
import { HistoryView } from './components/history-view';

const tabs = [
  { id: 'add' as const, label: 'Current' },
  { id: 'history' as const, label: 'Previous' },
];

export const DiagnosisView = observer(() => {
  const store = useDiagnosisStore();

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => store.setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-[1px]
              ${store.activeTab === tab.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {store.activeTab === 'add' && <AddView />}
      {store.activeTab === 'history' && <HistoryView />}
    </div>
  );
});

DiagnosisView.displayName = 'DiagnosisView';
