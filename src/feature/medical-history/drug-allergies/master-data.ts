/**
 * Drug Allergies Master Data
 * - MASTER_ALLERGIES: Full list (20 items) for autocomplete search
 * - PREFERRED_ALLERGIES: Common OB/GYN allergies (10 items) always visible in UI
 */

/** Full list of all drug allergies for autocomplete (20 items) */
export const MASTER_ALLERGIES: string[] = [
  // Common Antibiotics
  'Penicillin',
  'Amoxicillin',
  'Cephalosporins',
  'Sulfa Drugs',
  'Erythromycin',
  'Azithromycin',
  'Clindamycin',
  'Metronidazole',
  // NSAIDs
  'Aspirin',
  'Ibuprofen',
  'Diclofenac',
  'Naproxen',
  // Anesthetics
  'Lidocaine',
  'Bupivacaine',
  // Opioids
  'Codeine',
  'Morphine',
  'Fentanyl',
  // Equipment/Antiseptics
  'Latex',
  'Iodine',
  'Chlorhexidine',
];

/** 
 * Preferred/Default allergies - OB/GYN focused (10 items)
 * These are always displayed in the UI with status "No" by default
 */
export const PREFERRED_ALLERGIES: string[] = [
  'Penicillin',
  'Amoxicillin',
  'Sulfa Drugs',
  'Aspirin',
  'Ibuprofen',
  'Lidocaine',
  'Codeine',
  'Morphine',
  'Latex',
  'Iodine',
];
