import { observer } from 'mobx-react-lite';
import { usePastHistory2Store } from '../../context';

export const YesNoSelector = observer(() => {
  const store = usePastHistory2Store();

  return (
    <div className="flex items-center gap-4">
      <span className="text-[13px] font-medium text-gray-700">Does the patient have past history?</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => store.setHasPastHistory(true)}
          className={`
            px-4 py-1.5 text-[12px] font-medium border transition-colors
            ${store.hasPastHistory === true
              ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => store.setHasPastHistory(false)}
          className={`
            px-4 py-1.5 text-[12px] font-medium border transition-colors
            ${store.hasPastHistory === false
              ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          No
        </button>
      </div>
    </div>
  );
});

YesNoSelector.displayName = 'YesNoSelector';
