import { observer } from 'mobx-react-lite';
import { User, Stethoscope, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useSession } from './context';
import type { CurrentUser } from './types';

/** Get avatar background color based on persona */
const getAvatarColor = (persona: string) => {
  return persona === 'doctor' 
    ? 'bg-gradient-to-br from-indigo-500 to-violet-600' 
    : 'bg-gradient-to-br from-emerald-500 to-teal-600';
};

/** Get persona badge styling */
const getPersonaBadge = (persona: string) => {
  return persona === 'doctor'
    ? { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'Doctor' }
    : { bg: 'bg-emerald-500/20', text: 'text-emerald-300', label: 'Staff' };
};

/** User Option Button */
const UserOption = ({ user, isActive, onClick }: { user: CurrentUser; isActive: boolean; onClick: () => void }) => {
  const badge = getPersonaBadge(user.persona);
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 cursor-pointer ${
        isActive 
          ? 'bg-indigo-600/20 border-l-2 border-indigo-500' 
          : 'hover:bg-[#2a2d3e] border-l-2 border-transparent'
      }`}
    >
      <div className={`w-8 h-8 flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${getAvatarColor(user.persona)}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[12px] font-semibold truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
          {user.name}
        </div>
        <div className={`text-[10px] px-1.5 py-0.5 rounded-sm inline-block mt-0.5 ${badge.bg} ${badge.text}`}>
          {badge.label}
        </div>
      </div>
    </button>
  );
};

/** 
 * User Simulator Component - Allows switching between users for prototyping
 * Carbon Design Theme
 */
export const UserSimulator = observer(({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const store = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = store.currentUser;
  const initials = store.initials;
  const badge = getPersonaBadge(currentUser.persona);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserSelect = (userId: string) => {
    store.switchUser(userId);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative border-b border-[#2d3148]">

      {/* Current User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={isCollapsed ? `${currentUser.name} (${badge.label})` : undefined}
        className={`w-full flex items-center gap-3 transition-colors duration-150 hover:bg-[#2a2d3e] ${
          isCollapsed ? 'justify-center py-3' : 'px-4 py-3'
        }`}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={`w-9 h-9 flex items-center justify-center text-[12px] font-bold text-white ${getAvatarColor(currentUser.persona)}`}>
            {initials}
          </div>
          {/* Persona Icon Badge */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 flex items-center justify-center border-2 border-[#1a1d2e] ${currentUser.persona === 'doctor' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
            {currentUser.persona === 'doctor' ? (
              <Stethoscope className="w-2.5 h-2.5 text-white" />
            ) : (
              <User className="w-2.5 h-2.5 text-white" />
            )}
          </div>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[12px] font-bold text-white truncate leading-tight">
                {currentUser.name}
              </div>
              <div className={`text-[10px] px-1.5 py-0.5 rounded-sm inline-block mt-0.5 ${badge.bg} ${badge.text}`}>
                {badge.label}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-[#1a1d2e] border border-[#2d3148] shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="py-1">
            <div className="px-3 py-1.5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              Switch User
            </div>
            {store.availableUsers.map(user => (
              <UserOption
                key={user.id}
                user={user}
                isActive={user.id === currentUser.id}
                onClick={() => handleUserSelect(user.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default UserSimulator;
