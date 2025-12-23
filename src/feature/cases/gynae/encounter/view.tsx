import { ArrowLeft, ChevronRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { GyanyEncounterLayout1 } from './layout1';
import { GyanyEncounterLayout2 } from './layout2';
import { useState } from 'react';
import './style.css';

/** Gyany Encounter View - Main layout with grouping toggle */
export const GyanyEncounterView = observer(() => {
  const navigate = useNavigate();
  const { encounterId } = useParams<{ encounterId: string }>();
  const [layoutMode, setLayoutMode] = useState<'default' | 'nested'>('nested');

  const handleBack = () => {
    navigate(-1);
  };

  // Determine title based on encounterId
  const isNewCase = encounterId === 'new';
  const caseLabel = isNewCase ? 'New Case' : encounterId;

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
          {/* Layout Mode Selection (Subtle) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Layout:</span>
            <select
              value={layoutMode}
              onChange={(e) => setLayoutMode(e.target.value as 'default' | 'nested')}
              className="text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
            >
              <option value="default">Standard Tabs</option>
              <option value="nested">Nested Layout</option>
            </select>
          </div>

          <button className="gyany-encounter-save-button">
            Save
          </button>
        </div>
      </header>

      {/* Layout Content */}
      <div className="flex-1 overflow-hidden relative">
        {layoutMode === 'default' ? (
          <GyanyEncounterLayout1 />
        ) : (
          <GyanyEncounterLayout2 />
        )}
      </div>
    </div>
  );
});
