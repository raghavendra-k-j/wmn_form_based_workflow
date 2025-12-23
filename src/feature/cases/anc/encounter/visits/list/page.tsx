import { CalendarDays, Plus } from 'lucide-react';

/** Visits List Page */
export function VisitsListPage() {
  // Mock visits data
  const visits = [
    { id: '1', date: '2024-01-15', gestationalAge: '12w 3d', visitType: 'Booking Visit', doctor: 'Dr. Smith' },
    { id: '2', date: '2024-02-12', gestationalAge: '16w 1d', visitType: 'Routine ANC', doctor: 'Dr. Smith' },
    { id: '3', date: '2024-03-11', gestationalAge: '20w 0d', visitType: 'Anomaly Scan Visit', doctor: 'Dr. Johnson' },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-zinc-800">ANC Visits</h3>
            <p className="text-[11px] text-zinc-500">All antenatal care visits</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New Visit
        </button>
      </div>

      {/* Visits Table */}
      <div className="bg-white border border-zinc-200">
        {visits.length === 0 ? (
          <div className="p-8 text-center text-zinc-400 text-[12px]">
            No visits recorded yet. Click "New Visit" to add one.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">GA</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Visit Type</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Doctor</th>
                <th className="px-4 py-2 text-right text-[10px] font-bold text-zinc-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => (
                <tr 
                  key={visit.id} 
                  className={`border-b border-zinc-100 hover:bg-zinc-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}
                >
                  <td className="px-4 py-3 text-[12px] text-zinc-700">{visit.date}</td>
                  <td className="px-4 py-3 text-[12px] font-semibold text-emerald-600">{visit.gestationalAge}</td>
                  <td className="px-4 py-3 text-[12px] text-zinc-700">{visit.visitType}</td>
                  <td className="px-4 py-3 text-[12px] text-zinc-500">{visit.doctor}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] text-sky-600 hover:text-sky-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
