import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Calendar, 
  Eye, 
  ArrowUpDown,
  Filter,
  Phone,
  Mail,
  MoreVertical
} from 'lucide-react';

/** Mock patient data - limited to 2 as requested */
const mockPatients = [
  { 
    id: '1', 
    name: 'Emily Davis', 
    uhid: 'WMN-1024', 
    age: 28, 
    gender: 'Female', 
    phone: '+1 234-567-8901',
    email: 'emily.davis@email.com'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    uhid: 'WMN-1025', 
    age: 32, 
    gender: 'Female', 
    phone: '+1 234-567-8902',
    email: 'sarah.j@email.com'
  },
  { 
    id: '3', 
    name: 'Priya Sharma', 
    uhid: 'WMN-1026', 
    age: 29, 
    gender: 'Female', 
    phone: '+1 234-567-8903',
    email: 'priya.sharma@email.com'
  },
  { 
    id: '4', 
    name: 'Ananya Gupta', 
    uhid: 'WMN-1027', 
    age: 35, 
    gender: 'Female', 
    phone: '+1 234-567-8904',
    email: 'ananya.g@email.com'
  },
  { 
    id: '5', 
    name: 'Maria Rodriguez', 
    uhid: 'WMN-1028', 
    age: 26, 
    gender: 'Female', 
    phone: '+1 234-567-8905',
    email: 'maria.r@email.com'
  },
];

const COLORS = [
  'bg-red-100 text-red-700',
  'bg-orange-100 text-orange-700',
  'bg-amber-100 text-amber-700',
  'bg-green-100 text-green-700',
  'bg-teal-100 text-teal-700',
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-violet-100 text-violet-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
];

/** Get a consistent color based on string input */
const getAvatarColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

/** Patient list page - Refined compact design */
export function PatientListPage() {
  const navigate = useNavigate();

  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const handleBookAppointment = (e: React.MouseEvent, patientId: string) => {
    e.stopPropagation();
    console.log('Book appointment for', patientId);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white font-sans text-sm">
      {/* App Bar */}
      <div className="h-14 px-6 border-b border-zinc-200 flex items-center justify-between bg-white sticky top-0 z-30">
        <h1 className="text-lg font-bold text-zinc-900 tracking-tight">Patients</h1>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-64 transition-all h-9 placeholder:text-zinc-400"
            />
          </div>

          <div className="h-5 w-px bg-zinc-200 mx-1" />

          {/* Filter Button */}
          <button className="h-9 w-9 flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors">
            <Filter className="w-4 h-4" />
          </button>

          {/* Add Patient Button */}
          <button 
            onClick={() => navigate('/patients/new')}
            className="h-9 px-4 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Compact Data Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-zinc-100 z-20 shadow-sm border-b border-zinc-200">
            <tr>
              <th className="py-2.5 px-6 font-semibold text-xs text-zinc-600 uppercase tracking-wider w-16 group cursor-pointer hover:bg-zinc-200 transition-colors select-none">
                <div className="flex items-center gap-1.5">
                  ID
                  <ArrowUpDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600" />
                </div>
              </th>
              <th className="py-2.5 px-6 font-semibold text-xs text-zinc-600 uppercase tracking-wider group cursor-pointer hover:bg-zinc-200 transition-colors select-none">
                <div className="flex items-center gap-1.5">
                  Patient Name
                  <ArrowUpDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600" />
                </div>
              </th>
              <th className="py-2.5 px-6 font-semibold text-xs text-zinc-600 uppercase tracking-wider w-40 group cursor-pointer hover:bg-zinc-200 transition-colors select-none">
                <div className="flex items-center gap-1.5">
                  Hospital ID
                  <ArrowUpDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600" />
                </div>
              </th>
              <th className="py-2.5 px-6 font-semibold text-xs text-zinc-600 uppercase tracking-wider w-[260px]">
                Contact Info
              </th>
              <th className="py-2.5 px-6 font-semibold text-xs text-zinc-600 uppercase tracking-wider w-40 text-right bg-zinc-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {mockPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="group hover:bg-zinc-50 transition-all duration-150 ease-in-out cursor-pointer"
                onClick={() => handlePatientClick(patient.id)}
              >
                {/* ID Column */}
                <td className="py-2.5 px-6 whitespace-nowrap align-top">
                  <span className="text-zinc-500 font-mono text-xs mt-1 block">#{patient.id}</span>
                </td>
                
                {/* Name Column with Avatar & Meta */}
                <td className="py-2.5 px-6 align-top">
                  <div className="flex gap-3">
                    <div className={`w-9 h-9 min-w-9 min-h-9 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarColor(patient.name)}`}>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <div 
                        className="text-zinc-900 font-medium group-hover:text-teal-600 transition-colors text-left"
                      >
                        {patient.name}
                      </div>
                      <span className="text-xs text-zinc-500 mt-0.5">
                        {patient.age} yrs, {patient.gender}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Hospital ID - Clean Text */}
                <td className="py-2.5 px-6 whitespace-nowrap align-top">
                  <span className="text-zinc-700 font-mono text-xs font-medium bg-zinc-50 px-2 py-1 rounded border border-zinc-100 inline-block mt-0.5">
                     {patient.uhid}
                  </span>
                </td>

                {/* Contact Column */}
                <td className="py-2.5 px-6 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-600" title="Phone">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600" title="Email">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs truncate max-w-[180px]">{patient.email}</span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-2.5 px-6 text-right whitespace-nowrap align-top">
                  <div className="flex items-center justify-end gap-1 opacity-100">
                    <button 
                      onClick={(e) => handleBookAppointment(e, patient.id)}
                      className="p-1.5 text-zinc-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                      title="Book Appointment"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(patient.id);
                      }}
                      className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientListPage;
