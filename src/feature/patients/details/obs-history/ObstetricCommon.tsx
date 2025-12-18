import { Baby, Activity } from 'lucide-react';

/* ========================================
   TYPES
======================================== */
export type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';
export type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';
export type Gender = 'Male' | 'Female' | 'Other' | 'NA';
export type BabyStatus = 'Living' | 'Deceased' | 'NA';

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

export interface GTPALScore {
  g: number;
  t: number;
  p: number;
  a: number;
  l: number;
}

/* ========================================
   CONSTANTS
======================================== */
export const COMMON_COMPLICATIONS = [
  'Pre-eclampsia', 'Gestational Diabetes', 'PPH', 'Preterm Labor', 'IUGR', 'Placenta Previa'
];

export const MOCK_PREGNANCY_DATA: PregnancyRecord[] = [
  {
    id: '1',
    outcome: 'Live Birth',
    year: '2019',
    gestationWeeks: 39,
    deliveryMode: 'NVD',
    birthWeight: '3.1 kg',
    gender: 'Female',
    babyStatus: 'Living',
    complications: [],
    remarks: ''
  },
  {
    id: '2',
    outcome: 'Miscarriage',
    year: '2021',
    gestationWeeks: 8,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: ''
  },
  {
    id: 'current',
    outcome: 'Ongoing',
    lmpDate: '2024-06-15',
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: ''
  }
];

/* ========================================
   HELPERS
======================================== */
export function calculateGA(lmpDate: string): { weeks: number; days: number } {
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
}

export function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280);
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

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

export function getOutcomeStyle(outcome: OutcomeType) {
  switch (outcome) {
    case 'Live Birth':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'Stillbirth':
      return 'bg-zinc-100 text-zinc-700 border border-zinc-200';
    case 'Ongoing':
      return 'bg-pink-100 text-pink-700 border border-pink-200';
    default:
      return 'bg-rose-50 text-rose-700 border border-rose-100';
  }
}

/* ========================================
   COMMON UI COMPONENTS
======================================== */
import { Calculator } from 'lucide-react';

export function GTPALBar({ score }: { score: GTPALScore }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex items-center gap-2">
        <Calculator className="w-4 h-4 text-zinc-400" />
        <span className="text-sm font-semibold text-zinc-500">GTPAL:</span>
      </div>
      <div className="flex items-center gap-2">
        {[
          { label: 'G', value: score.g, color: 'bg-blue-100 text-blue-700', title: 'Gravida' },
          { label: 'T', value: score.t, color: 'bg-emerald-100 text-emerald-700', title: 'Term (≥37w)' },
          { label: 'P', value: score.p, color: 'bg-amber-100 text-amber-700', title: 'Preterm (20-36w)' },
          { label: 'A', value: score.a, color: 'bg-rose-100 text-rose-700', title: 'Abortions (<20w)' },
          { label: 'L', value: score.l, color: 'bg-indigo-100 text-indigo-700', title: 'Living' },
        ].map(item => (
          <div key={item.label} className={`flex items-center rounded ${item.color}`} title={item.title}>
            <span className="px-2 py-1 text-xs font-bold">{item.label}</span>
            <span className="px-1.5 py-1 text-xs font-black">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PregnancyOutcomeBadge({ outcome }: { outcome: OutcomeType }) {
  const Icon = outcome === 'Live Birth' ? Baby : Activity;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${getOutcomeStyle(outcome)}`}>
      <Icon className="w-3 h-3" />
      {outcome}
    </span>
  );
}
