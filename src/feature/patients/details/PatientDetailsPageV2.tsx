import { useState } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Edit, 
  ChevronRight,
  ChevronDown,
  User,
  Clock,
  AlertTriangle,
  Droplet,
  Phone,
  Mail,
  ArrowLeft,
  LayoutDashboard,
  Baby,
  History
} from 'lucide-react';

import { PatientProfile } from './profile/PatientProfile';
import { PatientCases } from './cases/PatientCases';
import { AncCaseView } from './cases/anc/AncCaseView';
import { MedicalHistory } from './medical-history/MedicalHistory';
import { ObstetricHistoryV2 } from './obs-history/ObstetricHistoryV2';

/** Menu Item interface */
interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export function PatientDetailsPageV2() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRisksExpanded, setIsRisksExpanded] = useState(false);

  // Mock patient data extended
  const patientData = {
    id: 'WMN-1027',
    name: 'Ananya Gupta',
    age: '35Y, 4M',
    gender: 'F',
    phone: '+91 6363703772',
    email: 'ananya.g@gmail.com',
    bloodGroup: 'A+',
    risks: ['Diabetes Type 2', 'Previous C-Section']
  };

  // Detect Case Context
  // URL Pattern: /patients/:patientId/cases/:caseId/...
  // We assume if there is a segment after 'cases', a specific case is selected.
  const pathParts = location.pathname.split('/');
  const casesIndex = pathParts.indexOf('cases');
  const isCaseSelected = casesIndex !== -1 && pathParts.length > casesIndex + 1;
  const currentCaseId = isCaseSelected ? pathParts[casesIndex + 1] : null;

  // Determine active tab for styling
  const lastSegment = pathParts[pathParts.length - 1];
  const activeTab = lastSegment;

  const handleNavClick = (path: string) => {
     navigate(`/patients/${patientId}/${path}`);
  };

  // Menu Definitions
  const defaultMenuItems: MenuItem[] = [
    { id: 'profile', label: 'Patient Profile', icon: User },
    { id: 'cases', label: 'Cases', icon: Clock },
  ];

  // ANC Case Menu (for Antenatal cases)
  const caseMenuItems: MenuItem[] = [
    { id: 'details', label: 'Case Details', icon: LayoutDashboard },
    { id: 'obstetric-history', label: 'Obstetric History', icon: Baby },
    { id: 'medical-history', label: 'Medical History', icon: History },
  ];

  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden font-sans">
      {/* Sidebar - 300px fixed width */}
      <aside className="w-[300px] flex-shrink-0 bg-white border-r border-zinc-200 h-full flex flex-col overflow-y-auto">
        
        {/* Profile Section */}
        <div className="p-4 border-b border-zinc-100 bg-white">
          {/* Row 1: Avatar, Name/ID, Edit */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg font-bold border border-indigo-100 shadow-sm">
              {patientData.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex justify-between items-start gap-2">
                <h2 className="text-base font-bold text-zinc-900 leading-tight truncate">
                  {patientData.name}
                </h2>
                <button className="text-zinc-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">#{patientData.id}</p>
            </div>
          </div>

          {/* Row 2: Vitals / Demographics */}
          <div className="flex items-center gap-3 mb-3 text-sm">
            <span className="font-medium text-zinc-700">{patientData.age}</span>
            <div className="w-px h-3 bg-zinc-300"></div>
            <div className="flex items-center gap-1 text-red-600 font-bold">
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>{patientData.bloodGroup}</span>
            </div>
          </div>

          {/* Row 3: Contact Info */}
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{patientData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate">{patientData.email}</span>
            </div>
          </div>

          {/* Risks Section */}
          <div className="bg-red-50/50 rounded-lg border border-red-100 overflow-hidden transition-all">
            <button 
              onClick={() => setIsRisksExpanded(!isRisksExpanded)}
              className="w-full flex items-center justify-between p-2.5 text-left hover:bg-red-50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-md transition-colors ${isRisksExpanded ? 'bg-red-100 text-red-600' : 'bg-white border border-red-100 text-red-500'}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-red-900">
                  {isRisksExpanded ? 'Clinical Risks' : `${patientData.risks.length} Risks Found`}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${isRisksExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {isRisksExpanded && (
              <div className="px-2.5 pb-2.5 pt-0 border-t border-red-100/50">
                <div className="space-y-1.5 mt-2">
                  {patientData.risks.map((risk, index) => (
                    <div key={index} className="flex items-center gap-2 px-2 py-1.5 bg-white rounded border border-red-100/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="text-xs font-medium text-zinc-700">{risk}</span>
                    </div>
                  ))}
                  <button className="w-full text-center text-xs font-semibold text-red-600 hover:text-red-700 mt-1 py-1 hover:bg-red-50 rounded transition-colors">
                    View Full Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Navigation Menu */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {isCaseSelected ? (
            <>
              <div className="px-4 py-3 mb-1 border-b border-zinc-100">
                <button 
                  onClick={() => navigate(`/patients/${patientId}/cases`)}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All Cases
                </button>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Baby className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">
                      {currentCaseId === '1' ? 'Antenatal Care #1' : `Case #${currentCaseId}`}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {currentCaseId === '1' ? 'ANC • G2P1L1' : 'Active Case'}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="flex flex-col gap-0.5">
                {caseMenuItems.map((item) => {
                  const Icon = item.icon;
                  // Simplified active check for demo
                  const isActive = location.pathname.includes(item.id); 
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(`cases/${currentCaseId}/${item.id}`)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-[3px] group
                          ${isActive 
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900' 
                            : 'border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-indigo-700' : 'text-zinc-400 group-hover:text-zinc-500'}`} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-indigo-600" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {defaultMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (item.id === 'cases' && pathParts.includes('cases'));
                
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
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden bg-zinc-50 flex flex-col">
        {/* Header Title for NON-Cases pages (Case pages usually have their own headers) */}
        {!isCaseSelected && activeTab !== 'cases' && (
          <div className="px-6 pt-6 pb-2">
             <h1 className="text-xl font-bold text-zinc-900">
                {defaultMenuItems.find(i => i.id === activeTab)?.label}
             </h1>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <Routes>
             <Route path="/" element={<Navigate to="profile" replace />} />
             <Route path="profile" element={<PatientProfile />} />
             <Route path="cases/*" element={<PatientCases />} />
             
             {/* Case-specific routes for ANC */}
             <Route path="cases/:caseId/details" element={<AncCaseView />} />
             <Route path="cases/:caseId/obstetric-history" element={<ObstetricHistoryV2 />} />
             <Route path="cases/:caseId/medical-history" element={<MedicalHistory />} />
             
             {/* Fallback */}
             <Route path="*" element={<Navigate to="profile" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default PatientDetailsPageV2;
