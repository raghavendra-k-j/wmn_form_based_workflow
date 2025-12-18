import { useState } from 'react';
import { User } from 'lucide-react';
import { useMedicalHistory } from './context';
import type { PersonalHistoryItem } from './store';
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

/** Status Options */
const STATUS_OPTIONS = [
  { value: 'yes' as const, label: 'Yes', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'occasional' as const, label: 'Occasional', className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { value: 'no' as const, label: 'No', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'unknown' as const, label: 'Unknown', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

/** Table Columns */
const getColumns = (isEditMode: boolean) => [
  { key: 'name', label: 'Habit', width: isEditMode ? '24%' : '50%' },
  { key: 'status', label: 'Status', width: isEditMode ? '14%' : '45%' },
  ...(isEditMode ? [
    { key: 'details', label: 'Details', width: '22%' },
    { key: 'notes', label: 'Notes', width: '35%' },
  ] : []),
  ...(isEditMode ? [{ key: 'actions', label: '', width: '5%' }] : []),
];

/** Personal History Section Component */
export function PersonalHistory() {
  const { isEditMode, expandedSections, toggleSection, data, updatePersonalHistory } = useMedicalHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const isExpanded = expandedSections.personalHistory;
  const items = data.personalHistory;

  // Handlers
  const handleAdd = () => {
    const newItem: PersonalHistoryItem = {
      id: `peh-${Date.now()}`,
      name: '',
      status: 'unknown',
      details: '',
      notes: '',
    };
    updatePersonalHistory([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    updatePersonalHistory(items.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof PersonalHistoryItem, value: string) => {
    updatePersonalHistory(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleStatusChange = (id: string, status: PersonalHistoryItem['status']) => {
    updatePersonalHistory(
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Filtered items
  const filteredItems = items.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && (i.status === 'yes' || i.status === 'occasional');
  });

  const concernCount = items.filter((i) => i.status === 'yes' || i.status === 'occasional').length;

  return (
    <SectionCard
      title="Personal History"
      icon={<User className="w-3.5 h-3.5" />}
      iconBg="bg-purple-50"
      iconColor="text-purple-600"
      badge={<SectionBadge count={concernCount} label={concernCount === 1 ? 'concern' : 'concerns'} variant="red" />}
      isExpanded={isExpanded}
      onToggle={() => toggleSection('personalHistory')}
    >
      {isEditMode ? (
        <>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search habits..."
          />

          <DataTable
            columns={getColumns(isEditMode)}
            isEmpty={filteredItems.length === 0}
            emptyMessage="No habits found"
          >
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TableInput
                    value={item.name}
                    onChange={(v) => handleChange(item.id, 'name', v)}
                    placeholder="Habit name"
                    isBold
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
                    value={item.details}
                    onChange={(v) => handleChange(item.id, 'details', v)}
                    placeholder="e.g. 10/day"
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
            <AddButton onClick={handleAdd} label="Add Habit" variant="purple" />
          </div>
        </>
      ) : (
        /* View Mode - Summary Badges */
        <div className="py-1">
          {filteredItems.length === 0 ? (
            <EmptyState message="No concerns recorded" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {filteredItems.map((item) => (
                <SummaryBadge 
                  key={item.id} 
                  variant={item.status === 'yes' ? 'red' : 'amber'}
                >
                  <span>{item.name}</span>
                  <span className="opacity-40">•</span>
                  <span className="capitalize">{item.status}</span>
                  {item.details && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="opacity-70">{item.details}</span>
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
