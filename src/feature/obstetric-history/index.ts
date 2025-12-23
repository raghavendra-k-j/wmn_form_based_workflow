// Obstetric History Module - Main Exports
// Modular architecture for use in ANC, Gynae, PNC encounters

// ============================================================================
// SHARED - Types, Utils, and Components
// ============================================================================

// Types
export type {
  OutcomeType,
  DeliveryMode,
  Gender,
  BabyStatus,
  PregnancyRecord,
  GTPALScore,
} from './shared/types';

export {
  COMMON_COMPLICATIONS,
  OUTCOME_OPTIONS,
  DELIVERY_MODE_OPTIONS,
  GENDER_OPTIONS,
} from './shared/types';

// Utils
export {
  calculateGA,
  calculateEDD,
  calculateGTPAL,
  createEmptyPregnancyRecord,
  formatYear,
} from './shared/utils';

// Shared Components
export {
  GTPALBar,
  OutcomeBadge,
  getOutcomeStyle,
  PregnancyRow,
  EmptyState,
} from './shared/components';

// ============================================================================
// PREVIOUS PREGNANCIES MODULE
// ============================================================================

export {
  // Store
  PreviousPregnanciesStore,
  // Context & Hooks
  PreviousPregnanciesProvider,
  usePreviousPregnanciesStore,
  // Components
  PreviousPregnanciesTable,
  PreviousPregnanciesView,
  // Types
  type PreviousPregnanciesState,
  MOCK_PREVIOUS_VISIT_DATA,
  MOCK_PREVIOUS_VISIT_DATE,
} from './previous-pregnancies';
