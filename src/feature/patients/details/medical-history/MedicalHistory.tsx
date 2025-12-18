import { useRef, useState, useEffect } from 'react';
import { Check, ChevronsDown, ChevronsUp, History, User, Users, Pill } from 'lucide-react';
import { MedicalHistoryProvider, useMedicalHistory } from './MedicalHistoryContext';
import { FamilyHistory } from './sections/FamilyHistory';
import { PastHistory } from './sections/PastHistory';
import { PersonalHistory } from './sections/PersonalHistory';
import { PresentMedication } from './sections/PresentMedication';

const sections = [
  { id: 'past-history', label: 'Past History', icon: History },
  { id: 'personal-history', label: 'Personal History', icon: User },
  { id: 'family-history', label: 'Family History', icon: Users },
  { id: 'present-medication', label: 'Present Medication', icon: Pill },
];

function MedicalHistoryContent() {
  const { 
    isEditMode, 
    setEditMode, 
    expandAll, 
    collapseAll,
    expandedSections
  } = useMedicalHistory();

  const allExpanded = Object.values(expandedSections).every(Boolean);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('past-history');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer for accurate scroll spy
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOptions: IntersectionObserverInit = {
      root: container,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-middle portion
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    const container = scrollContainerRef.current;
    if (element && container) {
      // Set active immediately for better UX
      setActiveSection(sectionId);
      
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = container.scrollTop + (elementRect.top - containerRect.top) - 8;
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-zinc-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
         <h2 className="text-base font-bold text-zinc-900">Medical History</h2>
         <div className="flex items-center gap-2">
           <button
             onClick={allExpanded ? collapseAll : expandAll}
             className="p-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
             title={allExpanded ? "Collapse All" : "Expand All"}
           >
             {allExpanded ? <ChevronsUp className="w-4 h-4" /> : <ChevronsDown className="w-4 h-4" />}
           </button>
           {!isEditMode ? (
             <button 
               onClick={() => setEditMode(true)}
               className="flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-200 rounded-lg shadow-sm text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
             >
               Add / Edit Details
             </button>
           ) : (
             <button 
               onClick={() => setEditMode(false)}
               className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-900 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-zinc-800 transition-all"
             >
               <Check className="w-3.5 h-3.5" />
               Done
             </button>
           )}
         </div>
      </div>

      {/* Scroll Spy Navigation Tabs */}
      <div className="bg-white border-b border-zinc-200 px-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap
                ${isActive 
                  ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
                }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-zinc-400'}`} />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Main Content - Scrollable with scroll-padding for last section */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
      >
        <div className="space-y-4">
          <div 
            id="past-history" 
            ref={(el) => { sectionRefs.current['past-history'] = el; }}
            className="scroll-mt-4"
          >
            <PastHistory />
          </div>
          <div 
            id="personal-history" 
            ref={(el) => { sectionRefs.current['personal-history'] = el; }}
            className="scroll-mt-4"
          >
            <PersonalHistory />
          </div>
          <div 
            id="family-history" 
            ref={(el) => { sectionRefs.current['family-history'] = el; }}
            className="scroll-mt-4"
          >
            <FamilyHistory />
          </div>
          <div 
            id="present-medication" 
            ref={(el) => { sectionRefs.current['present-medication'] = el; }}
            className="scroll-mt-4 min-h-[60vh]"
          >
            <PresentMedication />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MedicalHistoryProps {
  initialEditMode?: boolean;
}

export function MedicalHistory({ initialEditMode = false }: MedicalHistoryProps) {
  return (
    <MedicalHistoryProvider initialEditMode={initialEditMode}>
      <MedicalHistoryContent />
    </MedicalHistoryProvider>
  );
}
