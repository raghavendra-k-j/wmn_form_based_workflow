import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, Search } from 'lucide-react';

/* =============================================================================
 * SECTION CARD - Carbon Design Collapsible Container
 * ============================================================================= */

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function SectionCard({
  title,
  icon,
  iconBg,
  iconColor,
  badge,
  isExpanded,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden mb-2 transition-all duration-200">
      {/* Header - Carbon Compact Style */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 bg-zinc-50/80 hover:bg-zinc-100/80 border-b border-zinc-100 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 ${iconBg} ${iconColor} border border-current/10`}>
            {icon}
          </div>
          <span className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight">
            {title}
          </span>
          {badge}
        </div>
        <div className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 animate-in fade-in slide-in-from-top-1 duration-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

/* =============================================================================
 * SECTION BADGE - Count Badge for Headers
 * ============================================================================= */

interface SectionBadgeProps {
  count: number;
  label?: string;
  variant?: 'amber' | 'red' | 'blue' | 'green' | 'purple' | 'teal';
}

const badgeVariants = {
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
};

export function SectionBadge({ count, label, variant = 'amber' }: SectionBadgeProps) {
  if (count === 0) return null;

  return (
    <span className={`px-1.5 py-0.5 text-[10px] font-bold border ${badgeVariants[variant]}`}>
      {count}{label ? ` ${label}` : ''}
    </span>
  );
}

/* =============================================================================
 * SUMMARY BADGE - Display Item in View Mode
 * ============================================================================= */

interface SummaryBadgeProps {
  children: ReactNode;
  variant?: 'amber' | 'red' | 'blue' | 'green' | 'purple' | 'teal';
}

const summaryVariants = {
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-800 border-red-200',
  blue: 'bg-blue-50 text-blue-800 border-blue-200',
  green: 'bg-green-50 text-green-800 border-green-200',
  purple: 'bg-purple-50 text-purple-800 border-purple-200',
  teal: 'bg-teal-50 text-teal-800 border-teal-200',
};

export function SummaryBadge({ children, variant = 'amber' }: SummaryBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold border ${summaryVariants[variant]}`}>
      {children}
    </div>
  );
}

/* =============================================================================
 * EMPTY STATE - When no data is present
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
 * SEARCH INPUT - Carbon Style Search
 * ============================================================================= */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative mb-3">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-400 focus:outline-none transition-colors placeholder:text-zinc-400"
      />
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
}

export function DataTable({ columns, children, isEmpty = false, emptyMessage = 'No records' }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto mb-2">
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
 * TABLE ROW - Hoverable Row
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

/* =============================================================================
 * TABLE SELECT - Compact Dropdown Select
 * ============================================================================= */

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface TableSelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  readOnly?: boolean;
}

export function TableSelect<T extends string>({
  value,
  options,
  onChange,
  readOnly = false,
}: TableSelectProps<T>) {
  if (readOnly) {
    const currentOption = options.find((o) => o.value === value);
    return (
      <span className="block w-full text-[12px] text-zinc-600">
        {currentOption?.label || value}
      </span>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium text-zinc-700 py-1 px-2 focus:bg-white focus:border-zinc-400 focus:outline-none transition-colors cursor-pointer appearance-none"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 4px center',
        backgroundSize: '14px',
        paddingRight: '20px'
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/* =============================================================================
 * STATUS TOGGLE - Cyclic Status Button
 * ============================================================================= */

interface StatusOption<T extends string> {
  value: T;
  label: string;
  className: string;
}

interface StatusToggleProps<T extends string> {
  value: T;
  options: StatusOption<T>[];
  onChange: (value: T) => void;
  readOnly?: boolean;
}

export function StatusToggle<T extends string>({
  value,
  options,
  onChange,
  readOnly = false,
}: StatusToggleProps<T>) {
  const currentIndex = options.findIndex((o) => o.value === value);
  const currentOption = options[currentIndex] || options[0];

  const handleClick = () => {
    if (readOnly) return;
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex].value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={readOnly}
      className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold border min-w-[60px] transition-colors ${currentOption.className} ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {currentOption.label}
    </button>
  );
}

/* =============================================================================
 * ADD BUTTON - Carbon Style Primary Action
 * ============================================================================= */

interface AddButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'amber' | 'blue' | 'purple' | 'teal';
}

const addButtonVariants = {
  amber: 'bg-amber-600 hover:bg-amber-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white',
};

export function AddButton({ onClick, label, variant = 'blue' }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold transition-colors ${addButtonVariants[variant]}`}
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* =============================================================================
 * DELETE BUTTON - Trash Icon Button
 * ============================================================================= */

interface DeleteButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

/* =============================================================================
 * ACTION HEADER BAR - Top Bar with Mode Toggle
 * ============================================================================= */

interface ActionHeaderProps {
  title: string;
  isEditMode: boolean;
  onEdit: () => void;
  onDone: () => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  allExpanded?: boolean;
}

export function ActionHeader({
  title,
  isEditMode,
  onEdit,
  onDone,
  onExpandAll,
  onCollapseAll,
  allExpanded = false,
}: ActionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-200 sticky top-0 z-10">
      <h2 className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">{title}</h2>
      <div className="flex items-center gap-2">
        {/* Expand/Collapse Toggle */}
        {(onExpandAll || onCollapseAll) && (
          <button
            type="button"
            onClick={allExpanded ? onCollapseAll : onExpandAll}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            title={allExpanded ? 'Collapse All' : 'Expand All'}
          >
            {allExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {/* Mode Toggle */}
        {isEditMode ? (
          <button
            type="button"
            onClick={onDone}
            className="px-3 py-1 bg-zinc-900 text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="px-3 py-1 bg-white border border-zinc-300 text-zinc-700 text-[11px] font-bold hover:bg-zinc-50 hover:border-zinc-400 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
