import { ArrowLeft, ChevronRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { AncEncounterLayout } from './layout';
import './style.css';

/** ANC Encounter View - Main entry point with header */
export const AncEncounterView = observer(() => {
  const navigate = useNavigate();
  const { encounterId } = useParams<{ encounterId: string }>();

  const handleBack = () => {
    navigate(-1);
  };

  // Determine title based on encounterId
  const isNewCase = encounterId === 'new';
  const caseLabel = isNewCase ? 'New Case' : encounterId;

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
          <div className="flex items-center gap-1">
            <span className="text-zinc-500 text-sm font-medium">Antenatal Visits</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <h2 className="anc-encounter-title">
              {caseLabel}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="anc-encounter-save-button">
            Save
          </button>
        </div>
      </header>

      {/* Layout Content */}
      <div className="flex-1 overflow-hidden relative">
        <AncEncounterLayout />
      </div>
    </div>
  );
});
