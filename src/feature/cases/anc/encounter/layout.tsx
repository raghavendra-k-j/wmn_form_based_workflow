import { 
  CalendarDays,
  FlaskConical,
  TestTube,
  Baby,
  Scan,
  Activity,
  TrendingUp,
  FileSearch,
  Plus,
  ArrowLeft,
  CalendarPlus,
  History,
  LayoutGrid,
  AlertTriangle,
  Users,
  User,
  ClipboardList,
  Pill,
  Stethoscope,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAncEncounterStore } from './context';
import { 
  AncEncounterTab, 
  AncEncounterTabConfig, 
  AncEncounterTabList,
  InvestigationSubTab,
  InvestigationSubTabConfig,
  InvestigationSubTabList,
  VisitFormSubTab,
  VisitFormSubTabConfig,
  VisitFormSubTabList,
  MedicalHistorySubTab,
  MedicalHistorySubTabConfig,
  MedicalHistorySubTabList,
} from './store';
import { VisitDetails } from './visits/form/visit-form/visit-details';
import { LabScansPage } from './visits/form/lab-scans/page';
import { PrescriptionsPage } from './visits/form/prescriptions/page';
import { NextFollowUpPage } from './visits/form/next-follow-up/page';
import { PreviousPregnanciesView } from '../../../obstetric-history';
import { LabTestsPage } from './investigations/lab-tests/page';
import { USGDatingPage } from './investigations/usg-dating/page';
import { USG1113WeeksPage } from './investigations/usg-11-13-weeks/page';
import { GrowthScanPage } from './investigations/growth-scan/page';
import { AnomalyScanPage } from './investigations/anomaly-scan/page';
import { FetusProvider } from './investigations/fetus-context';
import {
  MedicalHistoryOverviewContent,
  PastHistoryContent,
  PastHistory2Content,
  SurgicalHistoryContent,
  FamilyHistoryContent,
  PersonalHistoryContent,
  CurrentMedicationsContent,
  AllergiesContent,
} from '../../gynae/encounter/tabs';

/** Get main tab icon */
const getTabIcon = (tab: AncEncounterTab) => {
  switch (tab) {
    case AncEncounterTab.VISITS: return CalendarDays;
    case AncEncounterTab.OBSTETRIC_HISTORY: return Baby;
    case AncEncounterTab.MEDICAL_HISTORY: return ClipboardList;
    case AncEncounterTab.INVESTIGATIONS: return FlaskConical;
    default: return CalendarDays;
  }
};

/** Get medical history sub-tab icon */
const getMedicalHistorySubTabIcon = (subTab: MedicalHistorySubTab) => {
  switch (subTab) {
    case MedicalHistorySubTab.OVERVIEW: return LayoutGrid;
    case MedicalHistorySubTab.PAST_HISTORY: return History;
    case MedicalHistorySubTab.PAST_HISTORY_2: return History;
    case MedicalHistorySubTab.SURGICAL_HISTORY: return Activity;
    case MedicalHistorySubTab.FAMILY_HISTORY: return Users;
    case MedicalHistorySubTab.PERSONAL_HISTORY: return User;
    case MedicalHistorySubTab.CURRENT_MEDICATIONS: return Pill;
    case MedicalHistorySubTab.ALLERGIES: return AlertTriangle;
    default: return ClipboardList;
  }
};

/** Get investigation sub-tab icon */
const getInvestigationSubTabIcon = (subTab: InvestigationSubTab) => {
  switch (subTab) {
    case InvestigationSubTab.LAB_TESTS: return TestTube;
    case InvestigationSubTab.USG_DATING: return Baby;
    case InvestigationSubTab.USG_11_13_WEEKS: return Scan;
    case InvestigationSubTab.COMBINED_SCREENING: return Activity;
    case InvestigationSubTab.ANOMALY_SCAN: return Scan;
    case InvestigationSubTab.GROWTH_SCAN: return TrendingUp;
    case InvestigationSubTab.OTHER_INVESTIGATIONS: return FileSearch;
    default: return TestTube;
  }
};

/** Get visit form sub-tab icon */
const getVisitFormSubTabIcon = (subTab: VisitFormSubTab) => {
  switch (subTab) {
    case VisitFormSubTab.VISIT_DETAILS: return Stethoscope;
    case VisitFormSubTab.LAB_SCANS: return TestTube;
    case VisitFormSubTab.PRESCRIPTIONS: return Pill;
    case VisitFormSubTab.NEXT_FOLLOW_UP: return CalendarPlus;
    default: return ClipboardList;
  }
};

/* =============================================================================
 * VISITS LIST COMPONENT
 * ============================================================================= */

