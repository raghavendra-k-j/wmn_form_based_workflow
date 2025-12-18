import { Pill } from 'lucide-react';
import { useMedicalHistory } from './context';
import { SectionCard, EmptyState } from './shared';

/** Present Medications Section Component */
export function PresentMedications() {
  const { isEditMode, expandedSections, toggleSection, data, updatePresentMedication } = useMedicalHistory();

  const isExpanded = expandedSections.presentMedication;
  const medication = data.presentMedication;

  return (
    <SectionCard
      title="Present Medication"
      icon={<Pill className="w-3.5 h-3.5" />}
      iconBg="bg-teal-50"
      iconColor="text-teal-600"
      isExpanded={isExpanded}
      onToggle={() => toggleSection('presentMedication')}
    >
      {isEditMode ? (
        <div>
          <textarea
            value={medication}
            onChange={(e) => updatePresentMedication(e.target.value)}
            placeholder="Enter current medications, dosages, and frequency..."
            className="w-full min-h-[80px] p-2.5 text-[12px] bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-400 focus:outline-none resize-y placeholder:text-zinc-400 transition-colors"
          />
          <p className="mt-1.5 text-[10px] text-zinc-400">
            List all current medications the patient is taking.
          </p>
        </div>
      ) : (
        /* View Mode */
        <div className="py-1">
          {medication.trim() ? (
            <p className="text-[12px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {medication}
            </p>
          ) : (
            <EmptyState message="No present medication recorded" />
          )}
        </div>
      )}
    </SectionCard>
  );
}
