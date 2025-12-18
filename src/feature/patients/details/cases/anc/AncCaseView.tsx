import { useState, type ReactNode } from 'react';
import { Heart, ClipboardList, Calendar, FlaskConical, Pill } from 'lucide-react';
import { AncOverviewTab, type AncBookingData } from './AncOverviewTab';
import { AncVisitsTab } from './AncVisitsTab';
import { AncVisitPage, type AncVisit } from './AncVisitPage';
import { AncTestsScansTab } from './AncTestsScansTab';
import { AncPrescriptionsTab } from './AncPrescriptionsTab';

/* ============================================================================
 * TAB COMPONENTS
 * ============================================================================ */

type TabType = 'overview' | 'visits' | 'tests' | 'prescriptions';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  badge?: number;
}

function TabButton({ active, onClick, children, icon, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active 
          ? 'border-pink-600 text-pink-700 bg-pink-50/30' 
          : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
      }`}
    >
      {icon}
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="px-1.5 py-0.5 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-full ml-1">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */

export function AncCaseView() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // View State for Visits (List vs Edit Page)
  const [isEditingVisit, setIsEditingVisit] = useState(false);
  const [currentVisit, setCurrentVisit] = useState<AncVisit | null>(null);

  // Section expansion state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    booking: true,
    allergies: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Booking data state
  const [bookingData, setBookingData] = useState<AncBookingData>({
    bookingDate: '',
    height: '',
    weight: '',
    bmi: '',
    thyroid: '',
    breast: '',
    pulseRate: '',
    cvs: '',
    rs: '',
    bp: '',
    pa: '',
    ve: '',
    spo2: '',
    pallor: '',
    knownAllergies: '',
    drugAllergies: '',
    foodAllergies: ''
  });

  const updateBooking = (field: keyof AncBookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  // Visits state
  const [visits, setVisits] = useState<AncVisit[]>([]);

  // Handlers for Visit Actions
  const handleAddNewVisit = () => {
    setCurrentVisit(null);
    setIsEditingVisit(true);
  };

  const handleEditVisit = (visit: AncVisit) => {
    setCurrentVisit(visit);
    setIsEditingVisit(true);
  };

  const handleSaveVisit = (visit: AncVisit) => {
    setVisits(prev => {
      const exists = prev.some(v => v.id === visit.id);
      if (exists) {
        return prev.map(v => v.id === visit.id ? visit : v);
      }
      return [...prev, visit];
    });
    setIsEditingVisit(false);
    setCurrentVisit(null);
  };

  const handleBackToVisits = () => {
    setIsEditingVisit(false);
    setCurrentVisit(null);
  };

  const deleteVisit = (id: string) => {
    if (confirm('Are you sure you want to delete this visit?')) {
      setVisits(prev => prev.filter(v => v.id !== id));
    }
  };

  // If we are in "Edit Visit" mode, show the full page form
  if (isEditingVisit) {
    return (
      <AncVisitPage 
        visit={currentVisit} 
        onSave={handleSaveVisit} 
        onBack={handleBackToVisits} 
      />
    );
  }

  return (
    <div className="h-full w-full bg-zinc-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-zinc-200 px-4 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-pink-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Antenatal Care (ANC)</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">CASE-2024-001</span>
              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Active</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-all shadow-sm">
          Save Case
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-zinc-200 px-4 flex items-center gap-0">
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
          icon={<ClipboardList className="w-4 h-4" />}
        >
          Overview
        </TabButton>
        <TabButton 
          active={activeTab === 'visits'} 
          onClick={() => setActiveTab('visits')}
          icon={<Calendar className="w-4 h-4" />}
          badge={visits.length}
        >
          Visits
        </TabButton>
        <TabButton 
          active={activeTab === 'tests'} 
          onClick={() => setActiveTab('tests')}
          icon={<FlaskConical className="w-4 h-4" />}
        >
          Tests & Scans
        </TabButton>
        <TabButton 
          active={activeTab === 'prescriptions'} 
          onClick={() => setActiveTab('prescriptions')}
          icon={<Pill className="w-4 h-4" />}
        >
          Prescriptions
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="w-full">
          {activeTab === 'overview' && (
            <AncOverviewTab 
              bookingData={bookingData}
              updateBooking={updateBooking}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          )}
          {activeTab === 'visits' && (
            <AncVisitsTab 
              visits={visits}
              onAddVisit={handleAddNewVisit}
              onEditVisit={handleEditVisit}
              onDeleteVisit={deleteVisit}
            />
          )}
          {activeTab === 'tests' && (
            <AncTestsScansTab />
          )}
          {activeTab === 'prescriptions' && (
            <AncPrescriptionsTab />
          )}
        </div>
      </div>
    </div>
  );
}
