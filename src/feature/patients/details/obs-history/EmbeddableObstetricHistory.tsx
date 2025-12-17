import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Baby,
  HeartPulse,
  Calculator,
  Eye,
  Edit3,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

/* ============================================================================
 * TYPES & INTERFACES
 * ============================================================================ */

export type ObstetricHistoryViewMode = 'summary' | 'edit';

interface PregnancyRecord {
  id: string;
  outcome: 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';
  year?: string;
  lmpDate?: string;
  gestationWeeks?: number;
  deliveryMode: 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';
  birthWeight?: string;
  gender: 'Male' | 'Female' | 'Other' | 'NA';
  babyStatus: 'Living' | 'Deceased' | 'NA';
  complications: string[];
  remarks: string;
}

interface GTPALScore {
  g: number;
  t: number;
  p: number;
  a: number;
  l: number;
}

export interface ObstetricHistoryData {
  records: PregnancyRecord[];
  currentPregnancy: PregnancyRecord | null;
  gtpalScore: GTPALScore;
  currentGA: { weeks: number; days: number } | null;
  currentEDD: string | null;
}

interface EmbeddableObstetricHistoryProps {
  /** View mode: 'summary' for read-only view, 'edit' for navigation to full page */
  mode?: ObstetricHistoryViewMode;
  /** Initial data - if not provided, will use mock data */
  data?: ObstetricHistoryData;
  /** Whether the component is collapsed by default */
  defaultCollapsed?: boolean;
  /** Custom class name */
  className?: string;
  /** Link to full obstetric history page */
  obstetricHistoryPath?: string;
  /** Callback when LMP is set/changed (for syncing with ANC) */
  onLMPChange?: (lmpDate: string | null) => void;
}

/* ============================================================================
 * HELPER FUNCTIONS
 * ============================================================================ */

function calculateGA(lmpDate: string): { weeks: number; days: number } {
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
}

function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function calculateGTPAL(records: PregnancyRecord[]): GTPALScore {
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');
  const gravida = records.length;
  const term = pastRecords.filter(r => (r.gestationWeeks || 0) >= 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth')).length;
  const preterm = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks >= 20 && weeks < 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth');
  }).length;
  const abortions = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks < 20 || r.outcome === 'Miscarriage' || r.outcome === 'Abortion' || r.outcome === 'Ectopic';
  }).length;
  const living = pastRecords.filter(r => r.babyStatus === 'Living').length;

  return { g: gravida, t: term, p: preterm, a: abortions, l: living };
}

/* ============================================================================
 * MOCK DATA
 * ============================================================================ */

const MOCK_RECORDS: PregnancyRecord[] = [
  {
    id: '1',
    outcome: 'Live Birth',
    year: '2019',
    gestationWeeks: 39,
    deliveryMode: 'NVD',
    birthWeight: '3.1 kg',
    gender: 'Female',
    babyStatus: 'Living',
    complications: [],
    remarks: ''
  },
  {
    id: '2',
    outcome: 'Miscarriage',
    year: '2021',
    gestationWeeks: 8,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: ''
  },
  {
    id: 'current',
    outcome: 'Ongoing',
    lmpDate: '2024-06-15',
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: ''
  }
];

function getMockData(): ObstetricHistoryData {
  const currentPregnancy = MOCK_RECORDS.find(r => r.outcome === 'Ongoing') || null;
  const currentGA = currentPregnancy?.lmpDate ? calculateGA(currentPregnancy.lmpDate) : null;
  const currentEDD = currentPregnancy?.lmpDate ? calculateEDD(currentPregnancy.lmpDate) : null;
  
  return {
    records: MOCK_RECORDS,
    currentPregnancy,
    gtpalScore: calculateGTPAL(MOCK_RECORDS),
    currentGA,
    currentEDD
  };
}

/* ============================================================================
 * SUMMARY VIEW COMPONENT
 * ============================================================================ */

