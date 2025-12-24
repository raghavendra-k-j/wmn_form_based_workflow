/** Surgical History Item */
export interface SurgicalHistoryItem {
  id: string;
  procedure: string;
  date: string;
  notes: string;
  /** Status: 'yes' means surgery was done, 'no' means not done */
  status: 'yes' | 'no';
}

/** Status options for UI */
export const SURGERY_STATUS_OPTIONS = [
  { value: 'yes' as const, label: 'Yes', className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { value: 'no' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
