import { observer } from 'mobx-react-lite';
import { 
  History, 
  Activity, 
  Users, 
  User, 
  Pill, 
  AlertTriangle,
  Copy,
  Calendar,
} from 'lucide-react';
import { useMedicalHistoryOverviewStore } from './context';

/** Format date for display */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Section Summary Card - Carbon Design style */
interface SectionSummaryProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  items: string[];
  emptyMessage?: string;
}

const SectionSummary = ({ title, icon, iconBg, items, emptyMessage = 'None' }: SectionSummaryProps) => (
  <div className="bg-white border border-zinc-200 p-3">
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-6 h-6 flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wide">{title}</h3>
      {items.length > 0 && (
        <span className="ml-auto text-[10px] font-bold bg-zinc-100 text-zinc-600 px-1.5 py-0.5">
          {items.length}
        </span>
      )}
    </div>
    {items.length === 0 ? (
      <p className="text-[11px] text-zinc-400 italic">{emptyMessage}</p>
    ) : (
      <div className="flex flex-wrap gap-1">
        {items.map((item, idx) => (
          <span 
            key={idx} 
            className="inline-block text-[10px] font-medium bg-slate-50 text-slate-700 px-1.5 py-0.5 border border-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    )}
  </div>
);

/** Previous Visit Banner - matches shared component styling */
const PreviousVisitBanner = observer(() => {
  const store = useMedicalHistoryOverviewStore();

  if (!store.hasPreviousVisitData) return null;

  return (
    <div className="mb-4 bg-slate-50/50 border-2 border-dashed border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50/50 border-b border-dashed border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-200 text-slate-700 px-2 py-1">
            <span className="text-[11px] font-bold">Previous Visit</span>
            <span className="w-px h-3 bg-slate-300"></span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span className="text-[11px] font-medium">{formatDate(store.previousVisitDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => store.ignorePreviousVisit()}
            className="text-[11px] font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 transition-colors px-3 py-1 cursor-pointer"
          >
            Ignore
          </button>
          <button
            type="button"
            onClick={() => store.copyFromPreviousVisit()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-700 text-white text-[10px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Copy className="w-3 h-3" />
            Copy All History
          </button>
        </div>
      </div>

      {/* Preview Content - Spacious Column Layout */}
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Past History */}
          {store.previousVisitData.pastHistory.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <History className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Past History</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.pastHistory.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.pastHistory.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 border border-amber-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Surgical History */}
          {store.previousVisitData.surgicalHistory.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Surgical History</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.surgicalHistory.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.surgicalHistory.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 border border-blue-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Family History */}
          {store.previousVisitData.familyHistory.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Family History</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.familyHistory.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.familyHistory.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 border border-emerald-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Personal History */}
          {store.previousVisitData.personalHistory.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Personal History</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.personalHistory.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.personalHistory.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-violet-50 text-violet-700 px-1.5 py-0.5 border border-violet-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medications */}
          {store.previousVisitData.medications.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Medications</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.medications.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.medications.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 border border-teal-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergies */}
          {store.previousVisitData.allergies.length > 0 && (
            <div className="bg-white border border-slate-200 p-2">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span className="text-[11px] font-bold text-slate-700 uppercase">Allergies</span>
                <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5">
                  {store.previousVisitData.allergies.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.previousVisitData.allergies.map((item, idx) => (
                  <span key={idx} className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 border border-red-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/** Empty State */
const EmptyState = () => (
  <div className="text-center py-6 border border-dashed border-zinc-200 bg-zinc-50/50">
    <p className="text-sm text-zinc-400 italic">No medical history recorded for this visit</p>
    <p className="text-xs text-zinc-300 mt-1">Use "Copy All History" above to import from previous visit</p>
  </div>
);

/**
 * Medical History Overview - Compact with Copy functionality
 */
export const MedicalHistoryOverview = observer(() => {
  const store = useMedicalHistoryOverviewStore();

  return (
    <div>
      {/* Previous Visit Banner */}
      <PreviousVisitBanner />

      {/* Empty State or Data Grid */}
      {!store.hasData ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <SectionSummary
            title="Past History"
            icon={<History className="w-3.5 h-3.5 text-amber-600" />}
            iconBg="bg-amber-50"
            items={store.data.pastHistory}
          />
          
          <SectionSummary
            title="Surgical History"
            icon={<Activity className="w-3.5 h-3.5 text-blue-600" />}
            iconBg="bg-blue-50"
            items={store.data.surgicalHistory}
          />
          
          <SectionSummary
            title="Family History"
            icon={<Users className="w-3.5 h-3.5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            items={store.data.familyHistory}
          />
          
          <SectionSummary
            title="Personal History"
            icon={<User className="w-3.5 h-3.5 text-violet-600" />}
            iconBg="bg-violet-50"
            items={store.data.personalHistory}
          />
          
          <SectionSummary
            title="Current Medications"
            icon={<Pill className="w-3.5 h-3.5 text-teal-600" />}
            iconBg="bg-teal-50"
            items={store.data.medications}
          />
          
          <SectionSummary
            title="Allergies"
            icon={<AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
            iconBg="bg-red-50"
            items={store.data.allergies}
            emptyMessage="No known allergies"
          />
        </div>
      )}
    </div>
  );
});
