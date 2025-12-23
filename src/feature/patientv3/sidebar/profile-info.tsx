import { useState } from 'react';
import { Mail, Phone, User, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { usePatientV3 } from '../context';

/** Profile Information - Carbon Design Theme */
export function ProfileInfo() {
  const { store } = usePatientV3();
  const { patient, patientId } = store;
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div 
      className="bg-white border-b border-zinc-200"
    >
      <div 
        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-zinc-50 transition-colors group"
        onClick={() => {
          // Future: Navigate to profile page
          console.log(`Navigate to patient ${patientId} profile`);
        }}
      >
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
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-zinc-100 hover:bg-white transition-colors">
          <Mail className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-700 font-medium truncate">{patient.email}</span>
        </div>
        
        {/* More Details Accordion */}
        <button 
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full flex items-center justify-between px-4 py-1.5 hover:bg-white transition-colors group"
        >
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">More Details</span>
          {isDetailsExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600" />
          )}
        </button>
        
        {/* Expanded Details */}
        {isDetailsExpanded && (
          <div className="px-4 py-2 bg-white border-t border-zinc-100 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Registered:</span>
              <span className="text-[11px] text-zinc-600 font-medium">Oct 12, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-[9px] text-zinc-400">📍</span>
              <span className="text-[11px] text-zinc-600 font-medium truncate">{patient.city}, {patient.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-[9px] text-zinc-400">💼</span>
              <span className="text-[11px] text-zinc-600 font-medium">{patient.occupation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
