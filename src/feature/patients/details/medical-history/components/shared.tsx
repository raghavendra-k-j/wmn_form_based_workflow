import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp, Settings, X, Trash2, Plus } from 'lucide-react';

/* ============================================================================
 * SECTION CARD - Collapsible container for history sections
 * ============================================================================ */

interface SectionCardProps {
  /** Section title */
  title: string;
  /** Optional icon to display before title */
  icon?: ReactNode;
  /** Optional badge content (e.g., count) */
  badge?: ReactNode;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Toggle expand/collapse */
  onToggle: () => void;
  /** Content to render when expanded */
  children: ReactNode;
  /** Show configure defaults button */
  showConfigureButton?: boolean;
  /** Handler for configure button click */
  onConfigure?: () => void;
}

export function SectionCard({
  title,
  icon,
  badge,
  isExpanded,
  onToggle,
  children,
  showConfigureButton = false,
  onConfigure,
}: SectionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-3 transition-all duration-300">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/50 border-b border-zinc-100 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <h3 className="font-semibold text-zinc-900 select-none text-sm">{title}</h3>
          {badge}
        </div>
        
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {showConfigureButton && onConfigure && (
            <>
              <button 
                onClick={onConfigure}
                className="flex items-center gap-1 px-2 py-1 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded text-xs font-medium transition-colors"
              >
                <Settings className="w-3 h-3" />
                Configure
              </button>
              <div className="h-3 w-px bg-zinc-300 mx-0.5" />
            </>
          )}
          <button 
            onClick={onToggle}
            className="p-1 text-zinc-400 hover:text-zinc-600 rounded hover:bg-zinc-100 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * CONFIGURE DRAWER - Right-side drawer for configuring defaults
 * ============================================================================ */

interface ConfigureDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer title */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Header gradient color (from-[color]) */
  accentColor?: string;
  /** Description text */
  description?: string;
  /** Current list of items */
  items: string[];
  /** New item input value */
  newItemValue: string;
  /** Handler for new item input change */
  onNewItemChange: (value: string) => void;
  /** Add new item handler */
  onAddItem: () => void;
  /** Remove item handler */
  onRemoveItem: (index: number) => void;
  /** Save handler */
  onSave: () => void;
  /** Input placeholder */
  inputPlaceholder?: string;
  /** Empty state text */
  emptyText?: string;
}

export function ConfigureDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = 'from-zinc-50',
  description,
  items,
  newItemValue,
  onNewItemChange,
  onAddItem,
  onRemoveItem,
  onSave,
  inputPlaceholder = 'Add new item',
  emptyText = 'No items configured.',
}: ConfigureDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 z-[101] h-full w-full max-w-sm bg-white shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-zinc-100 bg-gradient-to-r ${accentColor} to-white`}>
          <div>
            <h3 className="font-semibold text-zinc-900">{title}</h3>
            {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {description && (
            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{description}</p>
          )}
          
          {/* Add input */}
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="text" 
              value={newItemValue}
              onChange={(e) => onNewItemChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onAddItem()}
              placeholder={inputPlaceholder}
              className="flex-1 px-2.5 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-shadow"
            />
            <button 
              onClick={onAddItem}
              disabled={!newItemValue.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>

          {/* Items list */}
          <div className="space-y-1.5">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-zinc-100 group hover:bg-zinc-100/70 transition-colors"
              >
                <span className="text-sm font-medium text-zinc-700">{item}</span>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-0.5 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-zinc-200 rounded-lg">
                <p className="text-zinc-400 text-sm italic">{emptyText}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 flex justify-end gap-2 bg-zinc-50/80">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

/* ============================================================================
 * STATUS TOGGLE - Toggleable status button with multiple states
 * ============================================================================ */

interface StatusOption<T extends string> {
  value: T;
  label: string;
  className: string;
}

interface StatusToggleProps<T extends string> {
  /** Current status value */
  value: T;
  /** Available options */
  options: StatusOption<T>[];
  /** Change handler */
  onChange: (value: T) => void;
}

export function StatusToggle<T extends string>({ 
  value, 
  options, 
  onChange,
  readOnly = false
}: StatusToggleProps<T> & { readOnly?: boolean }) {
  const currentIndex = options.findIndex(o => o.value === value);
  const currentOption = options[currentIndex] || options[0];
  
  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex].value);
  };

  if (readOnly) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border min-w-[70px] justify-center ${currentOption.className}`}>
        {currentOption.label}
      </span>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors border min-w-[70px] justify-center ${currentOption.className}`}
    >
      {currentOption.label}
    </button>
  );
}

/* ============================================================================
 * TABLE INPUT - Transparent input for use in tables
 * ============================================================================ */

interface TableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isBold?: boolean;
}

export function TableInput({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  isBold = false,
  readOnly = false,
}: TableInputProps & { readOnly?: boolean }) {
  if (readOnly) {
    return (
      <span className={`block w-full py-1.5 text-sm ${isBold ? 'font-medium text-zinc-900' : 'text-zinc-600'} ${className}`}>
        {value || <span className="text-zinc-300">-</span>}
      </span>
    );
  }

  return (
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-zinc-300 ${isBold ? 'font-medium text-zinc-900' : 'text-zinc-600'} ${className}`}
    />
  );
}

