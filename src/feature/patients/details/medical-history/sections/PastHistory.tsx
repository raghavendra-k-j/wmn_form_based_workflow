import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, History } from 'lucide-react';
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
} from '../components/shared';

interface PastHistoryItem {
  id: string;
  name: string;
  since: string;
  status: 'active' | 'inactive';
  notes: string;
}

const DEFAULT_ITEMS_LIST = [
  'Diabetes',
  'Hypertension',
  'Thyroid',
  'Migraine',
  'Cardiac',
  'Epilepsy',
  'Asthma',
  'TB',
  'Blood Transfusion',
  'Surgery',
  'Thromboembolism',
  'Psychiatric Problems',
  'Admission to HDU / ICU',
  'Others'
];

const columns = (isEditMode: boolean) => [
  { key: 'name', label: 'Name', width: isEditMode ? '26%' : '40%' },
  { key: 'since', label: 'Since', width: isEditMode ? '16%' : '30%' },
  { key: 'status', label: 'Status', width: isEditMode ? '14%' : '25%' },
  ...(isEditMode ? [{ key: 'notes', label: 'Notes', width: '39%' }] : []),
  { key: 'actions', label: '', width: '5%' },
];

export function PastHistory() {
  const { isEditMode, expandedSections, toggleSection } = useMedicalHistory();

  const [items, setItems] = useState<PastHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isExpanded = expandedSections['pastHistory'];

  useEffect(() => {
    if (items.length === 0) {
      const initialItems = DEFAULT_ITEMS_LIST.map((name, index) => ({
        id: `default-${index}`,
        name: name,
        since: '',
        status: 'inactive' as const,
        notes: ''
      }));
      setItems(initialItems);
    }
  }, []);

  const handleAdd = () => {
    const newItem: PastHistoryItem = {
      id: Date.now().toString(),
      name: '',
      since: '',
      status: 'active',
      notes: ''
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof PastHistoryItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleStatus = (id: string) => {
    if (!isEditMode) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
    ));
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (isEditMode) return matchesSearch;
    return matchesSearch && i.status === 'active';
  });

  const activeCount = items.filter(i => i.status === 'active').length;

  return (
    <>
      <SectionCard
        title="Past History"
        icon={<History className="w-4 h-4 text-amber-500" />}
        badge={<SectionBadge count={activeCount} label="active" color="amber" />}
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

            <DataTable columns={columns(isEditMode)} isEmpty={filteredItems.length === 0} emptyMessage="No past history records">
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
                        readOnly={!isEditMode}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                      <TableInput 
                        value={item.since}
                        onChange={(v) => handleChange(item.id, 'since', v)}
                        placeholder="e.g. 2020"
                        readOnly={!isEditMode}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      disabled={!isEditMode}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors border ${
                        item.status === 'active' 
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                          : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                      } ${!isEditMode ? 'cursor-default hover:bg-opacity-100' : ''}`}
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
                      placeholder="e.g. on Ayur Rx, Lap appendicectomy"
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
              <AddButton onClick={handleAdd} label="Add Condition" color="amber" />
            </div>
          </>
        ) : (
          /* Summary View - Badge Display */
          <div className="py-2">
            {filteredItems.length === 0 ? (
              <p className="text-sm text-zinc-400 italic">No active conditions</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200"
                  >
                    <span className="font-semibold">{item.name}</span>
                    {item.since && (
                      <>
                        <span className="opacity-60">•</span>
                        <span className="opacity-75">Since {item.since}</span>
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
