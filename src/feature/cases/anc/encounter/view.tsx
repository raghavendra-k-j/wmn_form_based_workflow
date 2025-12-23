import { ArrowLeft } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { AncEncounterLayout } from './layout';
import './style.css';

// Mock read-only visit info - would come from store/API
const VISIT_INFO = {
  lmp: '15-01-2024',
  edd: '22-10-2024',
  scanEdd: '20-10-2024',
  gestAge: '20w 3d',
  lastSeen: '10-06-2024',
  totalVisits: '5',
  totalAncVisits: '4',
};

/** ANC Encounter View - Main entry point with header */
export const AncEncounterView = observer(() => {
  const navigate = useNavigate();
  const { encounterId } = useParams<{ encounterId: string }>();

  const handleBack = () => {
    navigate(-1);
  };

  const isNewCase = encounterId === 'new';

  return (
    <div className="anc-encounter-layout h-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="anc-encounter-header shrink-0 z-20 relative">
        <div className="anc-encounter-header__left">
          <button 
            onClick={handleBack}
            className="anc-encounter-back-button"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="anc-encounter-title">
            {isNewCase ? 'New Antenatal Case' : 'Antenatal Case'}
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="anc-encounter-save-button">
            Save
          </button>
        </div>
      </header>

      {/* Info Bar - Read-only pregnancy information */}
      {!isNewCase && (
        <div className="bg-white border-b border-zinc-200 px-4 py-2 flex items-center gap-1 shrink-0">
          <InfoBadge label="LMP" value={VISIT_INFO.lmp} color="rose" />
          <Divider />
          <InfoBadge label="EDD" value={VISIT_INFO.edd} color="blue" />
          <Divider />
          <InfoBadge label="Scan EDD" value={VISIT_INFO.scanEdd} color="violet" />
          <Divider />
          <InfoBadge label="Last Seen" value={VISIT_INFO.lastSeen} color="zinc" />
          <Divider />
          <InfoBadge label="Total Visits" value={VISIT_INFO.totalVisits} color="amber" />
          <Divider />
          <InfoBadge label="ANC Visits" value={VISIT_INFO.totalAncVisits} color="emerald" />
          <Divider />
          <InfoBadge label="Gest Age" value={VISIT_INFO.gestAge} color="teal" highlight />
        </div>
      )}

      {/* Layout Content */}
      <div className="flex-1 overflow-hidden relative">
        <AncEncounterLayout />
      </div>
    </div>
  );
});

/** Divider between info badges */
function Divider() {
  return <div className="w-px h-6 bg-zinc-200" />;
}

/** Info Badge Component for header bar */
function InfoBadge({ 
  label, 
  value, 
  color = 'zinc',
  highlight = false 
}: { 
  label: string; 
  value: string; 
  color?: 'rose' | 'blue' | 'violet' | 'zinc' | 'amber' | 'emerald' | 'teal';
  highlight?: boolean;
}) {
  const colorStyles = {
    rose: 'text-rose-600 bg-rose-50',
    blue: 'text-blue-600 bg-blue-50',
    violet: 'text-violet-600 bg-violet-50',
    zinc: 'text-zinc-600 bg-zinc-100',
    amber: 'text-amber-600 bg-amber-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    teal: 'text-teal-600 bg-teal-50',
  };

  return (
    <div className="flex flex-col items-center px-3">
      <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">{label}</span>
      <span className={`text-[12px] font-bold px-2 py-0.5 ${highlight ? 'ring-2 ring-offset-1 ring-teal-300' : ''} ${colorStyles[color]}`}>
        {value}
      </span>
    </div>
  );
}
