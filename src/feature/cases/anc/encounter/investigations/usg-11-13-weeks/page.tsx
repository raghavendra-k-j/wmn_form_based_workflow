import { USG1113WeeksProvider } from './context';
import { USG1113WeeksView } from './view';

/** USG 11-13 Weeks Page - Entry point */
export const USG1113WeeksPage = () => {
  return (
    <USG1113WeeksProvider>
      <USG1113WeeksView />
    </USG1113WeeksProvider>
  );
};

export { USG1113WeeksPage as default };
