// Obstetric History Module Exports

// Context and Hooks
export { ObstetricHistoryProvider, useObstetricHistory } from './context';

// Pages
export { ObstetricHistoryPage } from './page';

// Shared Components
export { GTPALBar, OutcomeBadge, CurrentPregnancyCard, PregnancyRow, EmptyState, ActionHeader } from './shared';

// Types and Store
export type {
  OutcomeType,
  DeliveryMode,
  Gender,
  BabyStatus,
  PregnancyRecord,
  GTPALScore,
  ObstetricHistoryState,
  ObstetricHistoryAction,
} from './store';

export {
  COMMON_COMPLICATIONS,
  MOCK_PREGNANCY_DATA,
  calculateGA,
  calculateEDD,
  calculateGTPAL,
  initialObstetricHistoryState,
  obstetricHistoryReducer,
} from './store';
