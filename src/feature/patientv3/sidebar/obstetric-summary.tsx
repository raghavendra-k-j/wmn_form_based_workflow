import { Baby } from 'lucide-react';

/** Mock obstetric history data - GPLA format */
const OBSTETRIC_DATA = {
  gravida: 3,    // G - Total pregnancies
  para: 2,       // P - Deliveries after 20 weeks
  living: 2,     // L - Living children
  abortion: 1,   // A - Abortions/miscarriages
};

/** Obstetric History Summary - GPLA Display (Compact) */
export function ObstetricSummary() {
  const { gravida, para, living, abortion } = OBSTETRIC_DATA;
  
  return (
    <div className="bg-white border-b border-zinc-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Baby className="w-3.5 h-3.5 text-pink-500" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">GPLA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GPLABadge label="G" value={gravida} color="text-emerald-600" bgColor="bg-emerald-50" />
          <GPLABadge label="P" value={para} color="text-blue-600" bgColor="bg-blue-50" />
          <GPLABadge label="L" value={living} color="text-teal-600" bgColor="bg-teal-50" />
          <GPLABadge label="A" value={abortion} color="text-rose-600" bgColor="bg-rose-50" />
        </div>
      </div>
    </div>
  );
}

/** Compact GPLA Badge */
function GPLABadge({ 
  label, 
  value, 
  color,
  bgColor,
}: { 
  label: string; 
  value: number; 
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 ${bgColor} border border-current/10`}>
      <span className={`text-[10px] font-bold ${color}`}>{label}</span>
      <span className={`text-[11px] font-black ${color}`}>{value}</span>
    </div>
  );
}

export default ObstetricSummary;

