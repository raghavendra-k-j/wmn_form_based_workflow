/** Family History Item */
export interface FamilyHistoryItem {
  id: string;
  condition: string;
  relation: string;
  status: 'active' | 'inactive';
  notes: string;
}

/** Default condition names for Family History */
export const DEFAULT_FAMILY_CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Thyroid',
  'TB',
  'Cancers',
  'IHD/CVA',
  'Thromboembolism',
  'Psychiatric problems',
] as const;

/** Common relations for suggestions */
export const COMMON_RELATIONS = [
  'Mother',
  'Father',
  'Sister',
  'Brother',
  'Maternal Grandmother',
  'Maternal Grandfather',
  'Paternal Grandmother',
  'Paternal Grandfather',
  'Aunt',
  'Uncle',
] as const;

/** Status options for UI */
export const STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
