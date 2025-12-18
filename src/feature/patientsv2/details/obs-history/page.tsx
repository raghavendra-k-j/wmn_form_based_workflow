import { useState, useMemo } from 'react';
import { Plus, X, Trash2, Baby, Edit2 } from 'lucide-react';
import { ObstetricHistoryProvider, useObstetricHistory } from './context';
import {
  type PregnancyRecord,
  type OutcomeType,
  type DeliveryMode,
  type GTPALScore,
  calculateGA,
  calculateEDD,
  calculateGTPAL,
} from './store';
import { CurrentPregnancyCard } from './shared';

/* =============================================================================
 * OUTCOME OPTIONS - Quick selection chips
 * ============================================================================= */

const OUTCOME_OPTIONS: { value: OutcomeType; label: string; color: string }[] = [
  { value: 'Live Birth', label: 'Delivered', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { value: 'Miscarriage', label: 'Miscarriage', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
  { value: 'Abortion', label: 'Abortion', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { value: 'Stillbirth', label: 'Stillbirth', color: 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200' },
  { value: 'Ectopic', label: 'Ectopic', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
];

/* =============================================================================
 * EDITABLE GTPAL BAR
 * ============================================================================= */

interface EditableGTPALBarProps {
  autoScore: GTPALScore;
  manualScore: GTPALScore | null;
  onManualChange: (score: GTPALScore | null) => void;
}

function EditableGTPALBar({ autoScore, manualScore, onManualChange }: EditableGTPALBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<GTPALScore>(manualScore || autoScore);
  
  const isManualMode = manualScore !== null;
  const displayScore = isManualMode ? manualScore : autoScore;

  const handleEdit = () => {
    setEditValues(displayScore);
    setIsEditing(true);
  };

  const handleSave = () => {
    onManualChange(editValues);
    setIsEditing(false);
  };

  const handleReset = () => {
    onManualChange(null);
    setIsEditing(false);
  };

  const items = [
    { key: 'g' as const, label: 'G', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200', title: 'Gravida' },
    { key: 't' as const, label: 'T', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200', title: 'Term (≥37w)' },
    { key: 'p' as const, label: 'P', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200', title: 'Preterm (20-36w)' },
    { key: 'a' as const, label: 'A', bgColor: 'bg-rose-50', textColor: 'text-rose-700', borderColor: 'border-rose-200', title: 'Abortions (<20w)' },
    { key: 'l' as const, label: 'L', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200', title: 'Living' },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">GTPAL</span>
        
        {isEditing ? (
          /* Edit Mode - Larger inputs */
          <div className="flex items-center gap-2">
            {items.map(item => (
              <div 
                key={item.key} 
                className={`flex items-center border ${item.borderColor} ${item.bgColor}`}
              >
                <span className={`px-2 py-1 text-[11px] font-bold ${item.textColor} border-r ${item.borderColor}`}>
                  {item.label}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  className={`w-12 px-2 py-1 text-[13px] font-black ${item.textColor} bg-white text-center focus:outline-none focus:ring-1 focus:ring-blue-300`}
                  value={editValues[item.key]}
                  onChange={e => setEditValues({ ...editValues, [item.key]: parseInt(e.target.value) || 0 })}
                />
              </div>
            ))}
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors ml-2"
              title="Save"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 text-[11px] font-bold transition-colors"
              title="Cancel"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* Display Mode */
          <div className="flex items-center gap-1.5">
            {items.map(item => (
              <div 
                key={item.key} 
                className={`flex items-center border ${item.borderColor} ${item.bgColor}`} 
                title={item.title}
              >
                <span className={`px-1.5 py-0.5 text-[10px] font-bold ${item.textColor} border-r ${item.borderColor}`}>
                  {item.label}
                </span>
                <span className={`px-1.5 py-0.5 text-[11px] font-black ${item.textColor}`}>
                  {displayScore[item.key]}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Mode indicator */}
        {isManualMode && !isEditing && (
          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold uppercase border border-amber-200">
            Manual
          </span>
        )}
      </div>

      {/* Edit/Reset buttons */}
      {!isEditing && (
        <div className="flex items-center gap-1">
          <button
            onClick={handleEdit}
            className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            title="Edit GTPAL manually"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          {isManualMode && (
            <button
              onClick={handleReset}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 px-1.5 py-0.5 hover:bg-blue-50 transition-colors"
              title="Reset to auto-calculated"
            >
              Auto
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* =============================================================================
 * MAIN PAGE CONTENT
 * ============================================================================= */

function ObstetricHistoryContent() {
  const { records, addRecord, deleteRecord, updateRecord } = useObstetricHistory();
  const [showModal, setShowModal] = useState<'current' | 'previous' | 'complete' | null>(null);
  const [manualGTPAL, setManualGTPAL] = useState<GTPALScore | null>(null);
  const [completeOutcome, setCompleteOutcome] = useState<OutcomeType>('Live Birth');

  // Derived state
  const currentPregnancy = records.find(r => r.outcome === 'Ongoing');
  const pastRecords = records.filter(r => r.outcome !== 'Ongoing');
  const hasCurrentPregnancy = !!currentPregnancy;

  const currentGA = currentPregnancy?.lmpDate ? calculateGA(currentPregnancy.lmpDate) : null;
  const currentEDD = currentPregnancy?.lmpDate ? calculateEDD(currentPregnancy.lmpDate) : null;

  const autoGTPAL = useMemo(() => calculateGTPAL(records), [records]);

  const handleDelete = (id: string) => {
    if (confirm('Delete this pregnancy record?')) {
      deleteRecord(id);
    }
  };

  // Handle marking current pregnancy - opens form with pre-filled data
  const handleMarkOutcome = (outcome: 'Delivered' | 'Miscarriage' | 'Abortion') => {
    const outcomeMap: Record<string, OutcomeType> = {
      'Delivered': 'Live Birth',
      'Miscarriage': 'Miscarriage',
      'Abortion': 'Abortion',
    };
    setCompleteOutcome(outcomeMap[outcome]);
    setShowModal('complete');
  };

  // Get outcome badge style
  const getOutcomeStyle = (outcome: OutcomeType) => {
    const option = OUTCOME_OPTIONS.find(o => o.value === outcome);
    return option?.color || 'bg-zinc-50 text-zinc-600 border-zinc-200';
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header - Two buttons: Current and Previous */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200 sticky top-0 z-10">
        <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
          Obstetric History
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal('current')}
            disabled={hasCurrentPregnancy}
            className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold transition-colors ${
              hasCurrentPregnancy
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            }`}
          >
            <Plus className="w-3 h-3" />
            Current Pregnancy
          </button>
          <button
            onClick={() => setShowModal('previous')}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Previous Pregnancy
          </button>
        </div>
      </div>

      {/* Editable GTPAL Score Bar */}
      <div className="px-4 py-2 bg-white border-b border-zinc-200">
        <EditableGTPALBar
          autoScore={autoGTPAL}
          manualScore={manualGTPAL}
          onManualChange={setManualGTPAL}
        />
      </div>

      {/* Current Pregnancy Card */}
      {currentPregnancy && currentGA && currentEDD && (
        <div className="px-4 pt-4">
          <CurrentPregnancyCard
            gaWeeks={currentGA.weeks}
            gaDays={currentGA.days}
            edd={currentEDD}
            lmpDate={currentPregnancy.lmpDate || ''}
            onDelete={() => handleDelete(currentPregnancy.id)}
            onMarkOutcome={handleMarkOutcome}
          />
        </div>
      )}

      {/* Past Pregnancy Table */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-zinc-200">
          {/* Table Header */}
          <table className="w-full">
            <thead className="bg-zinc-100 border-b border-zinc-200">
              <tr className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <th className="px-3 py-2 text-left w-12">#</th>
                <th className="px-3 py-2 text-left w-20">Year</th>
                <th className="px-3 py-2 text-left w-28">Outcome</th>
                <th className="px-3 py-2 text-left">Antenatal</th>
                <th className="px-3 py-2 text-left w-28">Mode</th>
                <th className="px-3 py-2 text-left w-16">Wt</th>
                <th className="px-3 py-2 text-left w-16">Sex</th>
                <th className="px-3 py-2 text-left">Remarks</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {pastRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-zinc-100 rounded-sm flex items-center justify-center mb-3">
                        <Baby className="w-6 h-6 text-zinc-300" />
                      </div>
                      <p className="text-[12px] font-medium text-zinc-500 mb-1">No previous pregnancies</p>
                      <p className="text-[11px] text-zinc-400">Click "Previous Pregnancy" to add history</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pastRecords.map((record, index) => (
                  <tr key={record.id} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-3 py-2 text-[11px] text-zinc-400 font-medium">{index + 1}</td>
                    <td className="px-3 py-2 text-[12px] font-bold text-zinc-700">{record.year || '--'}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold border ${getOutcomeStyle(record.outcome)}`}>
                        {record.outcome}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-zinc-600">
                      {record.complications.length > 0 ? record.complications.join(', ') : '--'}
                    </td>
                    <td className="px-3 py-2 text-[11px] text-zinc-600">
                      {record.deliveryMode !== 'NA' ? record.deliveryMode : '--'}
                    </td>
                    <td className="px-3 py-2 text-[11px] text-zinc-600">{record.birthWeight || '--'}</td>
                    <td className="px-3 py-2 text-[11px]">
                      <span className={record.gender === 'Female' ? 'text-pink-600' : record.gender === 'Male' ? 'text-blue-600' : 'text-zinc-400'}>
                        {record.gender !== 'NA' ? record.gender : '--'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-zinc-600">{record.remarks || '--'}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-1 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Current Pregnancy Modal */}
      {showModal === 'current' && (
        <AddCurrentPregnancyModal
          onClose={() => setShowModal(null)}
          onSave={(record) => {
            addRecord(record);
            setShowModal(null);
          }}
        />
      )}

      {/* Add Previous Pregnancy Modal */}
      {showModal === 'previous' && (
        <AddPreviousPregnancyModal
          onClose={() => setShowModal(null)}
          onSave={(record) => {
            addRecord(record);
            setShowModal(null);
          }}
        />
      )}

      {/* Complete Current Pregnancy Modal - Pre-filled form */}
      {showModal === 'complete' && currentPregnancy && currentGA && (
        <CompletePregnancyModal
          currentPregnancy={currentPregnancy}
          currentGA={currentGA}
          initialOutcome={completeOutcome}
          onClose={() => setShowModal(null)}
          onSave={(record) => {
            updateRecord(record);
            setShowModal(null);
          }}
        />
      )}
    </div>
  );
}

/* =============================================================================
 * ADD CURRENT PREGNANCY MODAL
 * ============================================================================= */

interface ModalProps {
  onClose: () => void;
  onSave: (record: PregnancyRecord) => void;
}

function AddCurrentPregnancyModal({ onClose, onSave }: ModalProps) {
  const [lmpDate, setLmpDate] = useState('');

  const handleSave = () => {
    const record: PregnancyRecord = {
      id: `preg-${Date.now()}`,
      outcome: 'Ongoing',
      lmpDate: lmpDate,
      deliveryMode: 'NA',
      gender: 'NA',
      babyStatus: 'NA',
      complications: [],
      remarks: '',
    };
    onSave(record);
  };

  const ga = lmpDate ? calculateGA(lmpDate) : null;
  const edd = lmpDate ? calculateEDD(lmpDate) : null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md overflow-hidden flex flex-col border border-zinc-300">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-pink-50">
          <h3 className="text-[13px] font-bold text-pink-900 uppercase tracking-tight">
            Add Current Pregnancy
          </h3>
          <button onClick={onClose} className="text-pink-400 hover:text-pink-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Last Menstrual Period (LMP) *
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-pink-400"
              value={lmpDate}
              onChange={e => setLmpDate(e.target.value)}
              autoFocus
            />
          </div>

          {/* GA and EDD Display */}
          {lmpDate && ga && edd && (
            <div className="p-4 bg-pink-50 border border-pink-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-pink-400 font-bold">Current GA</p>
                  <p className="text-[18px] font-black text-pink-700">
                    {ga.weeks}w {ga.days}d
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-pink-400 font-bold">EDD</p>
                  <p className="text-[18px] font-black text-pink-700">{edd}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-end gap-3 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[11px] font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!lmpDate}
            className="px-4 py-1.5 bg-pink-600 text-white text-[11px] font-bold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * ADD PREVIOUS PREGNANCY MODAL - With Outcome Selection
 * ============================================================================= */

function AddPreviousPregnancyModal({ onClose, onSave }: ModalProps) {
  const [formData, setFormData] = useState({
    year: '',
    outcome: 'Live Birth' as OutcomeType,
    antenatal: '',
    deliveryMode: 'NVD' as DeliveryMode,
    weight: '',
    sex: 'NA' as 'Male' | 'Female' | 'NA',
    remarks: '',
  });

  const handleSave = () => {
    const record: PregnancyRecord = {
      id: `preg-${Date.now()}`,
      outcome: formData.outcome,
      year: formData.year,
      gestationWeeks: formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth' ? 40 : 
                      formData.outcome === 'Miscarriage' ? 10 : 8,
      deliveryMode: formData.deliveryMode,
      birthWeight: formData.weight,
      gender: formData.sex,
      babyStatus: formData.outcome === 'Live Birth' ? 'Living' : 'NA',
      complications: formData.antenatal ? [formData.antenatal] : [],
      remarks: formData.remarks,
    };
    onSave(record);
  };

  // Show delivery details only for Live Birth / Stillbirth
  const showDeliveryDetails = formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth';

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md overflow-hidden flex flex-col border border-zinc-300 max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
            Add Previous Pregnancy
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Year */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Year *
            </label>
            <input
              type="number"
              placeholder="YYYY"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              autoFocus
            />
          </div>

          {/* Outcome Selection - Chips */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-2">
              Outcome *
            </label>
            <div className="flex flex-wrap gap-2">
              {OUTCOME_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, outcome: option.value })}
                  className={`px-3 py-1.5 text-[11px] font-bold border transition-colors ${
                    formData.outcome === option.value
                      ? option.color + ' ring-2 ring-offset-1 ring-zinc-400'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Antenatal */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Antenatal
            </label>
            <textarea
              rows={2}
              placeholder="Complications during pregnancy"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400 resize-none"
              value={formData.antenatal}
              onChange={e => setFormData({ ...formData, antenatal: e.target.value })}
            />
          </div>

          {/* Delivery Details - Only for Live Birth / Stillbirth */}
          {showDeliveryDetails && (
            <>
              {/* Mode of Delivery */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                  Mode of Delivery
                </label>
                <select
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                  value={formData.deliveryMode}
                  onChange={e => setFormData({ ...formData, deliveryMode: e.target.value as DeliveryMode })}
                >
                  <option value="NVD">NVD</option>
                  <option value="LSCS">LSCS</option>
                  <option value="Instrumental">Instrumental</option>
                  <option value="Vacuum">Vacuum</option>
                  <option value="Forceps">Forceps</option>
                </select>
              </div>

              {/* Weight and Sex */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3.2 kg"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                    Sex
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                    value={formData.sex}
                    onChange={e => setFormData({ ...formData, sex: e.target.value as 'Male' | 'Female' | 'NA' })}
                  >
                    <option value="NA">--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Remarks */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Remarks
            </label>
            <textarea
              rows={2}
              placeholder="Additional notes"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400 resize-none"
              value={formData.remarks}
              onChange={e => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-end gap-3 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[11px] font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.year}
            className="px-4 py-1.5 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * COMPLETE PREGNANCY MODAL - Pre-filled form for marking current pregnancy outcome
 * ============================================================================= */

interface CompletePregnancyModalProps {
  currentPregnancy: PregnancyRecord;
  currentGA: { weeks: number; days: number };
  initialOutcome: OutcomeType;
  onClose: () => void;
  onSave: (record: PregnancyRecord) => void;
}

function CompletePregnancyModal({ 
  currentPregnancy, 
  currentGA, 
  initialOutcome, 
  onClose, 
  onSave 
}: CompletePregnancyModalProps) {
  const [formData, setFormData] = useState({
    outcome: initialOutcome,
    antenatal: '',
    deliveryMode: 'NVD' as DeliveryMode,
    weight: '',
    sex: 'NA' as 'Male' | 'Female' | 'NA',
    remarks: '',
  });

  const handleSave = () => {
    const record: PregnancyRecord = {
      ...currentPregnancy,
      outcome: formData.outcome,
      year: new Date().getFullYear().toString(),
      gestationWeeks: currentGA.weeks,
      deliveryMode: formData.deliveryMode,
      birthWeight: formData.weight,
      gender: formData.sex,
      babyStatus: formData.outcome === 'Live Birth' ? 'Living' : 'NA',
      complications: formData.antenatal ? [formData.antenatal] : [],
      remarks: formData.remarks,
    };
    onSave(record);
  };

  // Show delivery details only for Live Birth / Stillbirth
  const showDeliveryDetails = formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth';

  // Get header color based on outcome
  const getHeaderStyle = () => {
    switch (formData.outcome) {
      case 'Live Birth': return 'bg-emerald-50 text-emerald-900';
      case 'Miscarriage': return 'bg-rose-50 text-rose-900';
      case 'Abortion': return 'bg-amber-50 text-amber-900';
      default: return 'bg-zinc-50 text-zinc-900';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md overflow-hidden flex flex-col border border-zinc-300 max-h-[90vh]">
        {/* Header */}
        <div className={`px-4 py-3 border-b border-zinc-200 flex items-center justify-between ${getHeaderStyle()}`}>
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-tight">
              Complete Pregnancy
            </h3>
            <p className="text-[11px] opacity-75">GA: {currentGA.weeks}w {currentGA.days}d</p>
          </div>
          <button onClick={onClose} className="opacity-50 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Outcome Selection */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-2">
              Outcome
            </label>
            <div className="flex flex-wrap gap-2">
              {OUTCOME_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, outcome: option.value })}
                  className={`px-3 py-1.5 text-[11px] font-bold border transition-colors ${
                    formData.outcome === option.value
                      ? option.color + ' ring-2 ring-offset-1 ring-zinc-400'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Antenatal */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Antenatal Complications
            </label>
            <textarea
              rows={2}
              placeholder="Complications during pregnancy"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400 resize-none"
              value={formData.antenatal}
              onChange={e => setFormData({ ...formData, antenatal: e.target.value })}
            />
          </div>

          {/* Delivery Details - Only for Live Birth / Stillbirth */}
          {showDeliveryDetails && (
            <>
              {/* Mode of Delivery */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                  Mode of Delivery
                </label>
                <select
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                  value={formData.deliveryMode}
                  onChange={e => setFormData({ ...formData, deliveryMode: e.target.value as DeliveryMode })}
                >
                  <option value="NVD">NVD</option>
                  <option value="LSCS">LSCS</option>
                  <option value="Instrumental">Instrumental</option>
                  <option value="Vacuum">Vacuum</option>
                  <option value="Forceps">Forceps</option>
                </select>
              </div>

              {/* Weight and Sex */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                    Birth Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3.2 kg"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                    Sex
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
                    value={formData.sex}
                    onChange={e => setFormData({ ...formData, sex: e.target.value as 'Male' | 'Female' | 'NA' })}
                  >
                    <option value="NA">--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Remarks */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Remarks
            </label>
            <textarea
              rows={2}
              placeholder="Additional notes"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400 resize-none"
              value={formData.remarks}
              onChange={e => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-end gap-3 bg-zinc-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[11px] font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * MAIN EXPORT
 * ============================================================================= */

export function ObstetricHistoryPage() {
  return (
    <ObstetricHistoryProvider>
      <ObstetricHistoryContent />
    </ObstetricHistoryProvider>
  );
}

export default ObstetricHistoryPage;

