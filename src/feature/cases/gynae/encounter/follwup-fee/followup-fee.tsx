import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FormField, TextInput, SectionDivider } from '../../../../../components';

/** Follow-up & Fee Form Component */
export const FollowupFee = observer(() => {
  // Follow-up state
  const [followUpType, setFollowUpType] = useState<'none' | 'after'>('none');
  const [followUpDate, setFollowUpDate] = useState('');

  // Fee state
  const [amountToCollect, setAmountToCollect] = useState('');

  return (
    <div className="bg-white p-4 border border-zinc-200 shadow-sm">
      {/* Follow-up Section */}
      <div className="space-y-4">
        <FormField label="Follow Up">
          <div className="flex items-center gap-6 h-9">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="followUpType"
                checked={followUpType === 'none'}
                onChange={() => {
                  setFollowUpType('none');
                  setFollowUpDate('');
                }}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-zinc-700">No Follow Up</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="followUpType"
                checked={followUpType === 'after'}
                onChange={() => setFollowUpType('after')}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-zinc-700">Follow Up After</span>
            </label>
          </div>
        </FormField>

        {followUpType === 'after' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField label="Follow Up Date">
              <TextInput
                type="date"
                value={followUpDate}
                onChange={setFollowUpDate}
              />
            </FormField>
          </div>
        )}
      </div>

      <SectionDivider />

      {/* Fee Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Amount to Collect">
          <TextInput
            type="number"
            value={amountToCollect}
            onChange={setAmountToCollect}
            placeholder="0.00"
          />
        </FormField>
      </div>
    </div>
  );
});



