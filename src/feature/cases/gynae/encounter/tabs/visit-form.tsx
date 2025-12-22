import { observer } from 'mobx-react-lite';
import { VisitForm } from '../visit-form/visit-form';
import { VisitHistory } from '../visit-history';

/** Visit Form Tab Layout */
export const VisitFormContent = observer(() => {
  return (
    <div className="flex flex-col md:flex-row h-full gap-4 items-start">
      {/* Left: Visit Form */}
      <div className="flex-1 w-full min-w-0">
        <VisitForm />
      </div>

      {/* Right: Visit History */}
      <VisitHistory />
    </div>
  );
});
