import { useState } from 'react';
import { Plus, ChevronLeft, FolderOpen, Trash2, RotateCcw } from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { CaseTypeSelector } from './CaseTypeSelector';
import { CaseList, type Case } from './CaseList';
import { AncCaseView } from './anc/AncCaseView';
import { GynaeCaseView } from './gynae/GynaeCaseView';
import { PncCaseView } from './pnc/PncCaseView';

const MOCK_CASES: Case[] = [
  {
    id: 'CS-101',
    type: 'ANC',
    title: 'High Risk Pregnancy',
    startDate: '12 Aug 2024',
    lastVisit: '15 Dec 2024',
    nextFollowUp: '28 Dec 2024',
    status: 'Active',
    visitCount: 5
  },
  {
    id: 'CS-102',
    type: 'Gynaecology',
    title: 'PCOS Management',
    startDate: '10 Nov 2024',
    lastVisit: '10 Dec 2024',
    nextFollowUp: '10 Jan 2025',
    status: 'Active',
    visitCount: 2
  },
  {
    id: 'CS-103',
    type: 'PNC',
    title: 'Postnatal Checkup',
    startDate: '05 Jan 2025',
    lastVisit: '12 Jan 2025',
    nextFollowUp: '25 Jan 2025',
    status: 'Active',
    visitCount: 1
  }
];

function CasesDashboard() {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES); 
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleSelectType = (typeId: string) => {
    console.log('Selected case type:', typeId);
    // In real app, navigate to create form for specific type
    setIsCreating(false);
    
    // For simulation: Add a new dummy case of that type
    const newCase: Case = {
      id: `CS-${Math.floor(Math.random() * 1000)}`,
      type: typeId === 'anc' ? 'ANC' : typeId === 'pnc' ? 'PNC' : 'Gynaecology',
      title: `${typeId.toUpperCase()} New Case`,
      startDate: new Date().toLocaleDateString(),
      lastVisit: 'N/A',
      nextFollowUp: 'Pending',
      status: 'Active',
      visitCount: 0
    };
    setCases([...cases, newCase]);
  };

  const handleCaseClick = (caseId: string) => {
    navigate(caseId);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Sticky Header */}
       <div className="h-14 border-b border-zinc-200 px-6 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
             {isCreating && cases.length > 0 && (
               <button 
                 onClick={() => setIsCreating(false)} 
                 className="p-1 rounded-md hover:bg-zinc-100 text-zinc-500"
                 title="Back to List"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
             )}
             <h2 className="text-base font-bold text-zinc-900">
               {cases.length === 0 ? 'Initialize Patient Case' : (isCreating ? 'Select NEW Case Type' : 'Patient Case History')}
             </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Simulation Controls (Visible in Dev Only) */}
            <div className="flex items-center gap-1 mr-2 border-r border-zinc-200 pr-3">
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter mr-1 select-none">Simulate</span>
              <button 
                onClick={() => setCases([])}
                className="p-1.5 rounded-md hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors"
                title="Clear All (Show Empty State)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCases(MOCK_CASES)}
                className="p-1.5 rounded-md hover:bg-blue-50 text-zinc-400 hover:text-blue-500 transition-colors"
                title="Reset to Mock Data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {!isCreating && cases.length > 0 && (
              <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                New Case
              </button>
            )}
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-auto bg-zinc-50/30 flex flex-col">
          {isCreating || cases.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-radial-gradient from-white to-zinc-50/50">
               {cases.length === 0 && (
                 <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-4 border border-zinc-100 ring-8 ring-zinc-50">
                       <FolderOpen className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">No Ongoing Cases</h3>
                    <p className="text-sm font-medium text-zinc-500 max-w-xs text-center">Select a case type below to begin medical tracking for this patient.</p>
                 </div>
               )}
               <div className="w-full max-w-4xl">
                  <CaseTypeSelector onSelect={handleSelectType} />
               </div>
            </div>
          ) : (
            /* Case List Grid */
            <div className="w-full p-6 animate-in fade-in duration-500">
               <CaseList cases={cases} onCaseClick={handleCaseClick} />
            </div>
          )}
       </div>
    </div>
  );
}

function CaseRouter() {
  const { caseId } = useParams();
  const caseItem = MOCK_CASES.find(c => c.id === caseId);

  if (!caseItem) {
    return <div className="p-8 text-center text-zinc-500">Case not found</div>;
  }

  if (caseItem.type === 'ANC') {
    return <AncCaseView />;
  }
  
  if (caseItem.type === 'PNC') {
    return <PncCaseView />;
  }

  return <GynaeCaseView />;
}

export function PatientCases() {
  return (
    <Routes>
      <Route index element={<CasesDashboard />} />
      <Route path=":caseId" element={<CaseRouter />} />
    </Routes>
  );
}
