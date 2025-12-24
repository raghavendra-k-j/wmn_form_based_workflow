import { useState } from 'react';
import { formatDate, calculateEDDFromLMP } from '../store';
import { Button, TextInput, FormField } from '../../../components';

/* =============================================================================
 * PREGNANCY FORM DATA
 * ============================================================================= */

export interface PregnancyFormData {
  lmpDate: string;
  scanEDD: string;
  hasCorrectedEDD: boolean;
  correctedEDD: string;
}

/* =============================================================================
 * PREGNANCY FORM PROPS
 * ============================================================================= */

interface PregnancyFormProps {
  mode: 'add' | 'edit';
  initialData?: PregnancyFormData;
  onSave: (data: PregnancyFormData) => void;
  onCancel: () => void;
}

/* =============================================================================
 * PREGNANCY FORM COMPONENT
 * ============================================================================= */

export function PregnancyForm({ mode, initialData, onSave, onCancel }: PregnancyFormProps) {
  const [formData, setFormData] = useState<PregnancyFormData>(initialData || {
    lmpDate: '',
    scanEDD: '',
    hasCorrectedEDD: false,
    correctedEDD: '',
  });

  // Calculate Estimated EDD for preview
  const getEstimatedEDDPreview = () => {
    if (formData.scanEDD) {
      return { value: formatDate(formData.scanEDD), source: 'scan' as const };
    }
    if (formData.lmpDate) {
      return { value: formatDate(calculateEDDFromLMP(formData.lmpDate)), source: 'lmp' as const };
    }
    return { value: '--', source: null };
  };

  const estimatedPreview = getEstimatedEDDPreview();
  const isValid = formData.lmpDate.trim() !== '';

  return (
    <div className="p-4">
      <div className="bg-white border border-zinc-200">
        {/* Header */}
        <div className="px-4 py-3 bg-pink-50 border-b border-pink-100">
          <h3 className="text-[14px] font-bold text-pink-900 uppercase tracking-tight">
            {mode === 'add' ? 'Add Current Pregnancy' : 'Edit Pregnancy'}
          </h3>
        </div>

        {/* Form Body */}
        <div className="p-4">
          {/* Row: LMP, Scan EDD, Estimated EDD */}
          <div className="grid grid-cols-3 gap-4">
            {/* LMP Field */}
            <FormField label="LMP *">
              <TextInput
                type="date"
                value={formData.lmpDate}
                onChange={(v) => setFormData({ ...formData, lmpDate: v })}
              />
            </FormField>
            
            {/* Scan EDD Field */}
            <FormField label="Scan EDD (Optional)">
              <TextInput
                type="date"
                value={formData.scanEDD}
                onChange={(v) => setFormData({ ...formData, scanEDD: v })}
              />
            </FormField>
            
            {/* Estimated EDD Display with Hint Below */}
            <div>
              <FormField label="Estimated EDD">
                <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-[14px] font-bold text-emerald-700">
                  {estimatedPreview.value}
                </div>
              </FormField>
              {estimatedPreview.source && (
                <p className="text-[12px] text-zinc-500 mt-1">
                  {estimatedPreview.source === 'scan' 
                    ? 'Calculated from Scan EDD' 
                    : 'Calculated from LMP'}
                </p>
              )}
            </div>
          </div>

          {/* Corrected EDD Section */}
          <div className="mt-4 pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-zinc-600">
                Do you have a corrected EDD?
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasCorrectedEDD: true })}
                  className={`px-3 py-1.5 text-[12px] font-bold border transition-colors ${
                    formData.hasCorrectedEDD
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-zinc-500 border-zinc-300 hover:border-zinc-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasCorrectedEDD: false, correctedEDD: '' })}
                  className={`px-3 py-1.5 text-[12px] font-bold border transition-colors ${
                    !formData.hasCorrectedEDD
                      ? 'bg-zinc-600 text-white border-zinc-600'
                      : 'bg-white text-zinc-500 border-zinc-300 hover:border-zinc-400'
                  }`}
                >
                  No
                </button>
              </div>

              {/* Corrected EDD Input - Inline */}
              {formData.hasCorrectedEDD && (
                <div className="flex items-center gap-2 ml-4">
                  <TextInput
                    type="date"
                    value={formData.correctedEDD}
                    onChange={(v) => setFormData({ ...formData, correctedEDD: v })}
                  />
                  <span className="text-[12px] text-amber-600 font-medium whitespace-nowrap">
                    → Final EDD
                  </span>
                </div>
              )}
            </div>
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
            onClick={() => onSave(formData)}
            disabled={!isValid}
          >
            {mode === 'add' ? 'Save' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  );
}
