import { useState } from 'react';
import { History } from 'lucide-react';
import { useMedicalHistory } from './context';
import type { PastHistoryItem } from './store';
import {
  SectionCard,
  SectionBadge,
  SummaryBadge,
  EmptyState,
  SearchInput,
  DataTable,
  TableRow,
  TableCell,
  TableInput,
  StatusToggle,
  AddButton,
  DeleteButton,
} from './shared';

/** Status Options for Past History */
const STATUS_OPTIONS = [
  { value: 'active' as const, label: 'Yes', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'inactive' as const, label: 'No', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

/** Table Columns */
const getColumns = (isEditMode: boolean) => [
  { key: 'name', label: 'Condition', width: isEditMode ? '28%' : '45%' },
  { key: 'since', label: 'Since', width: isEditMode ? '15%' : '25%' },
  { key: 'status', label: 'Status', width: isEditMode ? '12%' : '25%' },
  ...(isEditMode ? [{ key: 'notes', label: 'Notes', width: '40%' }] : []),
  ...(isEditMode ? [{ key: 'actions', label: '', width: '5%' }] : []),
];

/** Past History Section Component */
export function PastHistory() {
  const { isEditMode, expandedSections, toggleSection, data, updatePastHistory } = useMedicalHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const isExpanded = expandedSections.pastHistory;
  const items = data.pastHistory;

  // Handlers
  const handleAdd = () => {
    const newItem: PastHistoryItem = {
      id: `ph-${Date.now()}`,
      name: '',
      since: '',
      status: 'inactive',
      notes: '',
    };
    updatePastHistory([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    updatePastHistory(items.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof PastHistoryItem, value: string) => {
    updatePastHistory(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleStatusChange = (id: string, status: 'active' | 'inactive') => {
    updatePastHistory(
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Filtered items
  const filteredItems = items.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && i.status === 'active';
  });

  const activeCount = items.filter((i) => i.status === 'active').length;

  return (
    <SectionCard
      title="Past History"
      icon={<History className="w-3.5 h-3.5" />}
      iconBg="bg-amber-50"
      iconColor="text-amber-600"
      badge={<SectionBadge count={activeCount} label="active" variant="amber" />}
      isExpanded={isExpanded}
      onToggle={() => toggleSection('pastHistory')}
    >
      {isEditMode ? (
        <>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search conditions..."
          />

          <DataTable
            columns={getColumns(isEditMode)}
            isEmpty={filteredItems.length === 0}
            emptyMessage="No conditions found"
          >
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TableInput
                    value={item.name}
                    onChange={(v) => handleChange(item.id, 'name', v)}
                    placeholder="Condition name"
                    isBold
                  />
                </TableCell>
                <TableCell>
                  <TableInput
                    value={item.since}
                    onChange={(v) => handleChange(item.id, 'since', v)}
                    placeholder="e.g. 2020"
                  />
                </TableCell>
                <TableCell>
                  <StatusToggle
                    value={item.status}
                    options={STATUS_OPTIONS}
                    onChange={(val) => handleStatusChange(item.id, val)}
                  />
                </TableCell>
                <TableCell>
                  <TableInput
                    value={item.notes}
                    onChange={(v) => handleChange(item.id, 'notes', v)}
                    placeholder="Notes..."
                  />
                </TableCell>
                <TableCell showOnHover>
                  <DeleteButton onClick={() => handleDelete(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </DataTable>

          <div className="flex justify-end pt-2 border-t border-zinc-100">
            <AddButton onClick={handleAdd} label="Add Condition" variant="amber" />
          </div>
        </>
      ) : (
        /* View Mode - Summary Badges */
        <div className="py-1">
          {filteredItems.length === 0 ? (
            <EmptyState message="No active conditions" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {filteredItems.map((item) => (
                <SummaryBadge key={item.id} variant="amber">
                  <span>{item.name}</span>
                  {item.since && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">Since {item.since}</span>
                    </>
                  )}
                </SummaryBadge>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}
