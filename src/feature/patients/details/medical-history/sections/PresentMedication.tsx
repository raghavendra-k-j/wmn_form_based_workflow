import { useState } from 'react';
import { Pill } from 'lucide-react';
import { SectionCard } from '../components/shared';

const STORAGE_KEY = 'present-medication-data';

export function PresentMedication() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [medication, setMedication] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored || '';
    } catch {
      return '';
    }
  });

  const handleChange = (value: string) => {
    setMedication(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <SectionCard
      title="Present Medication"
      icon={<Pill className="w-4 h-4 text-teal-500" />}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
      <textarea 
        value={medication}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter current medications, dosages, and frequency..."
        className="w-full min-h-[80px] p-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-400 resize-y placeholder:text-zinc-400"
      />
      <p className="mt-1.5 text-xs text-zinc-400">
        List all current medications the patient is taking.
      </p>
    </SectionCard>
  );
}
