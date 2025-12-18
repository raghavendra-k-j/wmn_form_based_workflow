import type { ReactNode } from 'react';
import { Baby, Activity, Calculator, HeartPulse, Trash2 } from 'lucide-react';
import type { OutcomeType, GTPALScore } from './store';

/* =============================================================================
 * GTPAL SCORE BAR - Carbon Design
 * ============================================================================= */

interface GTPALBarProps {
  score: GTPALScore;
}

export function GTPALBar({ score }: GTPALBarProps) {
  const items = [
    { label: 'G', value: score.g, bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200', title: 'Gravida' },
    { label: 'T', value: score.t, bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200', title: 'Term (≥37w)' },
    { label: 'P', value: score.p, bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200', title: 'Preterm (20-36w)' },
    { label: 'A', value: score.a, bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-200', title: 'Abortions (<20w)' },
    { label: 'L', value: score.l, bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', title: 'Living' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-zinc-100 text-zinc-500 border border-zinc-200">
        <Calculator className="w-3.5 h-3.5" />
      </div>
      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">GTPAL</span>
      <div className="flex items-center gap-1.5">
        {items.map(item => (
          <div 
            key={item.label} 
            className={`flex items-center border ${item.borderColor} ${item.bgColor}`} 
            title={item.title}
          >
            <span className={`px-1.5 py-0.5 text-[10px] font-bold ${item.textColor} border-r ${item.borderColor}`}>
              {item.label}
            </span>
            <span className={`px-1.5 py-0.5 text-[11px] font-black ${item.textColor}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================================
 * OUTCOME BADGE - Pregnancy outcome display
 * ============================================================================= */

interface OutcomeBadgeProps {
  outcome: OutcomeType;
}

const outcomeStyles: Record<OutcomeType, { bgColor: string; textColor: string; borderColor: string }> = {
  'Ongoing': { bgColor: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
  'Live Birth': { bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
  'Stillbirth': { bgColor: 'bg-zinc-100', textColor: 'text-zinc-700', borderColor: 'border-zinc-300' },
  'Miscarriage': { bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-200' },
  'Abortion': { bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
  'Ectopic': { bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
};

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

/* =============================================================================
 * CURRENT PREGNANCY CARD - Highlighted card for ongoing pregnancy
 * ============================================================================= */

interface CurrentPregnancyCardProps {
  gaWeeks: number;
  gaDays: number;
  edd: string;
  lmpDate: string;
  onDelete?: () => void;
  onMarkOutcome?: (outcome: 'Delivered' | 'Miscarriage' | 'Abortion') => void;
}

export function CurrentPregnancyCard({ gaWeeks, gaDays, edd, lmpDate, onDelete, onMarkOutcome }: CurrentPregnancyCardProps) {
  // Format LMP date for display
  const formattedLmp = lmpDate 
    ? new Date(lmpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '--';

  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 p-4">
      {/* Top Row - Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center border border-pink-200">
            <HeartPulse className="w-6 h-6 text-pink-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[12px] font-bold text-zinc-900 uppercase tracking-tight">
                Current Pregnancy
              </h3>
              <span className="px-1.5 py-0.5 bg-pink-100 text-pink-700 text-[9px] font-bold uppercase border border-pink-200">
                Active
              </span>
            </div>
            <p className="text-[18px] font-black text-pink-600">
              {gaWeeks} Weeks, {gaDays} Days
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* LMP */}
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">LMP</p>
            <p className="text-[13px] font-bold text-zinc-700">{formattedLmp}</p>
          </div>
          {/* EDD */}
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">EDD</p>
            <p className="text-[13px] font-bold text-zinc-700">{edd}</p>
          </div>
          {/* Delete Button */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Remove Current Pregnancy"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row - Action Buttons */}
      {onMarkOutcome && (
        <div className="mt-4 pt-3 border-t border-pink-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
              Mark Outcome:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onMarkOutcome('Delivered')}
                className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 transition-colors"
              >
                Delivered
              </button>
              <button
                onClick={() => onMarkOutcome('Miscarriage')}
                className="px-3 py-1.5 bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold hover:bg-rose-200 transition-colors"
              >
                Miscarriage
              </button>
              <button
                onClick={() => onMarkOutcome('Abortion')}
                className="px-3 py-1.5 bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-bold hover:bg-amber-200 transition-colors"
              >
                Abortion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



/* =============================================================================
 * PREGNANCY ROW - Table row for pregnancy record
 * ============================================================================= */

interface PregnancyRowProps {
  index: number;
  year: string;
  outcome: OutcomeType;
  gestationWeeks: number;
  deliveryMode: string;
  birthWeight?: string;
  gender?: string;
  babyStatus?: string;
  complications: string[];
  onDelete?: () => void;
  showDelete?: boolean;
}

export function PregnancyRow({
  index,
  year,
  outcome,
  gestationWeeks,
  deliveryMode,
  birthWeight,
  gender,
  babyStatus,
  complications,
  onDelete,
  showDelete = true,
}: PregnancyRowProps) {
  const showBabyDetails = outcome === 'Live Birth' || outcome === 'Stillbirth';
  const genderColor = gender === 'Female' ? 'text-pink-600' : gender === 'Male' ? 'text-blue-600' : 'text-zinc-500';

  return (
    <tr className="group hover:bg-zinc-50/50 transition-colors border-b border-zinc-100">
      <td className="px-3 py-2 text-[11px] text-zinc-400 font-medium">{index}</td>
      <td className="px-3 py-2 text-[12px] font-bold text-zinc-700">{year}</td>
      <td className="px-3 py-2"><OutcomeBadge outcome={outcome} /></td>
      <td className="px-3 py-2 text-[11px] text-zinc-600">
        <span className="font-mono">{gestationWeeks}w</span>
        {deliveryMode !== 'NA' && (
          <>
            <span className="text-zinc-300 mx-1">|</span>
            <span className={deliveryMode === 'LSCS' ? 'text-orange-600 font-medium' : ''}>
              {deliveryMode}
            </span>
          </>
        )}
      </td>
      <td className="px-3 py-2 text-[11px]">
        {showBabyDetails ? (
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">{birthWeight || '--'}</span>
            <span className="text-zinc-300">|</span>
            <span className={genderColor}>{gender}</span>
            {babyStatus === 'Living' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Living" />
            )}
          </div>
        ) : (
          <span className="text-zinc-300">--</span>
        )}
      </td>
      <td className="px-3 py-2">
        {complications.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {complications.map(c => (
              <span key={c} className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 border border-red-200">
                {c}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-zinc-300 text-[11px]">—</span>
        )}
      </td>
      <td className="px-3 py-2 text-right">
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
            className="p-1 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        )}
      </td>
    </tr>
  );
}

/* =============================================================================
 * EMPTY STATE - No records
 * ============================================================================= */

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

export function EmptyState({ message = 'No pregnancy records', subMessage }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 mx-auto mb-3 bg-zinc-100 rounded-sm flex items-center justify-center">
        <Baby className="w-6 h-6 text-zinc-300" />
      </div>
      <p className="text-[12px] font-medium text-zinc-500 mb-1">{message}</p>
      {subMessage && <p className="text-[11px] text-zinc-400">{subMessage}</p>}
    </div>
  );
}

/* =============================================================================
 * ACTION HEADER - Page header with mode toggle
 * ============================================================================= */

interface ActionHeaderProps {
  title: string;
  isEditMode: boolean;
  onEdit: () => void;
  onDone: () => void;
  rightContent?: ReactNode;
}

export function ActionHeader({ title, isEditMode, onEdit, onDone, rightContent }: ActionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200 sticky top-0 z-10">
      <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">{title}</h2>
      <div className="flex items-center gap-3">
        {rightContent}
        {isEditMode ? (
          <button
            type="button"
            onClick={onDone}
            className="px-3 py-1 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="px-3 py-1 bg-white border border-zinc-300 text-zinc-700 text-[11px] font-bold hover:bg-zinc-50 hover:border-zinc-400 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
