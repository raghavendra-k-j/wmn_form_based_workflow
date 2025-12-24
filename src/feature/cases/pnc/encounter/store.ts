import { makeAutoObservable } from 'mobx';

/** Tab values for PNC Encounter layout */
export const PncEncounterTab = {
  DELIVERY_INFO: 'delivery_info',
  POSTPARTUM_VISIT: 'postpartum_visit',
  SIX_WEEKS_VISIT: 'six_weeks_visit',
} as const;

/** Type for PncEncounterTab values */
export type PncEncounterTab = typeof PncEncounterTab[keyof typeof PncEncounterTab];

/** Tab configuration with display labels */
export const PncEncounterTabConfig: Record<PncEncounterTab, { label: string }> = {
  [PncEncounterTab.DELIVERY_INFO]: { label: 'Delivery Info' },
  [PncEncounterTab.POSTPARTUM_VISIT]: { label: 'Postpartum Visit' },
  [PncEncounterTab.SIX_WEEKS_VISIT]: { label: '6 Weeks Visit' },
};

/** List of all tabs in display order */
export const PncEncounterTabList: PncEncounterTab[] = [
  PncEncounterTab.DELIVERY_INFO,
  PncEncounterTab.POSTPARTUM_VISIT,
  PncEncounterTab.SIX_WEEKS_VISIT,
];

/** PNC Encounter Store - Manages PNC layout state */
export class PncEncounterStore {
  /** Currently active tab */
  activeTab: PncEncounterTab = PncEncounterTab.DELIVERY_INFO;

  constructor() {
    makeAutoObservable(this);
  }

  /** Set the active tab */
  setActiveTab(tab: PncEncounterTab) {
    this.activeTab = tab;
  }

  /** Get config for active tab */
  get activeTabConfig() {
    return PncEncounterTabConfig[this.activeTab];
  }
}
