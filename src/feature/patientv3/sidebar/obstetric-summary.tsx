

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
    <div className="bg-white border-b border-zinc-200 px-4 py-3">
      <div className="grid grid-cols-4 gap-2">
        <GPLABadge label="G" value={gravida} color="text-emerald-700" bgColor="bg-emerald-50/50 border-emerald-100" />
        <GPLABadge label="P" value={para} color="text-blue-700" bgColor="bg-blue-50/50 border-blue-100" />
        <GPLABadge label="L" value={living} color="text-teal-700" bgColor="bg-teal-50/50 border-teal-100" />
        <GPLABadge label="A" value={abortion} color="text-rose-700" bgColor="bg-rose-50/50 border-rose-100" />
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
    <div className={`flex items-center justify-center gap-1 px-1 py-1 rounded-sm ${bgColor} border ${color}`}>
      <span className="text-[11px] font-bold tracking-tight">
        {label}{value}
      </span>
    </div>
  );
}

export default ObstetricSummary;

