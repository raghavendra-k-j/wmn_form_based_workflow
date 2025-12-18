import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Settings,
  Stethoscope,
  UserCog,
  Users
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  appointmentsRoute,
  doctorsRoute,
  homeRoute,
  patientsRoute,
  settingsRoute,
  staffsRoute
} from '../shared/routes/admin-routes';

/** Sidebar menu item configuration */
interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
  lightBg: string;
}

/** Menu items configuration - Mapped to Carbon/Glossy design */
const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: homeRoute, color: 'text-indigo-400', lightBg: 'bg-indigo-400/10' },
  { id: 'patients', label: 'Patients', icon: Users, path: patientsRoute, color: 'text-emerald-400', lightBg: 'bg-emerald-400/10' },
  { id: 'appointments', label: 'Appointments', icon: Calendar, path: appointmentsRoute, color: 'text-cyan-400', lightBg: 'bg-cyan-400/10' },
  { id: 'staffs', label: 'Staff', icon: UserCog, path: staffsRoute, color: 'text-amber-400', lightBg: 'bg-amber-400/10' },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope, path: doctorsRoute, color: 'text-rose-400', lightBg: 'bg-rose-400/10' },
  { id: 'settings', label: 'Settings', icon: Settings, path: settingsRoute, color: 'text-violet-400', lightBg: 'bg-violet-400/10' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

/** Width constants */
const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 240;

/**
 * Modern Clinical Sidebar - Carbon Design Theme
 * Features high-density layout, flat surfaces, and sharp corners.
 */
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

  const width = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-[#1a1d2e] flex flex-col z-50 border-r border-[#2d3148] transition-all duration-200"
      style={{ width }}
    >
      {/* Header - Flat Carbon Style */}
      <div className={`h-16 flex items-center border-b border-[#2d3148] overflow-hidden ${isCollapsed ? 'justify-center' : 'px-5'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
            W
          </div>
          {!isCollapsed && (
            <span className="text-[15px] font-bold text-white uppercase tracking-widest whitespace-nowrap">
              WMN Doctors
            </span>
          )}
        </div>
      </div>

      {/* Navigation - High Density */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              title={isCollapsed ? item.label : undefined}
              className={`relative w-full flex items-center gap-3 transition-colors duration-150 rounded-none border-l-2 border-transparent group ${
                isCollapsed ? 'justify-center py-3' : 'px-4 py-2.5'
              } ${active ? 'bg-[#252836] border-indigo-600 text-white' : 'text-zinc-400 hover:bg-[#2a2d3e] hover:text-white'}`}
            >
              {/* Glossy Icon Container */}
              <div className={`w-8 h-8 flex items-center justify-center shrink-0 border border-current/10 transition-transform group-hover:scale-105 ${active ? 'bg-indigo-600/20 ' + item.color : item.lightBg + ' ' + item.color}`}>
                <Icon size={18} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              </div>
              
              {!isCollapsed && (
                <span className={`text-[13px] font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis ${active ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
              
              {/* Active Arrow Tip */}
              {active && !isCollapsed && (
                <div className="ml-auto">
                  <ChevronRight size={14} className="text-zinc-500" />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer - Integrated Density */}
      <div className="mt-auto border-t border-[#2d3148] bg-[#1a1d2e]">
        {/* User Profile */}
        <div className={`flex items-center gap-3 p-4 bg-[#252836]/40 ${isCollapsed ? 'justify-center' : 'px-5 py-4'}`}>
          <div className="relative shrink-0">
            <div className="w-9 h-9 flex items-center justify-center text-[13px] font-bold bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
              SK
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#1a1d2e] rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-white truncate leading-tight">
                Dr. Sanjay Kumar
              </div>
              <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                sanjay@clinic.com
              </div>
            </div>
          )}
        </div>

        {/* Global Controls */}
        <div className="flex flex-col border-t border-[#2d3148]">
          {/* Logout */}
          <button
            onClick={() => console.log('Logout clicked')}
            title={isCollapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 py-3 transition-colors duration-150 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 ${
              isCollapsed ? 'justify-center' : 'px-5'
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${isCollapsed ? '' : ''}`}>
              <LogOut size={18} />
            </div>
            {!isCollapsed && <span className="text-[13px] font-semibold">Logout</span>}
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={onToggle}
            title={isCollapsed ? 'Expand' : 'Collapse'}
            className={`w-full flex items-center gap-3 py-3 transition-colors duration-150 border-t border-[#2d3148] hover:bg-[#2a2d3e] text-zinc-500 hover:text-white ${
              isCollapsed ? 'justify-center' : 'px-5'
            }`}
          >
             <div className="w-8 h-8 flex items-center justify-center shrink-0">
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </div>
            {!isCollapsed && <span className="text-[13px] font-semibold">Collapse Sidebar</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
