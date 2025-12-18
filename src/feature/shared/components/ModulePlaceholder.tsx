import { LayoutDashboard } from 'lucide-react';

interface ModulePlaceholderProps {
  title: string;
}

/** 
 * Clean Placeholder for unimplemented modules 
 * Following Carbon Design principles
 */
export function ModulePlaceholder({ title }: ModulePlaceholderProps) {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Carbon Header */}
      <div className="h-14 px-6 border-b border-zinc-200 flex items-center bg-white shrink-0">
        <h1 className="text-[15px] font-bold text-zinc-900 uppercase tracking-widest">{title}</h1>
      </div>

      {/* Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 shadow-sm">
          <LayoutDashboard className="w-8 h-8 text-zinc-300" />
        </div>
        
        <h2 className="text-xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">
          {title} Module
        </h2>
        
        <p className="text-[13px] text-zinc-500 max-w-md mx-auto leading-relaxed">
          The <span className="font-bold text-zinc-700">{title}</span> section is currently under development. 
          This module will provide comprehensive tools for clinical management and administrative oversight.
        </p>

        <div className="mt-8 flex gap-3">
          <div className="h-px w-8 bg-zinc-200 self-center" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Planned Roadmap v2.0</span>
          <div className="h-px w-8 bg-zinc-200 self-center" />
        </div>
      </div>
    </div>
  );
}
