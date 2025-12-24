import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components';
import {
  CompletePregnancyForm,
  EmptyState,
  PregnancyForm,
  PregnancyView
} from './components';
import { CurrentPregnancyProvider, useCurrentPregnancy } from './context';

/* =============================================================================
 * VIEW MODES
 * ============================================================================= */

type ViewMode = 'view' | 'add' | 'edit' | 'complete';

/* =============================================================================
 * MAIN PAGE CONTENT
 * ============================================================================= */

function CurrentPregnancyContent() {
  const { 
    pregnancy, 
    hasActivePregnancy, 
    finalEDD,
    finalEDDSource,
    addNewPregnancy,
    updatePregnancy,
    completePregnancy,
    reset,
  } = useCurrentPregnancy();
  
  const [viewMode, setViewMode] = useState<ViewMode>('view');

  const handleDelete = () => {
    if (confirm('Remove current pregnancy record?')) {
      reset();
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-zinc-200">
        {viewMode !== 'view' ? (
          <button
            onClick={() => setViewMode('view')}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px] font-bold uppercase tracking-tight">Back</span>
          </button>
        ) : (
          <h2 className="text-[13px] font-bold text-zinc-800 uppercase tracking-tight">
            Current Pregnancy
          </h2>
        )}
        
        {viewMode === 'view' && !hasActivePregnancy && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Plus />}
            onClick={() => setViewMode('add')}
          >
            Add Pregnancy
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* ADD PREGNANCY FORM */}
        {viewMode === 'add' && (
          <PregnancyForm
            mode="add"
            onSave={(data) => {
              addNewPregnancy({
                lmpDate: data.lmpDate,
                scanEDD: data.scanEDD || undefined,
                hasCorrectedEDD: data.hasCorrectedEDD,
                correctedEDD: data.hasCorrectedEDD ? data.correctedEDD : undefined,
                createdBy: 'Dr. Smith', // TODO: Get from session
              });
              setViewMode('view');
            }}
            onCancel={() => setViewMode('view')}
          />
        )}

        {/* EDIT PREGNANCY FORM */}
        {viewMode === 'edit' && pregnancy && (
          <PregnancyForm
            mode="edit"
            initialData={{
              lmpDate: pregnancy.lmpDate,
              scanEDD: pregnancy.scanEDD || '',
              hasCorrectedEDD: pregnancy.hasCorrectedEDD,
              correctedEDD: pregnancy.correctedEDD || '',
            }}
            onSave={(data) => {
              updatePregnancy({
                lmpDate: data.lmpDate,
                scanEDD: data.scanEDD || undefined,
                hasCorrectedEDD: data.hasCorrectedEDD,
                correctedEDD: data.hasCorrectedEDD ? data.correctedEDD : undefined,
                updatedBy: 'Dr. Smith', // TODO: Get from session
              });
              setViewMode('view');
            }}
            onCancel={() => setViewMode('view')}
          />
        )}

        {/* COMPLETE PREGNANCY FORM */}
        {viewMode === 'complete' && pregnancy && (
          <CompletePregnancyForm
            onSave={(outcome, details) => {
              completePregnancy(outcome, details);
              setViewMode('view');
            }}
            onCancel={() => setViewMode('view')}
          />
        )}

        {/* VIEW MODE */}
        {viewMode === 'view' && (
          <>
            {hasActivePregnancy && pregnancy && finalEDD && finalEDDSource ? (
              <PregnancyView
                pregnancy={pregnancy}
                finalEDD={finalEDD}
                finalEDDSource={finalEDDSource}
                onEdit={() => setViewMode('edit')}
                onDelete={handleDelete}
                onComplete={() => setViewMode('complete')}
              />
            ) : (
              <EmptyState onAdd={() => setViewMode('add')} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =============================================================================
 * EXPORTED PAGE COMPONENT
 * ============================================================================= */

export function CurrentPregnancyPage() {
  return (
    <CurrentPregnancyProvider>
      <CurrentPregnancyContent />
    </CurrentPregnancyProvider>
  );
}

export default CurrentPregnancyPage;
