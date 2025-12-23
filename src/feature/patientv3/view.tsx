import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { PatientV3Provider } from './context';
import { PatientSidebar } from './sidebar/sidebar';
import { ProfilePage } from './profile/page';
import { CaseListPage } from './cases/page';
import { GyanyEncounterView, GuyiniEncounterProvider } from '../cases/gynae/encounter';
import { AncEncounterView, AncEncounterProvider } from '../cases/anc/encounter';
import { CurrentPregnancyPage } from '../current-pregnancy';
import { Construction } from 'lucide-react';

/** Placeholder Page for unimplemented routes */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="h-full flex items-center justify-center bg-zinc-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-lg font-bold text-zinc-800 mb-2">{title}</h2>
        <p className="text-sm text-zinc-500">This page is under construction</p>
        <p className="text-xs text-zinc-400 mt-1">Coming soon...</p>
      </div>
    </div>
  );
}

/** Patient V3 Layout - Wrapper with sidebar and content area */
function PatientV3Layout() {
  return (
    <div className="h-full flex bg-zinc-100 overflow-hidden">
      {/* Sidebar - Independent Scrolling Column */}
      <div className="w-[280px] h-full shrink-0 overflow-hidden">
        <PatientSidebar />
      </div>

      {/* Content Area - Independent Scrolling Column */}
      <div className="flex-1 overflow-hidden bg-zinc-100 border-l border-zinc-200 shadow-none">
        <Routes>
          {/* Default: Redirect to profile */}
          <Route index element={<Navigate to="profile" replace />} />
          
          {/* Profile Page */}
          <Route path="profile" element={<ProfilePage />} />
          
          {/* Current Pregnancy */}
          <Route path="current-pregnancy" element={<CurrentPregnancyPage />} />
          
          {/* Case List - All Cases */}
          <Route path="cases" element={<CaseListPage />} />
          
          {/* Case List - Filtered by type */}
          <Route path="cases/:caseType" element={<CaseListPage />} />
          
          {/* ANC Encounter - With nested routes */}
          <Route 
            path="anc/:encounterId/*" 
            element={
              <AncEncounterProvider>
                <AncEncounterView />
              </AncEncounterProvider>
            } 
          />
          
          {/* Gynae Encounter - Nested within patient layout */}
          <Route 
            path="gynae/:encounterId" 
            element={
              <GuyiniEncounterProvider>
                <GyanyEncounterView />
              </GuyiniEncounterProvider>
            } 
          />
          <Route 
            path="gynae/:encounterId/:tab" 
            element={
              <GuyiniEncounterProvider>
                <GyanyEncounterView />
              </GuyiniEncounterProvider>
            } 
          />
          
          {/* Placeholder routes for menu items */}
          <Route path="pregnancy-complications" element={<PlaceholderPage title="Pregnancy Complications" />} />
          <Route path="tt" element={<PlaceholderPage title="TT (Tetanus Toxoid)" />} />
          <Route path="anti-d" element={<PlaceholderPage title="Anti-D" />} />
          <Route path="tests-scans" element={<PlaceholderPage title="Tests & Scans" />} />
          <Route path="hosp-adm" element={<PlaceholderPage title="Hospital Admission" />} />
          <Route path="delivery-info" element={<PlaceholderPage title="Delivery Info" />} />
          <Route path="deactivate" element={<PlaceholderPage title="Deactivate" />} />
          <Route path="terminate-preg" element={<PlaceholderPage title="Terminate Pregnancy" />} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="profile" replace />} />
        </Routes>
      </div>
    </div>
  );
}

/** Patient V3 Page - Entry point with routing */
export function PatientV3Page() {
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
    <PatientV3Provider patientId={patientId}>
      <PatientV3Layout />
    </PatientV3Provider>
  );
}

export default PatientV3Page;

