import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

/** Compact sidebar with colored Lucide icons */
export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
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
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800/50 
        flex flex-col z-50 overflow-hidden transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-[76px]' : 'w-[240px]'}
      `}
    >
      {/* Logo & Toggle Section */}
      <div className={`flex items-center p-4 mb-3 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-300 shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
            </svg>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent truncate">
              WMN System
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full px-3 flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              aria-label={item.label}
              className={`
                group relative w-full p-3 rounded-xl flex items-center transition-all duration-300
                ${isCollapsed ? 'justify-center' : 'justify-start gap-4 px-4'}
                ${active ? item.bgColor : 'hover:bg-zinc-900/50'}
              `}
            >
              {/* Active Indicator Bar */}
              {active && (
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full ${item.borderColor}`} />
              )}

              {/* Icon */}
              <Icon 
                className={`w-6 h-6 transition-all duration-300 ${active ? item.activeColor : item.color} group-hover:scale-110`} 
                strokeWidth={2.5}
              />
              
              {/* Label */}
              <span 
                className={`
                  font-semibold tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden
                  ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                  ${active ? item.activeColor : 'text-zinc-400'} 
                  group-hover:text-white
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile & Toggle */}
      <div className="mt-auto border-t border-zinc-800/50 p-4 flex flex-col gap-4 bg-zinc-950/50 backdrop-blur-sm">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-700 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-indigo-500/50 transition-all cursor-pointer shrink-0">
            <span className="text-xs font-bold text-zinc-200">DR</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 transition-all duration-300">
              <span className="text-sm font-semibold text-zinc-100 truncate">Dr. Raghav</span>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider truncate">Administrator</span>
            </div>
          )}
        </div>

        <button
          onClick={onToggle}
          className={`
            flex items-center justify-center p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all duration-300
            ${isCollapsed ? 'w-full' : 'w-full gap-2'}
          `}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
