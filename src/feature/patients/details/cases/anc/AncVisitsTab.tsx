import { Plus, Trash2, Calendar, Edit2, ArrowRight } from 'lucide-react';
import type { AncVisit } from './AncVisitPage';

/* ============================================================================
 * COMPONENT
 * ============================================================================ */

interface VisitsTabProps {
  visits: AncVisit[];
  onAddVisit: () => void;
  onEditVisit: (visit: AncVisit) => void;
  onDeleteVisit: (id: string) => void;
}

export function AncVisitsTab({ visits, onAddVisit, onEditVisit, onDeleteVisit }: VisitsTabProps) {
  return (
    <div className="space-y-4">
      {/* Header Action */}
      <div className="flex justify-between items-center p-1">
        <div>
          <h3 className="text-sm font-bold text-zinc-800">Follow-up Visits</h3>
          <p className="text-xs text-zinc-500">Track patient progress over time</p>
        </div>
        <button
          onClick={onAddVisit}
          className="flex items-center gap-1.5 px-3 py-2 bg-pink-600 text-white text-xs font-semibold rounded-lg hover:bg-pink-700 transition-all shadow-sm hover:shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          Record New Visit
        </button>
      </div>

      {/* Visits Table */}
      {visits.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl border-2 border-dashed border-zinc-200 text-center">
          <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-zinc-300" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-700">No visits recorded yet</h4>
          <p className="text-xs text-zinc-500 mt-1 max-w-[200px]">Start recording follow-up visits to track maternal and fetal health.</p>
          <button
            onClick={onAddVisit}
            className="mt-4 text-xs font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            Add First Visit <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-[10px] uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-100">
                <tr>
                  <th className="px-4 py-3 font-semibold w-24">Date</th>
                  <th className="px-4 py-3 font-semibold">Complaints</th>
                  <th className="px-4 py-3 font-semibold">Vitals (Wt/BP)</th>
                  <th className="px-4 py-3 font-semibold">Growth (Wks/SFH)</th>
                  <th className="px-4 py-3 font-semibold">Findings (PP/FH)</th>
                  <th className="px-4 py-3 font-semibold">Remarks/Plan</th>
                  <th className="px-4 py-3 font-semibold">Next Visit</th>
                  <th className="px-4 py-3 font-semibold w-20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {visits.map((visit) => (
                  <tr key={visit.id} className="group hover:bg-zinc-50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-zinc-800 whitespace-nowrap align-top">
                      {new Date(visit.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 max-w-[150px] align-top">
                      <p className="truncate" title={visit.complaints}>{visit.complaints || '-'}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{visit.weight ? `${visit.weight} kg` : '-'}</span>
                        <span className="text-zinc-400 text-[10px]">{visit.bp || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{visit.weeksByLMP ? `${visit.weeksByLMP}w` : '-'}</span>
                        <span className="text-zinc-400 text-[10px]">{visit.sfh ? `${visit.sfh}cm` : '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{visit.pp || '-'}</span>
                        <span className="text-zinc-400 text-[10px]">{visit.fh ? `${visit.fh} bpm` : '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 max-w-[180px] align-top">
                      <p className="line-clamp-2" title={visit.remarks}>{visit.remarks || '-'}</p>
                      {visit.sb && <p className="text-[10px] text-blue-500 mt-0.5 font-medium truncate">SB: {visit.sb}</p>}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 whitespace-nowrap align-top">
                      {visit.nextVisit ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                           {new Date(visit.nextVisit).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right align-top">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditVisit(visit)}
                          className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Visit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteVisit(visit.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Visit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
