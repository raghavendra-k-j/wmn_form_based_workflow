import { Baby, Activity } from 'lucide-react';
import type { OutcomeType } from '../types';

/** Outcome badge styling */
const outcomeStyles: Record<OutcomeType, { bgColor: string; textColor: string; borderColor: string }> = {
  'Ongoing': { bgColor: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
  'Live Birth': { bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
  'Stillbirth': { bgColor: 'bg-zinc-100', textColor: 'text-zinc-700', borderColor: 'border-zinc-300' },
  'Miscarriage': { bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-200' },
  'Abortion': { bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
  'Ectopic': { bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
};

interface OutcomeBadgeProps {
  outcome: OutcomeType;
}

export function OutcomeBadge({ outcome }: OutcomeBadgeProps) {
  const style = outcomeStyles[outcome];
  const Icon = outcome === 'Live Birth' ? Baby : Activity;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase border ${style.bgColor} ${style.textColor} ${style.borderColor}`}>
      <Icon className="w-3 h-3" />
      {outcome}
    </span>
  );
}

/** Get outcome style for external use */
export function getOutcomeStyle(outcome: OutcomeType) {
  return outcomeStyles[outcome];
}
