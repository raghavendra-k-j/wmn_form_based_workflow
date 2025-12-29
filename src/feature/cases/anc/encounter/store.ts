import { makeAutoObservable } from 'mobx';

/** ANC Encounter Tab values - Main tabs */
export const AncEncounterTab = {
  VISITS: 'visits',
  OBSTETRIC_HISTORY: 'obstetric_history',
  MEDICAL_HISTORY: 'medical_history',
  INVESTIGATIONS: 'investigations',
} as const;

/** Type for AncEncounterTab values */
export type AncEncounterTab = typeof AncEncounterTab[keyof typeof AncEncounterTab];

/** Visits View Mode */
export const VisitsViewMode = {
  LIST: 'list',
  FORM: 'form',
} as const;

export type VisitsViewMode = typeof VisitsViewMode[keyof typeof VisitsViewMode];

/** Visit Form Sub-tabs */
export const VisitFormSubTab = {
  VISIT_DETAILS: 'visit_details',
  LAB_SCANS: 'lab_scans',
  PRESCRIPTIONS: 'prescriptions',
  NEXT_FOLLOW_UP: 'next_follow_up',
} as const;

export type VisitFormSubTab = typeof VisitFormSubTab[keyof typeof VisitFormSubTab];

/** Medical History Sub-tabs */
export const MedicalHistorySubTab = {
  OVERVIEW: 'overview',
  PAST_HISTORY: 'past_history',
  SURGICAL_HISTORY: 'surgical_history',
  FAMILY_HISTORY: 'family_history',
  PERSONAL_HISTORY: 'personal_history',
  CURRENT_MEDICATIONS: 'current_medications',
  ALLERGIES: 'allergies',
} as const;

export type MedicalHistorySubTab = typeof MedicalHistorySubTab[keyof typeof MedicalHistorySubTab];

/** Investigation Sub-tabs */
export const InvestigationSubTab = {
  LAB_TESTS: 'lab_tests',
  USG_DATING: 'usg_dating',
  USG_11_13_WEEKS: 'usg_11_13_weeks',
  COMBINED_SCREENING: 'combined_screening',
  ANOMALY_SCAN: 'anomaly_scan',
  GROWTH_SCAN: 'growth_scan',
  OTHER_INVESTIGATIONS: 'other_investigations',
} as const;

export type InvestigationSubTab = typeof InvestigationSubTab[keyof typeof InvestigationSubTab];

/** Main Tab configuration */
export const AncEncounterTabConfig: Record<AncEncounterTab, { label: string; color: string }> = {
  [AncEncounterTab.VISITS]: { label: 'Visits', color: 'text-emerald-600' },
  [AncEncounterTab.OBSTETRIC_HISTORY]: { label: 'Obstetric History', color: 'text-pink-600' },
  [AncEncounterTab.MEDICAL_HISTORY]: { label: 'Medical History', color: 'text-blue-600' },
  [AncEncounterTab.INVESTIGATIONS]: { label: 'Investigations and Vaccines', color: 'text-purple-600' },
};

/** Visit Form Sub-tab configuration */
export const VisitFormSubTabConfig: Record<VisitFormSubTab, { label: string; color: string }> = {
  [VisitFormSubTab.VISIT_DETAILS]: { label: 'Visit Details', color: 'text-emerald-600' },
  [VisitFormSubTab.LAB_SCANS]: { label: 'Lab/Scans', color: 'text-amber-600' },
  [VisitFormSubTab.PRESCRIPTIONS]: { label: 'Prescriptions', color: 'text-orange-600' },
  [VisitFormSubTab.NEXT_FOLLOW_UP]: { label: 'Next Follow up', color: 'text-rose-600' },
};

/** Medical History Sub-tab configuration */
export const MedicalHistorySubTabConfig: Record<MedicalHistorySubTab, { label: string; color: string }> = {
  [MedicalHistorySubTab.OVERVIEW]: { label: 'Overview', color: 'text-orange-600' },
  [MedicalHistorySubTab.PAST_HISTORY]: { label: 'Past History', color: 'text-amber-600' },
  [MedicalHistorySubTab.SURGICAL_HISTORY]: { label: 'Surgical History', color: 'text-blue-600' },
  [MedicalHistorySubTab.FAMILY_HISTORY]: { label: 'Family History', color: 'text-emerald-600' },
  [MedicalHistorySubTab.PERSONAL_HISTORY]: { label: 'Personal History', color: 'text-violet-600' },
  [MedicalHistorySubTab.CURRENT_MEDICATIONS]: { label: 'Current Medications', color: 'text-teal-600' },
  [MedicalHistorySubTab.ALLERGIES]: { label: 'Drug Allergies', color: 'text-red-600' },
};

/** Investigation Sub-tab configuration */
export const InvestigationSubTabConfig: Record<InvestigationSubTab, { label: string; color: string }> = {
  [InvestigationSubTab.LAB_TESTS]: { label: 'Lab Tests', color: 'text-blue-600' },
  [InvestigationSubTab.USG_DATING]: { label: 'USG Dating Info', color: 'text-indigo-600' },
  [InvestigationSubTab.USG_11_13_WEEKS]: { label: 'USG 11 to 13 wks', color: 'text-violet-600' },
  [InvestigationSubTab.COMBINED_SCREENING]: { label: 'Combined Screening', color: 'text-purple-600' },
  [InvestigationSubTab.ANOMALY_SCAN]: { label: 'Anomaly Scan', color: 'text-fuchsia-600' },
  [InvestigationSubTab.GROWTH_SCAN]: { label: 'Growth Scan', color: 'text-pink-600' },
  [InvestigationSubTab.OTHER_INVESTIGATIONS]: { label: 'Other Investigations', color: 'text-slate-600' },
};

