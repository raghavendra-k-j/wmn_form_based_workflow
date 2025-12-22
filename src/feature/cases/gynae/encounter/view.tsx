import { ArrowLeft } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { GyanyEncounterLayout1 } from './layout1';
import { GyanyEncounterLayout2 } from './layout2';
import { useState } from 'react';
import './style.css';

/** Gyany Encounter View - Main layout with grouping toggle */
export const GyanyEncounterView = observer(() => {
  const navigate = useNavigate();
  const [layoutMode, setLayoutMode] = useState<'default' | 'nested'>('nested');

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="gyany-encounter-layout h-screen flex flex-col overflow-hidden">
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
          <h2 className="gyany-encounter-title">
            Gyany Encounter
          </h2>
          
           {/* Layout Switcher for Demo */}
           <div className="ml-8 flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setLayoutMode('default')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                layoutMode === 'default' 
                  ? 'bg-white text-slate-800 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Layout 1 (Tabs)
            </button>
            <button
               onClick={() => setLayoutMode('nested')}
               className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                layoutMode === 'nested' 
                  ? 'bg-white text-primary-700 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Layout 2 (Nested)
            </button>
          </div>

        </div>
        <button className="gyany-encounter-save-button">
          Save
        </button>
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
