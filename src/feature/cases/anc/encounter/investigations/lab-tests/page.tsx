import { LabTestsProvider } from './context';
import { LabTestsView } from './view';

/** Lab Tests Page - Entry point */
export const LabTestsPage = () => {
  return (
    <LabTestsProvider>
      <LabTestsView />
    </LabTestsProvider>
  );
};

export { LabTestsPage as default };
