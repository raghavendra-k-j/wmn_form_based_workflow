/** Past History 2 Condition Item */
export interface PastHistoryCondition {
  id: string;
  name: string;
  since: string;
  status: 'yes' | 'no';
  notes: string;
}

/** Past History Visit Record */
export interface PastHistoryVisit {
  id: string;
  date: string;
  conditions: PastHistoryCondition[];
}

/** Default condition names for Past Medical History */
export const DEFAULT_CONDITION_NAMES = [
  'Diabetes',
  'Hypertension',
  'Thyroid Dysfunction',
  'Migraine',
  'Cardiac',
  'Epilepsy',
  'Asthma',
  'TB',
  'Blood Transfusion',
  'Surgery',
  'Thromboembolism',
] as const;

/** Status options for UI */
export const STATUS_OPTIONS = [
  { value: 'yes' as const, label: 'Yes', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'no' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

/** Tab options */
export type TabType = 'add' | 'list';
