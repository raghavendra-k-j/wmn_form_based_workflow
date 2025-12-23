import { Pill, Plus } from 'lucide-react';

/** Prescriptions Page - Medications prescribed */
export function PrescriptionsPage() {
  // Mock prescriptions data
  const prescriptions = [
    { id: '1', name: 'Folic Acid', dose: '5mg', frequency: 'Once Daily', duration: '3 months', instructions: 'After breakfast' },
    { id: '2', name: 'Iron + Folic Acid', dose: '100mg', frequency: 'Once Daily', duration: '6 months', instructions: 'After lunch' },
  ];

  return (
    <div className="h-full">
      <div className="bg-white border border-zinc-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded flex items-center justify-center">
              <Pill className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-zinc-800">Prescriptions</h2>
              <p className="text-[11px] text-zinc-500">Medications prescribed during this visit</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-[11px] font-bold hover:bg-orange-700 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Medicine
          </button>
        </div>
        
        {/* Prescriptions Table */}
        {prescriptions.length > 0 ? (
          <table className="w-full border border-zinc-200">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Name</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Dose</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Frequency</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Duration</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-500 uppercase">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx, index) => (
                <tr key={rx.id} className={`border-b border-zinc-100 ${index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}>
                  <td className="px-3 py-2 text-[12px] font-medium text-zinc-800">{rx.name}</td>
                  <td className="px-3 py-2 text-[12px] text-zinc-600">{rx.dose}</td>
                  <td className="px-3 py-2 text-[12px] text-zinc-600">{rx.frequency}</td>
                  <td className="px-3 py-2 text-[12px] text-zinc-600">{rx.duration}</td>
                  <td className="px-3 py-2 text-[12px] text-zinc-500">{rx.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-[11px] text-zinc-400 border border-dashed border-zinc-300 p-4 text-center">
            No prescriptions added. Click "Add Medicine" to add one.
          </div>
        )}
      </div>
    </div>
  );
}
