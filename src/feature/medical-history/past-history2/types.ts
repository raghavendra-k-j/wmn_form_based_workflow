import type { PastHistoryMaster } from "../models/past-history-master";
import type { PatientPastHistory } from "../models/patient-past-history";
import type { PastHistoryRecord } from "../models/past-history-record";

/** Re-export types */
export type { PastHistoryMaster, PatientPastHistory, PastHistoryRecord };

/** Tab type */
export type TabType = 'add' | 'list';

/** Save state */
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

/** Loading state */
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';
