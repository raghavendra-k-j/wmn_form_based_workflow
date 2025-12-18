import { ProfileInfo } from './profile-info';
import { MenuSection } from './menu-section';
import { RisksSummary } from './risks-summary';

/** Patient Details Sidebar - Carbon Design Theme */
export function PatientSidebar() {
  return (
    <div className="w-full h-full border-r border-zinc-100 bg-white flex flex-col shrink-0 overflow-y-auto overflow-x-hidden transition-all duration-200">
      <ProfileInfo />
      <RisksSummary />
      <div className="flex-1">
        <MenuSection />
      </div>
      
      {/* Footer Info - Carbon Style */}
      <div className="mt-auto p-4 border-t border-zinc-100 bg-white">
        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Registration</div>
        <div className="text-[11px] text-zinc-600 font-medium">Joined: Oct 12, 2023</div>
      </div>
    </div>
  );
}

export default PatientSidebar;
