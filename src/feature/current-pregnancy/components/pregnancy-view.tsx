import { HeartPulse, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { type CurrentPregnancyRecord, type EDDSource, formatDate } from '../store';
import { IconButton } from '../../../components';

/* =============================================================================
 * PREGNANCY VIEW PROPS
 * ============================================================================= */

interface PregnancyViewProps {
  pregnancy: CurrentPregnancyRecord;
  finalEDD: string;
  finalEDDSource: EDDSource;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

/* =============================================================================
 * PREGNANCY VIEW COMPONENT - SIMPLIFIED
 * Only shows LMP and Final EDD with source indicator
 * ============================================================================= */

export function PregnancyView({
  pregnancy,
  finalEDD,
  finalEDDSource,
  onEdit,
  onDelete,
  onComplete,
}: PregnancyViewProps) {
  // Get source text for EDD
  const getEDDSourceText = () => {
    switch (finalEDDSource) {
      case 'corrected':
        return 'Calculated from Corrected EDD';
      case 'scan':
        return 'Calculated from Scan EDD';
      case 'lmp':
      default:
        return 'Calculated from LMP';
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-pink-50 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-pink-500" />
            <span className="text-[13px] font-bold text-pink-900 uppercase tracking-tight">
              Current Pregnancy
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <IconButton
              icon={<Edit2 className="w-3.5 h-3.5" />}
              label="Edit"
              size="sm"
              onClick={onEdit}
              className="text-zinc-500 hover:text-zinc-700 hover:bg-pink-100 w-7 h-7"
            />
            <IconButton
              icon={<Trash2 className="w-3.5 h-3.5" />}
              label="Remove"
              size="sm"
              onClick={onDelete}
              className="text-zinc-400 hover:text-red-500 hover:bg-red-50 w-7 h-7"
            />
          </div>
        </div>

        {/* Simple 2-Column Data: LMP and EDD */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-8">
            {/* LMP */}
            <div>
              <span className="text-[12px] font-bold text-zinc-400 uppercase block mb-1">LMP</span>
              <span className="text-[16px] font-bold text-zinc-800">{formatDate(pregnancy.lmpDate)}</span>
            </div>

            {/* EDD (Final) with source below */}
            <div>
              <span className="text-[12px] font-bold text-emerald-600 uppercase block mb-1">EDD</span>
              <span className="text-[16px] font-bold text-emerald-700">{formatDate(finalEDD)}</span>
              <p className="text-[12px] text-zinc-400 mt-1">{getEDDSourceText()}</p>
            </div>
          </div>
        </div>

        {/* Footer with Complete Action */}
        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[12px] text-zinc-500">Mark as completed when pregnancy ends</span>
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 text-white text-[12px] font-bold rounded hover:bg-zinc-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
