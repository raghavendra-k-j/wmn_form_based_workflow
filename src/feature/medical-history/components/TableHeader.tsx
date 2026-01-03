import { observer } from 'mobx-react-lite';
import type { ReactNode } from 'react';

interface TableHeaderProps {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const TableHeader = observer(({
  title,
  icon,
  badge,
  actions,
  className = '',
}: TableHeaderProps) => {
  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-blue-600">{icon}</div>}
        <span className="text-[13px] font-semibold text-gray-700">{title}</span>
        {badge}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
});

TableHeader.displayName = 'TableHeader';
