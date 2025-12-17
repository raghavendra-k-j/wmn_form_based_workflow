import { useState } from 'react';
import { Plus, ChevronLeft, FolderOpen } from 'lucide-react';
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
  const [cases] = useState<Case[]>(MOCK_CASES); 
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleSelectType = (typeId: string) => {
    console.log('Selected case type:', typeId);
    // In real app, navigate to create form for specific type
    setIsCreating(false);
  };

  const handleCaseClick = (caseId: string) => {
    navigate(caseId);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
       {/* Sticky Header */}
       <div className="h-14 border-b border-zinc-200 px-6 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
             {isCreating && (
               <button 
                 onClick={() => setIsCreating(false)} 
                 className="p-1 rounded-md hover:bg-zinc-100 text-zinc-500"
                 title="Back to List"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
             )}
             <h2 className="text-base font-bold text-zinc-900">
               {isCreating ? 'Select Case Type' : 'All Cases'}
             </h2>
          </div>
          
          {!isCreating && (
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Case
            </button>
          )}
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-auto bg-zinc-50/30 flex flex-col">
          {isCreating ? (
            <div className="flex-1 flex items-center justify-center">
               <CaseTypeSelector onSelect={handleSelectType} />
            </div>
          ) : (
            cases.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                 <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4 border border-zinc-100">
                   <FolderOpen className="w-8 h-8 text-zinc-300" />
                 </div>
                 <h3 className="text-sm font-medium text-zinc-900 mb-1">No Active Cases</h3>
                 <p className="text-xs text-zinc-500 max-w-xs text-center">
                   This patient has no ongoing cases. Click "New Case" to start.
                 </p>
              </div>
            ) : (
              /* Case List Grid */
              <div className="w-full p-6">
                 <CaseList cases={cases} onCaseClick={handleCaseClick} />
              </div>
            )
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
