import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Calendar } from 'lucide-react';

/** Sidebar menu item configuration */
interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
  activeColor: string;
  bgColor: string;
  borderColor: string;
}

/** Menu items configuration with distinct colors */
const menuItems: MenuItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Home, 
    path: '/',
    color: 'text-blue-400/70',
    activeColor: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'bg-blue-400'
  },
  { 
    id: 'patients', 
    label: 'Patients', 
    icon: Users, 
    path: '/patients',
    color: 'text-teal-400/70',
    activeColor: 'text-teal-400',
    bgColor: 'bg-teal-400/10',
    borderColor: 'bg-teal-400'
  },
  { 
    id: 'appointments', 
    label: 'Appts', 
    icon: Calendar, 
    path: '/appointments',
    color: 'text-violet-400/70',
    activeColor: 'text-violet-400',
    bgColor: 'bg-violet-400/10',
    borderColor: 'bg-violet-400'
  },
];

/** Compact sidebar with colored Lucide icons */
export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.path);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[76px] bg-zinc-950 border-r border-zinc-800/50 flex flex-col items-center py-4 z-50 overflow-hidden">
      {/* Logo */}
      <div className="mb-7">
        <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full px-2 flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              aria-label={item.label}
              className={`
                group relative w-full p-2.5 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-200
                ${active ? item.bgColor : 'hover:bg-zinc-900'}
              `}
            >
              {/* Active Indicator Bar */}
              {active && (
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${item.borderColor}`} />
              )}

              {/* Icon */}
              <Icon 
                className={`w-6 h-6 transition-colors duration-200 ${active ? item.activeColor : item.color} group-hover:${item.activeColor}`} 
                strokeWidth={2}
              />
              
              {/* Label */}
              <span className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${active ? item.activeColor : 'text-zinc-500'} group-hover:${item.activeColor}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile Image */}
      <div className="mt-auto p-3">
         <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-zinc-600 transition-all cursor-pointer">
           <span className="text-xs font-semibold text-zinc-400">DR</span>
         </div>
      </div>
    </aside>
  );
}

export default Sidebar;
