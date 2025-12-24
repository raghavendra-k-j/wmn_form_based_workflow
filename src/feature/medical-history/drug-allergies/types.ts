/** Drug Allergy Item */
export interface DrugAllergyItem {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  note?: string;
}

/** Status options for UI */
export const DRUG_ALLERGY_STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];
