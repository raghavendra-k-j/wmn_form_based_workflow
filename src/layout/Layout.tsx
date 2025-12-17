import { Sidebar } from './Sidebar';

/** Layout component props */
interface LayoutProps {
  /** Child content to render in main area */
  children?: React.ReactNode;
}

/** Main layout wrapper with sidebar for hospital management system */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100">
      <Sidebar />
      <main className="flex-1 ml-[76px] min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 transition-all duration-300">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
