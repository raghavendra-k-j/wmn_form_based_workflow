import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMedicalHistory } from '../MedicalHistoryContext';
import {
  AddButton,
  DataTable,
  DeleteButton,
  DragHandle,
  SearchInput,
  SectionBadge,
  SectionCard,
  StatusToggle,
  TableCell,
  TableInput,
  TableRow,
} from '../components/shared';

interface FamilyHistoryItem {
  id: string;
  condition: string;
  relationship: 'Parent' | 'Sibling' | 'Grandparent' | 'Other';
  status: 'positive' | 'negative' | 'unknown';
  notes: string;
}

const STATUS_OPTIONS = [
  { value: 'positive' as const, label: 'Positive', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'negative' as const, label: 'Negative', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'unknown' as const, label: 'Unknown', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

const REL_OPTIONS = [
  { value: 'Parent' as const, label: 'Parent', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'Sibling' as const, label: 'Sibling', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'Grandparent' as const, label: 'Grandparent', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'Other' as const, label: 'Other', className: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
];

const DEFAULT_ITEMS_LIST = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Cancer',
  'Stroke',
  'Mental Illness',
  'Asthma',
  'Autoimmune'
];

const columns = (isEditMode: boolean) => [
  { key: 'condition', label: 'Condition', width: isEditMode ? '28%' : '50%' },
  { key: 'relationship', label: 'Relation', width: isEditMode ? '18%' : '25%' },
  { key: 'status', label: 'Status', width: isEditMode ? '18%' : '25%' },
  ...(isEditMode ? [{ key: 'notes', label: 'Notes', width: '31%' }] : []),
  { key: 'actions', label: '', width: '5%' },
];

export function FamilyHistory() {
  const { isEditMode, expandedSections, toggleSection } = useMedicalHistory();

  const [items, setItems] = useState<FamilyHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isExpanded = expandedSections['familyHistory'];

  useEffect(() => {
    if (items.length === 0) {
      const initialItems = DEFAULT_ITEMS_LIST.map((name, index) => ({
        id: `default-${index}`,
        condition: name,
        relationship: 'Parent' as const,
        status: 'unknown' as const,
        notes: ''
      }));
      setItems(initialItems);
    }
  }, []);

  const handleAdd = () => {
    const newItem: FamilyHistoryItem = {
      id: Date.now().toString(),
      condition: '',
      relationship: 'Parent',
      status: 'unknown',
      notes: ''
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof FamilyHistoryItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleStatusChange = (id: string, status: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const handleRelChange = (id: string, relationship: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, relationship } : item
    ));
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.condition.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && i.status === 'positive';
  });

  const positiveCount = items.filter(i => i.status === 'positive').length;

  return (
    <>
      <SectionCard
        title="Family History"
        icon={<Users className="w-4 h-4 text-blue-500" />}
        badge={<SectionBadge count={positiveCount} label="positive" color="blue" />}
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

            <DataTable columns={columns(isEditMode)} isEmpty={filteredItems.length === 0} emptyMessage="No family history records">
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <DragHandle className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <TableInput 
                        value={item.condition}
                        onChange={(v) => handleChange(item.id, 'condition', v)}
                        placeholder="Condition Name"
                        isBold
                        readOnly={!isEditMode}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusToggle
                      value={item.relationship}
                      options={REL_OPTIONS}
                      onChange={(val) => handleRelChange(item.id, val)}
                      readOnly={!isEditMode}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusToggle
                      value={item.status}
                      options={STATUS_OPTIONS}
                      onChange={(val) => handleStatusChange(item.id, val)}
                      readOnly={!isEditMode}
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={item.notes}
                      onChange={(v) => handleChange(item.id, 'notes', v)}
                      placeholder="Notes"
                      readOnly={!isEditMode}
                    />
                  </TableCell>
                  <TableCell showOnHover>
                    <DeleteButton onClick={() => handleDelete(item.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </DataTable>

            <div className="flex justify-end pt-2 border-t border-zinc-100">
              <AddButton onClick={handleAdd} label="Add Condition" color="blue" />
            </div>
          </>
        ) : (
          /* Summary View - Badge Display */
          <div className="py-2">
            {filteredItems.length === 0 ? (
              <p className="text-sm text-zinc-400 italic">No positive family history</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200"
                  >
                    <span className="font-semibold">{item.condition}</span>
                    <span className="opacity-60">•</span>
                    <span className="opacity-75">{item.relationship}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </SectionCard>
    </>
  );
}
