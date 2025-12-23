import { useState } from 'react';
import { 
  ChevronDown,
  ChevronRight, 
  ChevronUp,
  FolderOpen,
  HeartPulse,
  UserCircle,
  AlertTriangle,
  Syringe,
  Droplets,
  ScanLine,
  Building2,
  Baby,
  XCircle,
  Ban,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePatientV3 } from '../context';
import { VISIT_TYPES } from '../components/case-type-config';

/** Menu Section - Carbon Design */
export function MenuSection() {
  const { store } = usePatientV3();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisitsExpanded, setIsVisitsExpanded] = useState(true);

  // Check if we're on a cases page
  const isCasesPage = location.pathname.includes('/cases');

  // Navigation helper
  const goTo = (path: string) => {
    navigate(`/patientv3/${store.patientId}/${path}`);
  };

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
          onClick={() => goTo('profile')} 
          active={location.pathname.includes('/profile')}
        />

        {/* Current Pregnancy */}
        <MenuButton 
          icon={HeartPulse} 
          label="Current Pregnancy" 
          bgColor="bg-pink-50"
          textColor="text-pink-600"
          onClick={() => goTo('current-pregnancy')} 
          active={location.pathname.includes('/current-pregnancy')}
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
            {VISIT_TYPES.map((type) => {
              // Check if this type is active (either on case list or viewing an encounter)
              const isActive = location.pathname.includes(`/cases/${type.id}`) || 
                               location.pathname.includes(`/${type.id}/`);
              return (
                <MenuButton
                  key={type.id}
                  icon={type.icon}
                  label={type.label}
                  bgColor={type.bgColor}
                  textColor={type.textColor}
                  onClick={() => goTo(`cases/${type.id}`)}
                  indent
                  active={isActive}
                />
              );
            })}
          </div>
        )}

        {/* Pregnancy Complications */}
        <MenuButton 
          icon={AlertTriangle} 
          label="Pregnancy Complications" 
          bgColor="bg-orange-50"
          textColor="text-orange-600"
          onClick={() => goTo('pregnancy-complications')} 
          active={location.pathname.includes('/pregnancy-complications')}
        />

        {/* TT */}
        <MenuButton 
          icon={Syringe} 
          label="TT" 
          bgColor="bg-cyan-50"
          textColor="text-cyan-600"
          onClick={() => goTo('tt')} 
          active={location.pathname.includes('/tt')}
        />

        {/* Anti-D */}
        <MenuButton 
          icon={Droplets} 
          label="Anti-D" 
          bgColor="bg-red-50"
          textColor="text-red-600"
          onClick={() => goTo('anti-d')} 
          active={location.pathname.includes('/anti-d')}
        />

        {/* Tests/Scans */}
        <MenuButton 
          icon={ScanLine} 
          label="Tests/Scans" 
          bgColor="bg-violet-50"
          textColor="text-violet-600"
          onClick={() => goTo('tests-scans')} 
          active={location.pathname.includes('/tests-scans')}
        />

        {/* Hosp Adm */}
        <MenuButton 
          icon={Building2} 
          label="Hosp Adm" 
          bgColor="bg-slate-50"
          textColor="text-slate-600"
          onClick={() => goTo('hosp-adm')} 
          active={location.pathname.includes('/hosp-adm')}
        />

        {/* Delivery Info */}
        <MenuButton 
          icon={Baby} 
          label="Delivery Info" 
          bgColor="bg-teal-50"
          textColor="text-teal-600"
          onClick={() => goTo('delivery-info')} 
          active={location.pathname.includes('/delivery-info')}
        />

        {/* Deactivate */}
        <MenuButton 
          icon={XCircle} 
          label="Deactivate" 
          bgColor="bg-zinc-100"
          textColor="text-zinc-600"
          onClick={() => goTo('deactivate')} 
          active={location.pathname.includes('/deactivate')}
        />

        {/* Terminate Preg */}
        <MenuButton 
          icon={Ban} 
          label="Terminate Preg" 
          bgColor="bg-rose-50"
          textColor="text-rose-600"
          onClick={() => goTo('terminate-preg')} 
          active={location.pathname.includes('/terminate-preg')}
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
  // Extract color name from textColor (e.g., 'text-amber-600' -> 'amber')
  // We'll use the 600 shade for background when active
  const activeBgColor = textColor.replace('text-', 'bg-');
  
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 py-2.5 text-left transition-all duration-150 group border-b border-zinc-100 cursor-pointer ${
        indent ? 'pl-8 pr-4' : 'px-4'
      } ${
        active 
          ? `${activeBgColor} text-white shadow-sm` 
          : 'bg-white hover:bg-zinc-50/50 text-zinc-600 hover:text-zinc-900'
      }`}
    >
      {/* Active Indicator - White line for solid background */}
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30" />}
      
      <div className={`w-7 h-7 rounded-none flex items-center justify-center shrink-0 border border-current/20 ${active ? 'bg-white/20 text-white' : `${bgColor} ${textColor}`} transition-all`}>
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
          className={`p-1 ${onEndIconClick ? 'hover:bg-white/20 cursor-pointer rounded-sm' : ''}`}
        >
          <EndIcon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-zinc-400'}`} />
        </div>
      ) : (
        <ChevronRight className={`w-3.5 h-3.5 transition-all ${active ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-zinc-300'}`} />
      )}
    </button>
  );
}

export default MenuSection;
