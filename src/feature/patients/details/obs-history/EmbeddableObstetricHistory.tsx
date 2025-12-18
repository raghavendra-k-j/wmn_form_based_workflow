import {
  Baby,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  HeartPulse,
  Plus,
  Save,
  Trash2,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type BabyStatus,
  calculateEDD,
  calculateGA,
  calculateGTPAL,
  COMMON_COMPLICATIONS,
  type DeliveryMode,
  type Gender,
  GTPALBar,
  MOCK_PREGNANCY_DATA,
  type OutcomeType,
  PregnancyOutcomeBadge,
  type PregnancyRecord
} from './ObstetricCommon';

/* ============================================================================
 * PROPS
 * ============================================================================ */
interface EmbeddableObstetricHistoryProps {
  /** Whether the component is collapsed by default */
  defaultCollapsed?: boolean;
  /** Custom class name */
  className?: string;
  /** Link to full obstetric history page for deep linking */
  obstetricHistoryPath?: string;
}

/* ============================================================================
 * MAIN EMBEDDABLE COMPONENT
 * ============================================================================ */
export function EmbeddableObstetricHistory({
  defaultCollapsed = true,
  className = '',
  obstetricHistoryPath = '../obstetric-history',
}: EmbeddableObstetricHistoryProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
  const [records, setRecords] = useState<PregnancyRecord[]>(MOCK_PREGNANCY_DATA);
  const [modalType, setModalType] = useState<'current' | 'previous' | null>(null);

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
     DERIVED STATE
  ======================================== */
  const currentPregnancy = records.find(r => r.outcome === 'Ongoing');
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');
  const gtpalScore = useMemo(() => calculateGTPAL(records), [records]);
  const currentGA = currentPregnancy?.lmpDate ? calculateGA(currentPregnancy.lmpDate) : null;
  const currentEDD = currentPregnancy?.lmpDate ? calculateEDD(currentPregnancy.lmpDate) : null;

  /* ========================================
     HANDLERS
  ======================================== */
  const openModal = (type: 'current' | 'previous') => {
    setModalType(type);
    if (type === 'current') {
      setFormData({ outcome: 'Ongoing', lmpDate: '' });
    } else {
      setFormData({ outcome: 'Live Birth', year: '', gestationWeeks: 40, deliveryMode: 'NVD', birthWeight: '', gender: 'Male', babyStatus: 'Living', complications: [], remarks: '' });
    }
  };

  const closeModal = () => setModalType(null);

  const handleSave = () => {
    const newRecord: PregnancyRecord = {
      id: Math.random().toString(36).substr(2, 9),
      outcome: modalType === 'current' ? 'Ongoing' : formData.outcome as OutcomeType,
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

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const toggleComplication = (comp: string) => {
    const current = formData.complications || [];
    setFormData({
      ...formData,
      complications: current.includes(comp) ? current.filter(c => c !== comp) : [...current, comp]
    });
  };

  return (
    <div className={`bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden mb-4 ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-zinc-50/50 border-b border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center border border-pink-200">
            <Baby className="w-4 h-4 text-pink-600" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm">Obstetric History</h3>
        </div>
        
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <GTPALBar score={gtpalScore} />
          <div className="w-px h-6 bg-zinc-200" />
          <button 
             onClick={() => navigate(obstetricHistoryPath)}
             className="p-1.5 text-zinc-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
             title="Open full page editor"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-1 text-zinc-400 hover:text-zinc-600 rounded transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          
          {/* Active Pregnancy Section (if exists) */}
          {currentPregnancy && currentGA && (
            <div className="px-4 py-4 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
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
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">EDD</p>
                    <p className="text-sm font-bold text-zinc-700">{currentEDD}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(currentPregnancy.id)}
                    className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                    title="Remove Current Pregnancy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="px-4 py-2 bg-zinc-50 border-b border-zinc-100 flex items-center justify-end gap-2">
            {!currentPregnancy && (
              <button 
                onClick={() => openModal('current')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 text-white text-xs font-medium rounded hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Current Pregnancy
              </button>
            )}
            <button 
              onClick={() => openModal('previous')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Previous Pregnancy
            </button>
          </div>

          {/* History Table (same as ObstetricHistoryV2) */}
          <div className="max-h-[300px] overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50 sticky top-0 z-10 text-[11px] uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-100">
                <tr>
                  <th className="px-4 py-2 w-12">#</th>
                  <th className="px-4 py-2 w-16">Year</th>
                  <th className="px-4 py-2">Outcome</th>
                  <th className="px-4 py-2">GA / Mode</th>
                  <th className="px-4 py-2">Baby</th>
                  <th className="px-4 py-2">Complications</th>
                  <th className="px-4 py-2 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 bg-white">
                {pastRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center">
                      <div className="flex flex-col items-center text-zinc-400">
                        <Baby className="w-8 h-8 text-zinc-200 mb-2" />
                        <p className="text-xs font-medium text-zinc-500">No previous pregnancies recorded</p>
                        <p className="text-[10px]">Click "Previous Pregnancy" to add history</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pastRecords.map((record, index) => (
                    <tr key={record.id} className="group hover:bg-zinc-50/80 transition-colors text-sm">
                      <td className="px-4 py-2 text-zinc-400 font-medium text-xs">{index + 1}</td>
                      <td className="px-4 py-2 font-semibold text-zinc-700">{record.year}</td>
                      <td className="px-4 py-2">
                        <PregnancyOutcomeBadge outcome={record.outcome} />
                      </td>
                      <td className="px-4 py-2 text-zinc-600">
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
                      <td className="px-4 py-2 text-zinc-600">
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
                      <td className="px-4 py-2">
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
                      <td className="px-4 py-2 text-right">
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
          
          <div className="px-4 py-2 border-t border-zinc-100 bg-zinc-50/50 flex justify-center">
             <button 
                onClick={() => navigate(obstetricHistoryPath)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-pink-600 transition-colors uppercase tracking-widest"
             >
                View detailed history log <ChevronRight className="w-3 h-3" />
             </button>
          </div>
        </div>
      )}


      {/* ===== SHARED ADD MODAL (same as full page but optimized for embed context) ===== */}
      {modalType && (
        <div className="fixed inset-0 z-[200] bg-zinc-950/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h3 className="text-base font-black text-zinc-900 flex items-center gap-2">
                {modalType === 'current' ? (
                  <><HeartPulse className="w-5 h-5 text-pink-500" /> New Pregnancy Intake</>
                ) : (
                  <><Baby className="w-5 h-5 text-zinc-700" /> Historical Pregnancy Record</>
                )}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-zinc-200 text-zinc-400 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {modalType === 'current' ? (
                <div className="space-y-4">
                   <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 mb-6">
                      <p className="text-xs text-pink-800 font-medium mb-1">Enter the Last Menstrual Period date to automatically calculate GA and EDD.</p>
                   </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">LMP Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all"
                      value={formData.lmpDate}
                      onChange={e => setFormData({ ...formData, lmpDate: e.target.value })}
                    />
                  </div>
                  {formData.lmpDate && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-white border-2 border-pink-100 rounded-2xl shadow-sm">
                       <div className="space-y-0.5">
                          <p className="text-[10px] uppercase tracking-widest text-pink-400 font-black">Calculated GA</p>
                          <p className="text-xl font-black text-pink-700">{calculateGA(formData.lmpDate).weeks}w {calculateGA(formData.lmpDate).days}d</p>
                       </div>
                       <div className="space-y-0.5 border-l border-pink-50 pl-4">
                          <p className="text-[10px] uppercase tracking-widest text-pink-400 font-black">Predicted EDD</p>
                          <p className="text-xl font-black text-zinc-800 leading-tight">{calculateEDD(formData.lmpDate)}</p>
                       </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Reporting Year</label>
                      <input
                        type="number"
                        placeholder="YYYY"
                        className="w-full px-4 py-2.5 bg-zinc-50 border-2 border-zinc-100 rounded-xl text-sm font-bold focus:border-indigo-400 transition-all"
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Clinical Outcome</label>
                      <select
                        className="w-full px-4 py-2.5 bg-zinc-50 border-2 border-zinc-100 rounded-xl text-sm font-bold appearance-none"
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

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Gestation Duration (Weeks)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-zinc-50 border-2 border-zinc-100 rounded-xl text-sm font-bold"
                      value={formData.gestationWeeks}
                      onChange={e => setFormData({ ...formData, gestationWeeks: parseInt(e.target.value) })}
                    />
                  </div>

                  {(formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth') && (
                    <div className="bg-zinc-50 p-4 rounded-2xl border-2 border-zinc-100 space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Method of Delivery</label>
                          <select
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-bold"
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
                        <div className="grid grid-cols-3 gap-3">
                           <div>
                              <p className="text-[9px] font-black text-zinc-400 uppercase mb-1 ml-1">Weight</p>
                              <input type="text" className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold" placeholder="3.2kg" value={formData.birthWeight} onChange={e => setFormData({...formData, birthWeight: e.target.value})} />
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-zinc-400 uppercase mb-1 ml-1">Gender</p>
                              <select className="w-full px-2 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})}>
                                 <option>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-zinc-400 uppercase mb-1 ml-1">Status</p>
                              <select className="w-full px-2 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-bold" value={formData.babyStatus} onChange={e => setFormData({...formData, babyStatus: e.target.value as BabyStatus})}>
                                 <option>Living</option>
                                 <option>Deceased</option>
                              </select>
                           </div>
                        </div>
                    </div>
                  )}

                  <div>
                     <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">Associated Complications</label>
                     <div className="flex flex-wrap gap-2">
                        {COMMON_COMPLICATIONS.map(comp => {
                           const active = formData.complications?.includes(comp);
                           return (
                              <button key={comp} onClick={() => toggleComplication(comp)} className={`px-3 py-1.5 rounded-xl text-[10px] font-black border-2 transition-all ${active ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200'}`}>
                                 {comp}
                              </button>
                           );
                        })}
                     </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-5 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 text-xs font-black text-zinc-400 hover:text-zinc-600 uppercase tracking-widest">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={(modalType === 'current' && !formData.lmpDate) || (modalType === 'previous' && !formData.year)}
                className="flex items-center gap-2 px-8 py-2.5 bg-zinc-900 text-white text-xs font-black rounded-xl hover:bg-zinc-800 disabled:opacity-30 transition-all shadow-lg shadow-zinc-200 uppercase tracking-widest"
              >
                <Save className="w-4 h-4" />
                Commit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmbeddableObstetricHistory;
