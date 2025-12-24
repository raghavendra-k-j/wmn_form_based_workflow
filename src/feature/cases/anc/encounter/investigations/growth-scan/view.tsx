import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Upload, FileText, X, Plus, Trash2 } from 'lucide-react';
import { useGrowthScanStore } from './context';
import type { GrowthScanFetusRecord, NormalAbnormal, NormalBorderlineAbnormal, Presentation } from './store';
import { DOPPLER_ABNORMALITY_OPTIONS } from './store';

/** Fetus Row Component */
const FetusRow = observer(({ record }: { record: GrowthScanFetusRecord }) => {
  const store = useGrowthScanStore();

  const normalAbnormalOptions: { value: NormalAbnormal; label: string }[] = [
    { value: '', label: 'Select' },
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
  ];

  const afiOptions: { value: NormalBorderlineAbnormal; label: string }[] = [
    { value: '', label: 'Select' },
    { value: 'normal', label: 'Normal' },
    { value: 'borderline', label: 'Borderline' },
    { value: 'abnormal', label: 'Abnormal' },
  ];

  const presentationOptions: { value: Presentation; label: string }[] = [
    { value: '', label: 'Select' },
    { value: 'cephalic', label: 'Cephalic' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50">
      <td className="px-3 py-2 text-[12px] font-medium text-zinc-700 w-20">
        Fetus {record.fetusNumber}
      </td>
      {/* AFI with Normal/Borderline/Abnormal */}
      <td className="px-3 py-2">
        <select
          value={record.afi}
          onChange={(e) => store.updateFetusRecord(record.id, 'afi', e.target.value)}
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        >
          {afiOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>
      {/* Doppler */}
      <td className="px-3 py-2">
        <div className="space-y-1">
          <select
            value={record.dopler}
            onChange={(e) => store.updateFetusRecord(record.id, 'dopler', e.target.value)}
            className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
          >
            {normalAbnormalOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* If Doppler is Abnormal, show abnormality type dropdown */}
          {record.dopler === 'abnormal' && (
            <select
              value={record.doplerAbnormalityType}
              onChange={(e) => store.updateFetusRecord(record.id, 'doplerAbnormalityType', e.target.value)}
              className="w-full px-2 py-1.5 text-[10px] border border-red-200 bg-red-50 text-red-700 focus:outline-none focus:border-red-400"
            >
              {DOPPLER_ABNORMALITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>
      </td>
      {/* Presentation */}
      <td className="px-3 py-2">
        <select
          value={record.presentation}
          onChange={(e) => store.updateFetusRecord(record.id, 'presentation', e.target.value)}
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        >
          {presentationOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>
      {/* EFW */}
      <td className="px-3 py-2">
        <input
          type="text"
          value={record.efw}
          onChange={(e) => store.updateFetusRecord(record.id, 'efw', e.target.value)}
          placeholder="EFW"
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        />
      </td>
      {/* Comments */}
      <td className="px-3 py-2">
        <input
          type="text"
          value={record.comments}
          onChange={(e) => store.updateFetusRecord(record.id, 'comments', e.target.value)}
          placeholder="Comments"
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        />
      </td>
      {/* Delete */}
      <td className="px-3 py-2 w-12">
        <button
          onClick={() => store.removeFetusRecord(record.id)}
          className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded"
          title="Remove"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
});

/** Growth Scan View */
export const GrowthScanView = observer(() => {
  const store = useGrowthScanStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      store.setScanReport(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-zinc-200 p-4">
        <h2 className="text-[14px] font-bold text-zinc-800 mb-4">Growth Scan</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {/* USG Date */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-1">USG Date</label>
            <input
              type="date"
              value={store.usgDate}
              onChange={(e) => store.setUSGDate(e.target.value)}
              className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Report Upload */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase mb-1">Report</label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {store.scanReport ? (
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-50 border border-zinc-200 text-[10px]">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate flex-1">{store.scanReport.name}</span>
                <button onClick={() => store.setScanReport(null)} className="text-zinc-400 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-zinc-600 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 w-full"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fetus Table - Removed AC column */}
      <div className="bg-white border border-zinc-200">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-100 border-b border-zinc-200">
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">Fetus #</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">AFI</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">Doppler</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">Presentation</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">EFW</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">Comments</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {store.fetusRecords.map(record => (
              <FetusRow key={record.id} record={record} />
            ))}
          </tbody>
        </table>

        {/* Add Fetus Button */}
        <div className="p-2 border-t border-zinc-100">
          <button
            onClick={() => store.addFetusRecord()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Fetus
          </button>
        </div>
      </div>
    </div>
  );
});
