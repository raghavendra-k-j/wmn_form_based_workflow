import { ArrowLeft, ChevronRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { GyanyEncounterLayout2 } from './layout2';
import './style.css';

/** Gyany Encounter View - Main layout */
export const GyanyEncounterView = observer(() => {
  const navigate = useNavigate();
  const { encounterId } = useParams<{ encounterId: string }>();

  const handleBack = () => {
    navigate(-1);
  };

  // Format encounter ID to "Visit X" format
  const formatVisitLabel = (id: string | undefined) => {
    if (!id || id === 'new') return 'New Visit';
    // Extract any number from the ID (e.g., "CS-103" -> "3", "CS1" -> "1")
    const match = id.match(/\d+$/);
    if (match) {
      return `Visit ${parseInt(match[0], 10)}`;
    }
    return `Visit`;
  };
  
  const caseLabel = formatVisitLabel(encounterId);

  return (
    <div className="gyany-encounter-layout h-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="gyany-encounter-header shrink-0 z-20 relative">
        <div className="gyany-encounter-header__left">
          <button 
            onClick={handleBack}
            className="gyany-encounter-back-button"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            <span className="text-zinc-500 text-sm font-medium">Gynaecological Visits</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <h2 className="gyany-encounter-title">
              {caseLabel}
            </h2>
          </div>
          
        </div>
        
        <div className="flex items-center gap-4">
          <button className="gyany-encounter-save-button">
            Save
          </button>
        </div>
      </header>

      {/* Layout Content */}
      <div className="flex-1 overflow-hidden relative">
        <GyanyEncounterLayout2 />
      </div>
    </div>
  );
});

