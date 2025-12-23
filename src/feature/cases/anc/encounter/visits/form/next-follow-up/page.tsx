import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  TextAreaInput,
  Button,
} from '../../../../../../../components';

/* =============================================================================
 * NEXT FOLLOW UP PAGE
 * ============================================================================= */

/** Next Follow Up Page - Follow-up scheduling */
export const NextFollowUpPage = observer(() => {
  const [followUpOption, setFollowUpOption] = useState<'none' | 'days' | 'weeks' | 'date'>('none');
  const [followUpValue, setFollowUpValue] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [instructions, setInstructions] = useState('');

  return (
    <div className="bg-white border border-zinc-200 p-4">
      {/* Follow-up Options */}
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-2">Follow-up Option</label>
          <div className="flex flex-wrap gap-2">
            {(['none', 'days', 'weeks', 'date'] as const).map((option) => (
              <Button
                key={option}
                size="xs"
                variant="outline"
                onClick={() => setFollowUpOption(option)}
                className={`rounded-none ${
                  followUpOption === option
                    ? '!bg-rose-600 !text-white !border-rose-600'
                    : '!bg-white !text-zinc-600 !border-zinc-200 hover:!border-zinc-300'
                }`}
              >
                {option === 'none' ? 'No Follow up required' : option === 'days' ? 'Days' : option === 'weeks' ? 'Weeks' : 'Specific Date'}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Days/Weeks Input */}
        {(followUpOption === 'days' || followUpOption === 'weeks') && (
          <div className="grid grid-cols-2 gap-4">
            <FormField label={`Number of ${followUpOption}`}>
              <TextInput
                type="number"
                value={followUpValue}
                onChange={setFollowUpValue}
                placeholder={`Enter ${followUpOption}`}
              />
            </FormField>
            <FormField label="Calculated Date">
              <div className="w-full px-3 py-2 bg-rose-50 border border-rose-200 text-[12px] font-semibold text-rose-700 rounded-none h-[38px] flex items-center">
                {followUpValue ? `Approx. ${followUpValue} ${followUpOption} from now` : '--'}
              </div>
            </FormField>
          </div>
        )}
        
        {/* Specific Date Input */}
        {followUpOption === 'date' && (
          <div className="max-w-xs">
            <FormField label="Follow-up Date">
              <TextInput
                type="date"
                value={followUpDate}
                onChange={setFollowUpDate}
              />
            </FormField>
          </div>
        )}
        
        {/* Instructions */}
        {followUpOption !== 'none' && (
          <FormField label="Instructions for Next Visit">
            <TextAreaInput
              value={instructions}
              onChange={setInstructions}
              placeholder="Any special instructions for the next visit..."
              rows={3}
            />
          </FormField>
        )}
      </div>
    </div>
  );
});

export { NextFollowUpPage as default };
