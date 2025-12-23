import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderOpen, Plus, ArrowRight, Stethoscope, MoreHorizontal } from 'lucide-react';
import { usePatientV3 } from '../context';
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

/** Month-based color palette for calendar avatars */
const MONTH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Jan': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  'Feb': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  'Mar': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  'Apr': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  'May': { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
  'Jun': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
  'Jul': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  'Aug': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  'Sep': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  'Oct': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  'Nov': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
  'Dec': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
};


/** Type Badge Component */
function TypeBadge({ type }: { type: CaseType }) {
  const config = CASE_TYPE_CONFIG[type];
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-5 h-5 flex items-center justify-center ${config.bgColor} ${config.textColor}`}>
        <config.icon className="w-3 h-3" />
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-wide ${config.textColor}`}>
        {config.label}
      </span>
    </div>
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
  { key: 'type', label: 'Type', width: '100px' },
  { key: 'visit', label: 'Visit', width: '130px' },
  { key: 'complaints', label: 'Chief Complaints' },
  { key: 'followUpDate', label: 'Follow Up Date', width: '130px' },
  { key: 'actions', label: '', width: '80px', align: 'right' },
];

/** Filtered Table Columns (when type is specified) */
const FILTERED_TABLE_COLUMNS: TableColumn[] = TABLE_COLUMNS.filter(col => col.key !== 'type');

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

        {/* New Case Button */}
        {typeConfig ? (
          <button
            onClick={() => handleStartCase(caseType as CaseType)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-[12px] font-bold uppercase tracking-wide transition-all
              ${typeConfig.bgColor} ${typeConfig.textColor} border ${typeConfig.borderColor}
              hover:shadow-sm active:scale-[0.98]`}
          >
            <Plus className="w-4 h-4" />
            New {typeConfig.singularLabel}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {Object.entries(CASE_TYPE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleStartCase(key as CaseType)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all
                  ${config.bgColor} ${config.textColor} border ${config.borderColor}
                  hover:shadow-sm active:scale-[0.98]`}
              >
                <Plus className="w-3.5 h-3.5" />
                {config.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-zinc-200 overflow-hidden">
          <table className="w-full text-left">
            {/* Table Header */}
            <thead>
              <tr className="bg-zinc-50/80 border-b border-zinc-200">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider
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
                  const config = CASE_TYPE_CONFIG[caseItem.type];
                  return (
                    <tr
                      key={caseItem.id}
                      onClick={() => handleCaseClick(caseItem)}
                      className="group hover:bg-zinc-50/60 cursor-pointer transition-colors"
                    >
                      {/* Type (only if no filter) */}
                      {!caseType && (
                        <td className="px-4 py-3">
                          <TypeBadge type={caseItem.type} />
                        </td>
                      )}

                      {/* Visit - Calendar Style */}
                      <td className="px-4 py-2">
                        {(() => {
                          const [day, month, year] = caseItem.startDate.split(' ');
                          const monthColor = MONTH_COLORS[month] || { bg: 'bg-zinc-50', text: 'text-zinc-600', border: 'border-zinc-200' };
                          return (
                            <div className={`w-10 h-11 flex flex-col items-center justify-center ${monthColor.bg} ${monthColor.text} border ${monthColor.border}`}>
                              <span className="text-[8px] font-bold uppercase tracking-wider leading-none opacity-80">{month}</span>
                              <span className="text-[14px] font-black leading-none">{day}</span>
                              <span className="text-[7px] font-medium leading-none opacity-60 mt-0.5">{year}</span>
                            </div>
                          );
                        })()}
                      </td>

                      {/* Chief Complaints */}
                      <td className="px-4 py-3">
                        <p className="text-[12px] text-zinc-700 line-clamp-1" title={caseItem.complaints}>
                          {caseItem.complaints || '—'}
                        </p>
                      </td>

                      {/* Follow Up Date */}
                      <td className="px-4 py-3">
                        <span className="text-[11px] text-zinc-600">
                          {caseItem.nextFollowUp}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // More options menu (placeholder)
                            }}
                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCaseClick(caseItem);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all
                              ${config.bgColor} ${config.textColor} hover:shadow-sm`}
                          >
                            Open
                            <ArrowRight className="w-3 h-3" />
                          </button>
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
