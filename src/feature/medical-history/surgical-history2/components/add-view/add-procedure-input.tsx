import { observer } from 'mobx-react-lite';
import { useSurgicalHistory2Store } from '../../context';
import { AutocompleteInput } from '../../../components';

export const AddProcedureInput = observer(() => {
  const store = useSurgicalHistory2Store();

  const existingMasterIds = store.currentItems.map(item => item.masterId);
  const availableMasters = store.masterData.filter(
    master => !existingMasterIds.includes(master.id)
  );

  const handleAdd = (name: string) => {
    const master = availableMasters.find(m => m.name === name);
    if (master) {
      store.addItem(master.id);
    }
  };

  return (
    <div className="px-3 py-3 border-t border-gray-200 bg-gray-50">
      <AutocompleteInput
        suggestions={availableMasters.map(m => m.name)}
        onSelect={handleAdd}
        placeholder="Add procedure..."
        allowCustom={false}
      />
    </div>
  );
});

AddProcedureInput.displayName = 'AddProcedureInput';