/** List of main tabs in display order */
export const AncEncounterTabList: AncEncounterTab[] = [
  AncEncounterTab.VISITS,
  AncEncounterTab.OBSTETRIC_HISTORY,
  AncEncounterTab.MEDICAL_HISTORY,
  AncEncounterTab.INVESTIGATIONS,
];

/** List of visit form sub-tabs in display order */
export const VisitFormSubTabList: VisitFormSubTab[] = [
  VisitFormSubTab.VISIT_DETAILS,
  VisitFormSubTab.LAB_SCANS,
  VisitFormSubTab.PRESCRIPTIONS,
  VisitFormSubTab.NEXT_FOLLOW_UP,
];

/** List of medical history sub-tabs in display order */
export const MedicalHistorySubTabList: MedicalHistorySubTab[] = [
  MedicalHistorySubTab.OVERVIEW,
  MedicalHistorySubTab.PAST_HISTORY,
  MedicalHistorySubTab.SURGICAL_HISTORY,
  MedicalHistorySubTab.FAMILY_HISTORY,
  MedicalHistorySubTab.PERSONAL_HISTORY,
  MedicalHistorySubTab.CURRENT_MEDICATIONS,
  MedicalHistorySubTab.ALLERGIES,
];

/** List of investigation sub-tabs in display order */
export const InvestigationSubTabList: InvestigationSubTab[] = [
  InvestigationSubTab.LAB_TESTS,
  InvestigationSubTab.USG_DATING,
  InvestigationSubTab.USG_11_13_WEEKS,
  InvestigationSubTab.COMBINED_SCREENING,
  InvestigationSubTab.ANOMALY_SCAN,
  InvestigationSubTab.GROWTH_SCAN,
  InvestigationSubTab.OTHER_INVESTIGATIONS,
];

/** ANC Encounter Store - Manages ANC encounter state */
export class AncEncounterStore {
  /** Currently active main tab */
  activeTab: AncEncounterTab = AncEncounterTab.VISITS;

  /** Visits view mode (list or form) */
  visitsViewMode: VisitsViewMode = VisitsViewMode.LIST;

  /** Currently active visit form sub-tab */
  activeVisitFormSubTab: VisitFormSubTab = VisitFormSubTab.VISIT_DETAILS;

  /** Currently editing visit ID (null for new visit) */
  editingVisitId: string | null = null;
  
  /** Currently active medical history sub-tab */
  activeMedicalHistorySubTab: MedicalHistorySubTab = MedicalHistorySubTab.OVERVIEW;

  /** Currently active investigation sub-tab */
  activeInvestigationSubTab: InvestigationSubTab = InvestigationSubTab.LAB_TESTS;


  /** Encounter ID */
  encounterId: string = '';

  /** Patient ID */
  patientId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  /** Initialize store with IDs */
  init(patientId: string, encounterId: string) {
    this.patientId = patientId;
    this.encounterId = encounterId;
  }

  /** Set the active main tab */
  setActiveTab(tab: AncEncounterTab) {
    this.activeTab = tab;
    // Reset views when switching tabs
    if (tab === AncEncounterTab.VISITS) {
      this.visitsViewMode = VisitsViewMode.LIST;
    } else if (tab === AncEncounterTab.INVESTIGATIONS) {
      this.activeInvestigationSubTab = InvestigationSubTab.LAB_TESTS;
    }
  }

  /** Set visits view mode */
  setVisitsViewMode(mode: VisitsViewMode) {
    this.visitsViewMode = mode;
    if (mode === VisitsViewMode.FORM) {
      this.activeVisitFormSubTab = VisitFormSubTab.VISIT_DETAILS;
    }
  }

  /** Open visit form for new visit */
  openNewVisitForm() {
    this.editingVisitId = null;
    this.visitsViewMode = VisitsViewMode.FORM;
    this.activeVisitFormSubTab = VisitFormSubTab.VISIT_DETAILS;
  }

  /** Open visit form for editing existing visit */
  openEditVisitForm(visitId: string) {
    this.editingVisitId = visitId;
    this.visitsViewMode = VisitsViewMode.FORM;
    this.activeVisitFormSubTab = VisitFormSubTab.VISIT_DETAILS;
  }

  /** Close visit form and return to list */
  closeVisitForm() {
    this.visitsViewMode = VisitsViewMode.LIST;
    this.editingVisitId = null;
  }

  /** Set the active visit form sub-tab */
  setActiveVisitFormSubTab(subTab: VisitFormSubTab) {
    this.activeVisitFormSubTab = subTab;
  }

  /** Set the active investigation sub-tab */
  setActiveInvestigationSubTab(subTab: InvestigationSubTab) {
    this.activeInvestigationSubTab = subTab;
  }

  /** Get config for active tab */
  get activeTabConfig() {
    return AncEncounterTabConfig[this.activeTab];
  }

  /** Get config for active visit form sub-tab */
  get activeVisitFormSubTabConfig() {
    return VisitFormSubTabConfig[this.activeVisitFormSubTab];
  }

  /** Get config for active investigation sub-tab */
  get activeInvestigationSubTabConfig() {
    return InvestigationSubTabConfig[this.activeInvestigationSubTab];
  }

  /** Check if in visit form mode */
  get isInVisitForm() {
    return this.activeTab === AncEncounterTab.VISITS && this.visitsViewMode === VisitsViewMode.FORM;
  }

  /** Check if creating new visit */
  get isNewVisit() {
    return this.editingVisitId === null;
  }
}
