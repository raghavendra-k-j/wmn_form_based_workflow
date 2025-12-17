import { useState } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Edit, 
  Files, 
  ChevronRight,
  ChevronDown,
  User,
  History,
  Baby,
  AlertTriangle,
  Clock
} from 'lucide-react';

import { PatientProfile } from './profile/PatientProfile';
import { PatientCases } from './cases/PatientCases';
import { MedicalHistory } from './medical-history/MedicalHistory';
import { ObstetricHistoryV2 } from './obs-history/ObstetricHistoryV2';
import { MedicalRecords } from './medical-records/MedicalRecords';

/** Menu Item interface */
interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { id: 'profile', label: 'Patient Profile', icon: User },
  { id: 'cases', label: 'Cases', icon: Clock },
  { id: 'medical-history', label: 'Medical History', icon: History },
  { id: 'obstetric-history', label: 'Obstetric History', icon: Baby },
  { id: 'medical-records', label: 'Medical Records', icon: Files },
];

/** Mock patient data for Sidebar */
const patientData = {
  id: 'WMN-1027',
  name: 'Ananya Gupta',
  age: '35Y, 4M',
  gender: 'F',
  phone: '+91 6363703772',
  risks: ['Diabetes Type 2', 'Previous C-Section']
};

export function PatientDetailsPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRisksExpanded, setIsRisksExpanded] = useState(true);

  // Determine active tab based on current URL path
  const pathParts = location.pathname.split('/');
  const patientIdIndex = pathParts.findIndex(p => p === patientId);
  const sectionPath = patientIdIndex >= 0 ? pathParts[patientIdIndex + 1] : undefined;
  const activeTab = menuItems.find(item => item.id === sectionPath)?.id || 'profile';

  const handleNavClick = (id: string) => {
     navigate(`/patients/${patientId}/${id}`);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden font-sans">
      {/* Sidebar - 300px fixed width */}
      <aside className="w-[300px] flex-shrink-0 bg-white border-r border-zinc-200 h-full flex flex-col overflow-y-auto">
        
        {/* Profile Section */}
        <div className="p-4 border-b border-zinc-100">
          <div className="flex justify-between items-start mb-2">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold border border-indigo-100 shadow-sm">
              {patientData.name.charAt(0)}
            </div>
            <button className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md transition-colors">
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          <h2 className="text-lg font-bold text-zinc-900 leading-tight mb-1 truncate">
            {patientData.name}
          </h2>
          
          <div className="flex items-center flex-wrap gap-1.5 text-sm text-zinc-500 font-medium mb-1">
            <span>{patientData.age}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
            <span>{patientData.gender}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
            <span className="font-mono text-zinc-400">#{patientData.id}</span>
          </div>
          
          <p className="text-sm text-zinc-500 font-medium mb-3">
            {patientData.phone}
          </p>

          {/* Risks Section (Collapsible) - Compact */}
          <div className="mt-2 mb-1 bg-red-50/50 rounded-lg border border-red-100 overflow-hidden">
            <button 
              onClick={() => setIsRisksExpanded(!isRisksExpanded)}
              className="w-full flex items-center justify-between p-2.5 text-left hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-0.5 bg-red-100 rounded text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-red-900">Clinical Risks</span>
              </div>
              {isRisksExpanded ? (
                <ChevronDown className="w-4 h-4 text-red-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-red-400" />
              )}
            </button>
            
            {isRisksExpanded && (
              <div className="px-2.5 pb-2.5">
                <div className="space-y-1.5">
                  {patientData.risks.map((risk, index) => (
                    <div key={index} className="flex items-center gap-1.5 px-2 py-1 bg-white rounded border border-red-100 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="text-xs font-medium text-zinc-700">{risk}</span>
                    </div>
                  ))}
                  <button className="text-xs font-semibold text-red-600 hover:text-red-700 mt-0.5 pl-1">
                    + View All Risks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-2">
          <ul className="flex flex-col gap-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-[3px] group
                      ${isActive 
                        ? 'bg-blue-50 border-blue-600 text-blue-900' 
                        : 'border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-blue-700' : 'text-zinc-400 group-hover:text-zinc-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden bg-zinc-50 flex flex-col">
        {/* Header Title for NON-Cases pages */}
        {activeTab !== 'cases' && activeTab !== 'obstetric-history' && activeTab !== 'medical-history' && (
          <div className="px-6 pt-6 pb-2">
             <h1 className="text-xl font-bold text-zinc-900">
                {menuItems.find(i => i.id === activeTab)?.label}
             </h1>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <Routes>
             <Route path="/" element={<Navigate to="profile" replace />} />
             <Route path="profile" element={<PatientProfile />} />
             <Route path="cases/*" element={<PatientCases />} />
             <Route path="medical-history" element={<MedicalHistory />} />
             <Route path="obstetric-history" element={<ObstetricHistoryV2 />} />
             <Route path="medical-records" element={<MedicalRecords />} />
             
             {/* Fallback */}
             <Route path="*" element={<Navigate to="profile" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default PatientDetailsPage;
