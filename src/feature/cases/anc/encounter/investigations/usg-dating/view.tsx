import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Upload, FileText, X } from 'lucide-react';
import { useUSGDatingStore } from './context';
import type { FetusType } from './store';

/** USG Dating View Component */
export const USGDatingView = observer(() => {
  const store = useUSGDatingStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      store.setScanReport(file);
    }
  };

  const fetusOptions: { value: FetusType; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'twins', label: 'Twins' },
    { value: 'triplets', label: 'Triplets' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-zinc-200 p-4">
        <h2 className="text-[14px] font-bold text-zinc-800">USG Dating</h2>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="space-y-4">
          {/* USG Date */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">USG Date</label>
            <div className="col-span-3">
              <input
                type="date"
                value={store.usgDate}
                onChange={(e) => store.setUSGDate(e.target.value)}
                className="px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400 w-48"
              />
            </div>
          </div>

          {/* Fetus Type */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Fetus</label>
            <div className="col-span-3 flex items-center gap-6">
              <div className="flex gap-4">
                {fetusOptions.map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="fetusType"
                      value={opt.value}
                      checked={store.fetusType === opt.value}
                      onChange={() => store.setFetusType(opt.value)}
                      className="w-4 h-4 accent-emerald-600"
                    />
                    <span className="text-[12px] text-zinc-700">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={store.fetusCount}
                  onChange={(e) => store.setFetusCount(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1.5 text-[12px] text-center border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
                />
                <span className="text-[10px] text-zinc-400">fetus count</span>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Result</label>
            <div className="col-span-3">
              <input
                type="text"
                value={store.result}
                onChange={(e) => store.setResult(e.target.value)}
                placeholder="Enter result"
                className="w-full px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Comments */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Comments</label>
            <div className="col-span-3">
              <textarea
                value={store.comments}
                onChange={(e) => store.setComments(e.target.value)}
                placeholder="Enter comments"
                rows={3}
                className="w-full px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </div>

          {/* Scan Report */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Scan Report</label>
            <div className="col-span-3">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {store.scanReport ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-sm w-fit">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-[11px] text-zinc-700">{store.scanReport.name}</span>
                  <button
                    onClick={() => store.setScanReport(null)}
                    className="p-0.5 text-zinc-400 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Report
                </button>
              )}
            </div>
          </div>

          {/* Scan Tech Name */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Scan Tech</label>
            <div className="col-span-3">
              <input
                type="text"
                value={store.scanTechName}
                onChange={(e) => store.setScanTechName(e.target.value)}
                placeholder="Enter scan technician name"
                className="w-full px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Doctor Name */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-[11px] font-bold text-zinc-500 uppercase pt-2">Doctor</label>
            <div className="col-span-3">
              <input
                type="text"
                value={store.doctorName}
                onChange={(e) => store.setDoctorName(e.target.value)}
                placeholder="Enter doctor name"
                className="w-full px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
