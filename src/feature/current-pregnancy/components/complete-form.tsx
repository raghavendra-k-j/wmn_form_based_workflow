import { useState } from 'react';
import { type OutcomeType, type DeliveryMode } from '../store';
import { Button, TextInput, FormField } from '../../../components';

/* =============================================================================
 * OUTCOME OPTIONS
 * ============================================================================= */

const OUTCOME_OPTIONS: { value: OutcomeType; label: string }[] = [
  { value: 'Live Birth', label: 'Delivered' },
  { value: 'Miscarriage', label: 'Miscarriage' },
  { value: 'Abortion', label: 'Abortion' },
  { value: 'Stillbirth', label: 'Stillbirth' },
  { value: 'Ectopic', label: 'Ectopic' },
];

/* =============================================================================
 * COMPLETE PREGNANCY FORM PROPS
 * ============================================================================= */

interface CompletePregnancyFormProps {
  onSave: (outcome: OutcomeType, details: Record<string, any>) => void;
  onCancel: () => void;
}

/* =============================================================================
 * COMPLETE PREGNANCY FORM COMPONENT
 * ============================================================================= */

export function CompletePregnancyForm({ onSave, onCancel }: CompletePregnancyFormProps) {
  const [formData, setFormData] = useState({
    outcome: 'Live Birth' as OutcomeType,
    deliveryMode: 'NVD' as DeliveryMode,
    weight: '',
    sex: 'NA' as 'Male' | 'Female' | 'NA',
    remarks: '',
  });

  const showDeliveryDetails = formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth';

  return (
    <div className="p-4">
      <div className="bg-white border border-zinc-200">
        {/* Header */}
        <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
          <h3 className="text-[14px] font-bold text-emerald-900 uppercase tracking-tight">
            Complete Pregnancy
          </h3>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-5">
          {/* Outcome Selection */}
          <div className="space-y-2">
            <div className="text-[12px] font-bold text-zinc-500 uppercase">Pregnancy Outcome</div>
            <div className="flex flex-wrap gap-2">
              {OUTCOME_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, outcome: option.value })}
                  className={`px-4 py-2 text-[12px] font-bold border transition-colors ${
                    formData.outcome === option.value
                      ? 'bg-zinc-800 text-white border-zinc-800'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Details */}
          {showDeliveryDetails && (
            <div className="pt-4 border-t border-zinc-100 space-y-4">
              <div className="text-[12px] font-bold text-zinc-500 uppercase">Delivery Details</div>
              
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Mode of Delivery">
                  <select
                    className="w-full px-3 py-2 bg-white border border-zinc-300 text-[13px] focus:outline-none focus:border-emerald-500"
                    value={formData.deliveryMode}
                    onChange={e => setFormData({ ...formData, deliveryMode: e.target.value as DeliveryMode })}
                  >
                    <option value="NVD">NVD</option>
                    <option value="LSCS">LSCS</option>
                    <option value="Instrumental">Instrumental</option>
                    <option value="Vacuum">Vacuum</option>
                    <option value="Forceps">Forceps</option>
                  </select>
                </FormField>
                
                <FormField label="Birth Weight">
                  <TextInput
                    value={formData.weight}
                    onChange={v => setFormData({ ...formData, weight: v })}
                    placeholder="e.g., 3.2 kg"
                  />
                </FormField>
                
                <FormField label="Sex">
                  <select
                    className="w-full px-3 py-2 bg-white border border-zinc-300 text-[13px] focus:outline-none focus:border-emerald-500"
                    value={formData.sex}
                    onChange={e => setFormData({ ...formData, sex: e.target.value as 'Male' | 'Female' | 'NA' })}
                  >
                    <option value="NA">--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormField>
              </div>
            </div>
          )}

          {/* Remarks */}
          <div className="pt-4 border-t border-zinc-100 space-y-2">
            <FormField label="Remarks">
              <textarea
                rows={2}
                placeholder="Additional notes"
                className="w-full px-3 py-2 border border-zinc-300 text-[13px] focus:outline-none focus:border-emerald-500 resize-none"
                value={formData.remarks}
                onChange={e => setFormData({ ...formData, remarks: e.target.value })}
              />
            </FormField>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 flex justify-end gap-2 bg-zinc-50">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onSave(formData.outcome, {
              deliveryMode: formData.deliveryMode,
              birthWeight: formData.weight,
              gender: formData.sex,
              babyStatus: formData.outcome === 'Live Birth' ? 'Living' : 'NA',
              remarks: formData.remarks,
            })}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
