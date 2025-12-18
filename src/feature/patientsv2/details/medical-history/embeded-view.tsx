import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit3, Eye, ExternalLink, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MedicalHistoryProvider, useMedicalHistory } from './context';
import { PastHistory } from './past-history';
import { PersonalHistory } from './personal-history';
import { FamilyHistory } from './famility-history';
import { PresentMedications } from './present-medications';

/** Embedded View Internal Content */
function EmbeddedContent({ 
  medicalHistoryPath,
  defaultCollapsed,
}: { 
  medicalHistoryPath: string;
  defaultCollapsed: boolean;
}) {
  const navigate = useNavigate();
  const { isEditMode, setMode } = useMedicalHistory();
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);

  const handleOpenFullPage = () => {
    navigate(medicalHistoryPath);
  };

  return (
    <div className="bg-white border border-zinc-200 overflow-hidden mb-3">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/80 hover:bg-zinc-100/50 border-b border-zinc-100 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-600 border border-indigo-100/50">
            <History className="w-3.5 h-3.5" />
          </div>
          <span className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight">
            Medical History
          </span>
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Open Full Page */}
          <button
            type="button"
            onClick={handleOpenFullPage}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            title="Open full Medical History page"
          >
            <ExternalLink className="w-3 h-3" />
            Open
          </button>

          {/* Mode Toggle */}
          <div className="flex items-center bg-zinc-100 p-0.5">
            <button
              type="button"
              onClick={() => setMode('view')}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold transition-colors ${
                !isEditMode
                  ? 'bg-white text-zinc-800 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Eye className="w-3 h-3" />
              View
            </button>
            <button
              type="button"
              onClick={() => setMode('edit')}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold transition-colors ${
                isEditMode
                  ? 'bg-white text-zinc-800 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          </div>

          {/* Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 bg-zinc-50/30 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="space-y-0">
            <PastHistory />
            <PersonalHistory />
            <FamilyHistory />
            <PresentMedications />
          </div>
        </div>
      )}
    </div>
  );
}

/** Props for Embedded Medical History */
interface EmbeddedMedicalHistoryProps {
  /** Initial mode: 'view' for quick glance, 'edit' for editing */
  initialMode?: 'view' | 'edit';
  /** Whether collapsed by default */
  defaultCollapsed?: boolean;
  /** Path to full medical history page (for navigation) */
  medicalHistoryPath?: string;
  /** Optional class name */
  className?: string;
}

/** Embedded Medical History - Compact view for embedding in ANC/Gyne/PNC */
export function EmbeddedMedicalHistory({
  initialMode = 'view',
  defaultCollapsed = true,
  medicalHistoryPath = '../medical-history',
  className = '',
}: EmbeddedMedicalHistoryProps) {
  return (
    <div className={className}>
      <MedicalHistoryProvider initialMode={initialMode}>
        <EmbeddedContent
          medicalHistoryPath={medicalHistoryPath}
          defaultCollapsed={defaultCollapsed}
        />
      </MedicalHistoryProvider>
    </div>
  );
}

export default EmbeddedMedicalHistory;
