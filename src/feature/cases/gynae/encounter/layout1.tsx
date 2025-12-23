import { 
  ClipboardList, 
  History, 
  Activity, 
  Users, 
  User, 
  Pill, 
  AlertTriangle, 
  Stethoscope, 
  TestTube, 
  CreditCard,
  LayoutGrid,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGuyiniEncounterStore } from './context';
import { GuyiniEncounterTab, GuyiniEncounterTabConfig, GuyiniEncounterTabList } from './store';
import { TabContent } from './tabs/renderer';

/** Tab Icon Mapping */
const getTabIcon = (tab: GuyiniEncounterTab) => {
  switch (tab) {
    case GuyiniEncounterTab.VISIT_FORM: return ClipboardList;
    case GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW: return LayoutGrid;
    case GuyiniEncounterTab.PAST_HISTORY: return History;
    case GuyiniEncounterTab.SURGICAL_HISTORY: return Activity;
    case GuyiniEncounterTab.FAMILY_HISTORY: return Users;
    case GuyiniEncounterTab.PERSONAL_HISTORY: return User;
    case GuyiniEncounterTab.CURRENT_MEDICATIONS: return Pill;
    case GuyiniEncounterTab.ALLERGIES: return AlertTriangle;
    case GuyiniEncounterTab.EXAMINATIONS: return Stethoscope;
    case GuyiniEncounterTab.LAB_TESTS_SCANS: return TestTube;
    case GuyiniEncounterTab.FOLLOW_UP_FEE: return CreditCard;
    default: return ClipboardList;
  }
};

const getTabColor = (tab: GuyiniEncounterTab) => {
  switch (tab) {
    case GuyiniEncounterTab.VISIT_FORM: return 'text-sky-600';
    case GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW: return 'text-orange-600';
    case GuyiniEncounterTab.PAST_HISTORY: return 'text-amber-600';
    case GuyiniEncounterTab.SURGICAL_HISTORY: return 'text-blue-600';
    case GuyiniEncounterTab.FAMILY_HISTORY: return 'text-emerald-600';
    case GuyiniEncounterTab.PERSONAL_HISTORY: return 'text-violet-600';
    case GuyiniEncounterTab.CURRENT_MEDICATIONS: return 'text-teal-600';
    case GuyiniEncounterTab.ALLERGIES: return 'text-red-600';
    case GuyiniEncounterTab.EXAMINATIONS: return 'text-indigo-600';
    case GuyiniEncounterTab.LAB_TESTS_SCANS: return 'text-fuchsia-600';
    case GuyiniEncounterTab.FOLLOW_UP_FEE: return 'text-slate-600';
    default: return 'text-slate-600';
  }
};

const TabButton = observer(({ tab, isActive, onClick }: { tab: GuyiniEncounterTab; isActive: boolean; onClick: (t: GuyiniEncounterTab) => void }) => {
  const config = GuyiniEncounterTabConfig[tab];
  const Icon = getTabIcon(tab);
  const colorClass = getTabColor(tab);
  
  return (
    <button
      className={`gyany-encounter-tab-button cursor-pointer ${isActive ? 'gyany-encounter-tab-button--active' : ''}`}
      onClick={() => onClick(tab)}
      type="button"
    >
      <Icon className={`w-4 h-4 ${colorClass}`} />
      {config.label}
    </button>
  );
});

export const GyanyEncounterLayout1 = observer(() => {
  const store = useGuyiniEncounterStore();
  const navigate = useNavigate();
  const { patientId, encounterId, tab: urlTab } = useParams<{ patientId: string; encounterId: string; tab: string }>();

  // Sync tab from URL on mount or URL change
  useEffect(() => {
    if (urlTab && Object.values(GuyiniEncounterTab).includes(urlTab as GuyiniEncounterTab)) {
      store.setActiveTab(urlTab as GuyiniEncounterTab);
    }
  }, [urlTab, store]);

  // Navigate to tab URL
  const navigateToTab = (tab: GuyiniEncounterTab) => {
    store.setActiveTab(tab);
    navigate(`/patientv3/${patientId}/gynae/${encounterId}/${tab}`, { replace: true });
  };

  return (
    <div className="gyany-encounter-layout h-full flex flex-col bg-white">
      {/* Header handled by parent or here? Parent handles generic header, but here we do tab navigation */}
       {/* Tab Navigation */}
      <nav className="gyany-encounter-tabs compact-scrollbar border-b border-zinc-200 bg-white">
        <div className="gyany-encounter-tabs__container flex overflow-x-auto">
          {GuyiniEncounterTabList
            .filter(tab => tab !== GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW)
            .map((tab) => (
            <TabButton
              key={tab}
              tab={tab}
              isActive={store.activeTab === tab}
              onClick={(t) => navigateToTab(t)}
            />
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <main className="gyany-encounter-content flex-1 overflow-y-auto p-4 bg-slate-50">
        <TabContent tab={store.activeTab} />
      </main>
    </div>
  );
});

