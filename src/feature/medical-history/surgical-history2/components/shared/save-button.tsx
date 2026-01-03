import { observer } from 'mobx-react-lite';
import { Check, AlertCircle } from 'lucide-react';
import { useSurgicalHistory2Store } from '../../context';

export const SaveButton = observer(() => {
  const store = useSurgicalHistory2Store();

  const handleSave = () => {
    store.saveRecord();
  };

  const isDisabled = store.hasSurgicalHistory === null || store.saveState === 'saving';

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isDisabled}
      className={`
        px-4 py-1.5 text-[12px] font-medium transition-colors flex items-center gap-1.5
        ${store.saveState === 'saved'
          ? 'bg-green-600 text-white hover:bg-green-700'
          : store.saveState === 'error'
          ? 'bg-red-600 text-white hover:bg-red-700'
          : store.saveState === 'saving'
          ? 'bg-blue-500 text-white cursor-wait'
          : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
        }
      `}
    >
      {store.saveState === 'saving' && (
        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {store.saveState === 'saved' && <Check className="w-3.5 h-3.5" />}
      {store.saveState === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
      
      {store.saveState === 'saving' 
        ? 'Saving...' 
        : store.saveState === 'saved'
        ? 'Saved'
        : store.saveState === 'error'
        ? 'Error'
        : 'Save'
      }
    </button>
  );
});

SaveButton.displayName = 'SaveButton';
