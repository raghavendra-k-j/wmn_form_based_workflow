/** Types for Obstetric History Module */

/** Outcome Type */
export type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';

/** Delivery Mode */
export type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';

/** Baby Gender */
export type Gender = 'Male' | 'Female' | 'Other' | 'NA';

/** Baby Status */
export type BabyStatus = 'Living' | 'Deceased' | 'NA';

/** Pregnancy Record Interface */
export interface PregnancyRecord {
  id: string;
  outcome: OutcomeType;
  year?: string;
  lmpDate?: string;
  gestationWeeks?: number;
  deliveryMode: DeliveryMode;
  birthWeight?: string;
  gender: Gender;
  babyStatus: BabyStatus;
  complications: string[];
  remarks: string;
}

/** GTPAL Score */
export interface GTPALScore {
  g: number;
  t: number;
  p: number;
  a: number;
  l: number;
}

/** Common Complications */
export const COMMON_COMPLICATIONS = [
  'Pre-eclampsia',
  'Gestational Diabetes',
  'PPH',
  'Preterm Labor',
  'IUGR',
  'Placenta Previa',
  'Anemia',
  'PIH',
];

/** Outcome Options for UI */
export const OUTCOME_OPTIONS: { value: OutcomeType; label: string; color: string }[] = [
  { value: 'Live Birth', label: 'Delivered', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { value: 'Miscarriage', label: 'Miscarriage', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
  { value: 'Abortion', label: 'Abortion', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { value: 'Stillbirth', label: 'Stillbirth', color: 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200' },
  { value: 'Ectopic', label: 'Ectopic', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
];

/** Delivery Mode Options */
export const DELIVERY_MODE_OPTIONS: DeliveryMode[] = ['NVD', 'LSCS', 'Instrumental', 'Vacuum', 'Forceps'];

/** Gender Options */
export const GENDER_OPTIONS: Gender[] = ['Male', 'Female', 'NA'];
