import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './feature/layout';

import { PatientV3Page, PatientListPageV3 } from './feature/patientv3';
import { ModulePlaceholder } from './feature/shared/components/ModulePlaceholder';
import { 
  homeRoute, 
  appointmentsRoute, 
  staffsRoute, 
  doctorsRoute, 
  settingsRoute, 
  patientsRoute,
  gyanyEncounterRoute
} from './feature/shared/routes/admin-routes';

import { GyanyEncounterView, GuyiniEncounterProvider } from './feature/cases/gynae/encounter';
import { SessionProvider } from './feature/session';

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Main Module Routes */}
            <Route path={homeRoute} element={<ModulePlaceholder title="Dashboard" />} />
            <Route path={appointmentsRoute} element={<ModulePlaceholder title="Appointments" />} />
            <Route path={staffsRoute} element={<ModulePlaceholder title="Staff Management" />} />
            <Route path={doctorsRoute} element={<ModulePlaceholder title="Doctor Directory" />} />
            <Route path={settingsRoute} element={<ModulePlaceholder title="System Settings" />} />
            
            {/* Patient Management (v2) */}
            {/* Patient Management (v3) */}
            <Route path={patientsRoute} element={<PatientListPageV3 />} />
            <Route path={`${patientsRoute}/:patientId/*`} element={<PatientV3Page />} />

            {/* Encounter Routes */}
            <Route 
              path={gyanyEncounterRoute} 
              element={
                <GuyiniEncounterProvider>
                  <GyanyEncounterView />
                </GuyiniEncounterProvider>
              } 
            />
            
            {/* Gynae Encounter - From Case List Navigation */}
            <Route 
              path="/cases/gynae/encounter/:caseId" 
              element={
                <GuyiniEncounterProvider>
                  <GyanyEncounterView />
                </GuyiniEncounterProvider>
              } 
            />
            
            {/* Legacy or Redirects */}
            <Route path="/patients/*" element={<Navigate to={patientsRoute} replace />} />
            
            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to={homeRoute} replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;


