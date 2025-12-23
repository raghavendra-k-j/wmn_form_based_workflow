import type { PregnancyRecord, GTPALScore } from './types';

/** Calculate Gestational Age from LMP date */
export function calculateGA(lmpDate: string): { weeks: number; days: number } {
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
}

/** Calculate EDD from LMP date */
export function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Calculate GTPAL Score from pregnancy records */
export function calculateGTPAL(records: PregnancyRecord[]): GTPALScore {
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');
  const gravida = records.length;
  const term = pastRecords.filter(r => (r.gestationWeeks || 0) >= 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth')).length;
  const preterm = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks >= 20 && weeks < 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth');
  }).length;
  const abortions = pastRecords.filter(r => {
    const weeks = r.gestationWeeks || 0;
    return weeks < 20 || r.outcome === 'Miscarriage' || r.outcome === 'Abortion' || r.outcome === 'Ectopic';
  }).length;
  const living = pastRecords.filter(r => r.babyStatus === 'Living').length;

  return { g: gravida, t: term, p: preterm, a: abortions, l: living };
}

/** Create a new blank pregnancy record */
export function createEmptyPregnancyRecord(): PregnancyRecord {
  return {
    id: `preg-${Date.now()}`,
    outcome: 'Live Birth',
    year: '',
    deliveryMode: 'NVD',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: '',
  };
}

/** Format year for display */
export function formatYear(year?: string): string {
  return year || '--';
}
