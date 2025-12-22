/** Allergy Item */
export interface AllergyItem {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

/** Default allergy suggestions */
export const DEFAULT_ALLERGIES = [
  'Penicillin',
  'Latex',
  'Peanuts',
  'Sulfa Drugs',
  'Dust',
  'Pollen',
  'Shellfish',
  'Aspirin',
  'Ibuprofen',
] as const;

/** Status options for UI */
export const ALLERGY_STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
