import type { ReactNode } from 'react';

/* =============================================================================
 * SECTION BADGE - Count Badge for Headers
 * ============================================================================= */

interface SectionBadgeProps {
  count: number;
  label?: string;
  variant?: 'amber' | 'red' | 'blue' | 'green' | 'purple' | 'teal';
}

const badgeVariants = {
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
};

export function SectionBadge({ count, label, variant = 'amber' }: SectionBadgeProps) {
  if (count === 0) return null;

  return (
    <span className={`px-1.5 py-0.5 text-[10px] font-bold border ${badgeVariants[variant]}`}>
      {count}{label ? ` ${label}` : ''}
    </span>
  );
}

/* =============================================================================
 * SUMMARY BADGE - Display Item in View Mode
 * ============================================================================= */

interface SummaryBadgeProps {
  children: ReactNode;
  variant?: 'amber' | 'red' | 'blue' | 'green' | 'purple' | 'teal';
}

const summaryVariants = {
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-800 border-red-200',
  blue: 'bg-blue-50 text-blue-800 border-blue-200',
  green: 'bg-green-50 text-green-800 border-green-200',
  purple: 'bg-purple-50 text-purple-800 border-purple-200',
  teal: 'bg-teal-50 text-teal-800 border-teal-200',
};

export function SummaryBadge({ children, variant = 'amber' }: SummaryBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold border ${summaryVariants[variant]}`}>
      {children}
    </div>
  );
}
