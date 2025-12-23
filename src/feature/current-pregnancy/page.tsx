import { useState } from 'react';
import { Plus, HeartPulse, Calendar, Baby, Trash2, Clock, Scan, Info, ArrowLeft } from 'lucide-react';
import { CurrentPregnancyProvider, useCurrentPregnancy } from './context';
import { type OutcomeType, type DeliveryMode, formatDate, formatDateTime } from './store';
import { Button, IconButton, TextInput, FormField } from '../../components';

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
 * VIEW MODES
 * ============================================================================= */

type ViewMode = 'view' | 'add' | 'complete';

/* =============================================================================
 * MAIN PAGE CONTENT
 * ============================================================================= */

function CurrentPregnancyContent() {
  const { 
    pregnancy, 
    hasActivePregnancy, 
    ga, 
    edd, 
    trimester, 
    daysUntilEDD,
    scanGA,
    addNewPregnancy,
    updateScanEDD,
    completePregnancy,
    reset,
  } = useCurrentPregnancy();
  
  const [viewMode, setViewMode] = useState<ViewMode>('view');
  const [showInfoPopover, setShowInfoPopover] = useState(false);

  const handleDelete = () => {
    if (confirm('Remove current pregnancy record?')) {
      reset();
    }
  };

  // Format dates for display
  const formattedLmp = pregnancy?.lmpDate ? formatDate(pregnancy.lmpDate) : '--';
  const formattedScanDate = pregnancy?.scanDate ? formatDate(pregnancy.scanDate) : null;
  const formattedScanEDD = pregnancy?.scanEDD ? formatDate(pregnancy.scanEDD) : null;

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-zinc-200">
        {viewMode !== 'view' ? (
          <>
            <button
              onClick={() => setViewMode('view')}
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[13px] font-bold uppercase tracking-tight">Back</span>
            </button>
          </>
        ) : (
          <h2 className="text-[13px] font-bold text-zinc-800 uppercase tracking-tight">
            Current Pregnancy
          </h2>
        )}
        
        {viewMode === 'view' && !hasActivePregnancy && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus />}
            onClick={() => setViewMode('add')}
          >
            Add Pregnancy
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* ADD PREGNANCY FORM */}
        {viewMode === 'add' && (
          <AddPregnancyForm
            onSave={(lmpDate, scanDate, scanEDD) => {
              addNewPregnancy(lmpDate, 'Dr. Smith'); // TODO: Get from session
              if (scanDate && scanEDD) {
                updateScanEDD(scanDate, scanEDD, 'Dr. Smith');
              }
              setViewMode('view');
            }}
            onCancel={() => setViewMode('view')}
          />
        )}

        {/* COMPLETE PREGNANCY FORM */}
        {viewMode === 'complete' && ga && (
          <CompletePregnancyForm
            ga={ga}
            onSave={(outcome, details) => {
              completePregnancy(outcome, details);
              setViewMode('view');
            }}
            onCancel={() => setViewMode('view')}
          />
        )}

        {/* VIEW MODE - PREGNANCY DETAILS */}
        {viewMode === 'view' && (
          <>
            {hasActivePregnancy && ga && edd ? (
              <div className="p-5 space-y-4">
                {/* Main Pregnancy Card */}
                <div className="bg-white border border-zinc-200 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-pink-50 border-b border-pink-100">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center border border-pink-200">
                        <HeartPulse className="w-5 h-5 text-pink-500" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wide">Gestational Age (LMP)</span>
                        <p className="text-[22px] font-black text-zinc-900 leading-tight">
                          {ga.weeks} <span className="text-[14px] font-semibold text-zinc-500">weeks</span> {ga.days} <span className="text-[14px] font-semibold text-zinc-500">days</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Info Button */}
                      <div className="relative">
                        <IconButton
                          icon={<Info />}
                          label="View Details"
                          size="sm"
                          onClick={() => setShowInfoPopover(!showInfoPopover)}
                        />
                        
                        {/* Info Popover */}
                        {showInfoPopover && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowInfoPopover(false)} />
                            <div className="absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-zinc-200 shadow-lg p-4">
                              <h4 className="text-[11px] font-bold text-zinc-500 uppercase mb-3">Pregnancy Info</h4>
                              <div className="space-y-2 text-[11px]">
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Created</span>
                                  <span className="text-zinc-700 font-medium">
                                    {pregnancy?.createdAt ? formatDateTime(pregnancy.createdAt) : '--'}
                                  </span>
                                </div>
                                {pregnancy?.createdBy && (
                                  <div className="flex justify-between">
                                    <span className="text-zinc-500">Created By</span>
                                    <span className="text-zinc-700 font-medium">{pregnancy.createdBy}</span>
                                  </div>
                                )}
                                <div className="border-t border-zinc-100 pt-2 mt-2">
                                  <div className="flex justify-between">
                                    <span className="text-zinc-500">Last Updated</span>
                                    <span className="text-zinc-700 font-medium">
                                      {pregnancy?.updatedAt ? formatDateTime(pregnancy.updatedAt) : '--'}
                                    </span>
                                  </div>
                                </div>
                                {pregnancy?.updatedBy && (
                                  <div className="flex justify-between">
                                    <span className="text-zinc-500">Updated By</span>
                                    <span className="text-zinc-700 font-medium">{pregnancy.updatedBy}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <IconButton
                        icon={<Trash2 />}
                        label="Remove"
                        size="sm"
                        onClick={handleDelete}
                        className="text-zinc-400 hover:text-red-500 hover:bg-red-50"
                      />
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-4 divide-x divide-zinc-100">
                    <InfoCell icon={<Calendar className="w-4 h-4 text-blue-500" />} iconBg="bg-blue-50" label="LMP" value={formattedLmp} />
                    <InfoCell icon={<Baby className="w-4 h-4 text-emerald-500" />} iconBg="bg-emerald-50" label="EDD (LMP)" value={edd} />
                    <InfoCell icon={<span className="text-[11px] font-black text-amber-600">{trimester?.trimester}</span>} iconBg="bg-amber-50" label="Trimester" value={trimester?.label.split(' ')[0] || '--'} />
                    <InfoCell icon={<Clock className="w-4 h-4 text-indigo-500" />} iconBg="bg-indigo-50" label="Days Left" value={daysUntilEDD && daysUntilEDD > 0 ? String(daysUntilEDD) : 'Due!'} />
                  </div>

                  {/* Scan EDD Row (if exists) */}
                  {pregnancy?.scanEDD && scanGA && (
                    <div className="grid grid-cols-3 divide-x divide-zinc-100 border-t border-zinc-100 bg-purple-50/30">
                      <InfoCell icon={<Scan className="w-4 h-4 text-purple-500" />} iconBg="bg-purple-50" label="Scan Date" value={formattedScanDate || '--'} />
                      <InfoCell icon={<Baby className="w-4 h-4 text-purple-500" />} iconBg="bg-purple-50" label="EDD (Scan)" value={formattedScanEDD || '--'} valueColor="text-purple-700" />
                      <InfoCell icon={<HeartPulse className="w-4 h-4 text-purple-500" />} iconBg="bg-purple-50" label="GA (Scan)" value={`${scanGA.weeks}w ${scanGA.days}d`} valueColor="text-purple-700" />
                    </div>
                  )}

                  {/* Progress */}
                  <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100">
                    <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 mb-1.5">
                      <span>Pregnancy Progress</span>
                      <span>{Math.min(Math.round((ga.weeks / 40) * 100), 100)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 rounded-full transition-all"
                        style={{ width: `${Math.min((ga.weeks / 40) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Mark Outcome */}
                <div className="bg-white border border-zinc-200 p-5">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase block mb-3">Mark Pregnancy Outcome</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="primary" size="sm" onClick={() => setViewMode('complete')}>
                      Complete Pregnancy
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-100">
                    <HeartPulse className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-[14px] font-bold text-zinc-700 mb-1">No Current Pregnancy</h3>
                  <p className="text-[12px] text-zinc-500 mb-5">Add a pregnancy to track GA and EDD</p>
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<Plus />}
                    onClick={() => setViewMode('add')}
                  >
                    Add Pregnancy
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =============================================================================
 * INFO CELL COMPONENT
 * ============================================================================= */

function InfoCell({ 
  icon, 
  iconBg, 
  label, 
  value, 
  valueColor = 'text-zinc-700' 
}: { 
  icon: React.ReactNode; 
  iconBg: string; 
  label: string; 
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="px-4 py-4 text-center">
      <div className={`w-8 h-8 mx-auto mb-2 ${iconBg} rounded flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold text-zinc-400 uppercase block">{label}</span>
      <p className={`text-[12px] font-semibold ${valueColor} mt-0.5`}>{value}</p>
    </div>
  );
}

/* =============================================================================
 * ADD PREGNANCY FORM (INLINE)
 * ============================================================================= */

interface AddPregnancyFormProps {
  onSave: (lmpDate: string, scanDate?: string, scanEDD?: string) => void;
  onCancel: () => void;
}

function AddPregnancyForm({ onSave, onCancel }: AddPregnancyFormProps) {
  const [lmpDate, setLmpDate] = useState('');
  const [scanDate, setScanDate] = useState('');
  const [scanEDD, setScanEDD] = useState('');

  // Calculate GA and EDD from LMP
  const ga = lmpDate ? (() => {
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return { weeks: Math.floor(diffDays / 7), days: diffDays % 7 };
  })() : null;

  const edd = lmpDate ? (() => {
    const lmp = new Date(lmpDate);
    lmp.setDate(lmp.getDate() + 280);
    return lmp.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  })() : null;

  // Calculate GA from Scan EDD
  const scanGA = scanEDD ? (() => {
    const eddDate = new Date(scanEDD);
    const today = new Date();
    const diffTime = eddDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalDays = 280 - daysRemaining;
    if (totalDays < 0) return { weeks: 0, days: 0 };
    return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
  })() : null;

  const hasScanData = scanDate && scanEDD;

  return (
    <div className="p-5">
      <div className="bg-white border border-zinc-200">
        {/* Form Header */}
        <div className="px-5 py-4 bg-pink-50 border-b border-pink-100">
          <h3 className="text-[13px] font-bold text-pink-900 uppercase tracking-tight">
            Add Current Pregnancy
          </h3>
          <p className="text-[11px] text-pink-600 mt-0.5">Enter LMP to calculate gestational age and EDD</p>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5">
          {/* LMP Section */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              LMP Details
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField label="LMP Date *">
                <TextInput
                  type="date"
                  value={lmpDate}
                  onChange={setLmpDate}
                />
              </FormField>
              
              <FormField label="Calculated GA">
                <div className="px-3 py-2 bg-pink-50 border border-pink-200 text-[13px] font-bold text-pink-700">
                  {ga ? `${ga.weeks}w ${ga.days}d` : '--'}
                </div>
              </FormField>
              
              <FormField label="Calculated EDD">
                <div className="px-3 py-2 bg-pink-50 border border-pink-200 text-[13px] font-bold text-pink-700">
                  {edd || '--'}
                </div>
              </FormField>
            </div>
          </div>

          {/* Scan EDD Section (Optional) */}
          <div className="pt-4 border-t border-zinc-100 space-y-4">
            <div className="text-[11px] font-bold text-zinc-500 uppercase flex items-center gap-2">
              <Scan className="w-4 h-4" />
              Scan EDD <span className="text-zinc-400 font-normal">(Optional)</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField label="Scan Date">
                <TextInput
                  type="date"
                  value={scanDate}
                  onChange={setScanDate}
                />
              </FormField>
              
              <FormField label="EDD by Scan">
                <TextInput
                  type="date"
                  value={scanEDD}
                  onChange={setScanEDD}
                />
              </FormField>
              
              <FormField label="GA by Scan">
                <div className={`px-3 py-2 border text-[13px] font-bold ${hasScanData ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>
                  {scanGA && hasScanData ? `${scanGA.weeks}w ${scanGA.days}d` : '--'}
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-3 bg-zinc-50">
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            onClick={() => onSave(lmpDate, scanDate || undefined, scanEDD || undefined)}
            disabled={!lmpDate}
          >
            Save Pregnancy
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * COMPLETE PREGNANCY FORM (INLINE)
 * ============================================================================= */

interface CompletePregnancyFormProps {
  ga: { weeks: number; days: number };
  onSave: (outcome: OutcomeType, details: Record<string, any>) => void;
  onCancel: () => void;
}

function CompletePregnancyForm({ ga, onSave, onCancel }: CompletePregnancyFormProps) {
  const [formData, setFormData] = useState({
    outcome: 'Live Birth' as OutcomeType,
    deliveryMode: 'NVD' as DeliveryMode,
    weight: '',
    sex: 'NA' as 'Male' | 'Female' | 'NA',
    remarks: '',
  });

  const showDeliveryDetails = formData.outcome === 'Live Birth' || formData.outcome === 'Stillbirth';

  return (
    <div className="p-5">
      <div className="bg-white border border-zinc-200">
        {/* Form Header */}
        <div className="px-5 py-4 bg-emerald-50 border-b border-emerald-100">
          <h3 className="text-[13px] font-bold text-emerald-900 uppercase tracking-tight">
            Complete Pregnancy
          </h3>
          <p className="text-[11px] text-emerald-600 mt-0.5">GA at completion: {ga.weeks}w {ga.days}d</p>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5">
          {/* Outcome Selection */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-zinc-500 uppercase">Pregnancy Outcome</div>
            <div className="flex flex-wrap gap-2">
              {OUTCOME_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, outcome: option.value })}
                  className={`px-4 py-2 text-[11px] font-bold border transition-colors ${
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
              <div className="text-[11px] font-bold text-zinc-500 uppercase">Delivery Details</div>
              
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Mode of Delivery">
                  <select
                    className="w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] focus:outline-none focus:border-emerald-500"
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
                    className="w-full px-3 py-2 bg-white border border-zinc-300 text-[12px] focus:outline-none focus:border-emerald-500"
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
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <FormField label="Remarks">
              <textarea
                rows={2}
                placeholder="Additional notes"
                className="w-full px-3 py-2 border border-zinc-300 text-[12px] focus:outline-none focus:border-emerald-500 resize-none"
                value={formData.remarks}
                onChange={e => setFormData({ ...formData, remarks: e.target.value })}
              />
            </FormField>
          </div>
        </div>

        {/* Form Footer */}
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-3 bg-zinc-50">
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => onSave(formData.outcome, {
              deliveryMode: formData.deliveryMode,
              birthWeight: formData.weight,
              gender: formData.sex,
              babyStatus: formData.outcome === 'Live Birth' ? 'Living' : 'NA',
              remarks: formData.remarks,
            })}
          >
            Complete Pregnancy
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
 * EXPORTED PAGE COMPONENT
 * ============================================================================= */

export function CurrentPregnancyPage() {
  return (
    <CurrentPregnancyProvider>
      <CurrentPregnancyContent />
    </CurrentPregnancyProvider>
  );
}

export default CurrentPregnancyPage;
