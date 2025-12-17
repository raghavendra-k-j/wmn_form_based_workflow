import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  History,
  User,
  Users,
  Pill,
  Eye,
  Edit3,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// Import actual section components for Edit mode
import { PastHistory } from './sections/PastHistory';
import { PersonalHistory } from './sections/PersonalHistory';
import { FamilyHistory } from './sections/FamilyHistory';
import { PresentMedication } from './sections/PresentMedication';

/* ============================================================================
 * TYPES & INTERFACES
 * ============================================================================ */

export type MedicalHistoryViewMode = 'summary' | 'edit';

interface PastHistoryItem {
  id: string;
  name: string;
  since: string;
  status: 'active' | 'inactive';
  notes: string;
}

interface PersonalHistoryItem {
  id: string;
  name: string;
  status: 'yes' | 'no' | 'occasional' | 'unknown';
  details: string;
  notes: string;
}

interface FamilyHistoryItem {
  id: string;
  name: string;
  familyMember: string;
  status: 'active' | 'inactive';
  notes: string;
}

export interface MedicalHistoryData {
  pastHistory: PastHistoryItem[];
  personalHistory: PersonalHistoryItem[];
  familyHistory: FamilyHistoryItem[];
  presentMedication: string;
}

interface EmbeddableMedicalHistoryProps {
  /** View mode: 'summary' for read-only view, 'edit' for full editable view */
  mode?: MedicalHistoryViewMode;
  /** Initial data for summary view - if not provided, will use mock data */
  data?: MedicalHistoryData;
  /** Whether the component is collapsed by default */
  defaultCollapsed?: boolean;
  /** Custom class name */
  className?: string;
  /** Link to full medical history page (for navigation) */
  medicalHistoryPath?: string;
}

/* ============================================================================
 * MOCK DATA FOR DEMONSTRATION (Summary View)
 * ============================================================================ */

const MOCK_DATA: MedicalHistoryData = {
  pastHistory: [
    { id: '1', name: 'Diabetes Type 2', since: '2020', status: 'active', notes: 'On metformin 500mg' },
    { id: '2', name: 'Hypertension', since: '2019', status: 'active', notes: 'Controlled with medication' },
    { id: '3', name: 'Thyroid', since: '', status: 'inactive', notes: '' },
  ],
  personalHistory: [
    { id: '1', name: 'Smoking', status: 'no', details: '', notes: '' },
    { id: '2', name: 'Alcohol', status: 'occasional', details: 'Social', notes: 'Weekends only' },
  ],
  familyHistory: [
    { id: '1', name: 'Diabetes', familyMember: 'Mother', status: 'active', notes: '' },
    { id: '2', name: 'Hypertension', familyMember: 'Father', status: 'active', notes: 'On treatment' },
  ],
  presentMedication: 'Metformin 500mg BD, Amlodipine 5mg OD'
};

/* ============================================================================
 * HELPER COMPONENTS
 * ============================================================================ */

interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  hasData: boolean;
}

