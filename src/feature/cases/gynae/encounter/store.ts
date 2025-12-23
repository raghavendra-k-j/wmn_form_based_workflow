import { makeAutoObservable } from 'mobx';

/** Tab values for Guyini layout */
export const GuyiniEncounterTab = {
  VISIT_FORM: 'visit_form',
  MEDICAL_HISTORY_OVERVIEW: 'medical_history_overview',
  PAST_HISTORY: 'past_history',
  SURGICAL_HISTORY: 'surgical_history',
  FAMILY_HISTORY: 'family_history',
  PERSONAL_HISTORY: 'personal_history',
  CURRENT_MEDICATIONS: 'current_medications',
  ALLERGIES: 'allergies',
  EXAMINATIONS: 'examinations',
  LAB_TESTS_SCANS: 'lab_tests_scans',
  FOLLOW_UP_FEE: 'follow_up_fee',
} as const;

/** Type for GuyiniEncounterTab values */
export type GuyiniEncounterTab = typeof GuyiniEncounterTab[keyof typeof GuyiniEncounterTab];

/** Tab configuration with display labels */
export const GuyiniEncounterTabConfig: Record<GuyiniEncounterTab, { label: string; icon?: string }> = {
  [GuyiniEncounterTab.VISIT_FORM]: { label: 'Visit Form' },
  [GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW]: { label: 'Overview' },
  [GuyiniEncounterTab.PAST_HISTORY]: { label: 'Past History' },
  [GuyiniEncounterTab.SURGICAL_HISTORY]: { label: 'Surgical History' },
  [GuyiniEncounterTab.FAMILY_HISTORY]: { label: 'Family History' },
  [GuyiniEncounterTab.PERSONAL_HISTORY]: { label: 'Personal History' },
  [GuyiniEncounterTab.CURRENT_MEDICATIONS]: { label: 'Current Medications' },
  [GuyiniEncounterTab.ALLERGIES]: { label: 'Allergies' },
  [GuyiniEncounterTab.EXAMINATIONS]: { label: 'Examinations' },
  [GuyiniEncounterTab.LAB_TESTS_SCANS]: { label: 'Lab Tests & Scans' },
  [GuyiniEncounterTab.FOLLOW_UP_FEE]: { label: 'Follow Up & Fee' },
};

/** List of all tabs in display order */
export const GuyiniEncounterTabList: GuyiniEncounterTab[] = [
  GuyiniEncounterTab.VISIT_FORM,
  GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW,
  GuyiniEncounterTab.PAST_HISTORY,
  GuyiniEncounterTab.SURGICAL_HISTORY,
  GuyiniEncounterTab.FAMILY_HISTORY,
  GuyiniEncounterTab.PERSONAL_HISTORY,
  GuyiniEncounterTab.CURRENT_MEDICATIONS,
  GuyiniEncounterTab.ALLERGIES,
  GuyiniEncounterTab.EXAMINATIONS,
  GuyiniEncounterTab.LAB_TESTS_SCANS,
  GuyiniEncounterTab.FOLLOW_UP_FEE,
];

/** Guyini Encounter Store - Manages Guyini layout state */
export class GuyiniEncounterStore {
  /** Currently active tab */
  activeTab: GuyiniEncounterTab = GuyiniEncounterTab.EXAMINATIONS;

  constructor() {
    makeAutoObservable(this);
  }

  /** Set the active tab */
  setActiveTab(tab: GuyiniEncounterTab) {
    this.activeTab = tab;
  }

  /** Get config for active tab */
  get activeTabConfig() {
    return GuyiniEncounterTabConfig[this.activeTab];
  }
}
