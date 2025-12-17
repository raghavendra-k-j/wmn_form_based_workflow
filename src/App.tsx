import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { PatientListPage, PatientDetailsPage } from './feature/patients';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Default redirect to patients */}
          <Route path="/" element={<Navigate to="/patients" replace />} />
          
          {/* Patient routes */}
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/patients/:patientId/*" element={<PatientDetailsPage />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/patients" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
