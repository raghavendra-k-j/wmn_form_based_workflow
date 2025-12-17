import React, { createContext, useContext, useState, useEffect } from 'react';

export type HistorySectionId = 
  | 'pastHistory'
  | 'personalHistory'
  | 'familyHistory'
  | 'presentMedication';

export interface HistorySection {
  id: HistorySectionId;
  label: string;
  isEnabled: boolean;
}

interface MedicalHistoryContextType {
  sections: HistorySection[];
  toggleSection: (id: HistorySectionId) => void;
  enableAll: () => void;
  hasEnabledSections: boolean;
}

const DEFAULT_SECTIONS: HistorySection[] = [
  { id: 'pastHistory', label: 'Past History', isEnabled: true },
  { id: 'personalHistory', label: 'Personal History', isEnabled: true },
  { id: 'familyHistory', label: 'Family History', isEnabled: true },
  { id: 'presentMedication', label: 'Present Medication', isEnabled: true },
];

const STORAGE_KEY = 'medical-history-config';

const MedicalHistoryContext = createContext<MedicalHistoryContextType | undefined>(undefined);

export function MedicalHistoryProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<HistorySection[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Validate stored sections against current valid IDs
        const parsed = JSON.parse(stored) as HistorySection[];
        const validIds = DEFAULT_SECTIONS.map(s => s.id);
        const validSections = parsed.filter(s => validIds.includes(s.id));
        // If we have all valid sections, use them; otherwise reset to defaults
        if (validSections.length === DEFAULT_SECTIONS.length) {
          return validSections;
        }
      }
    } catch (e) {
      console.warn('Failed to load medical history config', e);
    }
    return DEFAULT_SECTIONS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  const toggleSection = (id: HistorySectionId) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, isEnabled: !section.isEnabled } : section
    ));
  };

  const enableAll = () => {
    setSections(DEFAULT_SECTIONS);
  }

  const hasEnabledSections = sections.some(s => s.isEnabled);

  return (
    <MedicalHistoryContext.Provider value={{ sections, toggleSection, enableAll, hasEnabledSections }}>
      {children}
    </MedicalHistoryContext.Provider>
  );
}

export function useMedicalHistory() {
  const context = useContext(MedicalHistoryContext);
  if (!context) {
    throw new Error('useMedicalHistory must be used within a MedicalHistoryProvider');
  }
  return context;
}
