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
  FileText,
  LayoutGrid
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGuyiniEncounterStore } from './context';
import { GuyiniEncounterTab, GuyiniEncounterTabConfig } from './store';
import { TabContent } from './tabs/renderer';

/** Grouping definitions - includes Overview as first item */
const MEDICAL_HISTORY_TABS: GuyiniEncounterTab[] = [
  GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW,
  GuyiniEncounterTab.PAST_HISTORY,
  GuyiniEncounterTab.SURGICAL_HISTORY,
  GuyiniEncounterTab.FAMILY_HISTORY,
  GuyiniEncounterTab.PERSONAL_HISTORY,
  GuyiniEncounterTab.CURRENT_MEDICATIONS,
  GuyiniEncounterTab.ALLERGIES,
];

/** Helper to check if a tab is in history group */
const isHistoryTab = (tab: GuyiniEncounterTab) => MEDICAL_HISTORY_TABS.includes(tab);

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

/** Get tab color - same as Layout 1 */
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

/** Side Nav Button - for history sub-tabs */
const SideNavButton = observer(({ tab, isActive, onClick }: { tab: GuyiniEncounterTab; isActive: boolean; onClick: () => void }) => {
  const config = GuyiniEncounterTabConfig[tab];
  const Icon = getTabIcon(tab);
  const colorClass = getTabColor(tab);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-md transition-colors cursor-pointer ${
        isActive 
          ? 'bg-slate-100 text-zinc-900' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
      }`}
    >
      <Icon className={`w-4 h-4 ${colorClass}`} />
      {config.label}
    </button>
  );
});

/** Top-level tabs config for Layout 2 */
const LAYOUT2_TOP_TABS = [
  { id: 'form', label: 'Visit Form', icon: ClipboardList, color: 'text-sky-600', tab: GuyiniEncounterTab.VISIT_FORM },
  { id: 'history', label: 'Medical History', icon: FileText, color: 'text-amber-600', tab: null }, // Group
  { id: 'exams', label: 'Examinations', icon: Stethoscope, color: 'text-indigo-600', tab: GuyiniEncounterTab.EXAMINATIONS },
  { id: 'labs', label: 'Lab Tests & Scans', icon: TestTube, color: 'text-fuchsia-600', tab: GuyiniEncounterTab.LAB_TESTS_SCANS },
  { id: 'followup', label: 'Follow Up & Fee', icon: CreditCard, color: 'text-slate-600', tab: GuyiniEncounterTab.FOLLOW_UP_FEE },
];

export const GyanyEncounterLayout2 = observer(() => {
  const store = useGuyiniEncounterStore();
  const navigate = useNavigate();
  const { patientId, encounterId, tab: urlTab } = useParams<{ patientId: string; encounterId: string; tab: string }>();
  const activeTab = store.activeTab;

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

  // Determining top-level active state
  const isHistoryActive = isHistoryTab(activeTab);

  const handleTabClick = (tabConfig: typeof LAYOUT2_TOP_TABS[0]) => {
    if (tabConfig.tab) {
      navigateToTab(tabConfig.tab);
    } else if (tabConfig.id === 'history') {
      // Default to Past History when clicking Medical History group
      navigateToTab(GuyiniEncounterTab.PAST_HISTORY);
    }
  };

  const isTabActive = (tabConfig: typeof LAYOUT2_TOP_TABS[0]) => {
    if (tabConfig.id === 'history') return isHistoryActive;
    return activeTab === tabConfig.tab;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation Bar - Same style as Layout 1 */}
      <nav className="gyany-encounter-tabs compact-scrollbar border-b border-zinc-200 bg-white">
        <div className="gyany-encounter-tabs__container flex overflow-x-auto">
          {LAYOUT2_TOP_TABS.map((tabConfig) => {
            const Icon = tabConfig.icon;
            const isActive = isTabActive(tabConfig);
            return (
              <button
                key={tabConfig.id}
                className={`gyany-encounter-tab-button ${isActive ? 'gyany-encounter-tab-button--active' : ''}`}
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
        {isHistoryActive ? (
          // Nested Layout for Medical History
          <div className="flex h-full">
            {/* Side Navigation */}
            <div className="w-56 bg-white border-r border-zinc-200 h-full overflow-y-auto py-4 px-2 flex flex-col gap-1">
              {MEDICAL_HISTORY_TABS.map(tab => (
                <SideNavButton
                  key={tab}
                  tab={tab}
                  isActive={activeTab === tab}
                  onClick={() => navigateToTab(tab)}
                />
              ))}
            </div>
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
              <TabContent tab={activeTab} />
            </div>
          </div>
        ) : (
          // Standard Content for other tabs
          <div className="h-full overflow-y-auto p-4 bg-slate-50">
            <TabContent tab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
});
