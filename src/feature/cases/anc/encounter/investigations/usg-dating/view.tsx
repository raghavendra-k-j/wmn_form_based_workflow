import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUSGDatingStore } from './context';
import { useFetusStore, type FetusType } from '../fetus-context';
import type { FetalHeartStatus } from './store';

/** USG Dating View Component */
export const USGDatingView = observer(() => {
  const store = useUSGDatingStore();
  const fetusStore = useFetusStore();

  // Sync local fetus data when shared fetus count changes
  useEffect(() => {
    store.syncFetusCount(fetusStore.fetusCount);
  }, [fetusStore.fetusCount, store]);

  const fetusOptions: { value: FetusType; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'twins', label: 'Twins' },
    { value: 'triplets', label: 'Triplets' },
    { value: 'multiple', label: 'Multiple (4+)' },
  ];

  const fhOptions: { value: FetalHeartStatus; label: string }[] = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-zinc-200 p-4">
        <h2 className="text-[14px] font-bold text-zinc-800">USG Dating Info</h2>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="space-y-4">
          {/* USG Date */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-[11px] font-bold text-zinc-500 uppercase">USG Date</label>
            <div className="col-span-3">
              <input
                type="date"
                value={store.usgDate}
                onChange={(e) => store.setUSGDate(e.target.value)}
                className="px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400 w-48"
              />
            </div>
          </div>

          {/* Fetus Type (from shared context) */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-[11px] font-bold text-zinc-500 uppercase">Fetus</label>
            <div className="col-span-3 flex items-center gap-4">
              {fetusOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fetusType"
                    value={opt.value}
                    checked={fetusStore.fetusType === opt.value}
                    onChange={() => fetusStore.setFetusType(opt.value)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-[12px] text-zinc-700">{opt.label}</span>
                </label>
              ))}
              
              {/* Custom count input for Multiple */}
              {fetusStore.fetusType === 'multiple' && (
                <div className="flex items-center gap-2 ml-2">
                  <input
                    type="number"
                    min={4}
                    max={10}
                    value={fetusStore.customFetusCount}
                    onChange={(e) => fetusStore.setCustomFetusCount(parseInt(e.target.value) || 4)}
                    className="w-16 px-2 py-1 text-[12px] text-center border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
                  />
                  <span className="text-[10px] text-zinc-400">count</span>
                </div>
              )}
            </div>
          </div>

          {/* Fetus Table (CRL and FH per fetus) */}
          <div className="mt-2">
            <table className="w-full border border-zinc-200">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase w-24">Fetus #</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">CRL (mm)</th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-zinc-600 uppercase">Fetal Heart (FH)</th>
                </tr>
              </thead>
              <tbody>
                {store.fetusData.map((fetus) => (
                  <tr key={fetus.fetusNumber} className="border-t border-zinc-100 hover:bg-zinc-50/50">
                    <td className="px-3 py-2 text-[12px] font-medium text-zinc-700">
                      Fetus {fetus.fetusNumber}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={fetus.crl}
                        onChange={(e) => store.updateFetusData(fetus.fetusNumber, 'crl', e.target.value)}
                        placeholder="mm"
                        className="w-24 px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-4">
                        {fhOptions.map(opt => (
                          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`fh_${fetus.fetusNumber}`}
                              value={opt.value}
                              checked={fetus.fh === opt.value}
                              onChange={() => store.updateFetusData(fetus.fetusNumber, 'fh', opt.value)}
                              className="w-3.5 h-3.5 accent-emerald-600"
                            />
                            <span className="text-[11px] text-zinc-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scan EDD */}
          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <label className="text-[11px] font-bold text-zinc-500 uppercase">Scan EDD</label>
            <div className="col-span-3">
              <input
                type="date"
                value={store.scanEDD}
                onChange={(e) => store.setScanEDD(e.target.value)}
                className="px-3 py-2 text-[12px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400 w-48"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
