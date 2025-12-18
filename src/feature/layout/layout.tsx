import { useState } from 'react';
import { Sidebar } from './sidebar';

/** Layout component props */
interface LayoutProps {
  /** Child content to render in main area */
  children?: React.ReactNode;
}

/** Main layout wrapper with sidebar - Carbon Design Theme */
export function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main 
        className="flex-1 h-full overflow-hidden bg-white relative"
        style={{
          marginLeft: isCollapsed ? 64 : 240,
          transition: 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
