import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Plus, X, Baby, Copy, XCircle } from 'lucide-react';
import { usePreviousPregnanciesStore } from './context';
import { GTPALBar, PregnancyRow, EmptyState } from '../shared/components';
import { OUTCOME_OPTIONS, DELIVERY_MODE_OPTIONS, GENDER_OPTIONS } from '../shared/types';
import type { PregnancyRecord, OutcomeType, DeliveryMode, Gender } from '../shared/types';

/* =============================================================================
 * PREVIOUS VISIT BANNER - Copy from previous visit
 * ============================================================================= */

const PreviousVisitBanner = observer(() => {
  const store = usePreviousPregnanciesStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Copy className="w-4 h-4 text-blue-600" />
          <span className="text-[12px] font-medium text-blue-800">
            Previous Visit ({store.previousVisitDate}) has {store.previousVisitData.length} pregnancy records
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => store.copyFromPreviousVisit()}
            className="px-3 py-1 bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Copy All
          </button>
          <button
            onClick={() => store.ignorePreviousVisit()}
            className="p-1 text-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
 * ADD PREVIOUS PREGNANCY MODAL
 * ============================================================================= */

interface AddPregnancyModalProps {
  onClose: () => void;
  onSave: (record: PregnancyRecord) => void;
}

function AddPregnancyModal({ onClose, onSave }: AddPregnancyModalProps) {
  const [formData, setFormData] = useState({
    year: '',
    outcome: 'Live Birth' as OutcomeType,
    antenatal: '',
    deliveryMode: 'NVD' as DeliveryMode,
    gestationWeeks: '',
    weight: '',
    sex: 'NA' as Gender,
    remarks: '',
  });

  const handleSave = () => {
    const record: PregnancyRecord = {
      id: `preg-${Date.now()}`,
      outcome: formData.outcome,
      year: formData.year,
      gestationWeeks: formData.gestationWeeks ? parseInt(formData.gestationWeeks) : 
                      formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth' ? 40 : 
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

  const showDeliveryDetails = formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth';

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md overflow-hidden flex flex-col border border-zinc-300 max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h3 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
            Add Previous Pregnancy
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
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

          {/* Outcome Selection */}
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
                  className={`px-3 py-1.5 text-[11px] font-bold border transition-colors cursor-pointer ${
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

          {/* Gestation Weeks */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
              Gestation (Weeks)
            </label>
            <input
              type="number"
              placeholder="e.g., 38"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
              value={formData.gestationWeeks}
              onChange={e => setFormData({ ...formData, gestationWeeks: e.target.value })}
            />
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
                  {DELIVERY_MODE_OPTIONS.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
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
                    onChange={e => setFormData({ ...formData, sex: e.target.value as Gender })}
                  >
                    <option value="NA">--</option>
                    {GENDER_OPTIONS.filter(g => g !== 'NA').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
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
            className="px-4 py-1.5 text-[11px] font-bold text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.year}
            className="px-4 py-1.5 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * PREVIOUS PREGNANCIES TABLE
 * ============================================================================= */

export const PreviousPregnanciesTable = observer(() => {
  const store = usePreviousPregnanciesStore();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Delete this pregnancy record?')) {
      store.removeRecord(id);
    }
  };

  const handleAddRecord = (record: PregnancyRecord) => {
    store.addRecord(record);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200">
        <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
          Previous Pregnancies
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Add Pregnancy
        </button>
      </div>

      {/* GTPAL Score */}
      <div className="px-4 py-2 bg-white border-b border-zinc-200">
        <GTPALBar score={store.effectiveGTPAL} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-zinc-50">
        {/* Previous Visit Banner */}
        <PreviousVisitBanner />

        {/* Table */}
        <div className="bg-white border border-zinc-200">
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
              {store.records.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8">
                    <EmptyState 
                      message="No previous pregnancies"
                      subMessage="Click 'Add Pregnancy' to add obstetric history"
                    />
                  </td>
                </tr>
              ) : (
                store.filteredRecords.map((record, index) => (
                  <PregnancyRow
                    key={record.id}
                    record={record}
                    index={index}
                    onDelete={() => handleDelete(record.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddPregnancyModal
          onClose={() => setShowModal(false)}
          onSave={handleAddRecord}
        />
      )}
    </div>
  );
});
