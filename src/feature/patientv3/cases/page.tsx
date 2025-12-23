import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { usePatientV3 } from '../context';
import { 
  CASE_TYPE_CONFIG, 
  type CaseType, 
  type Case,
  CaseRow,
  NewCaseRow,
  NewCaseSelector
} from '../components';

/** Mock Cases Data - One per type for demonstration */
const MOCK_CASES: Case[] = [
  {
    id: 'CS-101',
    type: 'anc',
    title: 'High Risk Pregnancy',
    startDate: '12 Aug 2024',
    lastVisit: '15 Dec 2024',
    nextFollowUp: '28 Dec 2024',
    status: 'Active',
    visitCount: 5,
    complaints: 'Severe morning sickness, occasional dizziness'
  },
  {
    id: 'CS-102',
    type: 'pnc',
    title: 'Normal Delivery Follow-up',
    startDate: '01 Dec 2024',
    lastVisit: '10 Dec 2024',
    nextFollowUp: '20 Dec 2024',
    status: 'Active',
    visitCount: 2,
    complaints: 'Lactation issues, mild fever'
  },
  {
    id: 'CS-103',
    type: 'gynae',
    title: 'PCOS Management',
    startDate: '15 Nov 2024',
    lastVisit: '05 Dec 2024',
    nextFollowUp: '05 Jan 2025',
    status: 'Active',
    visitCount: 3,
    complaints: 'Irregular periods, abdominal pain'
  },
];

/** Case List Page */
export function CaseListPage() {
  const { caseType } = useParams<{ caseType: string }>();
  const { store } = usePatientV3();
  const navigate = useNavigate();
  const [cases] = useState<Case[]>(MOCK_CASES);

  // Filter cases by type if specified
  const filteredCases = caseType 
    ? cases.filter(c => c.type === caseType)
    : cases;

  const typeConfig = caseType 
    ? CASE_TYPE_CONFIG[caseType as CaseType] 
    : null;

  // Handle clicking on a case - Navigate to Gynae Encounter for gynae cases
  const handleCaseClick = (caseItem: Case) => {
    if (caseItem.type === 'gynae') {
      // Navigate to the gynae encounter view within patientv3 layout
      navigate(`/patientv3/${store.patientId}/gynae/${caseItem.id}`);
    } else {
      // For other case types, navigate to their respective pages (placeholder)
      navigate(`/patientv3/${store.patientId}/${caseItem.type}/${caseItem.id}`);
    }
  };

  // Handle starting a new case of specific type
  const handleStartCase = (type: CaseType) => {
    if (type === 'gynae') {
      // Navigate to new gynae encounter within patientv3 layout
      navigate(`/patientv3/${store.patientId}/gynae/new`);
    } else {
      // For other case types (placeholder)
      navigate(`/patientv3/${store.patientId}/${type}/new`);
    }
  };

  // Page title
  const pageTitle = typeConfig 
    ? typeConfig.fullLabel
    : 'All Visits';

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-zinc-200 shrink-0">
        <div className="flex items-center gap-3">
          {typeConfig ? (
            <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${typeConfig.bgColor} ${typeConfig.textColor} border border-current/10`}>
              <typeConfig.icon className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100">
              <FolderOpen className="w-4 h-4" />
            </div>
          )}
          <div>
            <h1 className="text-[14px] font-bold text-zinc-900 uppercase tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-[11px] text-zinc-500">
              {filteredCases.length} visit{filteredCases.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {/* New Case Row - Always First */}
          {typeConfig ? (
            <NewCaseRow 
              config={typeConfig}
              onStart={() => handleStartCase(caseType as CaseType)} 
            />
          ) : (
            <NewCaseSelector onSelect={handleStartCase} />
          )}

          {/* Case List */}
          {filteredCases.map((caseItem) => (
            <CaseRow 
              key={caseItem.id} 
              caseItem={caseItem} 
              onClick={() => handleCaseClick(caseItem)}
              showTypeBadge={!caseType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CaseListPage;
