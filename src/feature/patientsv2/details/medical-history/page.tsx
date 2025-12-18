import { MedicalHistoryProvider, useMedicalHistory } from './context';
import { ActionHeader } from './shared';
import { PastHistory } from './past-history';
import { PersonalHistory } from './personal-history';
import { FamilyHistory } from './famility-history';
import { PresentMedications } from './present-medications';

/** Internal Content Component */
function MedicalHistoryContent() {
  const { isEditMode, setMode, expandAll, collapseAll, expandedSections } = useMedicalHistory();

  const allExpanded = Object.values(expandedSections).every(Boolean);

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Action Header */}
      <ActionHeader
        title="Medical History"
        isEditMode={isEditMode}
        onEdit={() => setMode('edit')}
        onDone={() => setMode('view')}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        allExpanded={allExpanded}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-0">
          <PastHistory />
          <PersonalHistory />
          <FamilyHistory />
          <PresentMedications />
        </div>
      </div>
    </div>
  );
}

/** Props for Medical History Page */
interface MedicalHistoryPageProps {
  initialMode?: 'view' | 'edit';
}

/** Medical History Page - Full Page View */
export function MedicalHistoryPage({ initialMode = 'view' }: MedicalHistoryPageProps) {
  return (
    <MedicalHistoryProvider initialMode={initialMode}>
      <MedicalHistoryContent />
    </MedicalHistoryProvider>
  );
}

export default MedicalHistoryPage;