function SummaryView({ data }: { data: ObstetricHistoryData }) {
  const { currentPregnancy, gtpalScore, currentGA, currentEDD, records } = data;
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');

  if (records.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-zinc-500">
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs">No obstetric history recorded</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Current Pregnancy Card */}
      {currentPregnancy && currentGA && (
        <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-pink-100">
                <HeartPulse className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-zinc-700">Current Pregnancy</h4>
                  <span className="px-1.5 py-0.5 bg-pink-100 text-pink-700 text-[9px] font-bold rounded-full uppercase">Active</span>
                </div>
                <p className="text-base font-black text-pink-600">
                  {currentGA.weeks}w {currentGA.days}d
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">EDD</p>
              <p className="text-xs font-bold text-zinc-700">{currentEDD}</p>
            </div>
          </div>
        </div>
      )}

      {/* GTPAL Score */}
      <div className="flex items-center gap-3 p-2 bg-zinc-50 rounded-lg border border-zinc-100">
        <div className="flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-500">GTPAL:</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { label: 'G', value: gtpalScore.g, color: 'bg-blue-100 text-blue-700' },
            { label: 'T', value: gtpalScore.t, color: 'bg-emerald-100 text-emerald-700' },
            { label: 'P', value: gtpalScore.p, color: 'bg-amber-100 text-amber-700' },
            { label: 'A', value: gtpalScore.a, color: 'bg-rose-100 text-rose-700' },
            { label: 'L', value: gtpalScore.l, color: 'bg-indigo-100 text-indigo-700' },
          ].map(item => (
            <div key={item.label} className={`flex items-center rounded ${item.color}`}>
              <span className="px-1.5 py-0.5 text-[10px] font-bold">{item.label}</span>
              <span className="px-1 py-0.5 text-[10px] font-black">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Past Pregnancies Summary */}
      {pastRecords.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Previous Pregnancies</p>
          <div className="flex flex-wrap gap-1.5">
            {pastRecords.map((record) => (
              <div 
                key={record.id} 
                className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs ${
                  record.outcome === 'Live Birth' 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    : record.outcome === 'Stillbirth'
                    ? 'bg-zinc-50 border-zinc-200 text-zinc-600'
                    : 'bg-rose-50 border-rose-100 text-rose-700'
                }`}
              >
                <span className="font-medium">{record.year}</span>
                <span className="text-[10px]">•</span>
                <span>{record.outcome}</span>
                {record.deliveryMode !== 'NA' && (
                  <>
                    <span className="text-[10px]">•</span>
                    <span className={record.deliveryMode === 'LSCS' ? 'font-semibold' : ''}>{record.deliveryMode}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * EDIT VIEW - Links to Full Page
 * ============================================================================ */

function EditView({ obstetricHistoryPath, navigate }: { obstetricHistoryPath: string; navigate: (path: string) => void }) {
  return (
    <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-center">
      <Baby className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
      <p className="text-sm font-medium text-zinc-600 mb-2">Full Obstetric History Editor</p>
      <p className="text-xs text-zinc-400 mb-3">Add, edit, or remove pregnancy records</p>
      <button
        onClick={() => navigate(obstetricHistoryPath)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-xs font-medium rounded-lg hover:bg-pink-700 transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Open Full Editor
      </button>
    </div>
  );
}

/* ============================================================================
 * MAIN EMBEDDABLE COMPONENT
 * ============================================================================ */

export function EmbeddableObstetricHistory({
  mode = 'summary',
  data,
  defaultCollapsed = true,
  className = '',
  obstetricHistoryPath = '../obstetric-history',
  // onLMPChange
}: EmbeddableObstetricHistoryProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
  const [currentMode, setCurrentMode] = useState<ObstetricHistoryViewMode>(mode);
  
  // Use provided data or mock data
  const historyData = data || getMockData();

  const handleOpenFullPage = () => {
    navigate(obstetricHistoryPath);
  };

  return (
    <div className={`bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden mb-3 ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-white border-b border-zinc-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
            <Baby className="w-3.5 h-3.5 text-pink-600" />
          </div>
          <h3 className="font-semibold text-zinc-900 text-sm">Obstetric History</h3>
          {historyData.currentPregnancy && historyData.currentGA && (
            <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-full">
              {historyData.currentGA.weeks}w {historyData.currentGA.days}d
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Open Full Page Link */}
          <button
            onClick={handleOpenFullPage}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded transition-colors"
            title="Open full Obstetric History page"
          >
            <ExternalLink className="w-3 h-3" />
            Open Full
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-zinc-100 rounded-md p-0.5">
            <button
              onClick={() => setCurrentMode('summary')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                currentMode === 'summary' 
                  ? 'bg-white text-zinc-800 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Eye className="w-3 h-3" />
              Summary
            </button>
            <button
              onClick={() => setCurrentMode('edit')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                currentMode === 'edit' 
                  ? 'bg-white text-zinc-800 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          </div>
          
          {/* Expand/Collapse */}
          <button className="p-1 text-zinc-400 hover:text-zinc-600 rounded hover:bg-zinc-100 transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {currentMode === 'summary' ? (
            <SummaryView data={historyData} />
          ) : (
            <EditView obstetricHistoryPath={obstetricHistoryPath} navigate={navigate} />
          )}
        </div>
      )}
    </div>
  );
}

export default EmbeddableObstetricHistory;
