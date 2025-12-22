/** Current Medication Item */
export interface MedicationItem {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  reason: string;
  status: 'active' | 'inactive';
}

/** Default medication names for suggestions */
export const DEFAULT_MEDICATIONS = [
  'Paracetamol',
  'Ibuprofen',
  'Metformin',
  'Amlodipine',
  'Amoxicillin',
  'Omeprazole',
  'Simvastatin',
  'Aspirin',
  'Thyroxine',
  'Folic Acid',
  'Vitamin D',
  'Iron Supplements',
] as const;

/** Common frequencies for suggestions */
export const COMMON_FREQUENCIES = [
  'OD (Once daily)',
  'BD (Twice daily)',
  'TDS (Three times daily)',
  'QDS (Four times daily)',
  'PRN (As needed)',
  'Weekly',
  'Monthly',
] as const;

/** Status options for UI */
export const MEDICATION_STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
