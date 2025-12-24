import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderOpen, Plus, ArrowRight, Stethoscope, MoreHorizontal } from 'lucide-react';
import { usePatientV3 } from '../context';
import { Button } from '../../../components/button';
import { 
  CASE_TYPE_CONFIG, 
  type CaseType, 
  type Case,
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
  {
    id: 'CS-104',
    type: 'gynae',
    title: 'Annual Checkup',
    startDate: '20 Oct 2024',
    lastVisit: '20 Oct 2024',
    nextFollowUp: '20 Oct 2025',
    status: 'Closed',
    visitCount: 1,
    complaints: 'Routine annual examination'
  },
];


/** Type Badge Component - Text-only square badges */
function TypeBadge({ type }: { type: CaseType }) {
  const config = CASE_TYPE_CONFIG[type];
  
  // Darker color mappings for text-only badges
  const badgeColors: Record<CaseType, { bg: string; text: string }> = {
    anc: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    pnc: { bg: 'bg-rose-100', text: 'text-rose-700' },
    gynae: { bg: 'bg-amber-100', text: 'text-amber-700' },
  };
  
  const colors = badgeColors[type];
  
  return (
    <span className={`inline-block px-2 py-1 ${colors.bg} ${colors.text} text-[10px] font-bold uppercase tracking-wider`}>
      {config.label}
    </span>
  );
}

/** Table Header Columns */
interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

const TABLE_COLUMNS: TableColumn[] = [
  { key: 'visitDate', label: 'Visit Date', width: '100px' },
  { key: 'visitType', label: 'Visit Type', width: '100px' },
  { key: 'complaints', label: 'Chief Complaints' },
  { key: 'followUpDate', label: 'Follow Up Date', width: '130px' },
  { key: 'actions', label: '', width: '80px', align: 'right' },
];

/** Filtered Table Columns (when type is specified - hide Visit Type) */
const FILTERED_TABLE_COLUMNS: TableColumn[] = TABLE_COLUMNS.filter(col => col.key !== 'visitType');

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

  // Determine which columns to show
  const columns = caseType ? FILTERED_TABLE_COLUMNS : TABLE_COLUMNS;

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
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-200 shrink-0">
        <div className="flex items-center gap-3">
          {typeConfig ? (
            <div className={`w-9 h-9 flex items-center justify-center ${typeConfig.bgColor} ${typeConfig.textColor} border border-current/10`}>
              <typeConfig.icon className="w-4.5 h-4.5" />
            </div>
          ) : (
            <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100">
              <FolderOpen className="w-4.5 h-4.5" />
            </div>
          )}
          <div>
            <h1 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              {filteredCases.length} visit{filteredCases.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* New Visit Button - Only for filtered views (ANC, PNC, Gynae) */}
        {typeConfig && (
          <Button
            size="sm"
            onClick={() => handleStartCase(caseType as CaseType)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className={
              caseType === 'gynae' 
                ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
                : caseType === 'anc'
                  ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600'
                  : 'bg-rose-600 hover:bg-rose-700 border-rose-600'
            }
          >
            New Visit
          </Button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {/* Start a New Case Section - Only for All Cases view */}
        {!caseType && (
          <div className="bg-white border border-dashed border-zinc-300 p-3 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Plus className="w-4 h-4 text-zinc-500" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                Start a New Case
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Object.entries(CASE_TYPE_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                
                // Darker soft colors for each type
                const cardColors: Record<string, { bg: string; hoverBg: string; border: string; text: string }> = {
                  anc: { bg: 'bg-emerald-100', hoverBg: 'hover:bg-emerald-200', border: 'border-emerald-300', text: 'text-emerald-700' },
                  pnc: { bg: 'bg-rose-100', hoverBg: 'hover:bg-rose-200', border: 'border-rose-300', text: 'text-rose-700' },
                  gynae: { bg: 'bg-amber-100', hoverBg: 'hover:bg-amber-200', border: 'border-amber-300', text: 'text-amber-700' },
                };
                
                const colors = cardColors[key];
                
                return (
                  <button
                    key={key}
                    onClick={() => handleStartCase(key as CaseType)}
                    className={`flex items-center justify-center gap-2 py-3 px-3 border transition-all cursor-pointer hover:shadow-sm
                      ${colors.bg} ${colors.hoverBg} ${colors.border}`}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${colors.text}`}>
                      {config.fullLabel.replace(' Visits', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}


        {/* Data Table */}
        <div className="bg-white border border-zinc-200 overflow-hidden">
          <table className="w-full text-left">
            {/* Table Header */}
            <thead>
              <tr className="bg-zinc-50/80 border-b border-zinc-200">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider
                      ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                    style={{ width: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-100">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-zinc-400" />
                      </div>
                      <p className="text-[13px] font-medium text-zinc-500">No visits found</p>
                      <p className="text-[11px] text-zinc-400">Start a new visit to see it here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCases.map((caseItem) => {
                  return (
                    <tr
                      key={caseItem.id}
                      onClick={() => handleCaseClick(caseItem)}
                      className="group hover:bg-zinc-50/60 cursor-pointer transition-colors"
                    >
                      {/* Visit Date - Calendar Avatar */}
                      <td className="px-3 py-2">
                        {(() => {
                          const [day, month, year] = caseItem.startDate.split(' ');
                          return (
                            <div className="w-10 h-12 flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 leading-none">{month}</span>
                              <span className="text-[15px] font-black text-zinc-800 leading-none my-0.5">{day}</span>
                              <span className="text-[9px] font-medium text-zinc-400 leading-none">{year}</span>
                            </div>
                          );
                        })()}
                      </td>

                      {/* Visit Type (only if no filter) */}
                      {!caseType && (
                        <td className="px-3 py-2">
                          <TypeBadge type={caseItem.type} />
                        </td>
                      )}

                      {/* Chief Complaints */}
                      <td className="px-3 py-2">
                        <p className="text-[12px] font-semibold text-zinc-700 line-clamp-1" title={caseItem.complaints}>
                          {caseItem.complaints || '—'}
                        </p>
                      </td>

                      {/* Follow Up Date */}
                      <td className="px-3 py-2">
                        <span className="text-[11px] text-zinc-600">
                          {caseItem.nextFollowUp}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // More options menu (placeholder)
                            }}
                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors rounded-md"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <Button
                            size="xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCaseClick(caseItem);
                            }}
                            className="bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-900 shadow-sm"
                            rightIcon={<ArrowRight className="w-3 h-3" />}
                          >
                            Open
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-end mt-3 px-1">
          <span className="text-[10px] text-zinc-400">
            Showing {filteredCases.length} of {cases.length} total visits
          </span>
        </div>
      </div>
    </div>
  );
}

export default CaseListPage;
