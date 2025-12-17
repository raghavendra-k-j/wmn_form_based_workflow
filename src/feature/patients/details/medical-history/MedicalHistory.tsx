import { useState, useEffect } from 'react';
import { Settings, Check, X, RotateCcw } from 'lucide-react';
import { MedicalHistoryProvider, useMedicalHistory } from './MedicalHistoryContext';
import { PastHistory } from './sections/PastHistory';
import { PersonalHistory } from './sections/PersonalHistory';
import { FamilyHistory } from './sections/FamilyHistory';
import { PresentMedication } from './sections/PresentMedication';

function RightSideDrawer({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const timer = setTimeout(() => setVisible(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function ConfigContent() {
  const { sections, toggleSection, enableAll } = useMedicalHistory();

  return (
    <div className="space-y-2">
      <div className="flex justify-end mb-4">
        <button 
          onClick={enableAll}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset to Default
        </button>
      </div>
      
      <div className="space-y-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => toggleSection(section.id)}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all
              ${section.isEnabled 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : 'bg-white border-zinc-200 hover:border-zinc-300'
              }
            `}
          >
            <span className={`font-medium ${section.isEnabled ? 'text-blue-900' : 'text-zinc-600'}`}>
              {section.label}
            </span>
            <div className={`
              w-5 h-5 rounded border flex items-center justify-center transition-colors
              ${section.isEnabled 
                ? 'bg-blue-600 border-blue-600' 
                : 'bg-white border-zinc-300'
              }
            `}>
              {section.isEnabled && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MedicalHistoryContent() {
  const { sections, hasEnabledSections } = useMedicalHistory();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-zinc-50">
      {/* Top Bar with Configure Button */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
         <h2 className="text-base font-bold text-zinc-900">Medical History</h2>
         <button 
          onClick={() => setIsConfigOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-sm text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
        >
          <Settings className="w-3.5 h-3.5 text-zinc-500" />
          Configure
        </button>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
        {!hasEnabledSections && (
           <div className="h-48 flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
             <Settings className="w-8 h-8 mb-2 text-zinc-300" />
             <p className="font-medium text-sm">No history sections enabled</p>
             <button 
               onClick={() => setIsConfigOpen(true)}
               className="mt-2 text-sm text-blue-600 hover:underline"
             >
               Configure sections
             </button>
           </div>
        )}

        {sections.find(s => s.id === 'pastHistory')?.isEnabled && <PastHistory />}
        {sections.find(s => s.id === 'personalHistory')?.isEnabled && <PersonalHistory />}
        {sections.find(s => s.id === 'familyHistory')?.isEnabled && <FamilyHistory />}
        {sections.find(s => s.id === 'presentMedication')?.isEnabled && <PresentMedication />}
      </div>

      <RightSideDrawer 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)}
        title="Configure Medical History"
      >
        <ConfigContent />
      </RightSideDrawer>
    </div>
  );
}

export function MedicalHistory() {
  return (
    <MedicalHistoryProvider>
      <MedicalHistoryContent />
    </MedicalHistoryProvider>
  );
}
