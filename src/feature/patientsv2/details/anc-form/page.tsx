import { useState } from 'react';
import { ClipboardList, TestTube, Pill, CalendarCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AncFormProvider } from './context';
import { usePatientDetails } from '../context';
import { VisitFormTab } from './VisitFormTab';
import { LabScansTab } from './LabScansTab';
import { PrescriptionsTab } from './PrescriptionsTab';
import { NextVisitTab } from './NextVisitTab';

/* =============================================================================
 * TAB BUTTON COMPONENT
 * ============================================================================= */

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

function TabButton({ label, active, onClick, icon: Icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors border-b-2 ${
        active
          ? 'text-emerald-600 border-emerald-600 bg-emerald-50/50'
          : 'text-zinc-500 border-transparent hover:text-zinc-700 hover:bg-zinc-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

/* =============================================================================
 * MAIN FORM CONTENT - With Tabs
 * ============================================================================= */

type TabId = 'visit' | 'labs' | 'prescriptions' | 'appointment';

function AncFormContent() {
  const [activeTab, setActiveTab] = useState<TabId>('visit');
  const navigate = useNavigate();
  const { store } = usePatientDetails();

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'visit', label: 'Visit Form', icon: ClipboardList },
    { id: 'labs', label: 'Lab Scans/Tests', icon: TestTube },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'appointment', label: 'Next Appointment', icon: CalendarCheck },
  ];

  const handleBack = () => {
    navigate(`/patientsv2/${store.patientId}/anc`);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-1.5 hover:bg-zinc-100 transition-colors rounded-sm"
            title="Back to Visit History"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500" />
          </button>
          <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
            ANC Visit Form
          </h2>
        </div>
        <button className="px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors">
          Save
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-zinc-200 px-2 overflow-x-auto">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'visit' && <VisitFormTab />}
        {activeTab === 'labs' && <LabScansTab />}
        {activeTab === 'prescriptions' && <PrescriptionsTab />}
        {activeTab === 'appointment' && <NextVisitTab />}
      </div>
    </div>
  );
}

/* =============================================================================
 * MAIN EXPORT
 * ============================================================================= */

export function AncFormPage() {
  return (
    <AncFormProvider>
      <AncFormContent />
    </AncFormProvider>
  );
}

export default AncFormPage;
