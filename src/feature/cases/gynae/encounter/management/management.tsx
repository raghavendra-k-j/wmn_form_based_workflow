import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormField,
  TextInput,
  TextAreaInput,
  Button,
} from '../../../../../components';

/* =============================================================================
 * MANAGEMENT TAB COMPONENT
 * Contains: Impression & Advice, Lab Tests & Scans, Follow Up, Fees
 * ============================================================================= */

/** 1. Impression & Advice Section (Combined) */
const ImpressionAdviceSection = observer(({ 
  impression, 
  setImpression,
  advice,
  setAdvice 
}: { 
  impression: string; 
  setImpression: (v: string) => void;
  advice: string;
  setAdvice: (v: string) => void;
}) => (
  <div className="bg-white p-4 border border-zinc-200 shadow-sm">

    <div className="space-y-4">
      <FormField label="Impression / Diagnosis">
        <TextAreaInput
          value={impression}
          onChange={setImpression}
          placeholder="Type diagnosis or impression..."
          rows={2}
        />
      </FormField>
      <FormField label="Advice">
        <TextAreaInput
          value={advice}
          onChange={setAdvice}
          placeholder="Investigations, Treatment plan..."
          rows={2}
        />
      </FormField>
    </div>
  </div>
));

/** 2. Lab Tests & Scans Section */
const LabTestsScansSection = observer(({ 
  labTests, 
  setLabTests,
  scans,
  setScans 
}: { 
  labTests: string; 
  setLabTests: (v: string) => void;
  scans: string;
  setScans: (v: string) => void;
}) => (
  <div className="bg-white p-4 border border-zinc-200 shadow-sm">

    <div className="space-y-4">
      <FormField label="Lab Tests">
        <TextAreaInput
          value={labTests}
          onChange={setLabTests}
          placeholder="CBC, LFT, RFT, Thyroid profile..."
          rows={2}
        />
      </FormField>
      <FormField label="Scans">
        <TextAreaInput
          value={scans}
          onChange={setScans}
          placeholder="USG Pelvis, MRI, CT Scan..."
          rows={2}
        />
      </FormField>
    </div>
  </div>
));

/** 3. Follow Up Section - ANC-style design */
const FollowUpSection = observer(({ 
  followUpOption, 
  setFollowUpOption,
  followUpValue,
  setFollowUpValue,
  followUpDate,
  setFollowUpDate,
  instructions,
  setInstructions
}: { 
  followUpOption: 'none' | 'days' | 'weeks' | 'date'; 
  setFollowUpOption: (v: 'none' | 'days' | 'weeks' | 'date') => void;
  followUpValue: string;
  setFollowUpValue: (v: string) => void;
  followUpDate: string;
  setFollowUpDate: (v: string) => void;
  instructions: string;
  setInstructions: (v: string) => void;
}) => (
  <div className="bg-white p-4 border border-zinc-200 shadow-sm">

    <div className="space-y-4">
      {/* Follow-up Options */}
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
                  ? '!bg-emerald-600 !text-white !border-emerald-600'
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
          <FormField label="Follow-up Date">
            <div className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 text-[12px] font-semibold text-emerald-700 rounded-none h-[38px] flex items-center">
              {followUpValue ? (() => {
                const days = followUpOption === 'weeks' ? parseInt(followUpValue) * 7 : parseInt(followUpValue);
                const date = new Date();
                date.setDate(date.getDate() + days);
                return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              })() : '--'}
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
            rows={2}
          />
        </FormField>
      )}
    </div>
  </div>
));

/** 4. Fees Section */
const FeesSection = observer(({ 
  amountToCollect, 
  setAmountToCollect 
}: { 
  amountToCollect: string; 
  setAmountToCollect: (v: string) => void;
}) => (
  <div className="bg-white p-4 border border-zinc-200 shadow-sm">

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
));

/** Management Tab - Main Component */
export const Management = observer(() => {
  // Impression & Advice state
  const [impression, setImpression] = useState('');
  const [advice, setAdvice] = useState('');
  
  // Lab Tests & Scans state
  const [labTests, setLabTests] = useState('');
  const [scans, setScans] = useState('');
  
  // Follow-up state - ANC-style
  const [followUpOption, setFollowUpOption] = useState<'none' | 'days' | 'weeks' | 'date'>('none');
  const [followUpValue, setFollowUpValue] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Fee state
  const [amountToCollect, setAmountToCollect] = useState('');

  return (
    <div className="space-y-4">
      {/* Section 1: Impression & Advice (Combined) */}
      <ImpressionAdviceSection 
        impression={impression} 
        setImpression={setImpression}
        advice={advice}
        setAdvice={setAdvice}
      />

      {/* Section 2: Lab Tests & Scans */}
      <LabTestsScansSection 
        labTests={labTests}
        setLabTests={setLabTests}
        scans={scans}
        setScans={setScans}
      />

      {/* Section 3: Follow Up Visit - ANC-style */}
      <FollowUpSection 
        followUpOption={followUpOption}
        setFollowUpOption={setFollowUpOption}
        followUpValue={followUpValue}
        setFollowUpValue={setFollowUpValue}
        followUpDate={followUpDate}
        setFollowUpDate={setFollowUpDate}
        instructions={instructions}
        setInstructions={setInstructions}
      />

      {/* Section 4: Fees Information */}
      <FeesSection 
        amountToCollect={amountToCollect}
        setAmountToCollect={setAmountToCollect}
      />
    </div>
  );
});

