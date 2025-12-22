import { observer } from 'mobx-react-lite';

// Mock data for visit history
const HISTORY_DATA = [
  { id: 1, visitDate: '2024-12-20', visitNumber: 'VIS-2024-002', seenBy: 'Dr. Example Doctor', complaints: 'Routine checkup, mild discomfort' },
  { id: 2, visitDate: '2024-11-15', visitNumber: 'VIS-2024-001', seenBy: 'Dr. Example Doctor', complaints: 'Initial consultation, abdominal pain' },
  { id: 3, visitDate: '2024-10-01', visitNumber: 'VIS-2024-000', seenBy: 'Dr. Example Doctor', complaints: 'Follow up' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Month-based color palette (subtle, pastel-like)
const MONTH_COLORS: Record<number, { bg: string; text: string }> = {
  0: { bg: 'bg-sky-50', text: 'text-sky-600' },       // Jan
  1: { bg: 'bg-pink-50', text: 'text-pink-600' },     // Feb
  2: { bg: 'bg-emerald-50', text: 'text-emerald-600' }, // Mar
  3: { bg: 'bg-violet-50', text: 'text-violet-600' }, // Apr
  4: { bg: 'bg-lime-50', text: 'text-lime-600' },     // May
  5: { bg: 'bg-amber-50', text: 'text-amber-600' },   // Jun
  6: { bg: 'bg-cyan-50', text: 'text-cyan-600' },     // Jul
  7: { bg: 'bg-rose-50', text: 'text-rose-600' },     // Aug
  8: { bg: 'bg-teal-50', text: 'text-teal-600' },     // Sep
  9: { bg: 'bg-orange-50', text: 'text-orange-600' }, // Oct
  10: { bg: 'bg-indigo-50', text: 'text-indigo-600' }, // Nov
  11: { bg: 'bg-red-50', text: 'text-red-600' },      // Dec
};

function formatDateParts(dateStr: string) {
  const date = new Date(dateStr);
  const monthIndex = date.getMonth();
  return {
    day: date.getDate(),
    month: MONTHS[monthIndex].toUpperCase(),
    year: date.getFullYear(),
    colors: MONTH_COLORS[monthIndex],
  };
}

export const VisitHistory = observer(() => {
  return (
    <div className="bg-white border border-zinc-200 shadow-sm h-full flex flex-col w-64 md:w-72 flex-shrink-0">
       <div className="px-3 py-2 border-b border-zinc-200 bg-white flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide">Visit History</h3>
          <span className="text-[10px] text-zinc-500">{HISTORY_DATA.length}</span>
       </div>
       <div className="flex-1 overflow-y-auto">
          {HISTORY_DATA.map((visit) => {
            const { day, month, year, colors } = formatDateParts(visit.visitDate);
            return (
              <div key={visit.id} className="group border-b border-zinc-100 p-2.5 hover:bg-zinc-50 cursor-pointer transition-colors flex gap-3 items-center">
                {/* Calendar Avatar */}
                <div className={`w-12 h-14 flex-shrink-0 ${colors.bg} border border-zinc-200 rounded flex flex-col items-center justify-center overflow-hidden`}>
                  <span className={`text-[10px] font-bold ${colors.text} uppercase tracking-wide`}>{month}</span>
                  <span className={`text-[20px] font-bold ${colors.text} leading-none`}>{day}</span>
                  <span className={`text-[10px] font-medium ${colors.text} leading-none mt-0.5`}>{year}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-zinc-800 leading-snug line-clamp-2 mb-1">
                    {visit.complaints}
                  </p>
                  <span className="text-[9px] text-zinc-400">{visit.visitNumber}</span>
                </div>
              </div>
            );
          })}
       </div>
    </div>
  );
});
