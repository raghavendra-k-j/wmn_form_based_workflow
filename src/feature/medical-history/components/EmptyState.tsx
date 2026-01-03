import { observer } from 'mobx-react-lite';

interface EmptyStateProps {
  message: string;
  submessage?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = observer(({
  message,
  submessage,
  icon,
  className = '',
}: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {icon && <div className="text-gray-400 mb-3">{icon}</div>}
      <p className="text-[13px] font-medium text-gray-600">{message}</p>
      {submessage && (
        <p className="text-[12px] text-gray-500 mt-1">{submessage}</p>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
