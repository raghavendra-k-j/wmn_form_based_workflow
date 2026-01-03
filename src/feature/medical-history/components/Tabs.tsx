import { observer } from 'mobx-react-lite';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const Tabs = observer(({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabsProps) => {
  return (
    <div className={`flex gap-0 border-b-2 border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-2 text-[12px] font-semibold transition-all uppercase tracking-wide
            ${activeTab === tab.id
              ? 'text-blue-700 border-b-2 border-blue-700 -mb-[2px] bg-white'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});

Tabs.displayName = 'Tabs';