const VisitsList = observer(() => {
  const navigate = useNavigate();
  const { patientId, encounterId } = useParams<{ patientId: string; encounterId: string }>();

  // Mock visits data
  const visits = [
    { id: '1', date: '2024-01-15', gestationalAge: '12w 3d', visitType: 'Booking Visit', doctor: 'Dr. Smith' },
    { id: '2', date: '2024-02-12', gestationalAge: '16w 1d', visitType: 'Routine ANC', doctor: 'Dr. Smith' },
    { id: '3', date: '2024-03-11', gestationalAge: '20w 0d', visitType: 'Anomaly Scan Visit', doctor: 'Dr. Johnson' },
  ];

  const handleNewVisit = () => {
    navigate(`/patientv3/${patientId}/anc/${encounterId}/new-visit/${VisitFormSubTab.VISIT_DETAILS}`);
  };

  const handleEditVisit = (visitId: string) => {
    navigate(`/patientv3/${patientId}/anc/${encounterId}/visit/${visitId}/${VisitFormSubTab.VISIT_DETAILS}`);
  };

  return (
    <div className="p-4">
      {/* Header with Add button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-bold text-zinc-800">ANC Visits</h3>
        <button
          onClick={handleNewVisit}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Visit
        </button>
      </div>

      {/* Visits List */}
      <div className="bg-white border border-zinc-200">
        {visits.length === 0 ? (
          <div className="p-8 text-center text-zinc-400 text-[12px]">
            No visits recorded yet. Click "New Visit" to add one.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">GA</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Visit Type</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Doctor</th>
                <th className="px-4 py-2 text-right text-[10px] font-bold text-zinc-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => (
                <tr 
                  key={visit.id} 
                  className={`border-b border-zinc-100 hover:bg-zinc-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}
                  onClick={() => handleEditVisit(visit.id)}
                >
                  <td className="px-4 py-3 text-[12px] text-zinc-700">{visit.date}</td>
                  <td className="px-4 py-3 text-[12px] font-semibold text-emerald-600">{visit.gestationalAge}</td>
                  <td className="px-4 py-3 text-[12px] text-zinc-700">{visit.visitType}</td>
                  <td className="px-4 py-3 text-[12px] text-zinc-500">{visit.doctor}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] text-sky-600 hover:text-sky-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

/* =============================================================================
 * VISIT FORM WRAPPER WITH ROUTING
 * ============================================================================= */

const VisitFormWrapper = observer(({ isNew }: { isNew: boolean }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { patientId, encounterId, visitId } = params as { 
    patientId: string; 
    encounterId: string; 
    visitId?: string;
  };
  // The subTab is captured in the wildcard '*' because we use "new-visit/*" and "visit/:visitId/*"
  const subTab = params['*'];

  const activeSubTab = (subTab as VisitFormSubTab) || VisitFormSubTab.VISIT_DETAILS;

  const handleBack = () => {
    navigate(`/patientv3/${patientId}/anc/${encounterId}/visits`);
  };

  const navigateToSubTab = (tab: VisitFormSubTab) => {
    if (isNew) {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/new-visit/${tab}`);
    } else {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/visit/${visitId}/${tab}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Form Header with Back button */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h3 className="text-[13px] font-bold text-zinc-800">
            {isNew ? 'New ANC Visit' : `Edit Visit #${visitId}`}
          </h3>
        </div>
        <button className="px-4 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors">
          Save Visit
        </button>
      </div>

      {/* Form Sub-tabs - Horizontal */}
      <div className="flex border-b border-zinc-200 bg-zinc-50 px-4">
        {VisitFormSubTabList.map((tab) => {
          const config = VisitFormSubTabConfig[tab];
          const Icon = getVisitFormSubTabIcon(tab);
          const isActive = activeSubTab === tab;
          
          return (
            <button
              key={tab}
              onClick={() => navigateToSubTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold border-b-2 transition-colors ${
                isActive 
                  ? `${config.color} border-current bg-white` 
                  : 'text-zinc-500 border-transparent hover:text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Form Content - Routed */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        <Routes>
          <Route path="visit_details" element={<VisitDetails />} />
          <Route path="lab_scans" element={<LabScansPage />} />
          <Route path="prescriptions" element={<PrescriptionsPage />} />
          <Route path="next_follow_up" element={<NextFollowUpPage />} />
          <Route index element={<Navigate to="visit_details" replace />} />
        </Routes>
      </div>
    </div>
  );
});

/* =============================================================================
 * MEDICAL HISTORY SUB-TAB CONTENT
 * ============================================================================= */

const MedicalHistorySubTabContent = observer(({ subTab }: { subTab: MedicalHistorySubTab }) => {
  switch (subTab) {
    case MedicalHistorySubTab.OVERVIEW: return <MedicalHistoryOverviewContent />;
    case MedicalHistorySubTab.PAST_HISTORY: return <PastHistoryContent />;
    case MedicalHistorySubTab.PAST_HISTORY_2: return <PastHistory2Content />;
    case MedicalHistorySubTab.SURGICAL_HISTORY: return <SurgicalHistoryContent />;
    case MedicalHistorySubTab.FAMILY_HISTORY: return <FamilyHistoryContent />;
    case MedicalHistorySubTab.PERSONAL_HISTORY: return <PersonalHistoryContent />;
    case MedicalHistorySubTab.CURRENT_MEDICATIONS: return <CurrentMedicationsContent />;
    case MedicalHistorySubTab.ALLERGIES: return <AllergiesContent />;
    default: return <MedicalHistoryOverviewContent />;
  }
});

/** Side Nav Button for Medical History Sub-tabs */
const MedicalHistorySideNavButton = observer(({ 
  subTab, 
  isActive, 
  onClick 
}: { 
  subTab: MedicalHistorySubTab; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const config = MedicalHistorySubTabConfig[subTab];
  const Icon = getMedicalHistorySubTabIcon(subTab);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-[12px] font-medium rounded-md transition-colors cursor-pointer ${
        isActive 
          ? 'bg-blue-50 text-zinc-900' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
      }`}
    >
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className="flex-1 text-left">{config.label}</span>
    </button>
  );
});

/* =============================================================================
 * MEDICAL HISTORY LAYOUT WITH ROUTING
 * ============================================================================= */

const MedicalHistoryLayout = observer(() => {
  const navigate = useNavigate();
  const { patientId, encounterId, subTab } = useParams<{ patientId: string; encounterId: string; subTab: string }>();
  
  const activeSubTab = (subTab as MedicalHistorySubTab) || MedicalHistorySubTab.OVERVIEW;

  const navigateToSubTab = (tab: MedicalHistorySubTab) => {
    navigate(`/patientv3/${patientId}/anc/${encounterId}/medical-history/${tab}`);
  };

  return (
    <div className="flex h-full">
      {/* Side Navigation */}
      <div className="w-52 bg-white border-r border-zinc-200 h-full overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {MedicalHistorySubTabList.map(tab => (
          <MedicalHistorySideNavButton
            key={tab}
            subTab={tab}
            isActive={activeSubTab === tab}
            onClick={() => navigateToSubTab(tab)}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        <MedicalHistorySubTabContent subTab={activeSubTab} />
      </div>
    </div>
  );
});

/* =============================================================================
 * INVESTIGATION SUB-TAB CONTENT
 * ============================================================================= */

const InvestigationSubTabContent = observer(({ subTab }: { subTab: InvestigationSubTab }) => {
  // Render specific pages for each sub-tab
  if (subTab === InvestigationSubTab.LAB_TESTS) {
    return <LabTestsPage />;
  }
  if (subTab === InvestigationSubTab.USG_DATING) {
    return <USGDatingPage />;
  }
  if (subTab === InvestigationSubTab.USG_11_13_WEEKS) {
    return <USG1113WeeksPage />;
  }
  if (subTab === InvestigationSubTab.GROWTH_SCAN) {
    return <GrowthScanPage />;
  }
  if (subTab === InvestigationSubTab.ANOMALY_SCAN) {
    return <AnomalyScanPage />;
  }

  // Placeholder for other sub-tabs
  const config = InvestigationSubTabConfig[subTab];
  const Icon = getInvestigationSubTabIcon(subTab);
  
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-zinc-100 rounded-lg flex items-center justify-center">
          <Icon className={`w-8 h-8 ${config.color}`} />
        </div>
        <h3 className="text-[16px] font-bold text-zinc-700 mb-1">{config.label}</h3>
        <p className="text-[12px] text-zinc-500">Content for {config.label} will be displayed here</p>
      </div>
    </div>
  );
});

/** Side Nav Button for Investigation Sub-tabs */
const SideNavButton = observer(({ 
  subTab, 
  isActive, 
  onClick 
}: { 
  subTab: InvestigationSubTab; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const config = InvestigationSubTabConfig[subTab];
  const Icon = getInvestigationSubTabIcon(subTab);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-[12px] font-medium rounded-md transition-colors cursor-pointer ${
        isActive 
          ? 'bg-purple-50 text-zinc-900' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
      }`}
    >
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className="flex-1 text-left">{config.label}</span>
    </button>
  );
});

/* =============================================================================
 * INVESTIGATIONS LAYOUT WITH ROUTING
 * ============================================================================= */

const InvestigationsLayout = observer(() => {
  const navigate = useNavigate();
  const { patientId, encounterId, subTab } = useParams<{ patientId: string; encounterId: string; subTab: string }>();
  
  const activeSubTab = (subTab as InvestigationSubTab) || InvestigationSubTab.LAB_TESTS;

  const navigateToSubTab = (tab: InvestigationSubTab) => {
    navigate(`/patientv3/${patientId}/anc/${encounterId}/investigations/${tab}`);
  };

  return (
    <FetusProvider>
      <div className="flex h-full">
        {/* Side Navigation */}
        <div className="w-52 bg-white border-r border-zinc-200 h-full overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
          {InvestigationSubTabList.map(tab => (
            <SideNavButton
              key={tab}
              subTab={tab}
              isActive={activeSubTab === tab}
              onClick={() => navigateToSubTab(tab)}
            />
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <InvestigationSubTabContent subTab={activeSubTab} />
        </div>
      </div>
    </FetusProvider>
  );
});

/* =============================================================================
 * MAIN LAYOUT
 * ============================================================================= */

export const AncEncounterLayout = observer(() => {
  const store = useAncEncounterStore();
  const navigate = useNavigate();
  const { patientId, encounterId, '*': restPath } = useParams<{ patientId: string; encounterId: string; '*': string }>();
  
  // Determine active main tab from URL
  const getActiveTab = (): AncEncounterTab => {
    if (restPath?.startsWith('investigations')) return AncEncounterTab.INVESTIGATIONS;
    if (restPath?.startsWith('medical-history')) return AncEncounterTab.MEDICAL_HISTORY;
    if (restPath?.startsWith('obstetric-history')) return AncEncounterTab.OBSTETRIC_HISTORY;
    return AncEncounterTab.VISITS;
  };
  
  const activeTab = getActiveTab();

  // Initialize store
  useEffect(() => {
    if (patientId && encounterId) {
      store.init(patientId, encounterId);
    }
  }, [patientId, encounterId, store]);

  // Navigate to main tab URL
  const navigateToTab = (tab: AncEncounterTab) => {
    if (tab === AncEncounterTab.INVESTIGATIONS) {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/investigations/${InvestigationSubTab.LAB_TESTS}`);
    } else if (tab === AncEncounterTab.MEDICAL_HISTORY) {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/medical-history/${MedicalHistorySubTab.OVERVIEW}`);
    } else if (tab === AncEncounterTab.OBSTETRIC_HISTORY) {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/obstetric-history`);
    } else {
      navigate(`/patientv3/${patientId}/anc/${encounterId}/visits`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Main Tab Navigation */}
      <nav className="anc-encounter-tabs">
        <div className="anc-encounter-tabs__container">
          {AncEncounterTabList.map((tab) => {
            const Icon = getTabIcon(tab);
            const config = AncEncounterTabConfig[tab];
            const isActive = activeTab === tab;
            
            return (
              <button
                key={tab}
                className={`anc-encounter-tab-button ${isActive ? 'anc-encounter-tab-button--active' : ''}`}
                onClick={() => navigateToTab(tab)}
                type="button"
              >
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                {config.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area - Routed */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          {/* Visits Tab */}
          <Route path="visits" element={
            <div className="h-full overflow-y-auto bg-slate-50">
              <VisitsList />
            </div>
          } />
          
          {/* New Visit Form */}
          <Route path="new-visit/*" element={<VisitFormWrapper isNew={true} />} />
          
          {/* Edit Visit Form */}
          <Route path="visit/:visitId/*" element={<VisitFormWrapper isNew={false} />} />
          
          {/* Investigations Tab */}
          <Route path="investigations/:subTab" element={<InvestigationsLayout />} />
          <Route path="investigations" element={<Navigate to={`investigations/${InvestigationSubTab.LAB_TESTS}`} replace />} />
          
          {/* Medical History Tab */}
          <Route path="medical-history/:subTab" element={<MedicalHistoryLayout />} />
          <Route path="medical-history" element={<Navigate to={`medical-history/${MedicalHistorySubTab.OVERVIEW}`} replace />} />
          
          {/* Obstetric History Tab */}
          <Route path="obstetric-history" element={
            <div className="h-full overflow-y-auto bg-slate-50 p-4">
               <PreviousPregnanciesView />
            </div>
          } />

          {/* Default */}
          <Route index element={<Navigate to="visits" replace />} />
          <Route path="*" element={<Navigate to="visits" replace />} />
        </Routes>
      </div>
    </div>
  );
});
