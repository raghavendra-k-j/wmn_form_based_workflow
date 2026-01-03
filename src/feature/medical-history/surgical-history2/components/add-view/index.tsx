import { observer } from 'mobx-react-lite';
import { Trash2 } from 'lucide-react';
import { useSurgicalHistory2Store } from '../../context';
import { YesNoSelector } from '../shared/yes-no-selector';
import { PreviousVisitBanner } from '../shared/previous-visit-banner';
import { SurgicalHistoryForm } from './surgical-history-form';
import { EmptyState } from '../../../components';

export const AddView = observer(() => {
  const store = useSurgicalHistory2Store();

  return (
    <div className="space-y-4">
      <YesNoSelector />
      
      <PreviousVisitBanner />

      {/* Show form if Yes is selected */}
      {store.hasSurgicalHistory === true && <SurgicalHistoryForm />}

      {/* Show message if No is selected */}
      {store.hasSurgicalHistory === false && (
        <div className="border border-gray-200 bg-white relative">
          {store.saveState === 'saving' ? (
            <div className="px-4 py-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[13px] font-medium">Saving...</span>
              </div>
            </div>
          ) : store.saveState === 'saved' ? (
            <div className="px-4 py-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[13px] font-medium">Saved successfully</span>
              </div>
            </div>
          ) : (
            <EmptyState
              message="No surgical history"
              submessage="This has been recorded"
            />
          )}
          {store.isSaved && (
            <div className="absolute top-2 right-2">
              <button 
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to clear this saved record?')) {
                    store.clearCurrentRecord();
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                title="Clear saved record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
});

AddView.displayName = 'AddView';
