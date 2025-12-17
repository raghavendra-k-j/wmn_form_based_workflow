import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Users } from 'lucide-react';
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
} from '../components/shared';

interface FamilyHistoryItem {
  id: string;
  name: string;
  familyMember: string;
  status: 'active' | 'inactive';
  notes: string;
}

const DEFAULT_ITEMS_LIST = [
  'Diabetes',
  'Hypertension',
  'Thyroid',
  'Stroke',
  'TB',
  'Cancers',
  'Twin',
  'Physically',
  'Mentally challenged',
  'Thromboembolism',
  'Psychiatric Problems',
  'Others'
];

const DEFAULTS_STORAGE_KEY = 'family-history-defaults';

const columns = [
  { key: 'name', label: 'Name', width: '28%' },
  { key: 'familyMember', label: 'Family Member', width: '22%' },
  { key: 'status', label: 'Status', width: '15%' },
  { key: 'notes', label: 'Notes', width: '30%' },
  { key: 'actions', label: '', width: '5%' },
];

export function FamilyHistory() {
  const [defaults, setDefaults] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DEFAULTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ITEMS_LIST;
    } catch {
      return DEFAULT_ITEMS_LIST;
    }
  });

  const [items, setItems] = useState<FamilyHistoryItem[]>([]);
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
        familyMember: '',
        status: 'inactive' as const,
        notes: ''
      }));
      setItems(initialItems);
    }
  }, []);

  const handleAdd = () => {
    const newItem: FamilyHistoryItem = {
      id: Date.now().toString(),
      name: '',
      familyMember: '',
      status: 'active',
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

  const toggleStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
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

  const activeCount = items.filter(i => i.status === 'active').length;

  return (
    <>
      <SectionCard
        title="Family History"
        icon={<Users className="w-4 h-4 text-blue-500" />}
        badge={<SectionBadge count={activeCount} label="active" color="green" />}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        showConfigureButton
        onConfigure={openDefaultsConfig}
      >
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search conditions..." 
        />

        <DataTable columns={columns} isEmpty={filteredItems.length === 0} emptyMessage="No family history records">
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <DragHandle className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <TableInput 
                    value={item.name}
                    onChange={(v) => handleChange(item.id, 'name', v)}
                    placeholder="Condition Name"
                    isBold
                  />
                </div>
              </TableCell>
              <TableCell>
                <TableInput 
                  value={item.familyMember}
                  onChange={(v) => handleChange(item.id, 'familyMember', v)}
                  placeholder="e.g. Mother, Father"
                />
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => toggleStatus(item.id)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors border ${
                    item.status === 'active' 
                      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                      : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {item.status === 'active' ? (
                    <><CheckCircle2 className="w-3 h-3" /> Yes</>
                  ) : (
                    <><Circle className="w-3 h-3" /> No</>
                  )}
                </button>
              </TableCell>
              <TableCell>
                <TableInput 
                  value={item.notes}
                  onChange={(v) => handleChange(item.id, 'notes', v)}
                  placeholder="Add notes..."
                />
              </TableCell>
              <TableCell showOnHover>
                <DeleteButton onClick={() => handleDelete(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>

        <div className="flex justify-end pt-2 border-t border-zinc-100">
          <AddButton onClick={handleAdd} label="Add Record" color="blue" />
        </div>
      </SectionCard>

      <ConfigureDrawer
        isOpen={isConfiguringDefaults}
        onClose={() => setIsConfiguringDefaults(false)}
        title="Configure Defaults"
        subtitle="Family History Conditions"
        accentColor="from-blue-50"
        description="These conditions will be automatically added for new patients."
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
        inputPlaceholder="Add new condition"
        emptyText="No default conditions set."
      />
    </>
  );
}