/* ============================================================================
 * DELETE BUTTON - Trash icon button for deleting items
 * ============================================================================ */

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export function DeleteButton({ onClick, className = '' }: DeleteButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`text-zinc-400 hover:text-red-500 transition-colors p-0.5 ${className}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

/* ============================================================================
 * DRAG HANDLE - Visual drag handle indicator
 * ============================================================================ */

export function DragHandle({ className = '' }: { className?: string }) {
  return (
    <div className={`text-zinc-300 cursor-move ${className}`}>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="1"/>
        <circle cx="9" cy="5" r="1"/>
        <circle cx="9" cy="19" r="1"/>
        <circle cx="15" cy="12" r="1"/>
        <circle cx="15" cy="5" r="1"/>
        <circle cx="15" cy="19" r="1"/>
      </svg>
    </div>
  );
}

/* ============================================================================
 * ADD BUTTON - Primary action button for adding items
 * ============================================================================ */

interface AddButtonProps {
  onClick: () => void;
  label: string;
  color?: 'blue' | 'purple' | 'amber' | 'teal';
}

const colorClasses = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  amber: 'bg-amber-600 hover:bg-amber-700',
  teal: 'bg-teal-600 hover:bg-teal-700',
};

export function AddButton({ onClick, label, color = 'blue' }: AddButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 text-white rounded-lg text-sm font-medium transition-colors shadow-sm ${colorClasses[color]}`}
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* ============================================================================
 * SEARCH INPUT - Search bar for filtering
 * ============================================================================ */

import { Search } from 'lucide-react';

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
        placeholder={placeholder} 
        className="w-full pl-8 pr-3 py-1.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ============================================================================
 * SECTION BADGE - Badge for showing counts or status
 * ============================================================================ */

interface SectionBadgeProps {
  count: number;
  label?: string;
  color?: 'amber' | 'red' | 'green' | 'blue';
}

const badgeColors = {
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
};

export function SectionBadge({ count, label, color = 'amber' }: SectionBadgeProps) {
  if (count === 0) return null;
  
  return (
    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${badgeColors[color]}`}>
      {count}{label ? ` ${label}` : ''}
    </span>
  );
}

/* ============================================================================
 * TABLE WRAPPER - Compact table container
 * ============================================================================ */

interface TableColumn {
  key: string;
  label: string;
  width: string;
}

interface DataTableProps {
  columns: TableColumn[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function DataTable({ columns, children, emptyMessage = 'No records', isEmpty = false }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto mb-3">
      <table className="w-full text-sm text-left">
        <thead className="bg-zinc-50 text-zinc-600 font-medium text-xs">
          <tr>
            {columns.map((col, i) => (
              <th 
                key={col.key} 
                className={`px-2 py-1.5 ${i === 0 ? 'rounded-l-lg' : ''} ${i === columns.length - 1 ? 'rounded-r-lg' : ''}`}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {children}
        </tbody>
      </table>
      
      {isEmpty && (
        <div className="text-center py-8">
          <p className="text-zinc-400 text-sm">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * TABLE ROW - Compact table row with hover state
 * ============================================================================ */

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

/* ============================================================================
 * TABLE CELL - Compact table cell
 * ============================================================================ */

interface TableCellProps {
  children: ReactNode;
  className?: string;
  showOnHover?: boolean;
}

export function TableCell({ children, className = '', showOnHover = false }: TableCellProps) {
  return (
    <td className={`px-2 py-1.5 ${showOnHover ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''} ${className}`}>
      {children}
    </td>
  );
}
