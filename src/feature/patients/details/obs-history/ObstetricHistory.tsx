import { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Baby, 
  Activity, 
  Calculator,
  X,
  Save,
  Check,
  Sparkles,
  History,
  HeartPulse,
  Database,
  Eraser
} from 'lucide-react';

/* ========================================
   TYPES
======================================== */
type OutcomeType = 'Ongoing' | 'Live Birth' | 'Stillbirth' | 'Miscarriage' | 'Abortion' | 'Ectopic';
type DeliveryMode = 'NVD' | 'LSCS' | 'Instrumental' | 'Vacuum' | 'Forceps' | 'NA';
type Gender = 'Male' | 'Female' | 'Other' | 'NA';
type BabyStatus = 'Living' | 'Deceased' | 'NA';

interface PregnancyRecord {
  id: string;
  outcome: OutcomeType;
  year?: string;
  lmpDate?: string; // For ongoing pregnancy
  gestationWeeks?: number;
  deliveryMode: DeliveryMode;
  birthWeight?: string;
  gender: Gender;
  babyStatus: BabyStatus;
  complications: string[];
  remarks: string;
}

/* ========================================
   MOCK DATA (Simulating existing patient data)
======================================== */
const EXISTING_PATIENT_DATA: PregnancyRecord[] = [
  {
    id: '1',
    outcome: 'Live Birth',
    year: '2019',
    gestationWeeks: 39,
    deliveryMode: 'NVD',
    birthWeight: '3.1 kg',
    gender: 'Female',
    babyStatus: 'Living',
    complications: [],
    remarks: ''
  },
  {
    id: '2',
    outcome: 'Miscarriage',
    year: '2021',
    gestationWeeks: 8,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: 'Spontaneous'
  },
  {
    id: 'current',
    outcome: 'Ongoing',
    lmpDate: '2024-06-15',
    gestationWeeks: undefined,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: ''
  }
];

// Set to empty array to simulate new patient (Setup View)
// const EXISTING_PATIENT_DATA: PregnancyRecord[] = [];

const COMMON_COMPLICATIONS = [
  'Pre-eclampsia', 'Gestational Diabetes', 'PPH', 'Preterm Labor', 'IUGR', 'Placenta Previa'
];

/* ========================================
   HELPER FUNCTIONS
======================================== */
function calculateGA(lmpDate: string): { weeks: number; days: number } {
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
}

