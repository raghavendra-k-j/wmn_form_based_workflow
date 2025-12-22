/** Surgical History Item */
export interface SurgicalHistoryItem {
  id: string;
  procedure: string;
  date: string;
  notes: string;
}

/** Default suggestion names for Surgical History */
export const DEFAULT_SURGERY_NAMES = [
  'CS (Cesarean Section)',
  'Appendectomy',
  'Cholecystectomy',
  'Hysterectomy',
  'Laparoscopy',
  'D&C',
  'Tubectomy',
  'Myomectomy',
  'Ovarian Cystectomy',
  'Ectopic Pregnancy Surgery',
  'Hernia Repair',
  'Thyroidectomy',
] as const;
