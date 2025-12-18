import { useState } from 'react';
import { 
  ArrowLeft, 
  Baby, 
  ChevronDown,
  ChevronRight, 
  ChevronUp,
  ClipboardList, 
  FileEdit,
  FolderOpen,
  History, 
  Stethoscope, 
  UserCircle, 
  Users 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePatientDetails } from '../context';
import { CaseType } from '../store';

/** Visit Type Configuration */
const VISIT_TYPES = [
  { 
    id: 'anc' as const, 
    label: 'Antenatal Visits', 
    icon: Users, 
    bgColor: 'bg-emerald-50', 
    textColor: 'text-emerald-600' 
  },
  { 
    id: 'pnc' as const, 
    label: 'Postnatal Visits', 
    icon: Baby, 
    bgColor: 'bg-rose-50', 
    textColor: 'text-rose-600' 
  },
  { 
    id: 'gynae' as const, 
    label: 'Gynaecological Visits', 
    icon: Stethoscope, 
    bgColor: 'bg-amber-50', 
    textColor: 'text-amber-600' 
  },
];

/** Menu Section - Carbon Design */
export function MenuSection() {
  const { store } = usePatientDetails();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCase, patientId } = store;
  const [isVisitsExpanded, setIsVisitsExpanded] = useState(true);

  // Check if we're on a cases page
  const isCasesPage = location.pathname.includes('/cases');

  // Navigation helper
  const goTo = (path: string) => {
    navigate(`/patientsv2/${patientId}/${path}`);
  };

  /** Case Context Menu (when a case is selected) */
  if (currentCase) {
    return <CaseContextMenu />;
  }

  /** Default Menu (No case selected) */
  return (
    <nav className="flex-1 py-0">
      <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-200 bg-zinc-100/80">
        Main Navigation
      </div>
      
      <div className="flex flex-col">
        {/* Profile Details */}
        <MenuButton 
          icon={UserCircle} 
          label="Profile Details" 
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
          onClick={() => {
            store.setCase(null);
            goTo('profile');
          }} 
        />

        {/* All Visits - Navigates and Expands */}
        <MenuButton 
          icon={FolderOpen} 
          label="All Visits" 
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          onClick={() => {
            goTo('cases');
            if (!isVisitsExpanded) setIsVisitsExpanded(true);
          }}
          endIcon={isVisitsExpanded ? ChevronUp : ChevronDown}
          onEndIconClick={() => setIsVisitsExpanded(!isVisitsExpanded)}
          active={isCasesPage && location.pathname.endsWith('/cases')}
        />

        {/* Visit Type Submenu */}
        {isVisitsExpanded && (
          <div className="bg-zinc-50/30 border-b border-zinc-100 animate-in fade-in slide-in-from-top-1 duration-200">
            {VISIT_TYPES.map((type) => (
              <MenuButton
                key={type.id}
                icon={type.icon}
                label={type.label}
                bgColor={type.bgColor}
                textColor={type.textColor}
                onClick={() => goTo(`cases/${type.id}`)}
                indent
                active={location.pathname.includes(`/cases/${type.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/** Case Context Menu - Shown when a case is selected */
function CaseContextMenu() {
  const { store } = usePatientDetails();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCase, currentCaseId, patientId } = store;

  if (!currentCase) return null;

  const caseConfig: Record<CaseType, { label: string; shortLabel: string; bgColor: string; textColor: string; icon: any }> = {
    anc: { label: 'Antenatal Case', shortLabel: 'ANC', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', icon: Users },
    pnc: { label: 'Postnatal Case', shortLabel: 'PNC', bgColor: 'bg-rose-50', textColor: 'text-rose-600', icon: Baby },
    gynae: { label: 'Gynae Case', shortLabel: 'GYNAE', bgColor: 'bg-amber-50', textColor: 'text-amber-600', icon: Stethoscope },
  };

  const config = caseConfig[currentCase];
  const Icon = config.icon;

  const goTo = (path: string) => {
    navigate(`/patientsv2/${patientId}/${path}`);
  };

  const handleBack = () => {
    store.setCase(null);
    navigate(`/patientsv2/${patientId}/cases/${currentCase}`);
  };

  // Check current path for active state
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <nav className="flex-1">
      {/* Case Header */}
      <div className="flex items-center gap-0 border-b border-zinc-200 bg-zinc-100/50 sticky top-0 z-10">
        <button 
          onClick={handleBack}
          className="w-10 h-12 flex items-center justify-center hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 border-r border-zinc-200 transition-colors"
          title="Back to Case List"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <div className="flex-1 flex items-center gap-3 px-4 py-2">
          <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border border-current/10 ${config.bgColor} ${config.textColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            {currentCaseId ? (
              <>
                <div className="text-[14px] font-bold text-zinc-900 tracking-tight truncate">
                  {currentCaseId}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wide ${config.textColor}`}>
                  {config.shortLabel} Case
                </div>
              </>
            ) : (
              <div className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight truncate">
                {config.label}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Case Navigation */}
      <div className="flex flex-col bg-white">
        {/* Visit History/Summary - For ANC and Gynae only */}
        {currentCase !== 'pnc' && (
          <MenuButton 
            icon={ClipboardList} 
            label={currentCase === 'gynae' ? 'Visit History' : 'Visit Summary'}
            bgColor={config.bgColor}
            textColor={config.textColor}
            onClick={() => goTo(currentCase)} 
            active={isActive(`/${currentCase}`) && !isActive('form') && !isActive('history')}
          />
        )}

        {/* PNC Form - For PNC cases */}
        {currentCase === 'pnc' && (
          <MenuButton 
            icon={FileEdit} 
            label="PNC Form" 
            bgColor="bg-rose-50"
            textColor="text-rose-600"
            onClick={() => goTo('pnc-form')} 
            active={isActive('pnc-form')}
          />
        )}

        {/* Obstetric History - For ALL case types */}
        <MenuButton 
          icon={History} 
          label="Obstetric History" 
          bgColor="bg-pink-50"
          textColor="text-pink-600"
          onClick={() => goTo('obstetric-history')} 
          active={isActive('obstetric-history')}
        />

        {/* Medical History - For all cases */}
        <MenuButton 
          icon={History} 
          label="Medical History" 
          bgColor="bg-blue-50"
          textColor="text-blue-600" 
          onClick={() => goTo('medical-history')} 
          active={isActive('medical-history')}
        />
      </div>
    </nav>
  );
}

/** Menu Button Component */
function MenuButton({ 
  icon: Icon, 
  label, 
  onClick, 
  bgColor,
  textColor,
  active = false,
  indent = false,
  endIcon: EndIcon,
  onEndIconClick,
}: { 
  icon: any;
  label: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  active?: boolean;
  indent?: boolean;
  endIcon?: any;
  onEndIconClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 py-2 text-left transition-all duration-150 group border-b border-zinc-100 ${
        indent ? 'pl-8 pr-4' : 'px-4'
      } ${
        active 
          ? 'bg-zinc-50 text-zinc-900' 
          : 'bg-white hover:bg-zinc-50/50 text-zinc-600 hover:text-zinc-900'
      }`}
    >
      {/* Active Indicator Bar */}
      {active && <div className="absolute left-0 top-[10%] bottom-[10%] w-1 bg-indigo-600 rounded-r-full" />}
      
      <div className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 border border-current/10 ${bgColor} ${textColor} transition-all group-hover:shadow-[0_0_8px_rgba(0,0,0,0.05)]`}>
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={`text-[13px] tracking-tight truncate ${active ? 'font-bold' : 'font-medium'}`}>
          {label}
        </div>
      </div>

      {EndIcon ? (
        <div 
          onClick={(e) => {
            if (onEndIconClick) {
              e.stopPropagation();
              onEndIconClick();
            }
          }}
          className={`p-1 ${onEndIconClick ? 'hover:bg-zinc-100 cursor-pointer' : ''}`}
        >
          <EndIcon className="w-3.5 h-3.5 text-zinc-400" />
        </div>
      ) : (
        <ChevronRight className={`w-3.5 h-3.5 text-zinc-200 transition-all ${active ? 'opacity-100 text-zinc-400' : 'opacity-0 group-hover:opacity-100'}`} />
      )}
    </button>
  );
}
