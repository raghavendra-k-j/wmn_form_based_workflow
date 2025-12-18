import { useState } from 'react';
import { Plus, Calendar, ChevronRight, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../context';

/* =============================================================================
 * MOCK DATA - Gynae Visits
 * ============================================================================= */

interface GynaeVisit {
  id: string;
  date: string;
  chiefComplaint: string;
  impression: string;
}

const MOCK_VISITS: GynaeVisit[] = [
  {
    id: 'GYN-001',
    date: '2024-12-18',
    chiefComplaint: 'Irregular menstrual cycles, heavy bleeding',
    impression: 'AUB - Suspected DUB',
  },
  {
    id: 'GYN-002',
    date: '2024-11-10',
    chiefComplaint: 'Routine checkup, Pap smear due',
    impression: 'Normal findings, Pap smear done',
  },
];

/* =============================================================================
 * GYNAE PAGE - Visit History with Demo State Toggle
 * ============================================================================= */

export function GynaePage() {
  const navigate = useNavigate();
  const { store } = usePatientDetails();
  const [demoState, setDemoState] = useState<'empty' | 'data'>('empty');

  const visits = demoState === 'empty' ? [] : MOCK_VISITS;

  const handleNewVisit = () => {
    navigate(`/patientsv2/${store.patientId}/gynae-form`);
  };

  const handleViewVisit = (visitId: string) => {
    navigate(`/patientsv2/${store.patientId}/gynae-form?visit=${visitId}`);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200 sticky top-0 z-10">
        <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
          Visit History
        </h2>
        
        {/* Demo State Toggle */}
        <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-sm">
          <button
            onClick={() => setDemoState('empty')}
            className={`px-2.5 py-1 text-[10px] font-bold transition-colors rounded-sm ${
              demoState === 'empty'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            Empty
          </button>
          <button
            onClick={() => setDemoState('data')}
            className={`px-2.5 py-1 text-[10px] font-bold transition-colors rounded-sm ${
              demoState === 'data'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            With Data
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {visits.length === 0 ? (
          /* Empty State */
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 mx-auto bg-amber-50 rounded-sm flex items-center justify-center mb-4 border border-amber-100">
                <Stethoscope className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-[14px] font-bold text-zinc-800 mb-2">
                No Gynae Visits Yet
              </h3>
              <p className="text-[12px] text-zinc-500 mb-6">
                Start a new gynaecological consultation to record patient details, examination findings, and clinical notes.
              </p>
              <button
                onClick={handleNewVisit}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white text-[12px] font-bold hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Start New Visit
              </button>
            </div>
          </div>
        ) : (
          /* Data State - Visit List */
          <div className="bg-white border border-zinc-200">
            
            {/* New Visit Row - First Item */}
            <button
              onClick={handleNewVisit}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-amber-50 transition-colors border-b border-zinc-100 text-left group bg-amber-50/30"
            >
              <div className="w-10 h-10 bg-amber-100 rounded-sm flex items-center justify-center border border-amber-200 border-dashed shrink-0">
                <Plus className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-amber-700">
                  Add Follow-up Visit
                </p>
                <p className="text-[10px] text-amber-600/70">
                  Record new consultation
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors shrink-0" />
            </button>

            {/* Existing Visits */}
            {visits.map((visit, index) => (
              <button
                key={visit.id}
                onClick={() => handleViewVisit(visit.id)}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0 text-left group"
              >
                {/* Visit Number */}
                <div className="w-10 h-10 bg-zinc-100 rounded-sm flex items-center justify-center border border-zinc-200 shrink-0">
                  <span className="text-[13px] font-black text-zinc-500">
                    {index + 1}
                  </span>
                </div>

                {/* Visit Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-bold text-zinc-800">
                      {visit.id}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span className="text-[11px] text-zinc-500">
                      {new Date(visit.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 truncate">
                    {visit.chiefComplaint}
                  </p>
                  {visit.impression && (
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                      {visit.impression}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GynaePage;
