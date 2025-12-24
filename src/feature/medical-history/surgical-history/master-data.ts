/**
 * Surgical History Master Data
 * - MASTER_SURGERIES: Full list for autocomplete search
 * - PREFERRED_SURGERIES: Common OB/GYN surgeries always visible in UI
 */

/** Full list of all surgeries for autocomplete (20+ items) */
export const MASTER_SURGERIES: string[] = [
  // OB/GYN Specific
  'CS (Cesarean Section)',
  'D&C (Dilation & Curettage)',
  'Hysterectomy',
  'Myomectomy',
  'Ovarian Cystectomy',
  'Tubectomy',
  'Laparoscopy',
  'Hysteroscopy',
  'Ectopic Pregnancy Surgery',
  'Cervical Cerclage',
  'Colporrhaphy',
  'Sling Procedure',
  // General
  'Appendectomy',
  'Cholecystectomy',
  'Hernia Repair',
  'Thyroidectomy',
  'Breast Surgery',
  'Tonsillectomy',
  'Orthopedic Surgery',
  'Cardiac Surgery',
];

/** 
 * Preferred/Default surgeries - OB/GYN focused (10 items)
 * These are always displayed in the UI for doctors to quickly mark
 */
export const PREFERRED_SURGERIES: string[] = [
  'CS (Cesarean Section)',
  'D&C (Dilation & Curettage)',
  'Hysterectomy',
  'Myomectomy',
  'Ovarian Cystectomy',
  'Tubectomy',
  'Laparoscopy',
  'Hysteroscopy',
  'Appendectomy',
  'Cholecystectomy',
];
