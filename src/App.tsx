import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { PatientListPage, PatientDetailsPage, NewPatientPage } from './feature/patients';
import { PatientDetailsPageV2 } from './feature/patients/details';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Default redirect to patients */}
          <Route path="/" element={<Navigate to="/patients" replace />} />
          
          {/* Patient routes */}
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/patients/new" element={<NewPatientPage />} />
          <Route path="/patients/:patientId/*" element={<PatientDetailsPageV2 />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/patients" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

