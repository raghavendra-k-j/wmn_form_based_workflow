import { 
  Baby, 
  Stethoscope, 
  Calendar,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { usePncEncounterStore } from './context';
import { PncEncounterTab } from './store';
import { TabContent } from './tabs/renderer';

/** Top-level tabs config for PNC Layout */
const PNC_TABS = [
  { id: 'delivery', label: 'Delivery Info', icon: Baby, color: 'text-rose-600', tab: PncEncounterTab.DELIVERY_INFO },
  { id: 'postpartum', label: 'Postpartum Visit', icon: Stethoscope, color: 'text-indigo-600', tab: PncEncounterTab.POSTPARTUM_VISIT },
  { id: 'sixweeks', label: '6 Weeks Visit', icon: Calendar, color: 'text-emerald-600', tab: PncEncounterTab.SIX_WEEKS_VISIT },
];

export const PncEncounterLayout = observer(() => {
  const store = usePncEncounterStore();
  const navigate = useNavigate();
  const { patientId, encounterId, tab: urlTab } = useParams<{ patientId: string; encounterId: string; tab: string }>();
  const activeTab = store.activeTab;

  // Sync tab from URL on mount or URL change
  useEffect(() => {
    if (urlTab && Object.values(PncEncounterTab).includes(urlTab as PncEncounterTab)) {
      store.setActiveTab(urlTab as PncEncounterTab);
    }
  }, [urlTab, store]);

  // Navigate to tab URL
  const navigateToTab = (tab: PncEncounterTab) => {
    store.setActiveTab(tab);
    navigate(`/patientv3/${patientId}/pnc/${encounterId}/${tab}`, { replace: true });
  };

  const handleTabClick = (tabConfig: typeof PNC_TABS[0]) => {
    navigateToTab(tabConfig.tab);
  };

  const isTabActive = (tabConfig: typeof PNC_TABS[0]) => {
    return activeTab === tabConfig.tab;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation Bar */}
      <nav className="pnc-encounter-tabs compact-scrollbar border-b border-zinc-200 bg-white">
        <div className="pnc-encounter-tabs__container flex overflow-x-auto">
          {PNC_TABS.map((tabConfig) => {
            const Icon = tabConfig.icon;
            const isActive = isTabActive(tabConfig);
            return (
              <button
                key={tabConfig.id}
                className={`pnc-encounter-tab-button ${isActive ? 'pnc-encounter-tab-button--active' : ''}`}
                onClick={() => handleTabClick(tabConfig)}
                type="button"
              >
                <Icon className={`w-4 h-4 ${tabConfig.color}`} />
                {tabConfig.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 bg-slate-50">
          <TabContent tab={activeTab} />
        </div>
      </div>
    </div>
  );
});
