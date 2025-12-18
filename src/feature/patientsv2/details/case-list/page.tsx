import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  ArrowRight,
  FolderOpen,
  Users,
  Baby,
  Stethoscope
} from 'lucide-react';
import { usePatientDetails } from '../context';
import type { CaseType } from '../store';

/** Case Interface */
export interface Case {
  id: string;
  type: CaseType;
  title: string;
  startDate: string;
  lastVisit: string;
  nextFollowUp: string;
  status: 'Active' | 'Closed' | 'On Hold';
  visitCount: number;
}

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
    visitCount: 5
  },
  {
    id: 'CS-102',
    type: 'pnc',
    title: 'Normal Delivery Follow-up',
    startDate: '01 Dec 2024',
    lastVisit: '10 Dec 2024',
    nextFollowUp: '20 Dec 2024',
    status: 'Active',
    visitCount: 2
  },
  {
    id: 'CS-103',
    type: 'gynae',
    title: 'PCOS Management',
    startDate: '15 Nov 2024',
    lastVisit: '05 Dec 2024',
    nextFollowUp: '05 Jan 2025',
    status: 'Active',
    visitCount: 3
  },
];

/** Case Type Configuration */
const CASE_TYPE_CONFIG: Record<CaseType, { label: string; fullLabel: string; icon: any; bgColor: string; textColor: string; borderColor: string }> = {
  anc: { 
    label: 'ANC', 
    fullLabel: 'Antenatal',
    icon: Users, 
    bgColor: 'bg-emerald-50', 
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200'
  },
  pnc: { 
    label: 'PNC', 
    fullLabel: 'Postnatal',
    icon: Baby, 
    bgColor: 'bg-rose-50', 
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200'
  },
  gynae: { 
    label: 'Gynae', 
    fullLabel: 'Gynaecological',
    icon: Stethoscope, 
    bgColor: 'bg-amber-50', 
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200'
  },
};

/** Case List Page */
export function CaseListPage() {
  const { caseType } = useParams<{ caseType: string }>();
  const { store } = usePatientDetails();
  const navigate = useNavigate();
  const [cases] = useState<Case[]>(MOCK_CASES);

  // Filter cases by type if specified
  const filteredCases = caseType 
    ? cases.filter(c => c.type === caseType)
    : cases;

  const typeConfig = caseType 
    ? CASE_TYPE_CONFIG[caseType as CaseType] 
    : null;

  // Handle clicking on a case
  const handleCaseClick = (caseItem: Case) => {
    store.setCase(caseItem.type, caseItem.id);
    navigate(`/patientsv2/${store.patientId}/${caseItem.type}`);
  };

  // Handle starting a new case of specific type
  const handleStartCase = (type: CaseType) => {
    store.setCase(type);
    navigate(`/patientsv2/${store.patientId}/${type}`);
  };

  // Page title
  const pageTitle = typeConfig 
    ? `${typeConfig.fullLabel} Cases`
    : 'All Cases';

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
              {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** New Case Row - For specific case type pages */
function NewCaseRow({ 
  config, 
  onStart 
}: { 
  config: typeof CASE_TYPE_CONFIG[CaseType];
  onStart: () => void;
}) {

  return (
    <button
      onClick={onStart}
      className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-dashed border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
    >
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
        <Plus className="w-5 h-5" />
      </div>

      <div className="flex-1 text-left">
        <h3 className="text-[13px] font-bold text-zinc-700 group-hover:text-zinc-900">
          Start a New {config.fullLabel} Case
        </h3>
        <p className="text-[11px] text-zinc-500">
          Click to create a new case for this patient
        </p>
      </div>

      <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${config.bgColor} ${config.textColor} border ${config.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}

/** New Case Selector - For All Cases page with grid */
function NewCaseSelector({ onSelect }: { onSelect: (type: CaseType) => void }) {
  const caseTypes = Object.entries(CASE_TYPE_CONFIG) as [CaseType, typeof CASE_TYPE_CONFIG[CaseType]][];

  return (
    <div className="bg-white border-2 border-dashed border-zinc-300 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-zinc-100 text-zinc-500">
          <Plus className="w-4 h-4" />
        </div>
        <span className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide">
          Start a New Case
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {caseTypes.map(([type, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`flex flex-col items-center gap-2 p-4 border ${config.borderColor} ${config.bgColor} hover:shadow-sm transition-all group`}
            >
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${config.textColor} bg-white border ${config.borderColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold ${config.textColor} uppercase tracking-wide`}>
                {config.fullLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Case Row Component - Full Width List Item */
function CaseRow({ caseItem, onClick }: { caseItem: Case; onClick: () => void }) {
  const config = CASE_TYPE_CONFIG[caseItem.type];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer flex items-center gap-4 px-4 py-3"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${config.bgColor} ${config.textColor} border border-current/10`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[13px] font-bold text-zinc-900 truncate">
            {caseItem.title}
          </h3>
          <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase shrink-0 ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
            {config.label}
          </span>
          <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase shrink-0 border ${
            caseItem.status === 'Active' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-zinc-100 text-zinc-600 border-zinc-200'
          }`}>
            {caseItem.status}
          </span>
        </div>
        <div className="text-[11px] text-zinc-500">
          Case #{caseItem.id}
        </div>
      </div>

      {/* Visits Count */}
      <div className="hidden sm:flex flex-col items-center shrink-0 px-4">
        <div className="w-10 h-10 rounded-sm bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-1">
          <span className="text-[16px] font-bold text-indigo-600">{caseItem.visitCount}</span>
        </div>
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Visits</span>
      </div>

      {/* Last Visit */}
      <div className="hidden md:block shrink-0 w-24 text-right">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-bold tracking-wide mb-0.5 justify-end">
          <Clock className="w-3 h-3" />
          Last
        </div>
        <p className="text-[12px] font-medium text-zinc-700">{caseItem.lastVisit}</p>
      </div>

      {/* Next Visit */}
      <div className="hidden md:block shrink-0 w-24 text-right">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-bold tracking-wide mb-0.5 justify-end">
          <Calendar className="w-3 h-3" />
          Next
        </div>
        <p className="text-[12px] font-medium text-zinc-700">{caseItem.nextFollowUp}</p>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-zinc-100">
        <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors uppercase tracking-wide">
          Open
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="p-1.5 text-zinc-300 hover:text-zinc-600 hover:bg-zinc-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CaseListPage;
