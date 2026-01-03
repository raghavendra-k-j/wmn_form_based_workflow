import { observer } from 'mobx-react-lite';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { usePastHistory2Store } from '../../context';

export const SaveButton = observer(() => {
  const store = usePastHistory2Store();

  const isDisabled = store.hasPastHistory === null || store.saveState === 'saving' || store.isSaved;

  const getButtonContent = () => {
    switch (store.saveState) {
      case 'saving':
        return (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Saving...
          </>
        );
      case 'saved':
        return (
          <>
            <Check className="w-3.5 h-3.5" />
            Saved
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-3.5 h-3.5" />
            Error
          </>
        );
      default:
        return 'Save';
    }
  };

  const getButtonClass = () => {
    const base = 'px-4 py-1.5 text-[12px] font-medium transition-colors flex items-center gap-1.5';
    
    if (store.saveState === 'saved') {
      return `${base} bg-green-600 text-white hover:bg-green-700`;
    }
    if (store.saveState === 'error') {
      return `${base} bg-red-600 text-white hover:bg-red-700`;
    }
    return `${base} bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed`;
  };

  return (
    <button
      type="button"
      onClick={() => store.saveRecord()}
      disabled={isDisabled}
      className={getButtonClass()}
    >
      {getButtonContent()}
    </button>
  );
});

SaveButton.displayName = 'SaveButton';
