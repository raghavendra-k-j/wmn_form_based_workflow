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

/** 
 * Patient Clinical Registry - integrated design with sticky header and no external padding.
 */
export function PatientListPageV2() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.uhid.toLowerCase().includes(search.toLowerCase())
  );

  const lastVisit = '2 days ago'; // Mock fallback

  return (
    <div className="h-full bg-white flex flex-col text-[13px] overflow-hidden">
      {/* Registry Header - Standardized IBM Carbon Style */}
      <div className="h-14 px-6 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-[15px] font-bold text-zinc-900 uppercase tracking-widest leading-none">
            Patient Directory
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-72 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 focus:bg-white text-[13px] transition-all outline-none shadow-none"
            />
          </div>

          <button className="h-9 px-3 flex items-center gap-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 bg-white transition-colors font-bold text-[11px] uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <button 
            onClick={() => navigate('/patientsv2/new')}
            className="h-9 px-5 bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-indigo-700 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Patient
          </button>
        </div>
      </div>

      {/* Registry Table Container - Full Width & Sticky */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#f4f4f5] border-b border-zinc-200 z-10">
            <tr>
              <th className="py-3 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-16 border-b border-zinc-200">#</th>
              <th className="py-3 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Patient Profile</th>
              <th className="py-3 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-56 border-b border-zinc-200">Medical ID (UHID)</th>
              <th className="py-3 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200">Contact Details</th>
              <th className="py-3 px-6 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((p, i) => (
              <tr 
                key={p.id}
                onClick={() => navigate(`/patientsv2/${p.id}`)}
                className="group hover:bg-zinc-50 cursor-pointer transition-colors duration-100"
              >
                <td className="py-4 px-6 text-zinc-400 font-mono text-[11px] group-hover:text-indigo-600">
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 flex items-center justify-center text-[13px] font-bold text-white shrink-0 border border-zinc-200/50"
                      style={{ backgroundColor: getAvatarColor(p.name) }}
                    >
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 group-hover:text-indigo-700 transition-colors text-[14px] leading-tight mb-1">
                        {p.name}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] text-zinc-500 font-medium bg-zinc-100 px-1.5 py-0.5 border border-zinc-200">
                          {p.age} Years
                        </span>
                        <span className="h-3 w-px bg-zinc-200" />
                        <span className="text-[10px] text-zinc-400 font-medium">Last visit {lastVisit}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[12px] font-bold text-zinc-700 font-mono tracking-wider bg-zinc-100 px-2.5 py-1 border border-zinc-200 group-hover:border-indigo-200 group-hover:text-indigo-800 transition-colors">
                    {p.uhid}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1.5 text-[12px]">
                    <div className="flex items-center gap-2.5 text-zinc-700 font-medium">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      {p.phone}
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-500">
                      <Mail className="w-3.5 h-3.5 text-zinc-300" />
                      <span className="truncate max-w-[180px]">{p.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all rounded-sm"
                      title="Book Visit"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/patientsv2/${p.id}`); }}
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all rounded-sm"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all rounded-sm"
                      title="More Options"
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

      {/* Clinical Registry Footer - Advanced Pagination */}
      <div className="h-14 px-6 border-t border-zinc-200 flex items-center justify-between bg-white z-10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Rows per page</span>
            <select className="bg-zinc-100 border-none text-[11px] font-bold text-zinc-600 px-2 py-1 outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
            Showing {filtered.length} of {mockPatients.length} total records
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="h-8 px-3 border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-30 text-zinc-600 font-bold uppercase text-[10px] tracking-wider transition-colors" disabled>
            Previous
          </button>
          <div className="flex items-center -space-x-px mx-2">
            {[1, 2, 3].map(pageNum => (
              <button 
                key={pageNum}
                className={`h-8 px-4 border border-zinc-200 text-[11px] font-bold transition-all ${
                  pageNum === 1 
                    ? 'bg-indigo-600 text-white border-indigo-600 z-10 shadow-sm' 
                    : 'bg-white text-zinc-600 hover:bg-zinc-50 hover:text-indigo-600'
                }`}
              >
                {String(pageNum).padStart(2, '0')}
              </button>
            ))}
          </div>
          <button className="h-8 px-3 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 font-bold uppercase text-[10px] tracking-wider transition-colors">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientListPageV2;
