import { useState } from 'react';
import { Plus, Trash2, X, ClipboardPlus } from 'lucide-react';
import { useAncForm } from './context';
import type { PrescriptionItem } from './store';

/* =============================================================================
 * MEDICINE TIME OPTIONS
 * ============================================================================= */

const MEDICINE_TIME_OPTIONS = [
  'Before Breakfast',
  'After Breakfast',
  'Before Lunch',
  'After Lunch',
  'Before Dinner',
  'After Dinner',
  'Bedtime',
  'SOS (As Needed)',
];

/* =============================================================================
 * ADD PRESCRIPTION MODAL
 * ============================================================================= */

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: PrescriptionItem) => void;
}

function AddPrescriptionModal({ isOpen, onClose, onAdd }: AddPrescriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    medicineTime: '',
    frequency: '',
    duration: '',
    route: '',
    instructions: '',
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    const newItem: PrescriptionItem = {
      id: `rx-${Date.now()}`,
      ...formData,
    };
    onAdd(newItem);
    setFormData({
      name: '',
      dose: '',
      medicineTime: '',
      frequency: '',
      duration: '',
      route: '',
      instructions: '',
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      dose: '',
      medicineTime: '',
      frequency: '',
      duration: '',
      route: '',
      instructions: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 shadow-2xl rounded-sm animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <h3 className="text-[15px] font-bold text-zinc-900">Add Prescription</h3>
          <button 
            onClick={handleCancel}
            className="p-1 hover:bg-zinc-100 rounded-sm transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Prescription Name */}
          <div>
            <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
              Prescription Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter medicine name"
              className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Dose and Medicine Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
                Dose
              </label>
              <input
                type="text"
                value={formData.dose}
                onChange={e => setFormData({ ...formData, dose: e.target.value })}
                placeholder="e.g., 500mg"
                className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
                Medicine Time
              </label>
              <select
                value={formData.medicineTime}
                onChange={e => setFormData({ ...formData, medicineTime: e.target.value })}
                className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                <option value="">Select Medicine Time</option>
                {MEDICINE_TIME_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frequency and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
                Frequency
              </label>
              <input
                type="text"
                value={formData.frequency}
                onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                placeholder="e.g., 0-1-1-0"
                className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 7 days"
                className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
          </div>

          {/* Route */}
          <div>
            <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
              Route
            </label>
            <input
              type="text"
              value={formData.route}
              onChange={e => setFormData({ ...formData, route: e.target.value })}
              placeholder="e.g., Oral"
              className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-[12px] font-semibold text-zinc-700 mb-1.5">
              Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={e => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Enter special instructions"
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-sm text-[13px] text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-zinc-100 bg-zinc-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-[12px] font-semibold text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 rounded-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-[12px] font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
          >
            <ClipboardPlus className="w-4 h-4" />
            Add Prescription
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * PRESCRIPTIONS TABLE
 * ============================================================================= */

function PrescriptionsTable({ items, onRemove }: { items: PrescriptionItem[]; onRemove: (id: string) => void }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400">
        <p className="text-[13px]">
          No prescriptions added yet. Click 'Add Prescription' to create a new entry.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody>
          {items.map((item, index) => (
            <tr 
              key={item.id} 
              className={`border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
              }`}
            >
              <td className="px-4 py-3">
                <div className="text-[12px] font-semibold text-zinc-800">{item.name}</div>
                {item.route && <div className="text-[10px] text-zinc-400">{item.route}</div>}
              </td>
              <td className="px-4 py-3 text-[12px] text-zinc-600">{item.dose || '-'}</td>
              <td className="px-4 py-3 text-[12px] text-zinc-600">{item.frequency || '-'}</td>
              <td className="px-4 py-3 text-[12px] text-zinc-600">{item.duration || '-'}</td>
              <td className="px-4 py-3 text-[12px] text-zinc-600 max-w-[200px] truncate">{item.instructions || '-'}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                  title="Remove prescription"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =============================================================================
 * PRESCRIPTIONS TAB
 * ============================================================================= */

export function PrescriptionsTab() {
  const { form, addPrescription, removePrescription } = useAncForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Prescriptions Card */}
      <div className="bg-white border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
          <h3 className="text-[11px] font-bold text-zinc-700 uppercase tracking-wide">
            Prescriptions
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors rounded-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Prescription
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 px-4 py-2.5 bg-zinc-100/50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
          <div>Prescription Name</div>
          <div>Dose</div>
          <div>Frequency</div>
          <div>Duration</div>
          <div>Instructions</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Table Content */}
        <PrescriptionsTable 
          items={form.prescriptions.items} 
          onRemove={removePrescription} 
        />
      </div>

      {/* Add Prescription Modal */}
      <AddPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPrescription}
      />
    </div>
  );
}

export default PrescriptionsTab;
