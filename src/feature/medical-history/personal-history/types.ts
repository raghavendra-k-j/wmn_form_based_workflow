/** Personal History Item */
export interface PersonalHistoryItem {
  id: string;
  habit: string;
  status: 'active' | 'inactive' | 'quit' | 'occasional';
  notes: string;
  duration?: string;
}

/** Default habits/factors for Personal History */
export const DEFAULT_PERSONAL_HABITS = [
  'Smoking',
  'Drinking',
  'Alcohol',
  'Psych. Stress',
  'Substance Abuse',
] as const;

/** Status options for UI */
export const PERSONAL_STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
  { value: 'occasional' as const, label: 'Occasional', className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { value: 'quit' as const, label: 'Quit', className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
