import { observer } from 'mobx-react-lite';
import type { ReactNode } from 'react';

interface Column {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface MedicalHistoryTableProps {
  columns: Column[];
  children: ReactNode;
  className?: string;
}

export const MedicalHistoryTable = observer(({
  columns,
  children,
  className = '',
}: MedicalHistoryTableProps) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col, index) => (
              <th
                key={index}
                style={{ width: col.width }}
                className={`
                  px-3 py-2 text-[11px] font-semibold text-gray-600 uppercase tracking-wide
                  text-${col.align || 'left'}
                `}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
});

MedicalHistoryTable.displayName = 'MedicalHistoryTable';

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const TableRow = observer(({
  children,
  className = '',
}: TableRowProps) => {
  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

interface TableCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const TableCell = observer(({
  children,
  align = 'left',
  className = '',
}: TableCellProps) => {
  return (
    <td className={`px-3 py-2.5 text-[12px] text-gray-700 text-${align} ${className}`}>
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';
