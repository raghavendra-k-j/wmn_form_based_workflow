import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import { PatientDetailsProvider } from './context';
import { PatientSidebar } from './sidebar/sidebar';
import { ProfilePage } from './profile';
import { AncPage } from './anc';
import { PncPage } from './pnc';
import { GynaePage } from './gynae';
import { CaseListPage } from './case-list';
import { CaseTypeSelectorPage } from './case-list/selector';
import { MedicalHistoryPage } from './medical-history';
import { ObstetricHistoryPage } from './obs-history';
import { GynaeFormPage } from './gynae-form';
import { PncFormPage } from './pnc-form';
import { AncFormPage } from './anc-form';
import { BaselineInfoPage } from './anc-baseline/page';
import { CurrentPregnancyPage } from '../../current-pregnancy';

/** Patient Details Layout - Wrapper with context provider */
function PatientDetailsLayout() {
  return (
    <div className="h-full flex bg-zinc-100 overflow-hidden">
      {/* Reduced Width Sidebar - Independent Scrolling Column */}
      <div className="w-[280px] h-full shrink-0 overflow-hidden">
        <PatientSidebar />
      </div>

      {/* Content Area - Independent Scrolling Column */}
      <div className="flex-1 overflow-auto bg-zinc-100 border-l border-zinc-200 shadow-none">
        <Routes>
          {/* Default to profile if no sub-route matches */}
          <Route path="/" element={<Navigate to="profile" replace />} />
          
          <Route path="profile" element={<ProfilePage />} />
          
          {/* Case Routes */}
          <Route path="cases" element={<CaseListPage />} />
          <Route path="cases/new" element={<CaseTypeSelectorPage />} />
          <Route path="cases/:caseType" element={<CaseListPage />} />
          
          {/* Individual Case Views */}
          <Route path="anc" element={<AncPage />} />
          <Route path="pnc" element={<PncPage />} />
          <Route path="gynae" element={<GynaePage />} />
          
          {/* ANC Baseline Information */}
          <Route path="anc-baseline" element={<BaselineInfoPage />} />
          
          {/* History & Form Pages */}
          <Route path="current-pregnancy" element={<CurrentPregnancyPage />} />
          <Route path="medical-history" element={<MedicalHistoryPage />} />
          <Route path="obstetric-history" element={<ObstetricHistoryPage />} />
          <Route path="gynae-form" element={<GynaeFormPage />} />
          <Route path="pnc-form" element={<PncFormPage />} />
          <Route path="anc-form" element={<AncFormPage />} />
          
          {/* Catch-all redirect to profile */}
          <Route path="*" element={<Navigate to="profile" replace />} />
        </Routes>
      </div>
    </div>
  );
}

/** Patient Details Page V2 - Entry point with routing */
export function PatientDetailsPageV2() {
  const { patientId } = useParams<{ patientId: string }>();

  if (!patientId) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500 bg-white">
        <div className="text-center">
          <div className="text-4xl font-bold text-zinc-200 mb-2">404</div>
          <p>Patient ID not found</p>
        </div>
      </div>
    );
  }

  return (
    <PatientDetailsProvider patientId={patientId}>
      <PatientDetailsLayout />
    </PatientDetailsProvider>
  );
}

export default PatientDetailsPageV2;

