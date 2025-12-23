import { Calculator } from 'lucide-react';
import type { GTPALScore } from '../types';

/** GTPAL Score Display Bar */
interface GTPALBarProps {
  score: GTPALScore;
  className?: string;
}

export function GTPALBar({ score, className = '' }: GTPALBarProps) {
  const items = [
    { label: 'G', value: score.g, bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200', title: 'Gravida' },
    { label: 'T', value: score.t, bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200', title: 'Term (≥37w)' },
    { label: 'P', value: score.p, bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200', title: 'Preterm (20-36w)' },
    { label: 'A', value: score.a, bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-200', title: 'Abortions (<20w)' },
    { label: 'L', value: score.l, bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', title: 'Living' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-6 h-6 rounded-none flex items-center justify-center bg-zinc-100 text-zinc-500 border border-zinc-200">
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
