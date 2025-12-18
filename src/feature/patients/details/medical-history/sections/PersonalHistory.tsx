import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useMedicalHistory } from '../MedicalHistoryContext';
import {
  SectionCard,
  SearchInput,
  DataTable,
  TableRow,
  TableCell,
  TableInput,
  DragHandle,
  DeleteButton,
  AddButton,
  SectionBadge,
  StatusToggle,
} from '../components/shared';

type PersonalHistoryStatus = 'yes' | 'no' | 'occasional' | 'unknown';

interface PersonalHistoryItem {
  id: string;
  name: string;
  status: PersonalHistoryStatus;
  details: string;
  notes: string;
}

const STATUS_OPTIONS = [
  { value: 'yes' as const, label: 'Yes', className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
  { value: 'occasional' as const, label: 'Occasional', className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { value: 'no' as const, label: 'No', className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'unknown' as const, label: 'Unknown', className: 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100' },
];

const DEFAULT_ITEMS_LIST = [
  'Smoking',
  'Alcohol',
  'Consanguinity',
  'Psych. Stress',
  'Tobacco Chewing',
  'Drug Abuse',
  'Caffeine',
  'Exercise',
  'Diet',
  'Sleep Pattern'
];

const columns = (isEditMode: boolean) => [
  { key: 'name', label: 'Habit', width: isEditMode ? '24%' : '50%' },
  { key: 'status', label: 'Status', width: isEditMode ? '16%' : '45%' },
  ...(isEditMode ? [
    { key: 'details', label: 'Details', width: '22%' },
    { key: 'notes', label: 'Notes', width: '33%' }
  ] : []),
  { key: 'actions', label: '', width: '5%' },
];

export function PersonalHistory() {
  const { isEditMode, expandedSections, toggleSection } = useMedicalHistory();

  const [items, setItems] = useState<PersonalHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isExpanded = expandedSections['personalHistory'];

  useEffect(() => {
    if (items.length === 0) {
      const initialItems = DEFAULT_ITEMS_LIST.map((name, index) => ({
        id: `default-${index}`,
        name: name,
        status: 'unknown' as PersonalHistoryStatus,
        details: '',
        notes: ''
      }));
      setItems(initialItems);
    }
  }, []);

  const handleAdd = () => {
    const newItem: PersonalHistoryItem = {
      id: Date.now().toString(),
      name: '',
      status: 'unknown',
      details: '',
      notes: ''
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof PersonalHistoryItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleStatusChange = (id: string, status: PersonalHistoryStatus) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && (i.status === 'yes' || i.status === 'occasional');
  });

  const concernCount = items.filter(i => i.status === 'yes' || i.status === 'occasional').length;

  return (
    <>
      <SectionCard
        title="Personal History"
        icon={<User className="w-4 h-4 text-purple-500" />}
        badge={<SectionBadge count={concernCount} label={concernCount === 1 ? 'concern' : 'concerns'} color="red" />}
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

            <DataTable columns={columns(isEditMode)} isEmpty={filteredItems.length === 0} emptyMessage="No personal history records">
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <DragHandle className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <TableInput 
                        value={item.name}
                        onChange={(v) => handleChange(item.id, 'name', v)}
                        placeholder="Habit Name"
                        isBold
                        readOnly={!isEditMode}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusToggle
                      value={item.status}
                      options={STATUS_OPTIONS}
                      onChange={(status) => handleStatusChange(item.id, status)}
                      readOnly={!isEditMode}
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={item.details}
                      onChange={(v) => handleChange(item.id, 'details', v)}
                      placeholder="e.g. 10/day"
                      readOnly={!isEditMode}
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={item.notes}
                      onChange={(v) => handleChange(item.id, 'notes', v)}
                      placeholder="Additional notes..."
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
              <AddButton onClick={handleAdd} label="Add Habit" color="purple" />
            </div>
          </>
        ) : (
          /* Summary View - Badge Display */
          <div className="py-2">
            {filteredItems.length === 0 ? (
              <p className="text-sm text-zinc-400 italic">No concerns recorded</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${item.status === 'yes' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className="opacity-60">•</span>
                    <span className="capitalize">{item.status}</span>
                    {item.details && (
                      <>
                        <span className="opacity-60">•</span>
                        <span className="opacity-75">{item.details}</span>
                      </>
                    )}
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
