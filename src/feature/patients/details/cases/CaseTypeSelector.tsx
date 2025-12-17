import { 
  Baby, 
  Flower2,
  Users
} from 'lucide-react';

interface CaseType {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const caseTypes: CaseType[] = [
  { 
    id: 'anc', 
    label: 'ANC', 
    icon: Baby, 
    color: 'text-pink-600', 
    bgColor: 'bg-pink-50', 
    borderColor: 'border-pink-200 group-hover:border-pink-300'
  },
  { 
    id: 'pnc', 
    label: 'PNC', 
    icon: Users, // Mother & Child concept
    color: 'text-sky-600', 
    bgColor: 'bg-sky-50', 
    borderColor: 'border-sky-200 group-hover:border-sky-300'
  },
  { 
    id: 'gynae', 
    label: 'Gynae', 
    icon: Flower2, 
    color: 'text-violet-600', 
    bgColor: 'bg-violet-50', 
    borderColor: 'border-violet-200 group-hover:border-violet-300'
  }
];

interface CaseTypeSelectorProps {
  onSelect: (typeId: string) => void;
}

export function CaseTypeSelector({ onSelect }: CaseTypeSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-zinc-900 mb-1">Select Case Type</h3>
        <p className="text-sm text-zinc-500">Choose a category to proceed</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-2xl">
        {caseTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white
                ${type.borderColor}
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-colors ${type.bgColor}`}>
                <Icon className={`w-7 h-7 ${type.color}`} />
              </div>
              <span className="font-bold text-sm text-zinc-700 group-hover:text-zinc-900 tracking-tight">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
