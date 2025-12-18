import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './feature/layout';
import { PatientListPageV2, PatientDetailsPageV2 } from './feature/patientsv2';
import { ModulePlaceholder } from './feature/shared/components/ModulePlaceholder';
import { 
  homeRoute, 
  appointmentsRoute, 
  staffsRoute, 
  doctorsRoute, 
  settingsRoute, 
  patientsRoute 
} from './feature/shared/routes/admin-routes';

function App() {
  return (
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
          <Route path={patientsRoute} element={<PatientListPageV2 />} />
          <Route path={`${patientsRoute}/:patientId/*`} element={<PatientDetailsPageV2 />} />
          
          {/* Legacy or Redirects */}
          <Route path="/patients/*" element={<Navigate to={patientsRoute} replace />} />
          
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to={homeRoute} replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