function SummaryCard({ title, icon, iconColor, isExpanded, onToggle, children, hasData }: SummaryCardProps) {
  if (!hasData) return null;
  
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-2">
      <div 
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/50 border-b border-zinc-100 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 ${iconColor}`}>{icon}</span>
          <h4 className="font-medium text-zinc-800 select-none text-xs">{title}</h4>
        </div>
        <button className="p-0.5 text-zinc-400 hover:text-zinc-600 rounded hover:bg-zinc-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
      {isExpanded && (
        <div className="p-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

function Tag({ children, variant = 'default' }: TagProps) {
  const variants = {
    default: 'bg-zinc-100 text-zinc-600',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

/* ============================================================================
 * SUMMARY VIEW COMPONENT (Read-Only)
 * ============================================================================ */

function SummaryView({ data, defaultCollapsed }: { data: MedicalHistoryData; defaultCollapsed: boolean }) {
  const [expandedSections, setExpandedSections] = useState({
    pastHistory: !defaultCollapsed,
    personalHistory: !defaultCollapsed,
    familyHistory: !defaultCollapsed,
    presentMedication: !defaultCollapsed
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter to only show items with data
  const activePastHistory = data.pastHistory.filter(i => i.status === 'active');
  const activePersonalHistory = data.personalHistory.filter(i => i.status === 'yes' || i.status === 'occasional');
  const activeFamilyHistory = data.familyHistory.filter(i => i.status === 'active');
  const hasMedication = data.presentMedication.trim().length > 0;

  const hasAnyData = activePastHistory.length > 0 || 
                     activePersonalHistory.length > 0 || 
                     activeFamilyHistory.length > 0 || 
                     hasMedication;

  if (!hasAnyData) {
    return (
      <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-zinc-500">
        <AlertCircle className="w-4 h-4" />
        <span className="text-xs">No medical history recorded</span>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Past History */}
      <SummaryCard
        title="Past History"
        icon={<History className="w-3.5 h-3.5" />}
        iconColor="text-amber-500"
        isExpanded={expandedSections.pastHistory}
        onToggle={() => toggleSection('pastHistory')}
        hasData={activePastHistory.length > 0}
      >
        <div className="flex flex-wrap gap-1.5">
          {activePastHistory.map(item => (
            <div key={item.id} className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded border border-amber-100">
              <span className="text-xs font-medium text-amber-800">{item.name}</span>
              {item.since && <span className="text-xs text-amber-600">({item.since})</span>}
              {item.notes && <span className="text-xs text-amber-500">• {item.notes}</span>}
            </div>
          ))}
        </div>
      </SummaryCard>

      {/* Personal History */}
      <SummaryCard
        title="Personal History"
        icon={<User className="w-3.5 h-3.5" />}
        iconColor="text-purple-500"
        isExpanded={expandedSections.personalHistory}
        onToggle={() => toggleSection('personalHistory')}
        hasData={activePersonalHistory.length > 0}
      >
        <div className="flex flex-wrap gap-1.5">
          {activePersonalHistory.map(item => (
            <div key={item.id} className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 rounded border border-purple-100">
              <span className="text-xs font-medium text-purple-800">{item.name}</span>
              <Tag variant={item.status === 'yes' ? 'danger' : 'warning'}>
                {item.status === 'yes' ? 'Yes' : 'Occasional'}
              </Tag>
              {item.details && <span className="text-xs text-purple-500">• {item.details}</span>}
            </div>
          ))}
        </div>
      </SummaryCard>

      {/* Family History */}
      <SummaryCard
        title="Family History"
        icon={<Users className="w-3.5 h-3.5" />}
        iconColor="text-blue-500"
        isExpanded={expandedSections.familyHistory}
        onToggle={() => toggleSection('familyHistory')}
        hasData={activeFamilyHistory.length > 0}
      >
        <div className="flex flex-wrap gap-1.5">
          {activeFamilyHistory.map(item => (
            <div key={item.id} className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded border border-blue-100">
              <span className="text-xs font-medium text-blue-800">{item.name}</span>
              {item.familyMember && <span className="text-xs text-blue-600">({item.familyMember})</span>}
              {item.notes && <span className="text-xs text-blue-500">• {item.notes}</span>}
            </div>
          ))}
        </div>
      </SummaryCard>

      {/* Present Medication */}
      <SummaryCard
        title="Present Medication"
        icon={<Pill className="w-3.5 h-3.5" />}
        iconColor="text-teal-500"
        isExpanded={expandedSections.presentMedication}
        onToggle={() => toggleSection('presentMedication')}
        hasData={hasMedication}
      >
        <p className="text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">{data.presentMedication}</p>
      </SummaryCard>
    </div>
  );
}

/* ============================================================================
 * EDIT VIEW COMPONENT (Full Table-Based Editing)
 * Uses the actual section components from the medical history page
 * ============================================================================ */

function EditView() {
  return (
    <div className="space-y-0">
      {/* Render actual section components with full editing capabilities */}
      <PastHistory />
      <PersonalHistory />
      <FamilyHistory />
      <PresentMedication />
    </div>
  );
}

/* ============================================================================
 * MAIN EMBEDDABLE COMPONENT
 * ============================================================================ */

export function EmbeddableMedicalHistory({
  mode = 'summary',
  data = MOCK_DATA,
  defaultCollapsed = true,
  className = '',
  medicalHistoryPath = '../medical-history'
}: EmbeddableMedicalHistoryProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
  const [currentMode, setCurrentMode] = useState<MedicalHistoryViewMode>(mode);

  const handleOpenFullPage = () => {
    navigate(medicalHistoryPath);
  };

  return (
    <div className={`bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden mb-3 ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-white border-b border-zinc-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
            <History className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-zinc-900 text-sm">Medical History</h3>
        </div>
        
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Open Full Page Link */}
          <button
            onClick={handleOpenFullPage}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="Open full Medical History page"
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
            <SummaryView data={data} defaultCollapsed={false} />
          ) : (
            <EditView />
          )}
        </div>
      )}
    </div>
  );
}

export default EmbeddableMedicalHistory;
