import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Calendar, 
  Eye, 
  SlidersHorizontal,
  Phone,
  Mail,
  MoreHorizontal
} from 'lucide-react';

/** Mock patient data */
const mockPatients = [
  { id: '1', name: 'Emily Davis', uhid: 'WMN-1024', age: 28, gender: 'Female', phone: '+1 234-567-8901', email: 'emily.davis@email.com' },
  { id: '2', name: 'Sarah Johnson', uhid: 'WMN-1025', age: 32, gender: 'Female', phone: '+1 234-567-8902', email: 'sarah.j@email.com' },
  { id: '3', name: 'Priya Sharma', uhid: 'WMN-1026', age: 29, gender: 'Female', phone: '+1 234-567-8903', email: 'priya.sharma@email.com' },
  { id: '4', name: 'Ananya Gupta', uhid: 'WMN-1027', age: 35, gender: 'Female', phone: '+1 234-567-8904', email: 'ananya.g@email.com' },
  { id: '5', name: 'Maria Rodriguez', uhid: 'WMN-1028', age: 26, gender: 'Female', phone: '+1 234-567-8905', email: 'maria.r@email.com' },
  { id: '6', name: 'Jessica Lee', uhid: 'WMN-1029', age: 31, gender: 'Female', phone: '+1 234-567-8906', email: 'jessica.l@email.com' },
  { id: '7', name: 'Amanda Chen', uhid: 'WMN-1030', age: 27, gender: 'Female', phone: '+1 234-567-8907', email: 'amanda.c@email.com' },
  { id: '8', name: 'Rachel Kim', uhid: 'WMN-1031', age: 34, gender: 'Female', phone: '+1 234-567-8908', email: 'rachel.k@email.com' },
];

/** Avatar colors */
const COLORS = ['#818cf8', '#34d399', '#fb7185', '#fbbf24', '#22d3ee', '#a78bfa', '#f472b6', '#38bdf8'];

const getAvatarColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
};

/** Compact Patient List Page */
export function PatientListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.uhid.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-white flex flex-col text-[13px]">
      {/* Compact Header */}
      <div className="h-12 px-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 shrink-0">
        <h1 className="text-base font-semibold text-zinc-800">Patients</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 w-48 bg-white border border-zinc-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button className="h-7 w-7 flex items-center justify-center border border-zinc-200 rounded text-zinc-500 hover:bg-zinc-100 bg-white">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={() => navigate('/patients/new')}
            className="h-7 px-3 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-zinc-100 border-b border-zinc-200 z-10">
            <tr>
              <th className="py-2 px-4 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide w-12">id</th>
              <th className="py-2 px-4 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Patient</th>
              <th className="py-2 px-4 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide w-28">UHID</th>
              <th className="py-2 px-4 text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Contact</th>
              <th className="py-2 px-4 text-right text-[11px] font-semibold text-zinc-500 uppercase tracking-wide w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((p, i) => (
              <tr 
                key={p.id}
                onClick={() => navigate(`/patients/${p.id}`)}
                className="hover:bg-indigo-50/50 cursor-pointer transition-colors"
              >
                <td className="py-2 px-4 text-zinc-400 text-xs">{i + 1}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: getAvatarColor(p.name) }}
                    >
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-800 leading-tight">{p.name}</div>
                      <div className="text-[11px] text-zinc-400">{p.age}y, {p.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className="font-mono text-xs text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded">{p.uhid}</span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-zinc-400" />
                      {p.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-zinc-400" />
                      {p.email}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center justify-end gap-0.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 rounded text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50"
                      title="Appointment"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/patients/${p.id}`); }}
                      className="p-1.5 rounded text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
                      title="More"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compact Footer */}
      <div className="h-10 px-4 border-t border-zinc-200 flex items-center justify-between bg-zinc-50 text-xs text-zinc-500 shrink-0">
        <span>Showing {filtered.length} of {mockPatients.length}</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded hover:bg-zinc-200 disabled:opacity-40" disabled>Prev</button>
          <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
          <button className="px-2 py-1 rounded hover:bg-zinc-200">2</button>
          <button className="px-2 py-1 rounded hover:bg-zinc-200">3</button>
          <button className="px-2 py-1 rounded hover:bg-zinc-200">Next</button>
        </div>
      </div>
    </div>
  );
}

export default PatientListPage;
