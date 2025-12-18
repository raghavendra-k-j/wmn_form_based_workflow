import React, { createContext, useContext, useState } from 'react';

interface MedicalHistoryContextType {
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

const MedicalHistoryContext = createContext<MedicalHistoryContextType | undefined>(undefined);

export function MedicalHistoryProvider({ children, initialEditMode = false }: { children: React.ReactNode; initialEditMode?: boolean }) {
  const [isEditMode, setEditMode] = useState(initialEditMode);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pastHistory: false,
    personalHistory: false,
    familyHistory: false,
    presentMedication: false,
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      pastHistory: true,
      personalHistory: true,
      familyHistory: true,
      presentMedication: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      pastHistory: false,
      personalHistory: false,
      familyHistory: false,
      presentMedication: false,
    });
  };

  return (
    <MedicalHistoryContext.Provider value={{ 
      isEditMode, 
      setEditMode,
      expandedSections,
      toggleSection,
      expandAll,
      collapseAll
    }}>
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
