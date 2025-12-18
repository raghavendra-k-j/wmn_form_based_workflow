import { useState } from 'react';
import { Sidebar } from './Sidebar';

/** Layout component props */
interface LayoutProps {
  /** Child content to render in main area */
  children?: React.ReactNode;
}

/** Main layout wrapper with sidebar for hospital management system */
export function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100">
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main 
        className={`flex-1 transition-all duration-300 min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 ${
          isCollapsed ? 'ml-[76px]' : 'ml-[240px]'
        }`}
      >
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
