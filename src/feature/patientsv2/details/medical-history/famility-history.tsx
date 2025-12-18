import { useState } from 'react';
import { Users } from 'lucide-react';
import { useMedicalHistory } from './context';
import type { FamilyHistoryItem } from './store';
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
  TableSelect,
  StatusToggle,
  AddButton,
  DeleteButton,
} from './shared';

/** Status Options */
const STATUS_OPTIONS = [
  { value: 'positive' as const, label: 'Positive', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'negative' as const, label: 'Negative', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'unknown' as const, label: 'Unknown', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

/** Relationship Options for Dropdown */
const RELATIONSHIP_OPTIONS = [
  { value: 'Parent' as const, label: 'Parent' },
  { value: 'Sibling' as const, label: 'Sibling' },
  { value: 'Grandparent' as const, label: 'Grandparent' },
  { value: 'Other' as const, label: 'Other' },
];

/** Table Columns */
const getColumns = (isEditMode: boolean) => [
  { key: 'condition', label: 'Condition', width: isEditMode ? '26%' : '45%' },
  { key: 'relationship', label: 'Relation', width: isEditMode ? '16%' : '25%' },
  { key: 'status', label: 'Status', width: isEditMode ? '14%' : '25%' },
  ...(isEditMode ? [{ key: 'notes', label: 'Notes', width: '39%' }] : []),
  ...(isEditMode ? [{ key: 'actions', label: '', width: '5%' }] : []),
];

/** Family History Section Component */
export function FamilyHistory() {
  const { isEditMode, expandedSections, toggleSection, data, updateFamilyHistory } = useMedicalHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const isExpanded = expandedSections.familyHistory;
  const items = data.familyHistory;

  // Handlers
  const handleAdd = () => {
    const newItem: FamilyHistoryItem = {
      id: `fh-${Date.now()}`,
      condition: '',
      relationship: 'Parent',
      status: 'unknown',
      notes: '',
    };
    updateFamilyHistory([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    updateFamilyHistory(items.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof FamilyHistoryItem, value: string) => {
    updateFamilyHistory(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleStatusChange = (id: string, status: FamilyHistoryItem['status']) => {
    updateFamilyHistory(
      items.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleRelationshipChange = (id: string, relationship: FamilyHistoryItem['relationship']) => {
    updateFamilyHistory(
      items.map((item) => (item.id === id ? { ...item, relationship } : item))
    );
  };

  // Filtered items
  const filteredItems = items.filter((i) => {
    const matchesSearch = i.condition.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && i.status === 'positive';
  });

  const positiveCount = items.filter((i) => i.status === 'positive').length;

  return (
    <SectionCard
      title="Family History"
      icon={<Users className="w-3.5 h-3.5" />}
      iconBg="bg-blue-50"
      iconColor="text-blue-600"
      badge={<SectionBadge count={positiveCount} label="positive" variant="blue" />}
      isExpanded={isExpanded}
      onToggle={() => toggleSection('familyHistory')}
    >
      {isEditMode ? (
        <>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search family history..."
          />

          <DataTable
            columns={getColumns(isEditMode)}
            isEmpty={filteredItems.length === 0}
            emptyMessage="No family history found"
          >
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TableInput
                    value={item.condition}
                    onChange={(v) => handleChange(item.id, 'condition', v)}
                    placeholder="Condition name"
                    isBold
                  />
                </TableCell>
                <TableCell>
                  <TableSelect
                    value={item.relationship}
                    options={RELATIONSHIP_OPTIONS}
                    onChange={(val) => handleRelationshipChange(item.id, val)}
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
            <AddButton onClick={handleAdd} label="Add Condition" variant="blue" />
          </div>
        </>
      ) : (
        /* View Mode - Summary Badges */
        <div className="py-1">
          {filteredItems.length === 0 ? (
            <EmptyState message="No positive family history" />
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {filteredItems.map((item) => (
                <SummaryBadge key={item.id} variant="blue">
                  <span>{item.condition}</span>
                  <span className="opacity-40">•</span>
                  <span className="opacity-70">{item.relationship}</span>
                </SummaryBadge>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}