function calculateEDD(lmpDate: string): string {
  const lmp = new Date(lmpDate);
  lmp.setDate(lmp.getDate() + 280); // 40 weeks
  return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ========================================
   MAIN COMPONENT
======================================== */
export function ObstetricHistory() {
  const [records, setRecords] = useState<PregnancyRecord[]>([]); // Start empty for Setup View
  const [isAdding, setIsAdding] = useState(false);
  const [addMode, setAddMode] = useState<'current' | 'history' | null>(null);

  // Prototype Helpers
  const loadMockData = () => setRecords(EXISTING_PATIENT_DATA);
  const clearAllData = () => setRecords([]);

  // Form State
  const [formData, setFormData] = useState<Partial<PregnancyRecord>>({
    outcome: 'Live Birth',
    year: '',
    lmpDate: '',
    gestationWeeks: 40,
    deliveryMode: 'NVD',
    birthWeight: '',
    gender: 'Male',
    babyStatus: 'Living',
    complications: [],
    remarks: ''
  });

  /* ========================================
     DERIVED STATE & COMPUTATIONS
  ======================================== */
  const hasData = records.length > 0;
  const currentPregnancy = records.find(r => r.outcome === 'Ongoing');
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');

  // GTPAL Calculation
  const gtpalScore = useMemo(() => {
    const gravida = records.length;
    const term = pastRecords.filter(r => (r.gestationWeeks || 0) >= 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth')).length;
    const preterm = pastRecords.filter(r => {
      const weeks = r.gestationWeeks || 0;
      return weeks >= 20 && weeks < 37 && (r.outcome === 'Live Birth' || r.outcome === 'Stillbirth');
    }).length;
    const abortions = pastRecords.filter(r => {
      const weeks = r.gestationWeeks || 0;
      return weeks < 20 || r.outcome === 'Miscarriage' || r.outcome === 'Abortion' || r.outcome === 'Ectopic';
    }).length;
    const living = pastRecords.filter(r => r.babyStatus === 'Living').length;

    return { g: gravida, t: term, p: preterm, a: abortions, l: living };
  }, [records, pastRecords]);

  // Current Pregnancy GA
  const currentGA = currentPregnancy?.lmpDate ? calculateGA(currentPregnancy.lmpDate) : null;
  const currentEDD = currentPregnancy?.lmpDate ? calculateEDD(currentPregnancy.lmpDate) : null;

  /* ========================================
     HANDLERS
  ======================================== */
  const handleStartSetup = (mode: 'current' | 'history') => {
    setAddMode(mode);
    setIsAdding(true);
    if (mode === 'current') {
      setFormData({ ...formData, outcome: 'Ongoing', lmpDate: '' });
    } else {
      setFormData({ ...formData, outcome: 'Live Birth', year: '', gestationWeeks: 40 });
    }
  };

  const handleSave = () => {
    const newRecord: PregnancyRecord = {
      id: Math.random().toString(36).substr(2, 9),
      outcome: formData.outcome as OutcomeType,
      year: formData.year,
      lmpDate: formData.lmpDate,
      gestationWeeks: formData.gestationWeeks,
      deliveryMode: formData.deliveryMode as DeliveryMode,
      birthWeight: formData.birthWeight,
      gender: formData.gender as Gender,
      babyStatus: formData.babyStatus as BabyStatus,
      complications: formData.complications || [],
      remarks: formData.remarks || ''
    };

    setRecords(prev => [...prev, newRecord].sort((a, b) => {
      if (a.outcome === 'Ongoing') return 1;
      if (b.outcome === 'Ongoing') return -1;
      return parseInt(a.year || '0') - parseInt(b.year || '0');
    }));

    setIsAdding(false);
    setAddMode(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      outcome: 'Live Birth', year: '', lmpDate: '', gestationWeeks: 40, deliveryMode: 'NVD',
      birthWeight: '', gender: 'Male', babyStatus: 'Living', complications: [], remarks: ''
    });
  };

  const toggleComplication = (comp: string) => {
    const current = formData.complications || [];
    setFormData({
      ...formData,
      complications: current.includes(comp) ? current.filter(c => c !== comp) : [...current, comp]
    });
  };

  /* ========================================
     RENDER: SETUP VIEW (No Data)
  ======================================== */
  if (!hasData) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Baby className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Obstetric History</h2>
          <p className="text-sm text-zinc-500 mb-8">No records found. How would you like to start?</p>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => handleStartSetup('current')}
              className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">First Pregnancy (Current)</h3>
                <p className="text-xs text-zinc-500">This is the patient's first pregnancy</p>
              </div>
            </button>

            <button
              onClick={() => handleStartSetup('history')}
              className="group flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all text-left"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <History className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Has Previous Pregnancies</h3>
                <p className="text-xs text-zinc-500">Add past obstetric history first</p>
              </div>
              </button>
          </div>

          {/* PROTOTYPE TOOLBAR */}
          <div className="mt-10 pt-6 border-t border-dashed border-zinc-200">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3">Prototype Tools</p>
            <button
              onClick={loadMockData}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <Database className="w-4 h-4" />
              Load Sample Data (G₃T₁P₁A₁L₁)
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================
     RENDER: DASHBOARD VIEW (Has Data)
  ======================================== */
  return (
    <div className="h-full bg-white flex flex-col relative">
      {/* HEADER: GTPAL Score */}
      <div className="bg-gradient-to-r from-zinc-50 to-white border-b border-zinc-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-semibold text-zinc-500">GTPAL:</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: 'G', value: gtpalScore.g, color: 'bg-blue-100 text-blue-700', title: 'Gravida' },
                { label: 'T', value: gtpalScore.t, color: 'bg-emerald-100 text-emerald-700', title: 'Term (≥37w)' },
                { label: 'P', value: gtpalScore.p, color: 'bg-amber-100 text-amber-700', title: 'Preterm (20-36w)' },
                { label: 'A', value: gtpalScore.a, color: 'bg-rose-100 text-rose-700', title: 'Abortions (<20w)' },
                { label: 'L', value: gtpalScore.l, color: 'bg-indigo-100 text-indigo-700', title: 'Living' },
              ].map(item => (
                <div key={item.label} className={`flex items-center rounded ${item.color}`} title={item.title}>
                  <span className="px-2 py-1 text-xs font-bold">{item.label}</span>
                  <span className="px-1.5 py-1 text-xs font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prototype: Clear Button */}
            <button
              onClick={clearAllData}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-medium rounded hover:bg-zinc-100 transition-colors"
              title="Clear all data (Prototype)"
            >
              <Eraser className="w-3.5 h-3.5" />
              Clear
            </button>

            <button
              onClick={() => {
                setAddMode(currentPregnancy ? 'history' : 'current');
                setIsAdding(true);
                resetForm();
                if (!currentPregnancy) {
                  setFormData(f => ({ ...f, outcome: 'Ongoing' }));
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {currentPregnancy ? 'Add History' : 'Add Current'}
            </button>
          </div>
        </div>
      </div>

      {/* CURRENT PREGNANCY STATUS (if exists) */}
      {currentPregnancy && currentGA && (
        <div className="px-6 py-4 bg-gradient-to-r from-pink-50/50 to-rose-50/50 border-b border-pink-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-pink-100">
                <HeartPulse className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  Current Pregnancy
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-full uppercase">Active</span>
                </h3>
                <p className="text-lg font-black text-pink-600">
                  {currentGA.weeks} Weeks, {currentGA.days} Days
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Expected Delivery</p>
              <p className="text-sm font-bold text-zinc-700">{currentEDD}</p>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 sticky top-0 z-10 text-[11px] uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-100">
            <tr>
              <th className="px-6 py-3 w-16">#</th>
              <th className="px-6 py-3 w-20">Year</th>
              <th className="px-6 py-3">Outcome</th>
              <th className="px-6 py-3">GA / Mode</th>
              <th className="px-6 py-3">Baby</th>
              <th className="px-6 py-3">Complications</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 bg-white">
            {pastRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-400 text-sm">
                  No past pregnancies recorded.
                </td>
              </tr>
            ) : (
              pastRecords.map((record, index) => (
                <tr key={record.id} className="group hover:bg-zinc-50/80 transition-colors text-sm">
                  <td className="px-6 py-3 text-zinc-400 font-medium text-xs">{index + 1}</td>
                  <td className="px-6 py-3 font-semibold text-zinc-700">{record.year}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium
                      ${record.outcome === 'Live Birth' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        record.outcome === 'Stillbirth' ? 'bg-zinc-100 text-zinc-700 border border-zinc-200' :
                        'bg-rose-50 text-rose-700 border border-rose-100'}
                    `}>
                      {record.outcome === 'Live Birth' ? <Baby className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                      {record.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-zinc-600">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{record.gestationWeeks}w</span>
                      {record.deliveryMode !== 'NA' && (
                        <>
                          <span className="text-zinc-300">|</span>
                          <span className={record.deliveryMode === 'LSCS' ? 'text-orange-600 font-medium' : ''}>
                            {record.deliveryMode}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-zinc-600">
                    {(record.outcome === 'Live Birth' || record.outcome === 'Stillbirth') ? (
                      <div className="flex items-center gap-2 text-xs">
                        <span>{record.birthWeight || '--'}</span>
                        <span className="text-zinc-300">|</span>
                        <span className={record.gender === 'Female' ? 'text-pink-500' : record.gender === 'Male' ? 'text-blue-500' : 'text-purple-500'}>
                          {record.gender}
                        </span>
                        {record.babyStatus === 'Living' && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-500" title="Living"></span>}
                      </div>
                    ) : (
                      <span className="text-zinc-300 text-xs">--</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {record.complications.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {record.complications.map(c => (
                          <span key={c} className="text-[10px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-zinc-300 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => handleDelete(record.id)} className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90%]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">
                {addMode === 'current' ? 'Add Current Pregnancy' : 'Add Past Pregnancy'}
              </h3>
              <button onClick={() => { setIsAdding(false); setAddMode(null); }} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* CURRENT PREGNANCY FORM */}
              {addMode === 'current' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1">Last Menstrual Period (LMP)</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      value={formData.lmpDate}
                      onChange={e => setFormData({ ...formData, lmpDate: e.target.value, outcome: 'Ongoing' })}
                      autoFocus
                    />
                  </div>
                  {formData.lmpDate && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Current GA</p>
                          <p className="text-lg font-bold text-blue-700">
                            {calculateGA(formData.lmpDate).weeks}w {calculateGA(formData.lmpDate).days}d
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">EDD</p>
                          <p className="text-lg font-bold text-blue-700">{calculateEDD(formData.lmpDate)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* HISTORY FORM */}
              {addMode === 'history' && (
                <div className="space-y-4">
                  {/* Row 1: Year & Outcome */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">Year</label>
                      <input
                        type="number"
                        placeholder="YYYY"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1">Outcome</label>
                      <select
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        value={formData.outcome}
                        onChange={e => setFormData({ ...formData, outcome: e.target.value as OutcomeType })}
                      >
                        <option>Live Birth</option>
                        <option>Stillbirth</option>
                        <option>Miscarriage</option>
                        <option>Abortion</option>
                        <option>Ectopic</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Gestation Weeks */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-1">Gestation (Weeks at Outcome)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      value={formData.gestationWeeks}
                      onChange={e => setFormData({ ...formData, gestationWeeks: parseInt(e.target.value) })}
                    />
                  </div>

                  {/* Conditional: Delivery Mode (for births) */}
                  {(formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth') && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Delivery Mode</label>
                        <select
                          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                          value={formData.deliveryMode}
                          onChange={e => setFormData({ ...formData, deliveryMode: e.target.value as DeliveryMode })}
                        >
                          <option>NVD</option>
                          <option>LSCS</option>
                          <option>Instrumental</option>
                          <option>Vacuum</option>
                          <option>Forceps</option>
                        </select>
                      </div>

                      {/* Baby Details */}
                      <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 space-y-3">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Baby Details</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Weight</label>
                            <input
                              type="text"
                              placeholder="e.g. 3.2 kg"
                              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm"
                              value={formData.birthWeight}
                              onChange={e => setFormData({ ...formData, birthWeight: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Gender</label>
                            <select
                              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm"
                              value={formData.gender}
                              onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Status</label>
                            <select
                              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm"
                              value={formData.babyStatus}
                              onChange={e => setFormData({ ...formData, babyStatus: e.target.value as BabyStatus })}
                            >
                              <option>Living</option>
                              <option>Deceased</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Complications */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-2">Complications</label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_COMPLICATIONS.map(comp => {
                        const isActive = formData.complications?.includes(comp);
                        return (
                          <button
                            key={comp}
                            type="button"
                            onClick={() => toggleComplication(comp)}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5
                              ${isActive ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'}
                            `}
                          >
                            {isActive && <Check className="w-3 h-3" />}
                            {comp}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-end gap-3 bg-zinc-50">
              <button
                onClick={() => { setIsAdding(false); setAddMode(null); }}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={(addMode === 'current' && !formData.lmpDate) || (addMode === 'history' && !formData.year)}
                className="flex items-center gap-2 px-5 py-2 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
