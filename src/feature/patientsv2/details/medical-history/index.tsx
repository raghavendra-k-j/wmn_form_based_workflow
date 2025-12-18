/** Medical History Module - Carbon Design v2 */

// Context & Provider
export { MedicalHistoryProvider, useMedicalHistory } from './context';

// Store Types
export type {
  MedicalHistoryMode,
  MedicalHistoryState,
  MedicalHistoryData,
  PastHistoryItem,
  PersonalHistoryItem,
  FamilyHistoryItem,
} from './store';

// Page Views
export { MedicalHistoryPage } from './page';
export { EmbeddedMedicalHistory } from './embeded-view';

// Section Components
export { PastHistory } from './past-history';
export { PersonalHistory } from './personal-history';
export { FamilyHistory } from './famility-history';
export { PresentMedications } from './present-medications';
