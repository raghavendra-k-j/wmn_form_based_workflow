import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, User, FileText, Activity, Stethoscope, ChevronsUpDown, PanelRightOpen, PanelRightClose } from 'lucide-react';

// Mock data for the last visit - complete details
const LAST_VISIT_DATA = {
  visitInfo: {
    visitNumber: 'VIS-2024-002',
    visitDate: '20-12-2024',
    visitTime: '10:30 AM',
    seenBy: 'Dr. Example Doctor',
  },
  presentComplaint: 'Irregular periods for 3 months, mild lower abdominal discomfort',
  menstrualHistory: {
    lmp: '05-12-2024',
    para: '2',
    contraception: 'None',
    previousSmear: 'Normal (2023)',
    menstrualPattern: 'Irregular',
    menarcheAge: '13',
    flow: 'Moderate',
    cycleLength: '28-35',
    bleedingDuration: '5-6',
    painWithPeriods: 'Mild',
  },
  otherDetails: {
    micturition: 'Normal',
    bowels: 'Regular',
  },
  clinicalNotes: {
    impression: 'Suspected PCOS - Irregular menstrual cycles with normal flow',
    advice: 'USG Pelvis, Hormonal profile (FSH, LH, AMH), Follow-up in 2 weeks with reports',
  },
};

// Section keys for accordion state management
const SECTION_KEYS = ['visitInfo', 'presentComplaint', 'menstrualHistory', 'otherDetails', 'clinicalNotes'] as const;
type SectionKey = typeof SECTION_KEYS[number];

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  iconColor?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionSection({ title, icon, iconColor = 'text-zinc-400', children, isOpen, onToggle }: AccordionSectionProps) {
  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-50 transition-colors text-left"
      >
        <span className={iconColor}>{icon}</span>
        <span className="text-[12px] font-bold text-zinc-700 uppercase tracking-wide flex-1">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-1.5 border-b border-dashed border-zinc-100 last:border-b-0">
      <span className="text-[11px] text-zinc-500 uppercase tracking-wide">{label}</span>
      <span className="text-[12px] font-medium text-zinc-800 text-right max-w-[60%]">{value || '—'}</span>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-1.5">
      <span className="text-[10px] text-zinc-500 uppercase tracking-wide block mb-1">{label}</span>
      <p className="text-[11px] font-medium text-zinc-800 leading-relaxed bg-zinc-50 p-2 border border-zinc-100">
        {value || '—'}
      </p>
    </div>
  );
}

export const VisitHistory = observer(() => {
  const data = LAST_VISIT_DATA;
  
  // Panel visibility state
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  // Track which sections are open
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['visitInfo', 'presentComplaint', 'clinicalNotes'])
  );
  
  const toggleSection = (key: SectionKey) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };
  
  const expandAll = () => {
    setOpenSections(new Set(SECTION_KEYS));
  };
  
  const collapseAll = () => {
    setOpenSections(new Set());
  };
  
  const allExpanded = openSections.size === SECTION_KEYS.length;
  
  // Collapsed state - show thin bar with expand button
  if (!isPanelOpen) {
    return (
      <div className="bg-white border border-zinc-200 shadow-sm h-full flex flex-col w-10 flex-shrink-0">
        <button
          onClick={() => setIsPanelOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
          title="Show Last Visit Details"
        >
          <PanelRightOpen className="w-4 h-4 text-zinc-500" />
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
            Last Visit
          </span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-zinc-200 shadow-sm h-full flex flex-col w-72 md:w-80 flex-shrink-0">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-zinc-200 bg-zinc-50">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide flex-1">Last Visit Details</h3>
          <button
            onClick={allExpanded ? collapseAll : expandAll}
            className="flex items-center gap-1 text-[9px] font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
            title={allExpanded ? 'Collapse All' : 'Expand All'}
          >
            <ChevronsUpDown className="w-3 h-3" />
            {allExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            title="Hide Panel"
          >
            <PanelRightClose className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-zinc-500 mt-0.5">{data.visitInfo.visitDate} • {data.visitInfo.visitNumber}</p>
      </div>
      
      {/* Accordion Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Visit Info Section */}
        <AccordionSection 
          title="Visit Info" 
          icon={<Calendar className="w-4 h-4" />}
          iconColor="text-blue-500"
          isOpen={openSections.has('visitInfo')}
          onToggle={() => toggleSection('visitInfo')}
        >
          <DetailRow label="Visit Number" value={data.visitInfo.visitNumber} />
          <DetailRow label="Date" value={data.visitInfo.visitDate} />
          <DetailRow label="Time" value={data.visitInfo.visitTime} />
          <DetailRow label="Seen By" value={data.visitInfo.seenBy} />
        </AccordionSection>

        {/* Present Complaint */}
        <AccordionSection 
          title="Present Complaint" 
          icon={<FileText className="w-4 h-4" />}
          iconColor="text-amber-500"
          isOpen={openSections.has('presentComplaint')}
          onToggle={() => toggleSection('presentComplaint')}
        >
          <p className="text-[12px] font-medium text-zinc-800 leading-relaxed bg-amber-50 p-2 border border-amber-100">
            {data.presentComplaint}
          </p>
        </AccordionSection>

        {/* Menstrual History */}
        <AccordionSection 
          title="Menstrual History" 
          icon={<Activity className="w-4 h-4" />}
          iconColor="text-rose-500"
          isOpen={openSections.has('menstrualHistory')}
          onToggle={() => toggleSection('menstrualHistory')}
        >
          <DetailRow label="LMP" value={data.menstrualHistory.lmp} />
          <DetailRow label="Para" value={data.menstrualHistory.para} />
          <DetailRow label="Contraception" value={data.menstrualHistory.contraception} />
          <DetailRow label="Previous Smear" value={data.menstrualHistory.previousSmear} />
          <DetailRow label="Menstrual Pattern" value={data.menstrualHistory.menstrualPattern} />
          <DetailRow label="Menarche (Age)" value={data.menstrualHistory.menarcheAge} />
          <DetailRow label="Flow" value={data.menstrualHistory.flow} />
          <DetailRow label="Cycle Length (Days)" value={data.menstrualHistory.cycleLength} />
          <DetailRow label="Bleeding Duration" value={data.menstrualHistory.bleedingDuration} />
          <DetailRow label="Pain with Periods" value={data.menstrualHistory.painWithPeriods} />
        </AccordionSection>

        {/* Other Details */}
        <AccordionSection 
          title="Other Details" 
          icon={<User className="w-4 h-4" />}
          iconColor="text-teal-500"
          isOpen={openSections.has('otherDetails')}
          onToggle={() => toggleSection('otherDetails')}
        >
          <DetailRow label="Micturition" value={data.otherDetails.micturition} />
          <DetailRow label="Bowels" value={data.otherDetails.bowels} />
        </AccordionSection>

        {/* Clinical Notes */}
        <AccordionSection 
          title="Clinical Notes" 
          icon={<Stethoscope className="w-4 h-4" />}
          iconColor="text-emerald-500"
          isOpen={openSections.has('clinicalNotes')}
          onToggle={() => toggleSection('clinicalNotes')}
        >
          <DetailBlock label="Impression" value={data.clinicalNotes.impression} />
          <DetailBlock label="Advice" value={data.clinicalNotes.advice} />
        </AccordionSection>
      </div>
    </div>
  );
});
