import { Edit2, Mail, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../context';

/** Profile Information - Carbon Design Theme */
export function ProfileInfo() {
  const { store } = usePatientDetails();
  const navigate = useNavigate();
  const { patient, patientId } = store;

  return (
    <div 
      className="bg-white border-b border-zinc-200 group cursor-pointer hover:bg-zinc-50 transition-colors"
      onClick={() => {
        store.setCase(null);
        navigate(`/patientsv2/${patientId}/profile`);
      }}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Avatar Area - Carbon Square Style */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden rounded-none shadow-sm">
            {patient.photo ? (
              <img src={patient.photo} alt={patient.name} className="w-full h-full object-cover grayscale-[0.2]" />
            ) : (
              <User className="w-7 h-7 text-zinc-400" />
            )}
          </div>
          {/* Status Badge */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold border border-white">
            P
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-[13px] font-bold text-zinc-900 tracking-tight leading-none truncate uppercase">
              {patient.name}
            </h2>
            <button 
              onClick={(e) => { e.stopPropagation(); }}
              className="p-1 rounded-none hover:bg-zinc-200 text-zinc-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="mb-2.5">
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 border border-indigo-100/50">
              {patient.uhid}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[10px] font-bold border border-zinc-300 px-1.5 py-0.5 text-zinc-600 uppercase">
              {patient.age}Y <span className="text-zinc-300">/</span> {patient.bloodGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Quick Info - Grid Row */}
      <div className="grid grid-cols-1 border-t border-zinc-100 text-[11px] bg-zinc-50/50">
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-zinc-100 hover:bg-white transition-colors">
          <Phone className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-700 font-medium">{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-white transition-colors">
          <Mail className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-700 font-medium truncate">{patient.email}</span>
        </div>
      </div>
    </div>
  );
}


