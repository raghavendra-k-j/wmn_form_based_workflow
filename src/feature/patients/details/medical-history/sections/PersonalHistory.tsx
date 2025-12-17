import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import {
  SectionCard,
  ConfigureDrawer,
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

const DEFAULTS_STORAGE_KEY = 'personal-history-defaults';

const columns = [
  { key: 'name', label: 'Habit', width: '24%' },
  { key: 'status', label: 'Status', width: '16%' },
  { key: 'details', label: 'Details', width: '22%' },
  { key: 'notes', label: 'Notes', width: '33%' },
  { key: 'actions', label: '', width: '5%' },
];

export function PersonalHistory() {
  const [defaults, setDefaults] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DEFAULTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ITEMS_LIST;
    } catch {
      return DEFAULT_ITEMS_LIST;
    }
  });

  const [items, setItems] = useState<PersonalHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfiguringDefaults, setIsConfiguringDefaults] = useState(false);
  const [tempDefaults, setTempDefaults] = useState<string[]>([]);
  const [newDefaultItem, setNewDefaultItem] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      const initialItems = defaults.map((name, index) => ({
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

  const openDefaultsConfig = () => {
    setTempDefaults([...defaults]);
    setIsConfiguringDefaults(true);
  };

  const saveDefaults = () => {
    setDefaults(tempDefaults);
    localStorage.setItem(DEFAULTS_STORAGE_KEY, JSON.stringify(tempDefaults));
    setIsConfiguringDefaults(false);
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const concernCount = items.filter(i => i.status === 'yes' || i.status === 'occasional').length;

  return (
    <>
      <SectionCard
        title="Personal History"
        icon={<User className="w-4 h-4 text-purple-500" />}
        badge={<SectionBadge count={concernCount} label={concernCount === 1 ? 'concern' : 'concerns'} color="red" />}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        showConfigureButton
        onConfigure={openDefaultsConfig}
      >
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search habits..." 
        />

        <DataTable columns={columns} isEmpty={filteredItems.length === 0} emptyMessage="No personal history records">
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
                  />
                </div>
              </TableCell>
              <TableCell>
                <StatusToggle
                  value={item.status}
                  options={STATUS_OPTIONS}
                  onChange={(status) => handleStatusChange(item.id, status)}
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
                  placeholder="Additional notes..."
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
      </SectionCard>

      <ConfigureDrawer
        isOpen={isConfiguringDefaults}
        onClose={() => setIsConfiguringDefaults(false)}
        title="Configure Defaults"
        subtitle="Personal History / Lifestyle"
        accentColor="from-purple-50"
        description="These habits will be automatically added for new patients."
        items={tempDefaults}
        newItemValue={newDefaultItem}
        onNewItemChange={setNewDefaultItem}
        onAddItem={() => {
          if (newDefaultItem.trim()) {
            setTempDefaults([...tempDefaults, newDefaultItem.trim()]);
            setNewDefaultItem('');
          }
        }}
        onRemoveItem={(index) => setTempDefaults(tempDefaults.filter((_, i) => i !== index))}
        onSave={saveDefaults}
        inputPlaceholder="Add new habit"
        emptyText="No default habits set."
      />
    </>
  );
}
