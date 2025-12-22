import { useState } from 'react';
import { Plus, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../context';

/* =============================================================================
 * MOCK DATA - ANC Visits (based on uploaded image structure)
 * ============================================================================= */

interface AncVisit {
  id: string;
  date: string;
  complaints: string;
  wt: string;
  bp: string;
  wksByLMP: string;
  sfh: string;
  pp: string;
  fh: string;
  remarksPlan: string;
  nextVisit: string;
}

const MOCK_VISITS: AncVisit[] = [
  {
    id: 'ANC-001',
    date: '2024-12-18',
    complaints: 'No vomiting, tiredness',
    wt: '',
    bp: '7P',
    wksByLMP: '',
    sfh: '',
    pp: '',
    fh: '',
    remarksPlan: 'TA, Folic bloods & nt',
    nextVisit: '2025-01-15',
  },
  {
    id: 'ANC-002',
    date: '2024-11-25',
    complaints: 'Well, PTSN',
    wt: '',
    bp: '110/70',
    wksByLMP: '12+',
    sfh: '',
    pp: '',
    fh: '',
    remarksPlan: 'TA - 4 weeks',
    nextVisit: '2024-12-18',
  },
  {
    id: 'ANC-003',
    date: '2024-10-20',
    complaints: 'Well',
    wt: '',
    bp: '120/70',
    wksByLMP: "16+",
    sfh: '16',
    pp: '',
    fh: '',
    remarksPlan: 'TA, U scan, 1 OFTT',
    nextVisit: '2024-11-25',
  },
  {
    id: 'ANC-004',
    date: '2024-09-15',
    complaints: 'H/o bleed, PLV burning micturition',
    wt: '',
    bp: '18+',
    wksByLMP: '18',
    sfh: '',
    pp: '',
    fh: '',
    remarksPlan: 'P/S - no bleed, urine C&W, Unit -> 8',
    nextVisit: '2024-10-20',
  },
];

/* =============================================================================
 * ANC PAGE - Visit History with Demo State Toggle
 * ============================================================================= */

export function AncPage() {
  const navigate = useNavigate();
  const { store } = usePatientDetails();
  const [demoState, setDemoState] = useState<'empty' | 'data'>('empty');

  const visits = demoState === 'empty' ? [] : MOCK_VISITS;

  const handleNewVisit = () => {
    navigate(`/patientsv2/${store.patientId}/anc-form`);
  };

  const handleViewVisit = (visitId: string) => {
    navigate(`/patientsv2/${store.patientId}/anc-form?visit=${visitId}`);
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
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-sm flex items-center justify-center mb-4 border border-emerald-100">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-[14px] font-bold text-zinc-800 mb-2">
                No Antenatal Visits Yet
              </h3>
              <p className="text-[12px] text-zinc-500 mb-6">
                Start a new antenatal consultation to record patient details, examination findings, and clinical notes.
              </p>
              <button
                onClick={handleNewVisit}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-[12px] font-bold hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Start New Visit
              </button>
            </div>
          </div>
        ) : (
          /* Data State - Visit Table */
          <div className="bg-white border border-zinc-200">
            
            {/* New Visit Row - First Item */}
            <button
              onClick={handleNewVisit}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-zinc-200 text-left group bg-emerald-50/30"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-sm flex items-center justify-center border border-emerald-200 border-dashed shrink-0">
                <Plus className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-emerald-700">
                  Add Follow-up Visit
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 transition-colors shrink-0" />
            </button>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-zinc-100/50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Wks</div>
              <div className="col-span-3">Complaints</div>
              <div className="col-span-1">BP</div>
              <div className="col-span-3">Remarks/Plan</div>
              <div className="col-span-1 text-right">View</div>
            </div>

            {/* Table Body */}
            {visits.map((visit, index) => (
              <div
                key={visit.id}
                className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors items-center"
              >
                {/* Visit Number */}
                <div className="col-span-1">
                  <span className="text-[12px] font-bold text-zinc-400">
                    {index + 1}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <span className="text-[11px] text-zinc-800">
                    {new Date(visit.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Weeks by LMP */}
                <div className="col-span-1">
                  {visit.wksByLMP ? (
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded">
                      {visit.wksByLMP}
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-300">-</span>
                  )}
                </div>

                {/* Complaints */}
                <div className="col-span-3">
                  <p className="text-[11px] text-zinc-700 truncate">
                    {visit.complaints || '-'}
                  </p>
                </div>

                {/* BP */}
                <div className="col-span-1">
                  <span className="text-[11px] text-zinc-600">
                    {visit.bp || '-'}
                  </span>
                </div>

                {/* Remarks/Plan */}
                <div className="col-span-3">
                  <p className="text-[11px] text-zinc-500 truncate">
                    {visit.remarksPlan || '-'}
                  </p>
                </div>

                {/* Action */}
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => handleViewVisit(visit.id)}
                    className="p-1.5 hover:bg-zinc-100 rounded-sm transition-colors"
                    title="View/Edit Visit"
                  >
                    <ChevronRight className="w-4 h-4 text-zinc-400 hover:text-zinc-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AncPage;
