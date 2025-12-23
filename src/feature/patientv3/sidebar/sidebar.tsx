import { ProfileInfo } from './profile-info';
import { RisksSummary } from './risks-summary';
import { MenuSection } from './menu-section';

/** Patient V3 Sidebar - Carbon Design Theme */
export function PatientSidebar() {
  return (
    <div className="w-full h-full border-r border-zinc-100 bg-white flex flex-col shrink-0 overflow-y-auto overflow-x-hidden transition-all duration-200">
      <ProfileInfo />
      <RisksSummary />
      
      {/* Menu Section - Navigation */}
      <div className="flex-1 border-t border-zinc-100">
        <MenuSection />
      </div>
    </div>
  );
}

export default PatientSidebar;
