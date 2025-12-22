import type { ReactNode } from 'react';

/* =============================================================================
 * EMPTY STATE
 * ============================================================================= */

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-4">
      <p className="text-[11px] text-zinc-400 italic">{message}</p>
    </div>
  );
}

/* =============================================================================
 * DATA TABLE - Carbon Style Compact Table
 * ============================================================================= */

interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps {
  columns: TableColumn[];
  children: ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable({ columns, children, isEmpty = false, emptyMessage = 'No records', className = 'mb-2' }: DataTableProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-zinc-100 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-2 py-1.5 border-b border-zinc-200"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {children}
        </tbody>
      </table>
      {isEmpty && <EmptyState message={emptyMessage} />}
    </div>
  );
}

/* =============================================================================
 * TABLE ROW
 * ============================================================================= */

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className="group hover:bg-zinc-50/50 transition-colors">
      {children}
    </tr>
  );
}

/* =============================================================================
 * TABLE CELL
 * ============================================================================= */

interface TableCellProps {
  children: ReactNode;
  showOnHover?: boolean;
  className?: string;
}

export function TableCell({ children, showOnHover = false, className = '' }: TableCellProps) {
  return (
    <td className={`px-2 py-1.5 ${showOnHover ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''} ${className}`}>
      {children}
    </td>
  );
}

/* =============================================================================
 * TABLE INPUT - Inline Editable Input
 * ============================================================================= */

interface TableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isBold?: boolean;
  readOnly?: boolean;
}

export function TableInput({ value, onChange, placeholder, isBold = false, readOnly = false }: TableInputProps) {
  if (readOnly) {
    return (
      <span className={`block w-full text-[12px] ${isBold ? 'font-bold text-zinc-900' : 'text-zinc-600'}`}>
        {value || <span className="text-zinc-300">—</span>}
      </span>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-transparent border-none focus:ring-0 p-0 text-[12px] placeholder:text-zinc-300 focus:outline-none ${isBold ? 'font-bold text-zinc-900' : 'text-zinc-600'}`}
    />
  );
}
