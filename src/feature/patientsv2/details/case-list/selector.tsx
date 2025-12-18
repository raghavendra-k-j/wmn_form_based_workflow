import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Baby, Stethoscope, Plus } from 'lucide-react';
import { usePatientDetails } from '../context';
import type { CaseType } from '../store';

/** Case Type Configuration */
const CASE_TYPES: { id: CaseType; label: string; description: string; icon: any; bgColor: string; textColor: string; borderColor: string }[] = [
  {
    id: 'anc',
    label: 'Antenatal Care',
    description: 'Pregnancy monitoring and care',
    icon: Users,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'pnc',
    label: 'Postnatal Care',
    description: 'Post-delivery mother and infant care',
    icon: Baby,
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
  },
  {
    id: 'gynae',
    label: 'Gynaecological',
    description: 'General gynaecological consultation',
    icon: Stethoscope,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
];

/** Case Type Selector Page */
export function CaseTypeSelectorPage() {
  const { store } = usePatientDetails();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/patientsv2/${store.patientId}/cases`);
  };

  const handleSelect = (caseType: CaseType) => {
    store.setCase(caseType);
    navigate(`/patientsv2/${store.patientId}/${caseType}`);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-zinc-200 shrink-0">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-[14px] font-bold text-zinc-900 uppercase tracking-tight">
            New Case
          </h1>
          <p className="text-[11px] text-zinc-500">
            Select a case type to begin
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 bg-white border border-zinc-200 rounded-sm flex items-center justify-center shadow-sm">
              <Plus className="w-7 h-7 text-zinc-400" />
            </div>
            <h2 className="text-[16px] font-bold text-zinc-900 mb-1">
              Select Case Type
            </h2>
            <p className="text-[12px] text-zinc-500">
              Choose the type of case you want to create for this patient
            </p>
          </div>

          {/* Case Type Options */}
          <div className="space-y-3">
            {CASE_TYPES.map((caseType) => {
              const Icon = caseType.icon;
              return (
                <button
                  key={caseType.id}
                  onClick={() => handleSelect(caseType.id)}
                  className={`w-full flex items-center gap-4 p-4 bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all text-left group`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 ${caseType.bgColor} ${caseType.textColor} border ${caseType.borderColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-zinc-900 mb-0.5">
                      {caseType.label}
                    </h3>
                    <p className="text-[12px] text-zinc-500">
                      {caseType.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${caseType.bgColor} ${caseType.textColor} border ${caseType.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <p className="text-center text-[11px] text-zinc-400 mt-6">
            You can create multiple cases of the same type for a patient
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaseTypeSelectorPage;
