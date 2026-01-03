import { observer } from 'mobx-react-lite';
import type { DiagnosisStatus } from '../../types';

interface StatusBadgeProps {
  status: DiagnosisStatus;
}

export const StatusBadge = observer(({ status }: StatusBadgeProps) => {
  const styles = {
    active: 'bg-green-100 text-green-700',
    resolved: 'bg-gray-100 text-gray-700',
    'ruled-out': 'bg-orange-100 text-orange-700',
  };

  const labels = {
    active: 'Active',
    resolved: 'Resolved',
    'ruled-out': 'Ruled-out',
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';
